import React, { useEffect, useState } from 'react';
import axiosInstance from '../../commonComponents/AxiosInstance';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  TablePagination,
  TextField,
  DialogTitle,
  Alert,
  AlertTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  minWidth: '80px',
  backgroundColor:
    status === 'delivered' ? theme.palette.success.light :
    status === 'pending' ? theme.palette.warning.light :
    status === 'cancelled' ? theme.palette.error.light :
    status === 'refunded' ? theme.palette.info.light :
    status === 'captured' || status === 'paid' ? theme.palette.success.light :
    status === 'authorized' ? theme.palette.info.light :
    status === 'failed' ? theme.palette.error.light :
    status === 'processed' ? theme.palette.success.light :
    status === 'created' ? theme.palette.grey.light :
    theme.palette.grey.light,
  color:
    status === 'delivered' ? theme.palette.success.dark :
    status === 'pending' ? theme.palette.warning.dark :
    status === 'cancelled' ? theme.palette.error.dark :
    status === 'refunded' ? theme.palette.info.dark :
    status === 'captured' || status === 'paid' ? theme.palette.success.dark :
    status === 'authorized' ? theme.palette.info.dark :
    status === 'failed' ? theme.palette.error.dark :
    status === 'processed' ? theme.palette.success.dark :
    status === 'created' ? theme.palette.grey.dark :
    theme.palette.grey.dark,
}));

const statusOptions = ['Pending', 'Delivered', 'Cancelled'];

// Base URL for images
const BASE_URL = 'https://backend.chauhansonsjewellers.com';

// Helper function to get complete image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/60?text=No+Image";
  
  // If already has http or https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove leading slash if present to avoid double slash
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Return full URL
  return `${BASE_URL}/${cleanPath}`;
};

