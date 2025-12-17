import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Button, Typography, Modal, Box, CardContent, Snackbar, Alert, CircularProgress, Divider,
    Link, IconButton, Tooltip, Card, CardActions, CardMedia, useMediaQuery, useTheme
} from '@mui/material';
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axiosInstance from '../commonComponents/AxiosInstance';

// ================= STATUS COLOR HELPERS =================
const statusColor = status => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'delivered': return 'success';
        case 'refunded': return 'info';
        case 'processing': return 'info';
        case 'shipped': return 'secondary';
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
    status === 'initiated' ? 'warning' : 'default'
);

// ================= LABEL HELPERS =================
function paymentStatusLabel(status) {
    if (!status) return 'Unknown';
    if (status === 'captured') return 'Paid';
    if (status === 'failed') return 'Failed';
    if (status === 'authorized') return 'Authorized';
    if (status === 'created') return 'Payment Initiated';
    if (status === 'refunded') return 'Refunded';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function refundStatusLabel(refundInfo) {
    if (!refundInfo) return 'No Refund';
    if (!refundInfo.refundId && refundInfo.status === 'none') return 'No Refund';
    if (!refundInfo.refundId) return 'No Refund';

    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
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

// ================= IMAGE HELPER =================
const getProductImage = (item) => {
    const BASE_URL = 'https://backend.chauhansonsjewellers.com';
    
    // Helper function to prepend base URL if needed
    const getFullImageUrl = (url) => {
        if (!url) return null;
        
        // If URL already has http/https, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If URL starts with /, prepend base URL
        if (url.startsWith('/')) {
            return `${BASE_URL}${url}`;
        }
        
        // If it's just a filename, prepend base URL with uploads path
        return `${BASE_URL}/uploads/${url}`;
    };

    // 1. Check if product has media array (populated product)
    if (item.productId?.media?.length > 0) {
        const imageMedia = item.productId.media.find(m => m.type === "image");
        const url = getFullImageUrl(imageMedia?.url);
        if (url) return url;
    }
    
    // 2. Check if product has media array
    if (item.product?.media?.length > 0) {
        const imageMedia = item.product.media.find(m => m.type === "image");
        const url = getFullImageUrl(imageMedia?.url);
        if (url) return url;
    }
    
    // 3. Check if we have image from API (could be filename or path)
    if (item.image) {
        const url = getFullImageUrl(item.image);
        if (url) return url;
    }
    
    // 4. Default placeholder
    return "https://via.placeholder.com/300x200?text=No+Image";
};

// ================= GET PRODUCT ID =================
const getProductId = (item) => {
    // Try to get product ID from different possible locations
    return item.productId?._id || 
           item.product?._id || 
           item.productId || 
           null;
};

// ================= GET PRODUCT NAME =================
const getProductName = (item) => {
    return item.productId?.name || 
           item.product?.name || 
           item.name || 
           'Unknown Product';
};

// ================= GET PRODUCT PRICE =================
const getProductPrice = (item) => {
    // Try to get price from different possible locations
    return item.price || 
           item.productId?.consumer_price || 
           item.product?.consumer_price || 
           0;
};

// ===================== MAIN COMPONENT =====================
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Changed: start with false
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [snackbar, setSnackbar] = useState({ 
        open: false, message: '', severity: 'info' 
    });

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md (900px) से छोटे स्क्रीन पर मोबाइल UI
    
    // मिला userData को localStorage से
    const getUserData = () => {
        try {
            const userDataStr = localStorage.getItem('userData');
            if (!userDataStr) return null;
            return JSON.parse(userDataStr);
        } catch (error) {
            console.error('Error parsing userData:', error);
            return null;
        }
    };
    
    const userData = getUserData();
    const userId = userData?.id;
    const userEmail = userData?.email;

    // ================= AUTH CHECK =================
    useEffect(() => {
        // पहले check करें कि userData है या नहीं
        if (!userData || !userData.id) {
            console.log('No userData found, redirecting to login');
            navigate('/login');
            return;
        }
        
        console.log('User authenticated:', userData.id);
        setIsAuthenticated(true);
    }, [navigate, userData]); // Add userData as dependency

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

    // ================= MAIN FETCH ORDERS =================
    const fetchOrders = useCallback(async () => {
        if (!userId) {
            console.log('No userId, skipping fetchOrders');
            return;
        }

        setLoading(true);
        try {
            let userOrders = [];

            try {
                const response = await axiosInstance.get(`/api/orders/${userId}`);
                userOrders = response.data.orders || [];
                console.log('Fetched orders for user:', userOrders.length);
            } catch (error) { 
                console.error('Error fetching user orders:', error);
            }

            if (userOrders.length === 0 && userEmail) {
                try {
                    const emailResp = await axiosInstance.get(`/api/orders/email/${encodeURIComponent(userEmail)}`);
                    userOrders = emailResp.data.orders || [];
                    console.log('Fetched orders by email:', userOrders.length);
                } catch (error) {
                    console.error('Error fetching email orders:', error);
                }
            }

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

            const sorted = ordersWithStatus.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sorted);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [userId, userEmail, fetchLivePaymentStatus, fetchRefundStatus]);

    // ================= SILENT BACKGROUND ORDER UPDATES =================
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

    // ================= INITIAL PAGE LOAD =================
    useEffect(() => {
        if (!isAuthenticated) {
            console.log('Not authenticated yet, skipping order fetch');
            return;
        }
        
        if (!userId || !userEmail) {
            console.log('Missing userId or userEmail');
            return;
        }

        console.log('Fetching orders for authenticated user:', userId);

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
    }, [isAuthenticated, userId, userEmail, checkAndAssociateGuestOrders, fetchOrders, fetchOrdersSilently]);

    // ================= OPEN ORDER DETAILS =================
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

    // ================= NAVIGATE TO PRODUCT =================
    const navigateToProduct = (productId) => {
        if (productId) {
            navigate(`/singleProduct/${productId}`);
            if (showModal) {
                closeOrderDetails();
            }
        }
    };

    // ====================== PAGE UI ======================
    if (!isAuthenticated) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Checking authentication...</Typography>
            </Box>
        );
    }

    // ================= MOBILE ORDER CARD COMPONENT =================
    const MobileOrderCard = ({ order, index }) => {
        // पहला प्रोडक्ट लें
        const firstItem = order.items?.[0];
        const productId = firstItem ? getProductId(firstItem) : null;
        const productName = firstItem ? getProductName(firstItem) : 'Product';
        const imgSrc = firstItem ? getProductImage(firstItem) : "https://via.placeholder.com/300x200?text=No+Image";
        
        return (
            <Card 
                key={order._id} 
                sx={{ 
                    mb: 3, 
                    borderRadius: 2, 
                    boxShadow: 3,
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                }}
            >
                {/* PRODUCT IMAGE - FULL WIDTH */}
                <Box 
                    sx={{ 
                        position: 'relative',
                        height: 200,
                        backgroundColor: '#f5f5f5',
                        cursor: productId ? 'pointer' : 'default'
                    }}
                    onClick={() => productId && navigateToProduct(productId)}
                >
                    <Box
                        component="img"
                        src={imgSrc}
                        alt={productName}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    
                    {/* ORDER STATUS BADGE OVERLAY */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <Chip
                            label={order.status}
                            color={statusColor(order.status)}
                            size="small"
                            sx={{ 
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: 24 
                            }}
                        />
                    </Box>
                    
                    {/* ITEMS COUNT OVERLAY */}
                    {order.items?.length > 1 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                backdropFilter: 'blur(4px)',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}
                        >
                            +{order.items.length - 1} more items
                        </Box>
                    )}
                </Box>

                <CardContent sx={{ p: 2.5 }}>
                    {/* ORDER HEADER */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ color: 'primary.main' }}>
                            Order #{order._id?.slice(-8)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatDate(order.createdAt)}
                        </Typography>
                    </Box>

                    {/* VERTICAL STATUS SECTION - Payment, Total, Refund ऊपर-नीचे */}
                    <Box sx={{ 
                        mb: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                    }}>
                        {/* PAYMENT STATUS */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1,
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                Payment Status
                            </Typography>
                            <Chip
                                label={paymentStatusLabel(order.paymentInfo?.status)}
                                color={paymentColor(order.paymentInfo?.status)}
                                size="small"
                                sx={{ fontWeight: 600, minWidth: 80 }}
                            />
                        </Box>
                        
                        {/* TOTAL AMOUNT */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1,
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                Total Amount
                            </Typography>
                            <Typography variant="h6" fontWeight={700} sx={{ color: 'primary.main' }}>
                                ₹{order.totalAmount?.toLocaleString('en-IN')}
                            </Typography>
                        </Box>
                        
                        {/* REFUND STATUS */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                Refund Status
                            </Typography>
                            <Chip
                                label={refundStatusLabel(order.refundInfo)}
                                color={refundColor(order.refundInfo?.status)}
                                size="small"
                                sx={{ fontWeight: 600, minWidth: 80 }}
                            />
                        </Box>
                    </Box>

                    {/* PRODUCTS SUMMARY */}
                    <Box sx={{ mb: 2.5 }}>
                        <Typography variant="subtitle2" fontWeight={600} color="text.white" gutterBottom>
                            Products in this order:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {order.items?.slice(0, 3).map((item, idx) => {
                                const itemProductId = getProductId(item);
                                const itemProductName = getProductName(item);
                                
                                return (
                                    <Box 
                                        key={idx}
                                        sx={{ 
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 1,
                                            borderRadius: 1,
                                            backgroundColor: idx === 0 ? 'white' : 'transparent',
                                            cursor: itemProductId ? 'pointer' : 'default'
                                        }}
                                        onClick={() => itemProductId && navigateToProduct(itemProductId)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Typography variant="body2" fontWeight={500}>
                                                {idx + 1}.
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: idx === 0 ? 600 : 400,
                                                    color: itemProductId ? 'primary.main' : 'text.primary'
                                                }}
                                            >
                                                {itemProductName}
                                            </Typography>
                                        </Box>
                                        {/* <Typography variant="body2" color="text.secondary">
                                            Qty: {item.quantity}
                                        </Typography> */}
                                    </Box>
                                );
                            })}
                            
                            {order.items?.length > 3 && (
                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 0.5 }}>
                                    ...and {order.items.length - 3} more products
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* ACTION BUTTON */}
                    <CardActions sx={{ p: 0 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => openOrderDetails(order)}
                            startIcon={<VisibilityIcon />}
                            size="large"
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            View Order Details
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight={600} 
                mb={isMobile ? 2 : 4} 
                sx={{ 
                    color: 'primary.main', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    px: isMobile ? 1 : 0
                }}
            >
                <ShoppingBagIcon fontSize={isMobile ? "medium" : "large"} />
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

            {/* MOBILE VIEW - CARDS */}
            {isMobile ? (
                <Box sx={{ px: isMobile ? 0.5 : 2 }}>
                    {/* LOADING STATE */}
                    {loading && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                            <CircularProgress />
                            <Typography sx={{ mt: 2 }}>Loading your orders...</Typography>
                        </Box>
                    )}

                    {/* NO ORDERS */}
                    {!loading && orders.length === 0 && (
                        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                No orders found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                You haven't placed any orders yet.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/allJewellery')}
                                fullWidth
                            >
                                Start Shopping
                            </Button>
                        </Card>
                    )}

                    {/* ORDERS LIST */}
                    {!loading && orders.length > 0 && orders.map((order, index) => (
                        <MobileOrderCard key={order._id} order={order} index={index} />
                    ))}
                </Box>
            ) : (
                /* DESKTOP VIEW - TABLE (UNCHANGED) */
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
                                        <CircularProgress />
                                        <Typography sx={{ mt: 2 }}>Loading your orders...</Typography>
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
                                            onClick={() => navigate('/allJewellery')}
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
                                        <Typography fontFamily="monospace" variant="body2">
                                            {order._id?.slice(-8)}
                                        </Typography>
                                    </TableCell>

                                    {/* PRODUCTS COLUMN */}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {order.items?.slice(0, 2).map((item, index) => {
                                                const productId = getProductId(item);
                                                const productName = getProductName(item);
                                                const imgSrc = getProductImage(item);
                                                const key = `${productId || item._id}-${index}`;

                                                return (
                                                    <Box 
                                                        key={key} 
                                                        sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: 1,
                                                            cursor: productId ? 'pointer' : 'default',
                                                            '&:hover': productId ? { 
                                                                backgroundColor: 'action.hover',
                                                                borderRadius: 1,
                                                                p: 0.5 
                                                            } : {}
                                                        }}
                                                        onClick={() => productId && navigateToProduct(productId)}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={imgSrc}
                                                            alt={productName}
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 1,
                                                                objectFit: 'cover',
                                                                border: '1px solid #ddd'
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography 
                                                                noWrap 
                                                                sx={{ 
                                                                    maxWidth: 150,
                                                                    color: productId ? 'primary.main' : 'text.primary',
                                                                    fontWeight: productId ? 500 : 400,
                                                                    textDecoration: productId ? 'underline' : 'none'
                                                                }}
                                                            >
                                                                {productName} 
                                                            </Typography>
                                                            {/* <Typography variant="caption" color="text.secondary">
                                                                Qty: {item.quantity}
                                                            </Typography> */}
                                                        </Box>
                                                        {productId && (
                                                            <Tooltip title="View Product">
                                                                <VisibilityIcon 
                                                                    fontSize="small" 
                                                                    sx={{ 
                                                                        ml: 1, 
                                                                        color: 'primary.main',
                                                                        opacity: 0.7 
                                                                    }} 
                                                                />
                                                            </Tooltip>
                                                        )}
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
                                            startIcon={<VisibilityIcon />}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* ===================== ORDER DETAILS MODAL (MOBILE OPTIMIZED) ===================== */}
            <Modal
                open={showModal}
                onClose={closeOrderDetails}
                sx={{
                    display: 'flex',
                    alignItems: isMobile ? 'flex-end' : 'center',
                    justifyContent: 'center',
                    p: isMobile ? 0 : 2
                }}
            >
                <Box sx={{
                    maxWidth: isMobile ? '100%' : 900,
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: isMobile ? '20px 20px 0 0' : 3,
                    overflow: 'hidden',
                    maxHeight: isMobile ? '90vh' : '90vh',
                    height: isMobile ? '90vh' : 'auto',
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
                                p: isMobile ? 2 : 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'sticky',
                                top: 0,
                                zIndex: 10
                            }}
                        >
                            <Box>
                                <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
                                    Order Details
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    #{selectedOrder._id?.slice(-8)} • {formatDate(selectedOrder.createdAt)}
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
                                    '&:hover': { backgroundColor: 'rgba(184,10,10,0.15' }
                                }}
                            >
                                <Typography sx={{ fontSize: isMobile ? 24 : 28 }}>×</Typography>
                            </Button>
                        </Box>
                    )}

                    {/* MODAL CONTENT (SCROLLABLE) */}
                    <Box sx={{ 
                        overflowY: 'auto', 
                        flex: 1, 
                        p: isMobile ? 2 : 3,
                        '&::-webkit-scrollbar': {
                            width: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ccc',
                            borderRadius: '3px'
                        }
                    }}>
                        {selectedOrder && (
                            <>
                                {/* ORDER INFORMATION - MOBILE FRIENDLY */}
                                <CardContent sx={{ p: 0, mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ color: 'primary.main' }}>
                                        Order Information
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Status
                                            </Typography>
                                            <Chip
                                                label={selectedOrder.status}
                                                color={statusColor(selectedOrder.status)}
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Order Date
                                            </Typography>
                                            <Typography variant="body2" fontWeight={500} textAlign="right">
                                                {formatDate(selectedOrder.createdAt)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Total Amount
                                            </Typography>
                                            <Typography variant="body1" fontWeight={700} sx={{ color: 'primary.main' }}>
                                                ₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Customer
                                            </Typography>
                                            <Typography variant="body2" fontWeight={500}>
                                                {selectedOrder.userName || 'N/A'} • {selectedOrder.phone || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={500}>
                                                {selectedOrder.userEmail || 'N/A'}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Delivery Address
                                            </Typography>
                                            <Typography variant="body2" fontWeight={500}>
                                                {selectedOrder.address || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* CANCELLATION DETAILS */}
                                    {selectedOrder.cancelReason && (
                                        <Box mt={2} p={2} bgcolor="#fff3cd" borderRadius={2} borderLeft="4px solid #ffc107">
                                            <Typography variant="subtitle2" fontWeight={600} color="warning.dark">
                                                Cancellation Details
                                            </Typography>
                                            <Typography variant="caption" display="block" mt={0.5}>
                                                <strong>Reason:</strong> {selectedOrder.cancelReason}
                                            </Typography>
                                            {selectedOrder.cancelledAt && (
                                                <Typography variant="caption">
                                                    <strong>Cancelled On:</strong> {formatDate(selectedOrder.cancelledAt)}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </CardContent>

                                {/* PAYMENT INFORMATION */}
                                <CardContent sx={{ p: 0, mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ color: 'primary.main' }}>
                                        Payment Information
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Payment Status
                                            </Typography>
                                            <Chip
                                                label={paymentStatusLabel(selectedOrder.paymentInfo?.status)}
                                                color={paymentColor(selectedOrder.paymentInfo?.status)}
                                                size={isMobile ? "small" : "medium"}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Box>

                                        {selectedOrder.paymentInfo?.paymentId && (
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Payment ID
                                                </Typography>
                                                <Typography variant="caption" sx={{ 
                                                    backgroundColor: 'grey.100', 
                                                    p: 1, 
                                                    mt: 0.5, 
                                                    borderRadius: 1, 
                                                    fontFamily: 'monospace',
                                                    display: 'block',
                                                    wordBreak: 'break-all'
                                                }}>
                                                    {selectedOrder.paymentInfo.paymentId}
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedOrder.paymentInfo?.updatedAt && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Last Updated
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {formatDate(selectedOrder.paymentInfo.updatedAt)}
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedOrder.paymentInfo?.method && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Payment Method
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                                    {selectedOrder.paymentInfo.method}
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedOrder.paymentInfo?.amount && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Amount Paid
                                                </Typography>
                                                <Typography variant="body1" fontWeight={700} sx={{ color: 'primary.main' }}>
                                                    ₹{selectedOrder.paymentInfo.amount?.toLocaleString('en-IN')}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>

                                {/* REFUND INFORMATION - MOBILE FRIENDLY */}
                                {selectedOrder.refundInfo && selectedOrder.refundInfo.status !== 'none' && (
                                    <CardContent sx={{ p: 0, mb: 3 }}>
                                        <Box bgcolor="#e8f4fd" borderRadius={2} p={2} border="1px solid #74b9ff">
                                            <Typography variant="subtitle1" fontWeight={600} mb={1} sx={{ color: 'primary.main' }}>
                                                Refund Information
                                            </Typography>

                                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2, display: 'block' }}>
                                                Refund takes 5–7 working days after processing.
                                            </Typography>

                                            {/* Refund Amount + Status */}
                                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                                <Chip
                                                    label={refundStatusLabel(selectedOrder.refundInfo)}
                                                    color={refundColor(selectedOrder.refundInfo.status)}
                                                    size="small"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                                {selectedOrder.refundInfo.amount > 0 && (
                                                    <Typography variant="h6" fontWeight={700} sx={{ color: 'primary.main' }}>
                                                        ₹{selectedOrder.refundInfo.amount?.toLocaleString('en-IN')}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Refund Details */}
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                {selectedOrder.refundInfo.refundId && (
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Refund ID
                                                        </Typography>
                                                        <Typography variant="caption" fontFamily="monospace" fontWeight={500} display="block" sx={{ wordBreak: 'break-all' }}>
                                                            {selectedOrder.refundInfo.refundId}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {selectedOrder.refundInfo.reason && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Reason
                                                        </Typography>
                                                        <Typography variant="caption" fontWeight={500} textAlign="right">
                                                            {selectedOrder.refundInfo.reason}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {selectedOrder.refundInfo.createdAt && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Initiated
                                                        </Typography>
                                                        <Typography variant="caption" fontWeight={500}>
                                                            {formatDate(selectedOrder.refundInfo.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {selectedOrder.refundInfo.estimatedSettlement && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Expected
                                                        </Typography>
                                                        <Typography variant="caption" fontWeight={500} textAlign="right">
                                                            {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                                                            <Typography component="span" sx={{ ml: 0.5, color: 'green', fontWeight: 600, display: 'block' }}>
                                                                ({getEstimatedRefundDays(selectedOrder.refundInfo)})
                                                            </Typography>
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                )}

                                {/* ITEMS ORDERED - MOBILE FRIENDLY */}
                                <CardContent sx={{ p: 0, mb: 2 }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ color: 'primary.main' }}>
                                        Items Ordered ({selectedOrder.items?.length || 0})
                                    </Typography>

                                    <Box display="flex" flexDirection="column" gap={1.5}>
                                        {selectedOrder.items?.map((item, index) => {
                                            const productId = getProductId(item);
                                            const productName = getProductName(item);
                                            const productPrice = getProductPrice(item);
                                            const imgSrc = getProductImage(item);
                                            const key = `${productId || item._id}-${index}`;

                                            return (
                                                <Box
                                                    key={key}
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1.5,
                                                        p: 1.5,
                                                        bgcolor: 'background.default',
                                                        border: 1,
                                                        borderColor: 'divider',
                                                        borderRadius: 1.5,
                                                        transition: '0.2s',
                                                        '&:hover': { 
                                                            borderColor: productId ? 'primary.main' : 'divider', 
                                                            cursor: productId ? 'pointer' : 'default'
                                                        }
                                                    }}
                                                    onClick={() => productId && navigateToProduct(productId)}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={imgSrc}
                                                        alt={productName}
                                                        onError={(e) => {
                                                            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                                                        }}
                                                        sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: 1,
                                                            objectFit: 'cover',
                                                            border: '1px solid #ddd',
                                                            flexShrink: 0
                                                        }}
                                                    />

                                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                                        <Typography 
                                                            variant="body2" 
                                                            fontWeight={600} 
                                                            mb={0.5}
                                                            sx={{
                                                                color: productId ? 'primary.main' : 'text.primary',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}
                                                        >
                                                            {productName}
                                                        </Typography>
                                                        
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            {/* <Typography variant="caption" color="text.secondary">
                                                                Qty: {item.quantity} × ₹{productPrice?.toLocaleString('en-IN')}
                                                            </Typography> */}
                                                            <Typography variant="body2" fontWeight={600}>
                                                                ₹{(item.quantity * productPrice)?.toLocaleString('en-IN')}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        {productId && (
                                                            <Button
                                                                variant="text"
                                                                size="small"
                                                                sx={{ mt: 0.5, p: 0, minWidth: 'auto' }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    navigateToProduct(productId);
                                                                }}
                                                            >
                                                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    View Product <VisibilityIcon sx={{ ml: 0.5, fontSize: 14 }} />
                                                                </Typography>
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>

                                    {/* ORDER TOTAL SUMMARY */}
                                    <Box sx={{ mt: 3, mb : 5, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                                        <Typography variant="subtitle1" fontWeight={600} mb={1.5} sx={{ color: 'primary.main' }}>
                                            Order Summary
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Items Total</Typography>
                                            <Typography variant="body2">₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Shipping</Typography>
                                            <Typography variant="body2">Free</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Tax</Typography>
                                            <Typography variant="body2">Included</Typography>
                                        </Box>
                                        <Divider sx={{ my: 1.5 }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="subtitle1" fontWeight={700}>Total Amount</Typography>
                                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'primary.main' }}>
                                                ₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}
                                            </Typography>
                                        </Box>
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