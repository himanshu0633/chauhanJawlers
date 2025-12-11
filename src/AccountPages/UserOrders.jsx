import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Button, Typography, Modal, Box, CardContent, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';

// ================= STATUS COLOR HELPERS =================
const statusColor = status => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'delivered': return 'success';
        default: return 'default';
    }
};

const paymentColor = status => (
    status === 'captured' ? 'success' :
    status === 'failed' ? 'error' :
    status === 'refunded' ? 'info' : 'default'
);

const refundColor = status => (
    status === 'processed' ? 'info' :
    status === 'failed' ? 'error' :
    status === 'pending' ? 'warning' : 'default'
);

// ================= LABEL HELPERS =================
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

// =============== ESTIMATED REFUND DAYS =================
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

// ===================== MAIN COMPONENT =====================
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [snackbar, setSnackbar] = useState({ 
        open: false, message: '', severity: 'info' 
    });

    // NEW IMAGE STATE
    const [imageLoading, setImageLoading] = useState({});

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData?._id;
    const userEmail = userData?.email;

    // ================= AUTH CHECK =================
    useEffect(() => {
        if (!userData._id) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate, userData._id]);

    // ================= FETCH PAYMENT STATUS =================
    const fetchLivePaymentStatus = useCallback(async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/paymentStatus/${orderId}`);
            return response.data.paymentInfo;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return null;
        }
    }, []);

    // ================= FETCH REFUND STATUS =================
    const fetchRefundStatus = useCallback(async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/orders/${orderId}/refund-status`);
            return response.data.refundInfo;
        } catch (error) {
            console.error('Error fetching refund status:', error);
            return null;
        }
    }, []);

    // ================= FETCH PRODUCT IMAGES =================
