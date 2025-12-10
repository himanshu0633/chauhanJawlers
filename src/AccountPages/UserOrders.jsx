import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Button, Typography, Modal, Box, CardContent, Snackbar, Alert
} from '@mui/material';
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';

// --- STATUS COLOR LOGIC ---
const statusColor = status => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'delivered': return 'success';
        default: return 'default';
    }
};

const paymentColor = status => (
    status === 'captured' ? 'success' : status === 'failed' ? 'error' : status === 'refunded' ? 'info' : 'default'
);

const refundColor = status => (
    status === 'processed' ? 'info' : status === 'failed' ? 'error' : status === 'pending' ? 'warning' : 'default'
);

// --- LABEL HELPERS ---
function paymentStatusLabel(status) {
    if (!status) return 'Unknown';
    if (status === 'captured') return 'Paid';
    if (status === 'failed') return 'Failed';
    if (status === 'authorized') return 'Authorized';
    if (status === 'created') return 'Created';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function refundStatusLabel(refundInfo) {
    if (!refundInfo) return 'No Refund';
    if (!refundInfo.refundId && refundInfo.status === 'none') return 'No Refund';
    if (!refundInfo.refundId) return 'No Refund';

    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    if (status === 'initiated') return 'Refund Initiated';
    if (status === 'none') return 'No Refund';
    return `Refund ${status}`;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleString('en-IN', {
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
    if (isNaN(settlement.getTime())) return null;
    
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
    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: '', 
        severity: 'info' 
    });
    
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData?._id;
    const userEmail = userData?.email;

    // Check authentication
    useEffect(() => {
        if (!userData._id) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate, userData._id]);

    // Fetch live payment status
    const fetchLivePaymentStatus = useCallback(async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/paymentStatus/${orderId}`);
            return response.data.paymentInfo;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return null;
        }
    }, []);

    // Fetch refund status
    const fetchRefundStatus = useCallback(async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/orders/${orderId}/refund-status`);
            return response.data.refundInfo;
        } catch (error) {
            console.error('Error fetching refund status:', error);
            return null;
        }
    }, []);

    // Associate guest orders with user account
    const checkAndAssociateGuestOrders = useCallback(async () => {
        if (!userEmail || !userId) return;
        
        try {
            console.log('Checking for guest orders to associate...');
            const response = await axiosInstance.post('/api/associateGuestOrders', {
                guestEmail: userEmail,
                userId: userId
            });

            if (response.data.success && response.data.associatedCount > 0) {
                setSnackbar({
                    open: true,
                    message: `${response.data.associatedCount} previous guest order(s) have been added to your account`,
                    severity: 'success'
                });
                return true; // Return true if orders were associated
            }
        } catch (error) {
            console.error('Error associating guest orders:', error);
        }
        return false;
    }, [userEmail, userId]);

    // Main fetch orders function
    const fetchOrders = useCallback(async () => {
        if (!userId) return;
        
        setLoading(true);
        try {
            // Try to fetch orders by userId
            let userOrders = [];
            
            try {
                const response = await axiosInstance.get(`/api/orders/${userId}`);
                userOrders = response.data.orders || [];
            } catch (userIdError) {
                console.log('No orders found with userId');
            }
            
            // If no orders found with userId, try fetching by email
            if (userOrders.length === 0 && userEmail) {
                try {
                    const emailResponse = await axiosInstance.get(
                        `/api/orders/email/${encodeURIComponent(userEmail)}`
                    );
                    userOrders = emailResponse.data.orders || [];
                } catch (emailError) {
                    console.log('No orders found by email either');
                }
            }
            
            // Fetch live status for all orders
            const ordersWithLiveStatus = await Promise.all(
                userOrders.map(async (order) => {
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    const refundInfo = await fetchRefundStatus(order._id);

                    return {
                        ...order,
                        paymentInfo: paymentInfo || order.paymentInfo,
                        refundInfo: refundInfo || order.refundInfo || { status: 'none' }
                    };
                })
            );
            
            // Sort orders by date (newest first)
            const sortedOrders = ordersWithLiveStatus.sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA;
            });
            
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [userId, userEmail, fetchLivePaymentStatus, fetchRefundStatus]);

    // Silent fetch for periodic updates
    const fetchOrdersSilently = useCallback(async () => {
        if (!userId) return;
        
        try {
            let userOrders = [];
            
            try {
                const response = await axiosInstance.get(`/api/orders/${userId}`);
                userOrders = response.data.orders || [];
            } catch (error) {
                return;
            }
            
            const ordersWithLiveStatus = await Promise.all(
                userOrders.map(async (order) => {
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    const refundInfo = await fetchRefundStatus(order._id);

                    return {
                        ...order,
                        paymentInfo: paymentInfo || order.paymentInfo,
                        refundInfo: refundInfo || order.refundInfo || { status: 'none' }
                    };
                })
            );
            
            // Update state only if orders changed
            setOrders(prevOrders => {
                const prevOrdersStr = JSON.stringify(prevOrders);
                const newOrdersStr = JSON.stringify(ordersWithLiveStatus);
                if (prevOrdersStr !== newOrdersStr) {
                    return ordersWithLiveStatus.sort((a, b) => {
                        const dateA = new Date(a.createdAt || 0);
                        const dateB = new Date(b.createdAt || 0);
                        return dateB - dateA;
                    });
                }
                return prevOrders;
            });
        } catch (error) {
            console.error('Error fetching orders silently:', error);
        }
    }, [userId, fetchLivePaymentStatus, fetchRefundStatus]);

    // Initial load and guest order association
    useEffect(() => {
        if (!userId || !userEmail) return;

        const initializePage = async () => {
            // First associate guest orders
            const ordersAssociated = await checkAndAssociateGuestOrders();
            
            // Then fetch orders
            await fetchOrders();
            
            // If orders were associated, fetch again after a delay
            if (ordersAssociated) {
                setTimeout(() => {
                    fetchOrders();
                }, 1500);
            }
        };

        initializePage();

        // Set up interval for silent updates (every 30 seconds)
        const interval = setInterval(() => {
            fetchOrdersSilently();
        }, 30000);

        return () => clearInterval(interval);
    }, [userId, userEmail, checkAndAssociateGuestOrders, fetchOrders, fetchOrdersSilently]);

    // Open order details modal
    const openOrderDetails = useCallback(async (order) => {
        try {
            const paymentInfo = await fetchLivePaymentStatus(order._id);
            const refundInfo = await fetchRefundStatus(order._id);

            setSelectedOrder({
                ...order,
                paymentInfo: paymentInfo || order.paymentInfo,
                refundInfo: refundInfo || order.refundInfo || { status: 'none' }
            });
        } catch (error) {
            console.error('Error fetching latest order data:', error);
            setSelectedOrder(order);
        }
        setShowModal(true);
    }, [fetchLivePaymentStatus, fetchRefundStatus]);
    
    // Close order details modal
    const closeOrderDetails = useCallback(() => {
        setShowModal(false);
        setSelectedOrder(null);
    }, []);
    
    // Handle snackbar close
    const handleCloseSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    if (isAuthenticated === null) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto', minHeight: '80vh' }}>
            <Typography variant="h4" fontWeight={600} mb={4} sx={{ color: 'primary.main' }}>
                My Orders
            </Typography>
            
            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            
            <TableContainer 
                component={Paper} 
                elevation={2}
                sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 4
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.light' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>#</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Order ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Product(s)</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Order Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Payment Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Refund Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Total</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                                    <Typography>Loading your orders...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : orders.length > 0 ? orders.map((order, index) => (
                            <TableRow 
                                key={order._id} 
                                hover
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: '0.85rem' }}>
                                        {order._id?.slice(-8) || 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {order.items?.slice(0, 2).map(item => item.name).join(', ') || 'No items'}
                                        {order.items?.length > 2 && ` +${order.items.length - 2} more`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatDate(order.createdAt)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={order.status || 'Unknown'} 
                                        color={statusColor(order.status)} 
                                        variant="filled" 
                                        size="small"
                                        sx={{ fontWeight: 500 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={paymentStatusLabel(order.paymentInfo?.status)} 
                                        color={paymentColor(order.paymentInfo?.status)} 
                                        variant="filled" 
                                        size="small"
                                        sx={{ fontWeight: 500 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={refundStatusLabel(order.refundInfo)} 
                                        color={refundColor(order.refundInfo?.status)} 
                                        variant="filled" 
                                        size="small"
                                        sx={{ fontWeight: 500 }}
                                    />
                                    {order.refundInfo && order.refundInfo.status === 'initiated' && (
                                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                            {getEstimatedRefundDays(order.refundInfo)}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} sx={{ color: 'primary.main' }}>
                                        ₹{order.totalAmount?.toLocaleString('en-IN') || '0'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        size="small" 
                                        onClick={() => openOrderDetails(order)}
                                        sx={{ 
                                            textTransform: 'none',
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                                borderColor: 'primary.dark'
                                            }
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" color="text.secondary" mb={2}>
                                            No orders found
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mb={3}>
                                            You haven't placed any orders yet.
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => navigate('/shop')}
                                            sx={{
                                                backgroundColor: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark'
                                                }
                                            }}
                                        >
                                            Start Shopping
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MODAL FOR ORDER DETAILS */}
            <Modal 
                open={showModal} 
                onClose={closeOrderDetails}
                sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Box sx={{
                    maxWidth: 900, 
                    width: '100%', 
                    bgcolor: 'background.paper', 
                    borderRadius: 3, 
                    maxHeight: '90vh',
                    boxShadow: 24, 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {selectedOrder && (
                        <>
                            {/* Modal Header */}
                            <Box sx={{
                                bgcolor: 'primary.main', 
                                color: 'common.white', 
                                p: 3, 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center'
                            }}>
                                <Box>
                                    <Typography variant="h5" fontWeight={600}>
                                        Order Details
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                                        #{selectedOrder._id?.slice(-8) || 'N/A'} • {formatDate(selectedOrder.createdAt)}
                                    </Typography>
                                </Box>
                                <Button 
                                    variant="text" 
                                    color="inherit" 
                                    onClick={closeOrderDetails} 
                                    sx={{ 
                                        minWidth: 'auto',
                                        p: 1,
                                        borderRadius: '50%',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    <Typography sx={{ fontSize: 28, lineHeight: 1 }}>×</Typography>
                                </Button>
                            </Box>
                            
                            {/* Modal Content */}
                            <Box sx={{ 
                                overflowY: 'auto',
                                flex: 1,
                                p: { xs: 2, md: 3 }
                            }}>
                                {/* Order Info Section */}
                                <CardContent sx={{ p: 0, mb: 4 }}>
                                    <Typography variant="h6" fontWeight={600} mb={3} sx={{ color: 'primary.main' }}>
                                        Order Information
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, 
                                        gap: 3 
                                    }}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Status
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {selectedOrder.status}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Order Date
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {formatDate(selectedOrder.createdAt)}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Total Amount
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600} sx={{ color: 'primary.main' }}>
                                                ₹{selectedOrder.totalAmount?.toLocaleString('en-IN') || '0'}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Phone
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {selectedOrder.phone || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1', md: 'span 2' } }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Delivery Address
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {selectedOrder.address || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    {/* Cancellation Info */}
                                    {selectedOrder.cancelReason && (
                                        <Box mt={3} p={2.5} bgcolor="#fff3cd" borderRadius={2} borderLeft="4px solid #ffc107">
                                            <Typography variant="subtitle1" color="warning.dark" fontWeight={600} mb={1}>
                                                Cancellation Details
                                            </Typography>
                                            <Typography variant="body2" mb={1}>
                                                <strong>Reason:</strong> {selectedOrder.cancelReason}
                                            </Typography>
                                            {selectedOrder.cancelledAt && (
                                                <Typography variant="body2">
                                                    <strong>Cancelled on:</strong> {formatDate(selectedOrder.cancelledAt)}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </CardContent>
                                
                                {/* Payment Info */}
                                <CardContent sx={{ p: 0, mb: 4 }}>
                                    <Typography variant="h6" fontWeight={600} mb={3} sx={{ color: 'primary.main' }}>
                                        Payment Information
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, 
                                        gap: 3 
                                    }}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Payment Status
                                            </Typography>
                                            <Chip
                                                label={paymentStatusLabel(selectedOrder.paymentInfo?.status)}
                                                color={paymentColor(selectedOrder.paymentInfo?.status)}
                                                size="medium"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Box>
                                        {selectedOrder.paymentInfo?.paymentId && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    Payment ID
                                                </Typography>
                                                <Typography variant="body2" fontFamily="monospace" sx={{ 
                                                    backgroundColor: 'grey.100', 
                                                    p: 1, 
                                                    borderRadius: 1,
                                                    wordBreak: 'break-all'
                                                }}>
                                                    {selectedOrder.paymentInfo.paymentId}
                                                </Typography>
                                            </Box>
                                        )}
                                        {selectedOrder.paymentInfo?.updatedAt && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    Last Updated
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {formatDate(selectedOrder.paymentInfo.updatedAt)}
                                                </Typography>
                                            </Box>
                                        )}
                                        {selectedOrder.paymentInfo?.method && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                    Payment Method
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                                    {selectedOrder.paymentInfo.method}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>
                                
                                {/* Refund Info Section */}
                                {selectedOrder.refundInfo && selectedOrder.refundInfo.status !== 'none' && (
                                    <CardContent sx={{ p: 0, mb: 4 }}>
                                        <Box bgcolor="#e8f4fd" borderRadius={3} p={3} border="1px solid #74b9ff">
                                            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: 'primary.main' }}>
                                                Refund Information
                                            </Typography>
                                            <Typography variant="body2" mb={3} color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                Refund takes up to 5-7 working days after the refund has processed
                                            </Typography>
                                            
                                            <Box display="flex" alignItems="center" mb={3}>
                                                <Chip
                                                    label={refundStatusLabel(selectedOrder.refundInfo)}
                                                    color={refundColor(selectedOrder.refundInfo?.status)}
                                                    sx={{ mr: 2, fontWeight: 600 }}
                                                />
                                                <Typography variant="h4" color="primary.main" fontWeight={700}>
                                                    ₹{selectedOrder.refundInfo.amount?.toLocaleString('en-IN') || '0'}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                                                gap: 2,
                                                mb: 3
                                            }}>
                                                {selectedOrder.refundInfo.refundId && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Refund ID
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500} fontFamily="monospace">
                                                            {selectedOrder.refundInfo.refundId}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.refundInfo.reason && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Refund Reason
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {selectedOrder.refundInfo.reason}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.refundInfo.speed && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Processing Speed
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                                            {selectedOrder.refundInfo.speed}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.refundInfo.createdAt && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Initiated
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {formatDate(selectedOrder.refundInfo.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.refundInfo.processedAt && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Processed
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {formatDate(selectedOrder.refundInfo.processedAt)}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {selectedOrder.refundInfo.estimatedSettlement && (
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Expected Settlement
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                                                            <Typography component="span" sx={{ 
                                                                color: '#28a745', 
                                                                fontWeight: 600, 
                                                                fontSize: '0.75rem', 
                                                                ml: 1 
                                                            }}>
                                                                ({getEstimatedRefundDays(selectedOrder.refundInfo)})
                                                            </Typography>
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                            
                                            {selectedOrder.refundInfo.notes && (
                                                <Box mb={3}>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Note
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        backgroundColor: 'white', 
                                                        p: 2, 
                                                        borderRadius: 1,
                                                        borderLeft: '3px solid #74b9ff'
                                                    }}>
                                                        {selectedOrder.refundInfo.notes}
                                                    </Typography>
                                                </Box>
                                            )}
                                            
                                            {/* Refund Timeline */}
                                            {(selectedOrder.refundInfo.status === 'initiated' || selectedOrder.refundInfo.status === 'processed') && (
                                                <Box mt={4}>
                                                    <Typography variant="subtitle1" fontWeight={600} mb={2}>
                                                        Refund Timeline
                                                    </Typography>
                                                    <Timeline position="alternate">
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="primary" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>
                                                                <Typography variant="body2" fontWeight={600}>
                                                                    Refund Initiated
                                                                </Typography>
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
                                                                    <Typography variant="body2" fontWeight={600}>
                                                                        Refund Processed
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {formatDate(selectedOrder.refundInfo.processedAt)}
                                                                    </Typography>
                                                                </TimelineContent>
                                                            </TimelineItem>
                                                        )}
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot 
                                                                    color={selectedOrder.refundInfo.status === 'processed' ? 'info' : 'grey'} 
                                                                />
                                                            </TimelineSeparator>
                                                            <TimelineContent>
                                                                <Typography variant="body2" fontWeight={600}>
                                                                    Amount Credited to Account
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {selectedOrder.refundInfo.estimatedSettlement
                                                                        ? formatDate(selectedOrder.refundInfo.estimatedSettlement)
                                                                        : 'Pending'}
                                                                </Typography>
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Box>
                                            )}
                                        </Box>
                                    </CardContent>
                                )}
                                
                                {/* Items Info Section */}
                                <CardContent sx={{ p: 0 }}>
                                    <Typography variant="h6" fontWeight={600} mb={3} sx={{ color: 'primary.main' }}>
                                        Items Ordered ({selectedOrder.items?.length || 0})
                                    </Typography>
                                    <Box display="grid" gap={2}>
                                        {selectedOrder.items?.map((item, index) => (
                                            <Box 
                                                key={index} 
                                                p={2.5} 
                                                bgcolor="background.default" 
                                                border={1} 
                                                borderColor="divider" 
                                                borderRadius={2}
                                                sx={{
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        borderColor: 'primary.main',
                                                        boxShadow: 1
                                                    }
                                                }}
                                            >
                                                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                                    {item.name}
                                                </Typography>
                                                <Typography fontSize={13} color="text.secondary" mb={2}>
                                                    Product ID: {item.productId}
                                                </Typography>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" color="text.secondary">
                                                        ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
                                                    </Typography>
                                                    <Typography variant="h6" color="primary.main" fontWeight={700}>
                                                        ₹{(item.price * item.quantity)?.toLocaleString('en-IN')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default UserOrders;