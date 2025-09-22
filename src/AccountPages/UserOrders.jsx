import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Button, Typography, Modal, Box, CardContent, Alert, AlertTitle
} from '@mui/material';
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../common components/AxiosInstance';

// --- STATUS COLOR LOGIC ---
const statusColor = status => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'delivered': return 'success';
        default: return 'default';
    }
};
const paymentColor = status => {
    switch (status?.toLowerCase()) {
        case 'captured': return 'success';
        case 'authorized': return 'info';
        case 'failed': return 'error';
        case 'refunded': return 'info';
        case 'created': return 'default';
        default: return 'default';
    }
};
const refundColor = status => (
    status === 'processed' ? 'info' : status === 'failed' ? 'error' : status === 'pending' ? 'warning' : 'default'
);

// --- LABEL HELPERS ---
function paymentStatusLabel(paymentInfo) {
    if (!paymentInfo || !paymentInfo.status) return 'Unknown';
    
    switch (paymentInfo.status.toLowerCase()) {
        case 'captured': return 'Paid';
        case 'authorized': return 'Authorized (Pending)';
        case 'failed': return 'Failed';
        case 'created': return 'Payment Initiated';
        default: return paymentInfo.status.charAt(0).toUpperCase() + paymentInfo.status.slice(1);
    }
}