const fetchProductImages = useCallback(async (productId) => {
    try {
        const response = await axiosInstance.get(`/api/products/${productId}`);
        const mediaItem = response.data.product?.media?.find(m => m.type === "image");
        return mediaItem?.url || null;
    } catch (error) {
        console.error("Error fetching product image:", error);
        return null;
    }
}, []);


    // ================= UPDATED getProductImage =================
  const getProductImage = (item) => {
    // 1: If fetchOrders added item.image from API
    if (item.image) return item.image;

    // 2: If product has media array returned in order.items
    if (item.media?.length > 0) {
        const mediaItem = item.media.find(m => m.type === "image");
        if (mediaItem?.url) return mediaItem.url;
    }

    // 3: If item.productId was populated and contains media
    if (item.productId?.media?.length > 0) {
        const mediaItem = item.productId.media.find(m => m.type === "image");
        if (mediaItem?.url) return mediaItem.url;
    }

    // 4: If backend API returned product.media[][0]
    if (item.product?.media?.length > 0) {
        const mediaItem = item.product.media.find(m => m.type === "image");
        if (mediaItem?.url) return mediaItem.url;
    }

    // 5: Default
    return "https://via.placeholder.com/80x80?text=No+Image";
};


    // ================= ASSOCIATE GUEST ORDERS =================
    const checkAndAssociateGuestOrders = useCallback(async () => {
        if (!userEmail || !userId) return;
        
        try {
            const response = await axiosInstance.post('/api/associateGuestOrders', {
                guestEmail: userEmail,
                userId: userId
            });

            if (response.data.success && response.data.associatedCount > 0) {
                setSnackbar({
                    open: true,
                    message: `${response.data.associatedCount} previous guest order(s) added`,
                    severity: 'success'
                });
                return true;
            }
        } catch (error) {
            console.error('Error associating guest orders:', error);
        }
        return false;
    }, [userEmail, userId]);

    // ================= MAIN FETCH ORDERS (UPDATED WITH IMAGES) =================
    const fetchOrders = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        try {
            let userOrders = [];

            try {
                const response = await axiosInstance.get(`/api/orders/${userId}`);
                userOrders = response.data.orders || [];
            } catch { /* empty */ }

            if (userOrders.length === 0 && userEmail) {
                try {
                    const emailResp = await axiosInstance.get(`/api/orders/email/${encodeURIComponent(userEmail)}`);
                    userOrders = emailResp.data.orders || [];
                } catch { /* empty */ }
            }

            const ordersWithStatus = await Promise.all(
                userOrders.map(async (order) => {
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    const refundInfo = await fetchRefundStatus(order._id);

                    // Fetch product images for each order item
                    const itemsWithImages = await Promise.all(
                        order.items.map(async (item) => {
                            const image = await fetchProductImages(item.productId);
                            return { ...item, image };
                        })
                    );

                    return {
                        ...order,
                        items: itemsWithImages,
                        paymentInfo: paymentInfo || order.paymentInfo,
                        refundInfo: refundInfo || order.refundInfo || { status: 'none' }
                    };
                })
            );

            const sorted = ordersWithStatus.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sorted);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [
        userId, userEmail, fetchLivePaymentStatus, fetchRefundStatus, fetchProductImages
    ]);
    // ============ SILENT BACKGROUND ORDER UPDATES ============
    const fetchOrdersSilently = useCallback(async () => {
        if (!userId) return;

        try {
            const response = await axiosInstance.get(`/api/orders/${userId}`);
            const userOrders = response.data.orders || [];

            const ordersWithStatus = await Promise.all(
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

            setOrders(prev => {
                const oldStr = JSON.stringify(prev);
                const newStr = JSON.stringify(ordersWithStatus);
                if (oldStr !== newStr) {
                    return ordersWithStatus.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                }
                return prev;
            });

        } catch (error) {
            console.error('Error fetching orders silently:', error);
        }
    }, [userId, fetchLivePaymentStatus, fetchRefundStatus]);

    // ============ INITIAL PAGE LOAD ============
    useEffect(() => {
        if (!userId || !userEmail) return;

        const load = async () => {
            const associated = await checkAndAssociateGuestOrders();
            await fetchOrders();

            if (associated) {
                setTimeout(() => fetchOrders(), 1500);
            }
        };

        load();
        const interval = setInterval(fetchOrdersSilently, 30000);

        return () => clearInterval(interval);
    }, [
        userId,
        userEmail,
        checkAndAssociateGuestOrders,
        fetchOrders,
        fetchOrdersSilently
    ]);

    // ============ OPEN ORDER DETAILS ============
    const openOrderDetails = useCallback(async (order) => {
        try {
            const paymentInfo = await fetchLivePaymentStatus(order._id);
            const refundInfo = await fetchRefundStatus(order._id);

            setSelectedOrder({
                ...order,
                paymentInfo: paymentInfo || order.paymentInfo,
                refundInfo: refundInfo || order.refundInfo || { status: 'none' }
            });
        } catch {
            setSelectedOrder(order);
        }
        setShowModal(true);
    }, [fetchLivePaymentStatus, fetchRefundStatus]);

    const closeOrderDetails = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleCloseSnackbar = () =>
        setSnackbar(prev => ({ ...prev, open: false }));

    // ====================== PAGE UI ======================
    if (isAuthenticated === null) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={600} mb={4} sx={{ color: 'primary.main' }}>
                My Orders
            </Typography>

            {/* SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* ORDERS TABLE */}
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.light' }}>
                            <TableCell sx={{ color: 'white' }}>#</TableCell>
                            <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Products</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white' }}>Order Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Payment Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Refund Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Total</TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {/* LOADING STATE */}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                                    <Typography>Loading your orders...</Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* NO ORDERS */}
                        {!loading && orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                                    <Typography>No orders found.</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={() => navigate('/shop')}
                                    >
                                        Start Shopping
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* ORDERS LIST */}
                        {!loading && orders.length > 0 && orders.map((order, rowIndex) => (
                            <TableRow key={order._id} hover>

                                <TableCell>{rowIndex + 1}</TableCell>

                                <TableCell>
                                    <Typography
                                        fontFamily="monospace"
                                        variant="body2"
                                    >
                                        {order._id?.slice(-8)}
                                    </Typography>
                                </TableCell>

                                {/* ==================== UPDATED PRODUCTS COLUMN ==================== */}
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {order.items?.slice(0, 2).map((item, index) => {
                                            const key = `${item.productId}-${index}`;
                                            const imgSrc = getProductImage(item);

                                            return (
                                                <Box
                                                    key={key}
                                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                                >
                                                    {/* IMAGE or LOADER */}
                                                    {!imageLoading[key] ? (
                                                        <Box
                                                            component="img"
                                                            src={imgSrc}
                                                            alt={item.name}
                                                            onLoad={() =>
                                                                setImageLoading(prev => ({ ...prev, [key]: false }))
                                                            }
                                                            onError={() =>
                                                                setImageLoading(prev => ({ ...prev, [key]: false }))
                                                            }
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 1,
                                                                objectFit: 'cover',
                                                                border: '1px solid #ddd'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: 1,
                                                                bgcolor: 'grey.200'
                                                            }}
                                                        >
                                                            <CircularProgress size={18} />
                                                        </Box>
                                                    )}

                                                    <Typography noWrap sx={{ maxWidth: 150 }}>
                                                        {item.name}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}

                                        {order.items?.length > 2 && (
                                            <Typography variant="caption" color="text.secondary">
                                                +{order.items.length - 2} more
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                {/* =============================================================== */}

                                <TableCell>{formatDate(order.createdAt)}</TableCell>

                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={statusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={paymentStatusLabel(order.paymentInfo?.status)}
                                        color={paymentColor(order.paymentInfo?.status)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={refundStatusLabel(order.refundInfo)}
                                        color={refundColor(order.refundInfo?.status)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600} sx={{ color: 'primary.main' }}>
                                        ₹{order.totalAmount?.toLocaleString('en-IN')}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        onClick={() => openOrderDetails(order)}
                                        size="small"
                                    >
                                        View Details
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* ===================== ORDER DETAILS MODAL ===================== */}
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
                    overflow: 'hidden',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 24
                }}>

                    {/* MODAL HEADER */}
                    {selectedOrder && (
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box>
                                <Typography variant="h5" fontWeight={600}>
                                    Order Details
                                </Typography>

                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    #{selectedOrder._id?.slice(-8)} • {formatDate(selectedOrder.createdAt)}
                                </Typography>
                            </Box>

                            <Button
                                variant="text"
                                color="inherit"
                                onClick={closeOrderDetails}
                                sx={{
                                    minWidth: 'auto',
                                    p: 1.2,
                                    borderRadius: '50%',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                                }}
                            >
                                <Typography sx={{ fontSize: 28 }}>×</Typography>
                            </Button>
                        </Box>
                    )}

                    {/* MODAL CONTENT */}
                    <Box sx={{ overflowY: 'auto', flex: 1, p: { xs: 2, md: 3 } }}>
                        {selectedOrder && (
                            <>

                                {/* ===================== ORDER INFORMATION ===================== */}
                                <CardContent sx={{ p: 0, mb: 4 }}>
                                    <Typography variant="h6" fontWeight={600} mb={3} sx={{ color: 'primary.main' }}>
                                        Order Information
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                                            gap: 3
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Status
                                            </Typography>
                                            <Typography fontWeight={500}>
                                                {selectedOrder.status}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Order Date
                                            </Typography>
                                            <Typography fontWeight={500}>
                                                {formatDate(selectedOrder.createdAt)}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Amount
                                            </Typography>
                                            <Typography fontWeight={700} sx={{ color: 'primary.main' }}>
                                                ₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone
                                            </Typography>
                                            <Typography fontWeight={500}>
                                                {selectedOrder.phone || 'N/A'}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ gridColumn: { md: 'span 2' } }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Delivery Address
                                            </Typography>
                                            <Typography fontWeight={500}>
                                                {selectedOrder.address || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* CANCELLATION DETAILS */}
                                    {selectedOrder.cancelReason && (
                                        <Box
                                            mt={3}
                                            p={2.5}
                                            bgcolor="#fff3cd"
                                            borderRadius={2}
                                            borderLeft="4px solid #ffc107"
                                        >
                                            <Typography variant="subtitle1" fontWeight={600} color="warning.dark">
                                                Cancellation Details
                                            </Typography>

                                            <Typography variant="body2" mt={1}>
                                                <strong>Reason:</strong> {selectedOrder.cancelReason}
                                            </Typography>

                                            {selectedOrder.cancelledAt && (
                                                <Typography variant="body2">
                                                    <strong>Cancelled On:</strong> {formatDate(selectedOrder.cancelledAt)}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </CardContent>

                                {/* ===================== PAYMENT INFORMATION ===================== */}
                                <CardContent sx={{ p: 0, mb: 4 }}>
                                    <Typography variant="h6" fontWeight={600} mb={3} sx={{ color: 'primary.main' }}>
                                        Payment Information
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                                            gap: 3
                                        }}
                                    >
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
                                                <Typography variant="body2" color="text.secondary">
                                                    Payment ID
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        backgroundColor: 'grey.100',
                                                        p: 1,
                                                        mt: 0.5,
                                                        borderRadius: 1,
                                                        fontFamily: 'monospace'
                                                    }}
                                                >
                                                    {selectedOrder.paymentInfo.paymentId}
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedOrder.paymentInfo?.updatedAt && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Last Updated
                                                </Typography>
                                                <Typography fontWeight={500}>
                                                    {formatDate(selectedOrder.paymentInfo.updatedAt)}
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedOrder.paymentInfo?.method && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Payment Method
                                                </Typography>
                                                <Typography
                                                    fontWeight={500}
                                                    sx={{ textTransform: 'capitalize' }}
                                                >
                                                    {selectedOrder.paymentInfo.method}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>

                                {/* ===================== REFUND INFORMATION ===================== */}
                                {selectedOrder.refundInfo &&
                                    selectedOrder.refundInfo.status !== 'none' && (
                                        <CardContent sx={{ p: 0, mb: 4 }}>
                                            <Box
                                                bgcolor="#e8f4fd"
                                                borderRadius={3}
                                                p={3}
                                                border="1px solid #74b9ff"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={600}
                                                    mb={1}
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    Refund Information
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontStyle: 'italic', mb: 2 }}
                                                >
                                                    Refund takes 5–7 working days after processing.
                                                </Typography>

                                                {/* Refund Amount + Status */}
                                                <Box display="flex" alignItems="center" mb={3}>
                                                    <Chip
                                                        label={refundStatusLabel(selectedOrder.refundInfo)}
                                                        color={refundColor(selectedOrder.refundInfo.status)}
                                                        sx={{ mr: 2, fontWeight: 600 }}
                                                    />

                                                    <Typography
                                                        variant="h4"
                                                        fontWeight={700}
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        ₹{selectedOrder.refundInfo.amount?.toLocaleString('en-IN')}
                                                    </Typography>
                                                </Box>

                                                {/* Refund Meta Information */}
                                                <Box
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                                        gap: 2,
                                                        mb: 3
                                                    }}
                                                >
                                                    {selectedOrder.refundInfo.refundId && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Refund ID
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                fontFamily="monospace"
                                                                fontWeight={500}
                                                            >
                                                                {selectedOrder.refundInfo.refundId}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {selectedOrder.refundInfo.reason && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Refund Reason
                                                            </Typography>
                                                            <Typography fontWeight={500}>
                                                                {selectedOrder.refundInfo.reason}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {selectedOrder.refundInfo.speed && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Processing Speed
                                                            </Typography>
                                                            <Typography fontWeight={500}>
                                                                {selectedOrder.refundInfo.speed}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {selectedOrder.refundInfo.createdAt && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Initiated
                                                            </Typography>
                                                            <Typography fontWeight={500}>
                                                                {formatDate(selectedOrder.refundInfo.createdAt)}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {selectedOrder.refundInfo.processedAt && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Processed
                                                            </Typography>
                                                            <Typography fontWeight={500}>
                                                                {formatDate(selectedOrder.refundInfo.processedAt)}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {selectedOrder.refundInfo.estimatedSettlement && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Expected Settlement
                                                            </Typography>
                                                            <Typography fontWeight={500}>
                                                                {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                                                                <Typography component="span" sx={{ ml: 1, color: 'green', fontWeight: 600 }}>
                                                                    ({getEstimatedRefundDays(selectedOrder.refundInfo)})
                                                                </Typography>
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>

                                                {/* Refund Notes */}
                                                {selectedOrder.refundInfo.notes && (
                                                    <Box mb={2}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Note
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                background: 'white',
                                                                p: 2,
                                                                borderRadius: 1,
                                                                borderLeft: '3px solid #74b9ff'
                                                            }}
                                                        >
                                                            {selectedOrder.refundInfo.notes}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {/* Refund Timeline */}
                                                {(selectedOrder.refundInfo.status === 'initiated' ||
                                                    selectedOrder.refundInfo.status === 'processed') && (
                                                    <Box mt={3}>
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
                                                                    <Typography fontWeight={600}>Refund Initiated</Typography>
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
                                                                        <Typography fontWeight={600}>Refund Processed</Typography>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            {formatDate(selectedOrder.refundInfo.processedAt)}
                                                                        </Typography>
                                                                    </TimelineContent>
                                                                </TimelineItem>
                                                            )}

                                                            <TimelineItem>
                                                                <TimelineSeparator>
                                                                    <TimelineDot color="info" />
                                                                </TimelineSeparator>
                                                                <TimelineContent>
                                                                    <Typography fontWeight={600}>
                                                                        Amount Credited to Account
                                                                    </Typography>
                                                                    <Typography variant="caption">
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
                                {/* ===================== ITEMS ORDERED ===================== */}
                                <CardContent sx={{ p: 0, mb: 2 }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        mb={3}
                                        sx={{ color: 'primary.main' }}
                                    >
                                        Items Ordered ({selectedOrder.items?.length || 0})
                                    </Typography>

                                    <Box display="grid" gap={2}>
                                        {selectedOrder.items?.map((item, index) => {
                                            const key = `${item.productId}-${index}`;
                                            const imgSrc = getProductImage(item);

                                            return (
                                                <Box
                                                    key={key}
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 2,
                                                        p: 2.5,
                                                        bgcolor: 'background.default',
                                                        border: 1,
                                                        borderColor: 'divider',
                                                        borderRadius: 2,
                                                        transition: '0.2s',
                                                        '&:hover': {
                                                            borderColor: 'primary.main',
                                                            boxShadow: 1
                                                        }
                                                    }}
                                                >
                                                    {/* IMAGE + LOADER */}
                                                    {!imageLoading[key] ? (
                                                        <Box
                                                            component="img"
                                                            src={imgSrc}
                                                            alt={item.name}
                                                            onLoad={() =>
                                                                setImageLoading(prev => ({ ...prev, [key]: false }))
                                                            }
                                                            onError={() =>
                                                                setImageLoading(prev => ({ ...prev, [key]: false }))
                                                            }
                                                            sx={{
                                                                width: 80,
                                                                height: 80,
                                                                borderRadius: 1.5,
                                                                objectFit: 'cover',
                                                                border: '1px solid #ddd',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: 80,
                                                                height: 80,
                                                                borderRadius: 1.5,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                bgcolor: 'grey.200',
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            <CircularProgress size={24} />
                                                        </Box>
                                                    )}

                                                    {/* PRODUCT DETAILS */}
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                                                            {item.name}
                                                        </Typography>

                                                        <Typography
                                                            fontSize={13}
                                                            color="text.secondary"
                                                            mb={1.5}
                                                        >
                                                            Product ID: {item.productId}
                                                        </Typography>

                                                        <Box
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            alignItems="flex-end"
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
                                                            </Typography>

                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={700}
                                                                sx={{ color: 'primary.main' }}
                                                            >
                                                                ₹{(item.price * item.quantity)?.toLocaleString('en-IN')}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserOrders;