const OrderJewel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchDataSilently, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataSilently = async () => {
    setRefreshing(true);
    try {
      const response = await axiosInstance.get('/api/orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching data silently:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleViewOrder = async (order) => {
    try {
      const paymentResponse = await axiosInstance.get(`/api/paymentStatus/${order._id}`);
      const updatedOrder = {
        ...order,
        paymentInfo: paymentResponse.data.paymentInfo,
        refundInfo: paymentResponse.data.refundInfo
      };
      setSelectedOrder(updatedOrder);
    } catch (error) {
      console.error("Error fetching latest payment status:", error);
      setSelectedOrder(order);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const currentOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const canCancelOrder = (order) =>
    order.status !== 'Cancelled' && order.status !== 'Delivered';

  const getPaymentStatusLabel = (paymentInfo) => {
    if (!paymentInfo || !paymentInfo.status) return 'Unknown';
    switch (paymentInfo.status.toLowerCase()) {
      case 'captured': return 'Paid';
      case 'authorized': return 'Authorized';
      case 'failed': return 'Failed';
      case 'created': return 'Created';
      default: return paymentInfo.status;
    }
  };

  const getRefundStatusText = (refundInfo) => {
    if (!refundInfo) return 'No Refund';
    if (!refundInfo.refundId && refundInfo.status === 'none') return 'No Refund';
    if (!refundInfo.refundId) return 'No Refund';

    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    if (status === 'initiated') return 'Refund Initiated';
    return `Refund ${status}`;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus === 'Cancelled') {
      setOrderToCancel(orderId);
      setShowCancelDialog(true);
      return;
    }

    setUpdatingStatusId(orderId);
    try {
      await axiosInstance.put(`/api/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev =>
        prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      alert("Order status updated");
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    setUpdatingStatusId(orderToCancel);
    try {
      const response = await axiosInstance.put(`/api/orders/${orderToCancel}/status`, {
        status: 'Cancelled',
        cancelReason: cancelReason || 'Cancelled by admin'
      });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderToCancel
            ? {
                ...order,
                status: 'Cancelled',
                cancelReason: cancelReason || 'Cancelled by admin',
                cancelledAt: new Date(),
                refundInfo: response.data.refundDetails || response.data.order?.refundInfo
              }
            : order
        )
      );
    } finally {
      setUpdatingStatusId(null);
      setShowCancelDialog(false);
      setOrderToCancel(null);
      setCancelReason('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const processManualRefund = async (orderId, amount) => {
    if (!window.confirm(`Initiate refund of ₹${amount} for this order?`)) return;
    
    try {
      setUpdatingStatusId(orderId);
      const response = await axiosInstance.post(`/api/orders/${orderId}/refund`, {
        amount: amount
      });
      
      if (response.data.success) {
        alert("Refund initiated successfully!");
        // Update the order with refund info
        setOrders(prev =>
          prev.map(o => 
            o._id === orderId 
              ? { ...o, refundInfo: response.data.refundInfo } 
              : o
          )
        );
        // Refresh the order details if open
        if (selectedOrder && selectedOrder._id === orderId) {
          const updatedOrder = { ...selectedOrder, refundInfo: response.data.refundInfo };
          setSelectedOrder(updatedOrder);
        }
      }
    } catch (error) {
      console.error("Refund failed", error);
      alert("Refund failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Orders Management
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {refreshing && <CircularProgress size={20} />}
            <Button variant="outlined" onClick={fetchData} disabled={loading}>
              Refresh Orders
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Refund Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentOrders.map((order) => {
                  const items = order.items || [];

                  return items.map((item, index) => {
                     const product = item.productId; // populated product
                     const imagePath = product?.media?.find(m => m.type === "image")?.url;
                     const imageUrl = getImageUrl(imagePath);

                     return (
                       <TableRow key={`${order._id}-${item.productId}-${index}`} hover>

                         {/* ================== IMAGE =================== */}
                         <TableCell>
                           <Box
                             component="img"
                             src={imageUrl}
                             alt={product?.name}
                             sx={{
                               width: 50,
                               height: 50,
                               borderRadius: 1,
                               objectFit: 'cover',
                               border: '1px solid #ddd'
                             }}
                             onError={(e) => {
                               e.target.onerror = null;
                               e.target.src = "https://via.placeholder.com/60?text=No+Image";
                             }}
                           />
                         </TableCell>

                         {/* ================== NAME =================== */}
                         <TableCell>{product?.name || "Unnamed Product"}</TableCell>

                         {/* ================== PRICE =================== */}
                         <TableCell>₹{item.price}</TableCell>

                         {/* ================== QTY =================== */}
                         <TableCell>{item.quantity}</TableCell>

                         {/* ================== ORDER STATUS =================== */}
                         {index === 0 && (
                           <TableCell rowSpan={items.length}>
                             <select
                               value={order.status}
                               disabled={updatingStatusId === order._id || !canCancelOrder(order)}
                               onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                               style={{
                                 padding: '6px',
                                 borderRadius: '6px',
                                 border: '1px solid #ccc',
                                 backgroundColor: canCancelOrder(order) ? 'white' : '#eee'
                               }}
                             >
                               {statusOptions.map((status) => (
                                 <option key={status} value={status}>
                                   {status}
                                 </option>
                               ))}
                             </select>
                           </TableCell>
                         )}

                         {/* ================== PAYMENT STATUS =================== */}
                         {index === 0 && (
                           <TableCell rowSpan={items.length}>
                             <StatusChip
                               label={getPaymentStatusLabel(order.paymentInfo)}
                               status={order.paymentInfo?.status?.toLowerCase() || 'unknown'}
                               size="small"
                             />
                           </TableCell>
                         )}

                         {/* ================== REFUND STATUS =================== */}
                         {index === 0 && (
                           <TableCell rowSpan={items.length}>
                             <StatusChip
                               label={getRefundStatusText(order.refundInfo)}
                               status={order.refundInfo?.status?.toLowerCase() || 'none'}
                               size="small"
                             />
                           </TableCell>
                         )}

                         {/* ================== ACTIONS =================== */}
                         {index === 0 && (
                           <TableCell rowSpan={items.length}>
                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                               <Button
                                 variant="outlined"
                                 size="small"
                                 onClick={() => handleViewOrder(order)}
                               >
                                 View Details
                               </Button>

                               {order.paymentInfo?.status === 'captured' &&
                                order.status !== 'Cancelled' &&
                                !order.refundInfo?.refundId && (
                                  <Button
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    onClick={() => processManualRefund(order._id, order.totalAmount)}
                                  >
                                    Process Refund
                                  </Button>
                               )}
                             </Box>
                           </TableCell>
                         )}
                       </TableRow>
                     );
                  });
                })}
              </TableBody>
            </Table>

            {/* PAGINATION */}
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </StyledTableContainer>
        )}
      </Box>

      {/* ===================== CANCEL ORDER DIALOG ===================== */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Refund Notice</AlertTitle>
            Cancelling this order will automatically trigger a refund if payment was captured.
          </Alert>

          <TextField
            fullWidth
            label="Cancellation Reason"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Enter reason..."
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmCancelOrder}
            disabled={updatingStatusId === orderToCancel}
          >
            {updatingStatusId === orderToCancel ? "Processing..." : "Confirm Cancellation"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===================== ORDER DETAILS DIALOG ===================== */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontWeight: "bold" }}>
              Order Details – #{selectedOrder._id.slice(-8)}
            </DialogTitle>

            <DialogContent dividers>
              {/* ================================================= */}
              {/*                 ORDER INFORMATION                 */}
              {/* ================================================= */}
              <Grid container spacing={3}>
                
                {/* LEFT SIDE — ORDER INFO */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Order Information
                  </Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography>
                    <strong>Status:</strong>
                    <StatusChip
                      label={selectedOrder.status}
                      status={selectedOrder.status.toLowerCase()}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>

                  <Typography><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Typography>
                  <Typography><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</Typography>
                  <Typography><strong>Phone:</strong> {selectedOrder.phone}</Typography>
                  <Typography><strong>Address:</strong> {selectedOrder.address}</Typography>
                  <Typography><strong>Razorpay Order ID:</strong> {selectedOrder.razorpayOrderId}</Typography>

                  {/* User Info */}
                  <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>User Information</Typography>
                    <Typography variant="body2"><strong>Name:</strong> {selectedOrder.userName}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {selectedOrder.userEmail}</Typography>
                    <Typography variant="body2"><strong>User ID:</strong> {selectedOrder.userId?.slice(-8)}</Typography>
                  </Box>

                  {/* Cancellation Info */}
                  {selectedOrder.cancelReason && (
                    <Box mt={2} p={2} bgcolor="error.light" borderRadius={1}>
                      <Typography variant="subtitle2" color="error.dark">Cancellation Reason:</Typography>
                      <Typography variant="body2">{selectedOrder.cancelReason}</Typography>

                      {selectedOrder.cancelledAt && (
                        <Typography variant="body2">
                          <strong>Cancelled On:</strong> {formatDate(selectedOrder.cancelledAt)}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Grid>

                {/* RIGHT SIDE — PAYMENT + REFUND INFO */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Payment Information
                  </Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography>
                    <strong>Payment Status:</strong>
                    <StatusChip
                      label={getPaymentStatusLabel(selectedOrder.paymentInfo)}
                      status={selectedOrder.paymentInfo?.status?.toLowerCase()}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>

                  <Typography><strong>Amount:</strong> ₹{selectedOrder.paymentInfo?.amount || 0}</Typography>

                  {selectedOrder.paymentInfo?.method && (
                    <Typography><strong>Method:</strong> {selectedOrder.paymentInfo.method}</Typography>
                  )}

                  {selectedOrder.paymentInfo?.paymentId && (
                    <Typography><strong>Payment ID:</strong> {selectedOrder.paymentInfo.paymentId}</Typography>
                  )}

                  {selectedOrder.paymentInfo?.updatedAt && (
                    <Typography>
                      <strong>Last Updated:</strong> {formatDate(selectedOrder.paymentInfo.updatedAt)}
                    </Typography>
                  )}

                  {/* Refund block */}
                  {selectedOrder.refundInfo && selectedOrder.refundInfo.refundId && (
                    <Box mt={2} p={2} bgcolor="info.light" borderRadius={1}>
                      <Typography variant="subtitle2" color="info.dark" sx={{ fontWeight: "bold" }}>
                        Refund Information
                      </Typography>

                      <Typography variant="body2"><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</Typography>
                      <Typography variant="body2"><strong>Amount:</strong> ₹{selectedOrder.refundInfo.amount}</Typography>
                      <Typography variant="body2"><strong>Status:</strong> {selectedOrder.refundInfo.status}</Typography>
                      <Typography variant="body2"><strong>Reason:</strong> {selectedOrder.refundInfo.reason || 'Not specified'}</Typography>

                      {selectedOrder.refundInfo.estimatedSettlement && (
                        <Typography variant="body2">
                          <strong>Expected Settlement:</strong> {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* Manual Refund Button */}
                  {selectedOrder.paymentInfo?.status === 'captured' &&
                   selectedOrder.status !== 'Cancelled' &&
                   !selectedOrder.refundInfo?.refundId && (
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="warning"
                        fullWidth
                        onClick={() => processManualRefund(selectedOrder._id, selectedOrder.totalAmount)}
                        disabled={updatingStatusId === selectedOrder._id}
                      >
                        {updatingStatusId === selectedOrder._id ? "Processing..." : "Process Manual Refund"}
                      </Button>
                    </Box>
                  )}
                </Grid>

                {/* ================================================= */}
                {/*               ITEMS IN THIS ORDER                 */}
                {/* ================================================= */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Items in this Order
                  </Typography>
                  <Divider sx={{ my: 1 }} />

                  {selectedOrder.items.map((item, index) => {
                    const product = item.productId;
                    const imagePath = product?.media?.find(m => m.type === "image")?.url;
                    const imageUrl = getImageUrl(imagePath);

                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 2,
                          mb: 2,
                          border: "1px solid #eee",
                          borderRadius: 1
                        }}
                      >
                        {/* Product Image */}
                        <Box
                          component="img"
                          src={imageUrl}
                          alt={product?.name}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 1,
                            objectFit: "cover",
                            border: "1px solid #ddd"
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/80?text=No+Image";
                          }}
                        />

                        <Box sx={{ flex: 1 }}>
                          <Typography><strong>Name:</strong> {product?.name}</Typography>
                          <Typography><strong>Price:</strong> ₹{item.price}</Typography>
                          <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                          <Typography><strong>Subtotal:</strong> ₹{item.price * item.quantity}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default OrderJewel;