function refundStatusLabel(refundInfo) {
    if (!refundInfo || !refundInfo.refundId) return 'No Refund';
    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    return `Refund ${status}`;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getEstimatedRefundDays(refundInfo) {
    if (!refundInfo || !refundInfo.estimatedSettlement) return null;
    const now = new Date();
    const settlement = new Date(refundInfo.estimatedSettlement);
    const diffTime = settlement - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Should be settled';
    if (diffDays === 1) return 'Expected tomorrow';
    return `Expected in ${diffDays} days`;
}

// --- MAIN PAGE COMPONENT ---
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?._id;

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate, userData]);

    // Fetch orders including live payment/refund status every 30 seconds
    useEffect(() => {
        if (userId) {
            fetchOrders();
            const interval = setInterval(() => {
                fetchOrdersSilently();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [userId]);

    const fetchLivePaymentStatus = async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/paymentStatus/${orderId}`);
            return response.data.paymentInfo;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return null;
        }
    };

    const fetchRefundStatus = async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/orders/${orderId}/refund-status`);
            return response.data.refundInfo;
        } catch (error) {
            console.error('Error fetching refund status:', error);
            return null;
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/orders/${userId}`);
            const ordersWithLiveStatus = await Promise.all(
                (response.data.orders || []).map(async (order) => {
                    // Fetch live payment status
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    
                    // Fetch live refund status if order is cancelled
                    let refundInfo = order.refundInfo;
                    if (order.status === 'Cancelled' && order.refundInfo?.refundId) {
                        refundInfo = await fetchRefundStatus(order._id);
                    }
                    
                    return {
                        ...order,
                        paymentInfo,
                        refundInfo
                    };
                })
            );
            setOrders(ordersWithLiveStatus);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrdersSilently = async () => {
        setRefreshing(true);
        try {
            const response = await axiosInstance.get(`/api/orders/${userId}`);
            const ordersWithLiveStatus = await Promise.all(
                (response.data.orders || []).map(async (order) => {
                    // Fetch live payment status
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    
                    // Fetch live refund status if order is cancelled
                    let refundInfo = order.refundInfo;
                    if (order.status === 'Cancelled' && order.refundInfo?.refundId) {
                        refundInfo = await fetchRefundStatus(order._id);
                    }
                    
                    return {
                        ...order,
                        paymentInfo,
                        refundInfo
                    };
                })
            );
            setOrders(ordersWithLiveStatus);
        } catch (error) {
            console.error('Error fetching orders silently:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const openOrderDetails = async (order) => {
        // Fetch the most recent data before showing modal
        try {
            const paymentInfo = await fetchLivePaymentStatus(order._id);
            let refundInfo = order.refundInfo;
            
            if (order.status === 'Cancelled' && order.refundInfo?.refundId) {
                refundInfo = await fetchRefundStatus(order._id);
            }
            
            setSelectedOrder({
                ...order,
                paymentInfo,
                refundInfo
            });
        } catch (error) {
            console.error('Error fetching latest order data:', error);
            setSelectedOrder(order);
        }
        setShowModal(true);
    };

    const closeOrderDetails = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    if (isAuthenticated === null) return null;

    return (
        <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight={600}>My Orders</Typography>
                <Button 
                    variant="outlined" 
                    onClick={fetchOrders}
                    disabled={loading || refreshing}
                    sx={{ minWidth: 120 }}
                >
                    {loading || refreshing ? 'Refreshing...' : 'Refresh Orders'}
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Product(s)</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Order Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Payment Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Refund Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">Loading orders...</TableCell>
                            </TableRow>
                        ) : orders.length > 0 ? orders.map((order, index) => (
                            <TableRow key={order._id} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace' }}>{order._id.slice(-8)}</TableCell>
                                <TableCell>
                                    <Box>
                                        {order.items.slice(0, 2).map(item => item.name).join(', ')}
                                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                                    </Box>
                                </TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={order.status} 
                                        color={statusColor(order.status)} 
                                        variant="filled" 
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Chip 
                                            label={paymentStatusLabel(order.paymentInfo)} 
                                            color={paymentColor(order.paymentInfo?.status)} 
                                            variant="filled" 
                                            size="small"
                                        />
                                        {order.paymentInfo?.status === 'authorized' && (
                                            <Typography variant="caption" color="info.main">
                                                Payment pending capture
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Chip 
                                            label={refundStatusLabel(order.refundInfo)} 
                                            color={refundColor(order.refundInfo?.status)} 
                                            variant="filled" 
                                            size="small"
                                        />
                                        {order.refundInfo && getEstimatedRefundDays(order.refundInfo) && (
                                            <Typography variant="caption" color="text.secondary">
                                                {getEstimatedRefundDays(order.refundInfo)}
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>₹{order.totalAmount}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        onClick={() => openOrderDetails(order)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Box sx={{ py: 4 }}>
                                        <Typography variant="h6" color="text.secondary">
                                            No orders found
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Your orders will appear here once you make a purchase
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MODAL FOR ORDER DETAILS */}
            <Modal open={showModal} onClose={closeOrderDetails}>
                <Box sx={{
                    maxWidth: 900, width: '95%', bgcolor: 'background.paper', borderRadius: 2,
                    boxShadow: 24, mx: 'auto', my: 4, overflowY: 'auto', maxHeight: '90vh'
                }}>
                    {selectedOrder && (
                        <>
                            <Box sx={{
                                bgcolor: 'primary.main', color: 'common.white', p: 3, borderRadius: '8px 8px 0 0',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <Typography variant="h5">{`Order #${selectedOrder._id.slice(-8)}`}</Typography>
                                <Button variant="text" color="inherit" onClick={closeOrderDetails} sx={{ fontSize: 28, minWidth: 'auto', p: 0 }}>×</Button>
                            </Box>
                            
                            <CardContent sx={{ p: 3 }}>
                                {/* Order Status Alert */}
                                {selectedOrder.status === 'Cancelled' && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        <AlertTitle>Order Cancelled</AlertTitle>
                                        {selectedOrder.cancelReason && `Reason: ${selectedOrder.cancelReason}`}
                                        {selectedOrder.refundInfo && ' • Refund has been processed'}
                                    </Alert>
                                )}
                                
                                {selectedOrder.paymentInfo?.status === 'authorized' && (
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        <AlertTitle>Payment Pending</AlertTitle>
                                        Your payment is authorized but pending final capture. The merchant will capture it soon.
                                    </Alert>
                                )}

                                {/* Order Info Section */}
                                <Box mb={3}>
                                    <Typography variant="h6" mb={2} sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                                        Order Information
                                    </Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Status</Typography>
                                            <Chip 
                                                label={selectedOrder.status} 
                                                color={statusColor(selectedOrder.status)} 
                                                variant="filled"
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Order Date</Typography>
                                            <Typography fontWeight={500}>{formatDate(selectedOrder.createdAt)}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                                            <Typography fontWeight={600} color="primary.main" fontSize={18}>₹{selectedOrder.totalAmount}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Phone</Typography>
                                            <Typography fontWeight={500}>{selectedOrder.phone}</Typography>
                                        </Box>
                                        <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
                                            <Typography variant="body2" color="text.secondary">Delivery Address</Typography>
                                            <Typography fontWeight={500}>{selectedOrder.address}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Payment Info */}
                                <Box mb={3}>
                                    <Typography variant="h6" mb={2} sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                                        Payment Information
                                    </Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                        {/* <Box>
                                            <Typography variant="body2" color="text.secondary">Payment ID</Typography>
                                            <Typography fontWeight={500} sx={{ fontFamily: 'monospace', fontSize: 14 }}>
                                                {selectedOrder.paymentInfo?.paymentId || 'Not available'}
                                            </Typography>
                                        </Box> */}
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">Payment Status</Typography>
                                            <Chip
                                                label={paymentStatusLabel(selectedOrder.paymentInfo)}
                                                color={paymentColor(selectedOrder.paymentInfo?.status)}
                                                variant="filled"
                                            />
                                        </Box>
                                        {selectedOrder.paymentInfo?.method && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                                                <Typography fontWeight={500}>{selectedOrder.paymentInfo.method.toUpperCase()}</Typography>
                                            </Box>
                                        )}
                                        {selectedOrder.paymentInfo?.updatedAt && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                                                <Typography fontWeight={500}>{formatDate(selectedOrder.paymentInfo.updatedAt)}</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                {/* Refund Info Section */}
                                {selectedOrder.refundInfo && selectedOrder.refundInfo.refundId && (
                                    <Box mb={3} sx={{ bgcolor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: 2, p: 2 }}>
                                        <Typography variant="h6" mb={2} color="primary.main">
                                            Refund Information
                                        </Typography>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Chip
                                                label={refundStatusLabel(selectedOrder.refundInfo)}
                                                color={refundColor(selectedOrder.refundInfo?.status)}
                                                sx={{ mr: 2 }}
                                            />
                                            <Typography variant="h6" color="primary.main">
                                                ₹{selectedOrder.refundInfo.amount}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Refund ID</Typography>
                                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedOrder.refundInfo.refundId}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Processing Speed</Typography>
                                                <Typography variant="body2">{selectedOrder.refundInfo.speed}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">Initiated</Typography>
                                                <Typography variant="body2">{formatDate(selectedOrder.refundInfo.createdAt)}</Typography>
                                            </Box>
                                            {selectedOrder.refundInfo.processedAt && (
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">Processed</Typography>
                                                    <Typography variant="body2">{formatDate(selectedOrder.refundInfo.processedAt)}</Typography>
                                                </Box>
                                            )}
                                            {selectedOrder.refundInfo.estimatedSettlement && (
                                                <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
                                                    <Typography variant="body2" color="text.secondary">Expected Settlement</Typography>
                                                    <Typography variant="body2">
                                                        {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                                                        <Typography component="span" color="success.main" fontWeight={600} ml={1}>
                                                            ({getEstimatedRefundDays(selectedOrder.refundInfo)})
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        {selectedOrder.refundInfo.notes && (
                                            <Box mt={2} p={2} bgcolor="background.paper" borderRadius={1}>
                                                <Typography variant="body2"><strong>Note:</strong> {selectedOrder.refundInfo.notes}</Typography>
                                            </Box>
                                        )}

                                        {/* Refund Timeline */}
                                        <Box mt={3}>
                                            <Typography variant="subtitle1" fontWeight={600} mb={1}>Refund Timeline</Typography>
                                            <Timeline position="alternate-reverse" sx={{ py: 0 }}>
                                                <TimelineItem>
                                                    <TimelineSeparator>
                                                        <TimelineDot color="primary" />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Typography variant="body2" fontWeight={600}>Refund Initiated</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatDate(selectedOrder.refundInfo.createdAt)}
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                                
                                                {selectedOrder.refundInfo.processedAt && (
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                            <TimelineDot color="success" />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Typography variant="body2" fontWeight={600}>Refund Processed</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {formatDate(selectedOrder.refundInfo.processedAt)}
                                                            </Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )}
                                                
                                                <TimelineItem>
                                                    <TimelineSeparator>
                                                        <TimelineDot color={selectedOrder.refundInfo.status === 'processed' ? 'success' : 'grey'} />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Typography variant="body2" fontWeight={600}>Amount Credited</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {selectedOrder.refundInfo.estimatedSettlement
                                                                ? getEstimatedRefundDays(selectedOrder.refundInfo) === 'Should be settled' 
                                                                    ? 'Should be completed'
                                                                    : getEstimatedRefundDays(selectedOrder.refundInfo)
                                                                : 'Pending'
                                                            }
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            </Timeline>
                                        </Box>
                                    </Box>
                                )}

                                {/* Items Info Section */}
                                <Box>
                                    <Typography variant="h6" mb={2} sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                                        Items Ordered ({selectedOrder.items.length})
                                    </Typography>
                                    <Box display="grid" gap={2}>
                                        {selectedOrder.items.map((item, index) => (
                                            <Box key={index} sx={{ 
                                                p: 2, 
                                                bgcolor: 'background.default', 
                                                border: 1, 
                                                borderColor: 'divider', 
                                                borderRadius: 2,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Product ID: {item.productId}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        ₹{item.price} × {item.quantity}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" color="primary.main" fontWeight={600}>
                                                    ₹{item.price * item.quantity}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default UserOrders;

// // 2:
// import React, { useState, useEffect } from 'react';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     Chip, Button, Typography, Modal, Box, CardContent
// } from '@mui/material';
// import {
//     Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
// } from '@mui/lab';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../common components/AxiosInstance';

// // --- STATUS COLOR LOGIC ---
// const statusColor = status => {
//     switch (status?.toLowerCase()) {
//         case 'pending': return 'warning';
//         case 'cancelled': return 'error';
//         case 'delivered': return 'success';
//         default: return 'default';
//     }
// };
// const paymentColor = status => (
//     status === 'captured' ? 'success' : status === 'failed' ? 'error' : status === 'refunded' ? 'info' : 'default'
// );
// const refundColor = status => (
//     status === 'processed' ? 'info' : status === 'failed' ? 'error' : status === 'pending' ? 'warning' : 'default'
// );

// // --- LABEL HELPERS ---
// function paymentStatusLabel(status) {
//     if (!status) return 'Unknown';
//     if (status === 'captured') return 'Paid';
//     if (status === 'failed') return 'Failed';
//     if (status === 'refunded') return 'Refunded';
//     return status.charAt(0).toUpperCase() + status.slice(1);
// }
// function refundStatusLabel(refundInfo) {
//     if (!refundInfo) return 'No Refund';
//     const status = refundInfo.status;
//     if (status === 'processed') return 'Refund Processed';
//     if (status === 'failed') return 'Refund Failed';
//     if (status === 'pending') return 'Refund Pending';
//     return `Refund ${status}`;
// }
// function formatDate(dateString) {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleString('en-IN', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     });
// }
// function getEstimatedRefundDays(refundInfo) {
//     if (!refundInfo || !refundInfo.estimatedSettlement) return null;
//     const now = new Date();
//     const settlement = new Date(refundInfo.estimatedSettlement);
//     const diffTime = settlement - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     if (diffDays <= 0) return 'Should be settled';
//     if (diffDays === 1) return 'Expected tomorrow';
//     return `Expected in ${diffDays} days`;
// }

// // --- MAIN PAGE COMPONENT ---
// const UserOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const navigate = useNavigate();

//     const userData = JSON.parse(localStorage.getItem('userData'));
//     const userId = userData?._id;

//     useEffect(() => {
//         if (!userData) {
//             navigate('/login');
//         } else {
//             setIsAuthenticated(true);
//         }
//     }, [navigate, userData]);

//     // Fetch order including live payment/refund status every 30 seconds
//     useEffect(() => {
//         if (userId) {
//             fetchOrders();
//             const interval = setInterval(() => {
//                 fetchOrders();
//             }, 30000);
//             return () => clearInterval(interval);
//         }
//     }, [userId]);

//     const fetchLivePaymentStatus = async (orderId) => {
//         try {
//             const response = await axiosInstance.get(`/api/paymentStatus/${orderId}`);
//             return response.data.paymentInfo;
//         } catch (error) {
//             console.error('Error fetching payment status:', error);
//             return null;
//         }
//     };

//     const fetchRefundStatus = async (orderId) => {
//         try {
//             const response = await axiosInstance.get(`/api/orders/${orderId}/refund-status`);
//             return response.data.refundInfo;
//         } catch (error) {
//             console.error('Error fetching refund status:', error);
//             return null;
//         }
//     };

//     const fetchOrders = async () => {
//         setLoading(true);
//         try {
//             const response = await axiosInstance.get(`/api/orders/${userId}`);
//             const ordersWithLiveStatus = await Promise.all(
//                 (response.data.orders || []).map(async (order) => {
//                     // Fetch live payment status
//                     const paymentInfo = await fetchLivePaymentStatus(order._id);
//                     // Fetch live refund status if order is cancelled
//                     let refundInfo = order.refundInfo;
//                     if (order.status === 'Cancelled' && order.refundInfo?.refundId) {
//                         refundInfo = await fetchRefundStatus(order._id);
//                     }
//                     return {
//                         ...order,
//                         paymentInfo,
//                         refundInfo
//                     };
//                 })
//             );
//             setOrders(ordersWithLiveStatus);
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const openOrderDetails = (order) => {
//         setSelectedOrder(order);
//         setShowModal(true);
//     };
//     const closeOrderDetails = () => {
//         setShowModal(false);
//         setSelectedOrder(null);
//     };

//     if (isAuthenticated === null) return null;

//     return (
//         <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
//             <Typography variant="h4" fontWeight={600} mb={4}>My Orders</Typography>
//             <TableContainer component={Paper} elevation={2}>
//                 <Table>
//                     <TableHead>
//                         <TableRow 
//                         // sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: 'white' }}
//                         >
//                             <TableCell>#</TableCell>
//                             <TableCell>Order ID</TableCell>
//                             <TableCell>Product(s)</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Order Status</TableCell>
//                             <TableCell>Payment Status</TableCell>
//                             <TableCell>Refund Status</TableCell>
//                             <TableCell>Total</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={9} align="center">Loading...</TableCell>
//                             </TableRow>
//                         ) : orders.length > 0 ? orders.map((order, index) => (
//                             <TableRow key={order._id}>
//                                 <TableCell>{index + 1}</TableCell>
//                                 <TableCell>{order._id.slice(-8)}</TableCell>
//                                 <TableCell>{order.items.map(item => item.name).join(', ')}</TableCell>
//                                 <TableCell>{formatDate(order.createdAt)}</TableCell>
//                                 <TableCell>
//                                     <Chip label={order.status} color={statusColor(order.status)} variant="filled" />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip label={paymentStatusLabel(order.paymentInfo?.status)} color={paymentColor(order.paymentInfo?.status)} variant="filled" />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip label={refundStatusLabel(order.refundInfo)} color={refundColor(order.refundInfo?.status)} variant="filled" />
//                                     {order.refundInfo && (
//                                         <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>{getEstimatedRefundDays(order.refundInfo)}</Typography>
//                                     )}
//                                 </TableCell>
//                                 <TableCell>{`₹${order.totalAmount}`}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" size="small" onClick={() => openOrderDetails(order)}>
//                                         View Details
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         )) : (
//                             <TableRow>
//                                 <TableCell colSpan={9} align="center">No orders found.</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* MODAL FOR ORDER DETAILS */}
//             {/* <Modal open={showModal} onClose={closeOrderDetails}>
//         <Box sx={{
//           maxWidth: 800, width: '100%', bgcolor: 'background.paper', borderRadius: 2,
//           boxShadow: 24, mx: 'auto', my: 4, overflowY: 'auto'
//         }}>
//           {selectedOrder && (
//             <>
             
//             </>
//           )}
//         </Box>
//       </Modal> */}

//             {/* MODAL FOR ORDER DETAILS */}
//             <Modal open={showModal} onClose={closeOrderDetails}>
//                 <Box sx={{
//                     maxWidth: 800, width: '100%', bgcolor: 'background.paper', borderRadius: 2,
//                     boxShadow: 24, mx: 'auto', my: 4, overflowY: 'auto'
//                 }}>
//                     {selectedOrder && (
//                         <>
//                             <Box sx={{
//                                 bgcolor: 'primary.main', color: 'common.white', p: 2, borderRadius: '12px 12px 0 0',
//                                 display: 'flex', justifyContent: 'space-between', alignItems: 'center'
//                             }}>
//                                 <Typography variant="h6">{`Order Details - #${selectedOrder._id.slice(-8)}`}</Typography>
//                                 <Button variant="text" color="inherit" onClick={closeOrderDetails} sx={{ fontSize: 28 }}>×</Button>
//                             </Box>
//                             <CardContent>
//                                 {/* Order Info Section */}
//                                 <Box mb={3}>
//                                     <Typography variant="h6" mb={2}>Order Information</Typography>
//                                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//                                         <Box><strong>Status:</strong> {selectedOrder.status}</Box>
//                                         <Box><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</Box>
//                                         <Box><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Box>
//                                         <Box><strong>Phone:</strong> {selectedOrder.phone}</Box>
//                                         <Box><strong>Address:</strong> {selectedOrder.address}</Box>
//                                     </Box>
//                                     {/* Cancellation Info */}
//                                     {selectedOrder.cancelReason && (
//                                         <Box mt={2} p={2} bgcolor="#fff3cd" borderRadius={1}>
//                                             <Typography variant="subtitle2" color="warning.main">Cancellation Details</Typography>
//                                             <Typography variant="body2"><strong>Reason:</strong> {selectedOrder.cancelReason}</Typography>
//                                             {selectedOrder.cancelledAt && (
//                                                 <Typography variant="body2"><strong>Cancelled on:</strong> {formatDate(selectedOrder.cancelledAt)}</Typography>
//                                             )}
//                                         </Box>
//                                     )}
//                                 </Box>
//                                 {/* Payment Info */}
//                                 <Box mb={3}>
//                                     <Typography variant="h6" mb={2}>Payment Information</Typography>
//                                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//                                         <Box><strong>Payment ID:</strong> {selectedOrder.paymentInfo?.paymentId || 'N/A'}</Box>
//                                         <Box>
//                                             <strong>Payment Status:</strong>
//                                             <Chip
//                                                 label={paymentStatusLabel(selectedOrder.paymentInfo?.status)}
//                                                 color={paymentColor(selectedOrder.paymentInfo?.status)}
//                                                 size="small"
//                                                 sx={{ ml: 1 }}
//                                             />
//                                         </Box>
//                                         {selectedOrder.paymentInfo?.updatedAt && (
//                                             <Box mb={1}><strong>Payment Updated:</strong> {formatDate(selectedOrder.paymentInfo.updatedAt)}</Box>
//                                         )}
//                                     </Box>
//                                 </Box>
//                                 {/* Refund Info Section */}
//                                 {selectedOrder.refundInfo && (
//                                     <Box mb={3} bgcolor="#e8f4fd" border={2} borderColor="#74b9ff" borderRadius={2} p={2}>
//                                         <Typography variant="h6" mb={2}>Refund Information</Typography>
//                                         <Box display="flex" alignItems="center" mb={2}>
//                                             <Chip
//                                                 label={refundStatusLabel(selectedOrder.refundInfo)}
//                                                 color={refundColor(selectedOrder.refundInfo?.status)}
//                                                 sx={{ mr: 2 }}
//                                             />
//                                             <Typography variant="h5" color="primary.main">
//                                                 ₹{selectedOrder.refundInfo.amount}
//                                             </Typography>
//                                         </Box>

//                                         <Box>
//                                             <Typography variant="body2"><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</Typography>
//                                             <Typography variant="body2"><strong>Refund Reason:</strong> {selectedOrder.refundInfo.reason}</Typography>
//                                             <Typography variant="body2"><strong>Processing Speed:</strong> {selectedOrder.refundInfo.speed}</Typography>
//                                             <Typography variant="body2"><strong>Initiated:</strong> {formatDate(selectedOrder.refundInfo.createdAt)}</Typography>
//                                             {selectedOrder.refundInfo.processedAt && (
//                                                 <Typography variant="body2"><strong>Processed:</strong> {formatDate(selectedOrder.refundInfo.processedAt)}</Typography>
//                                             )}
//                                             {selectedOrder.refundInfo.estimatedSettlement && (
//                                                 <Typography variant="body2">
//                                                     <strong>Expected Settlement:</strong> {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
//                                                     <span style={{ color: '#28a745', fontWeight: 600, fontSize: 11, marginLeft: 8 }}>
//                                                         ({getEstimatedRefundDays(selectedOrder.refundInfo)})
//                                                     </span>
//                                                 </Typography>
//                                             )}
//                                             {selectedOrder.refundInfo.notes && (
//                                                 <Typography variant="body2" mt={2}><strong>Note:</strong> {selectedOrder.refundInfo.notes}</Typography>
//                                             )}
//                                         </Box>
//                                         {/* Refund Timeline */}
//                                         <Box mt={3}>
//                                             <Typography variant="subtitle1" fontWeight={600} mb={1}>Refund Timeline</Typography>
//                                             <Timeline position="alternate">
//                                                 <TimelineItem>
//                                                     <TimelineSeparator>
//                                                         <TimelineDot color="primary" />
//                                                         <TimelineConnector />
//                                                     </TimelineSeparator>
//                                                     <TimelineContent>
//                                                         <strong>Refund Initiated</strong><br />
//                                                         <Typography variant="caption">{formatDate(selectedOrder.refundInfo.createdAt)}</Typography>
//                                                     </TimelineContent>
//                                                 </TimelineItem>
//                                                 {selectedOrder.refundInfo.processedAt && (
//                                                     <TimelineItem>
//                                                         <TimelineSeparator>
//                                                             <TimelineDot color="success" />
//                                                             <TimelineConnector />
//                                                         </TimelineSeparator>
//                                                         <TimelineContent>
//                                                             <strong>Refund Processed</strong><br />
//                                                             <Typography variant="caption">{formatDate(selectedOrder.refundInfo.processedAt)}</Typography>
//                                                         </TimelineContent>
//                                                     </TimelineItem>
//                                                 )}
//                                                 <TimelineItem>
//                                                     <TimelineSeparator>
//                                                         <TimelineDot color={selectedOrder.refundInfo.status === 'processed' ? 'info' : 'grey'} />
//                                                     </TimelineSeparator>
//                                                     <TimelineContent>
//                                                         <strong>Amount Credited to Account</strong><br />
//                                                         <Typography variant="caption">
//                                                             {selectedOrder.refundInfo.estimatedSettlement
//                                                                 ? formatDate(selectedOrder.refundInfo.estimatedSettlement)
//                                                                 : 'Pending'}
//                                                         </Typography>
//                                                     </TimelineContent>
//                                                 </TimelineItem>
//                                             </Timeline>
//                                         </Box>
//                                     </Box>
//                                 )}
//                                 {/* Items Info Section */}
//                                 <Box mb={2}>
//                                     <Typography variant="h6" mb={2}>Items Ordered</Typography>
//                                     <Box display="grid" gap={2}>
//                                         {selectedOrder.items.map((item, index) => (
//                                             <Box key={index} p={2} bgcolor="#fff" border={1} borderColor="divider" borderRadius={2}>
//                                                 <Typography variant="subtitle1">{item.name}</Typography>
//                                                 <Typography fontSize={13} color="text.secondary">Product ID: {item.productId}</Typography>
//                                                 <Box display="flex" alignItems="center" gap={2} mt={1}>
//                                                     <Typography>₹{item.price} × {item.quantity}</Typography>
//                                                     <Typography color="primary.main" fontWeight={600}>₹{item.price * item.quantity}</Typography>
//                                                 </Box>
//                                             </Box>
//                                         ))}
//                                     </Box>
//                                 </Box>
//                             </CardContent>
//                         </>
//                     )}
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default UserOrders;
