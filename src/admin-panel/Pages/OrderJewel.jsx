// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../commonComponents/AxiosInstance';
// import {
//   Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Typography, CircularProgress, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
//   Divider, Grid, TablePagination, MenuItem, Select, FormControl, InputLabel
// } from '@mui/material';
// import { Receipt, LocalShipping, CheckCircle, Pending, Cancel } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   marginTop: theme.spacing(3),
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: 600,
//   backgroundColor:
//     status === 'Delivered' ? theme.palette.success.light
//       : status === 'Pending' ? theme.palette.warning.light
//         : status === 'Cancelled' ? theme.palette.error.light
//           : theme.palette.info.light,
//   color:
//     status === 'Delivered' ? theme.palette.success.dark
//       : status === 'Pending' ? theme.palette.warning.dark
//         : status === 'Cancelled' ? theme.palette.error.dark
//           : theme.palette.info.dark,
// }));

// const OrderJewel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [statusValue, setStatusValue] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/api/orders');
//         // const response = await axiosInstance.patch(`/api/orders/${selectedOrder._id}/status`, { status: newStatus });

//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setStatusValue(order.status);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Delivered': return <CheckCircle />;
//       case 'Pending': return <Pending />;
//       case 'Cancelled': return <Cancel />;
//       default: return <LocalShipping />;
//     }
//   };

//   // Pagination
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const currentOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   // Handle status update
//   const handleStatusChange = async (event) => {
//     const newStatus = event.target.value;
//     setStatusValue(newStatus);
//     if (!selectedOrder) return;
//     setUpdating(true);
//     try {
//       await axiosInstance.patch(`/api/orders/${selectedOrder._id}/status`, { status: newStatus });
//       setOrders(orders =>
//         orders.map(order =>
//           order._id === selectedOrder._id ? { ...order, status: newStatus } : order
//         )
//       );
//       setSelectedOrder({ ...selectedOrder, status: newStatus });
//     } catch (err) {
//       alert('Status update failed. Try again.');
//     }
//     setUpdating(false);
//   };


//   return (
//     <Container maxWidth="xl">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}>
//           Orders
//         </Typography>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <StyledTableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product ID</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment ID</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentOrders.map((order) =>
//                   order.items.map((item) => (
//                     <TableRow key={`${order._id}-${item.productId}`} hover>
//                       <TableCell>{item.productId}</TableCell>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>₹{item.price}</TableCell>
//                       <TableCell>{item.quantity}</TableCell>
//                       <TableCell>{order.paymentId || 'N/A'}</TableCell>
//                       <TableCell>
//                         <StatusChip
//                           icon={getStatusIcon(order.status)}
//                           label={order.status}
//                           status={order.status}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           onClick={() => handleViewOrder(order)}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[10, 20, 30]}
//               component="div"
//               count={orders.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               sx={{
//                 backgroundColor: '#f5f5f5',
//                 borderBottomLeftRadius: '8px',
//                 borderBottomRightRadius: '8px',
//                 width: "100%" 
//               }}
//             />
//           </StyledTableContainer>
//         )}
//       </Box>

//       {/* Order Details Dialog - Enhanced with Address, Phone, Status Edit */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         {selectedOrder && (
//           <>
//             <DialogTitle>
//               <Typography sx={{ fontWeight: 'bold',fontSize: '1.5rem' }} >Order Details</Typography>
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Order Information
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   <div><strong>Status:</strong>
//                     <FormControl sx={{ ml: 1, width: 160 }} size="small">
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         label="Status"
//                         value={statusValue}
//                         onChange={handleStatusChange}
//                         disabled={updating}
//                       >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Delivered">Delivered</MenuItem>
//                         <MenuItem value="Cancelled">Cancelled</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </div>
//                   <Typography><strong>Payment ID:</strong> {selectedOrder.paymentId || 'N/A'}</Typography>
//                   <Typography><strong>Address:</strong> {selectedOrder.address}</Typography>
//                   <Typography><strong>Phone:</strong> {selectedOrder.phone}</Typography>
//                   <Typography><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Typography>
//                   <Typography><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Items in this Order
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   {selectedOrder.items.map((item, index) => (
//                     <Box key={index} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
//                       <Typography><strong>Product ID:</strong> {item.productId}</Typography>
//                       <Typography><strong>Name:</strong> {item.name}</Typography>
//                       <Typography><strong>Price:</strong> ₹{item.price}</Typography>
//                       <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
//                     </Box>
//                   ))}
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog} color="primary">Close</Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Container>
//   );
// };

// export default OrderJewel;


// // 2:
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../commonComponents/AxiosInstance';
// import {
//   Box,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
//   Chip,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Grid,
//   TablePagination,
//   TextField,
//   DialogTitle,
//   Alert,
//   AlertTitle,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   marginTop: theme.spacing(3),
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: 600,
//   minWidth: '80px',
//   backgroundColor:
//     status === 'delivered' ? theme.palette.success.light :
//       status === 'pending' ? theme.palette.warning.light :
//         status === 'cancelled' ? theme.palette.error.light :
//           status === 'refunded' ? theme.palette.info.light :
//             status === 'captured' || status === 'paid' ? theme.palette.success.light :
//               status === 'authorized' ? theme.palette.info.light :
//                 status === 'failed' ? theme.palette.error.light :
//                   status === 'processed' ? theme.palette.success.light :
//                     status === 'created' ? theme.palette.grey.light :
//                       theme.palette.grey.light,
//   color:
//     status === 'delivered' ? theme.palette.success.dark :
//       status === 'pending' ? theme.palette.warning.dark :
//         status === 'cancelled' ? theme.palette.error.dark :
//           status === 'refunded' ? theme.palette.info.dark :
//             status === 'captured' || status === 'paid' ? theme.palette.success.dark :
//               status === 'authorized' ? theme.palette.info.dark :
//                 status === 'failed' ? theme.palette.error.dark :
//                   status === 'processed' ? theme.palette.success.dark :
//                     status === 'created' ? theme.palette.grey.dark :
//                       theme.palette.grey.dark,
// }));

// const statusOptions = ['Pending', 'Delivered', 'Cancelled'];

// const OrderJewel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [updatingStatusId, setUpdatingStatusId] = useState(null);
//   const [cancelReason, setCancelReason] = useState('');
//   const [showCancelDialog, setShowCancelDialog] = useState(false);
//   const [orderToCancel, setOrderToCancel] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [refreshing, setRefreshing] = useState(false);
//   const [processingCapture, setProcessingCapture] = useState(null);

//   useEffect(() => {
//     fetchData();
//     // Refresh data every 30 seconds to get live payment status
//     const interval = setInterval(() => {
//       fetchDataSilently();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/api/orders');
//       setOrders(response.data.orders || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDataSilently = async () => {
//     setRefreshing(true);
//     try {
//       const response = await axiosInstance.get('/api/orders');
//       setOrders(response.data.orders || []);
//     } catch (error) {
//       console.error("Error fetching data silently:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const handleViewOrder = async (order) => {
//     // Fetch latest payment status before showing dialog
//     try {
//       const paymentResponse = await axiosInstance.get(`/api/paymentStatus/${order._id}`);
//       const updatedOrder = {
//         ...order,
//         paymentInfo: paymentResponse.data.paymentInfo,
//         refundInfo: paymentResponse.data.refundInfo
//       };
//       setSelectedOrder(updatedOrder);
//     } catch (error) {
//       console.error("Error fetching latest payment status:", error);
//       setSelectedOrder(order);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const currentOrders = orders.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const capturePayment = async (orderId) => {
//     setProcessingCapture(orderId);
//     try {
//       const response = await axiosInstance.post(`/api/capturePayment/${orderId}`);

//       // Update the order in local state
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderId 
//             ? { ...order, paymentInfo: response.data.paymentInfo }
//             : order
//         )
//       );

//       alert('Payment captured successfully!');
//       fetchData(); // Refresh to get latest data
//     } catch (error) {
//       console.error("Failed to capture payment:", error);
//       alert("Failed to capture payment. Please try again.");
//     } finally {
//       setProcessingCapture(null);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     if (newStatus === 'Cancelled') {
//       setOrderToCancel(orderId);
//       setShowCancelDialog(true);
//       return;
//     }

//     setUpdatingStatusId(orderId);
//     try {
//       const response = await axiosInstance.put(`/api/orders/${orderId}/status`, {
//         status: newStatus,
//       });

//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       alert('Order status updated successfully!');
//     } catch (error) {
//       console.error("Failed to update order status:", error);
//       alert("Failed to update order status. Please try again.");
//     } finally {
//       setUpdatingStatusId(null);
//     }
//   };

//   const confirmCancelOrder = async () => {
//     if (!orderToCancel) return;

//     setUpdatingStatusId(orderToCancel);
//     try {
//       const response = await axiosInstance.put(`/api/orders/${orderToCancel}/status`, {
//         status: 'Cancelled',
//         cancelReason: cancelReason || 'Cancelled by admin'
//       });

//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderToCancel ? {
//             ...order,
//             status: 'Cancelled',
//             cancelReason: cancelReason || 'Cancelled by admin',
//             cancelledAt: new Date(),
//             refundInfo: response.data.order.refundInfo
//           } : order
//         )
//       );

//       // Show success message about refund
//       alert(`Order cancelled successfully! ${response.data.refundProcessed ? 'Automatic refund has been initiated.' : 'No refund needed or payment not captured yet.'}`);

//       // Refresh data to get updated refund info
//       fetchData();

//     } catch (error) {
//       console.error("Failed to cancel order:", error);
//       alert("Failed to cancel order. Please try again.");
//     } finally {
//       setUpdatingStatusId(null);
//       setShowCancelDialog(false);
//       setOrderToCancel(null);
//       setCancelReason('');
//     }
//   };

//   const processManualRefund = async (orderId, amount) => {
//     try {
//       const response = await axiosInstance.post(`/api/orders/${orderId}/refund`, {
//         amount,
//         reason: 'Manual refund by admin',
//         speed: 'optimum'
//       });

//       alert('Refund processed successfully!');
//       fetchData(); // Refresh data
//     } catch (error) {
//       console.error("Failed to process refund:", error);
//       alert(`Failed to process refund: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getPaymentStatusLabel = (paymentInfo) => {
//     if (!paymentInfo || !paymentInfo.status) return 'Unknown';

//     switch (paymentInfo.status.toLowerCase()) {
//       case 'captured': return 'Paid';
//       case 'authorized': return 'Authorized';
//       case 'failed': return 'Failed';
//       case 'created': return 'Created';
//       default: return paymentInfo.status;
//     }
//   };

//   const getRefundStatusText = (refundInfo) => {
//     if (!refundInfo || !refundInfo.refundId) return 'No Refund';

//     const status = refundInfo.status;
//     if (status === 'processed') return 'Refund Processed';
//     if (status === 'failed') return 'Refund Failed';
//     if (status === 'pending') return 'Refund Pending';
//     return `Refund ${status}`;
//   };

//   const canCancelOrder = (order) => {
//     return order.status !== 'Cancelled' && order.status !== 'Delivered';
//   };

//   const needsPaymentCapture = (paymentInfo) => {
//     return paymentInfo?.status === 'authorized';
//   };

//   return (
//     <Container maxWidth="xl">
//       <Box sx={{ my: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" component="h1" className='fontSize25sml' gutterBottom sx={{ fontWeight: 'bold' }}>
//             Orders Management
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {refreshing && <CircularProgress size={20} />}
//             <Button variant="outlined" onClick={fetchData} disabled={loading}>
//               Refresh Orders
//             </Button>
//           </Box>
//         </Box>

//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <StyledTableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Refund Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentOrders.map((order) => {
//                   const items = order.items || [];

//                   return items.map((item, index) => (
//                     <TableRow key={`${order._id}-${item.productId}-${index}`} hover>
//                       <TableCell>{item.name}</TableCell>

//                       {index === 0 && (
//                         <TableCell rowSpan={items.length}>₹{order.totalAmount}</TableCell>
//                       )}

//                       <TableCell>{item.quantity}</TableCell>

//                       {index === 0 && (
//                         <TableCell rowSpan={items.length}>
//                           <select
//                             value={order.status}
//                             disabled={updatingStatusId === order._id || !canCancelOrder(order)}
//                             onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                             style={{
//                               padding: '4px 8px',
//                               borderRadius: '4px',
//                               border: '1px solid #ccc',
//                               backgroundColor: canCancelOrder(order) ? 'white' : '#f5f5f5'
//                             }}
//                           >
//                             {statusOptions.map((status) => (
//                               <option key={status} value={status}>
//                                 {status}
//                               </option>
//                             ))}
//                           </select>
//                         </TableCell>
//                       )}

//                       {index === 0 && (
//                         <TableCell rowSpan={items.length}>
//                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                             <StatusChip
//                               label={getPaymentStatusLabel(order.paymentInfo)}
//                               status={order.paymentInfo?.status?.toLowerCase() || 'unknown'}
//                               size="small"
//                             />
//                             {needsPaymentCapture(order.paymentInfo) && (
//                               <Button
//                                 variant="outlined"
//                                 color="primary"
//                                 size="small"
//                                 disabled={processingCapture === order._id}
//                                 onClick={() => capturePayment(order._id)}
//                                 sx={{ fontSize: '10px', padding: '2px 8px' }}
//                               >
//                                 {processingCapture === order._id ? 'Capturing...' : 'Capture Payment'}
//                               </Button>
//                             )}
//                           </Box>
//                         </TableCell>
//                       )}

//                       {index === 0 && (
//                         <TableCell rowSpan={items.length}>
//                           <StatusChip
//                             label={getRefundStatusText(order.refundInfo)}
//                             status={order.refundInfo?.status?.toLowerCase() || 'none'}
//                             size="small"
//                           />
//                         </TableCell>
//                       )}

//                       {index === 0 && (
//                         <TableCell rowSpan={items.length}>
//                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               onClick={() => handleViewOrder(order)}
//                             >
//                               View Details
//                             </Button>
//                             {order.paymentInfo?.status === 'captured' &&
//                               order.status !== 'Cancelled' &&
//                               !order.refundInfo?.refundId && (
//                                 <Button
//                                   variant="outlined"
//                                   color="warning"
//                                   size="small"
//                                   onClick={() => processManualRefund(order._id, order.totalAmount)}
//                                 >
//                                   Process Refund
//                                 </Button>
//                               )}
//                           </Box>
//                         </TableCell>
//                       )}
//                     </TableRow>
//                   ));
//                 })}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[10, 20, 30]}
//               component="div"
//               count={orders.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               sx={{
//                 backgroundColor: '#f5f5f5',
//                 borderBottomLeftRadius: '8px',
//                 borderBottomRightRadius: '8px',
//               }}
//             />
//           </StyledTableContainer>
//         )}
//       </Box>

//       {/* Cancel Order Dialog */}
//       <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Cancel Order</DialogTitle>
//         <DialogContent>
//           <Alert severity="warning" sx={{ mb: 2 }}>
//             <AlertTitle>Cancel Order</AlertTitle>
//             Cancelling this order will automatically process a refund if payment has been captured.
//           </Alert>
//           <TextField
//             fullWidth
//             label="Cancellation Reason"
//             value={cancelReason}
//             onChange={(e) => setCancelReason(e.target.value)}
//             placeholder="Enter reason for cancellation..."
//             multiline
//             rows={3}
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowCancelDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={confirmCancelOrder} 
//             color="error" 
//             variant="contained"
//             disabled={updatingStatusId === orderToCancel}
//           >
//             {updatingStatusId === orderToCancel ? 'Processing...' : 'Confirm Cancellation'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Order Details Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedOrder && (
//           <>
//             <DialogTitle>
//               <Typography variant="h6">Order Details - #{selectedOrder._id.slice(-8)}</Typography>
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Order Information
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   <Typography><strong>Status:</strong> 
//                     <StatusChip
//                       label={selectedOrder.status}
//                       status={selectedOrder.status.toLowerCase()}
//                       size="small"
//                       sx={{ ml: 1 }}
//                     />
//                   </Typography>
//                   <Typography><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Typography>
//                   <Typography><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</Typography>
//                   <Typography><strong>Phone:</strong> {selectedOrder.phone}</Typography>
//                   <Typography><strong>Address:</strong> {selectedOrder.address}</Typography>
//                   <Typography><strong>Razorpay Order ID:</strong> {selectedOrder.razorpayOrderId}</Typography>

//                   {selectedOrder.cancelReason && (
//                     <Box mt={2} p={2} bgcolor="error.light" borderRadius={1}>
//                       <Typography variant="subtitle2" color="error.dark">Cancellation Reason:</Typography>
//                       <Typography variant="body2">{selectedOrder.cancelReason}</Typography>
//                       {selectedOrder.cancelledAt && (
//                         <Typography variant="body2"><strong>Cancelled on:</strong> {formatDate(selectedOrder.cancelledAt)}</Typography>
//                       )}
//                     </Box>
//                   )}
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Payment Information
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   {/* <Typography><strong>Payment ID:</strong> {selectedOrder.paymentInfo?.paymentId || 'N/A'}</Typography> */}
//                   <Typography><strong>Payment Status:</strong> 
//                     <StatusChip
//                       label={getPaymentStatusLabel(selectedOrder.paymentInfo)}
//                       status={selectedOrder.paymentInfo?.status?.toLowerCase() || 'unknown'}
//                       size="small"
//                       sx={{ ml: 1 }}
//                     />
//                   </Typography>
//                   {selectedOrder.paymentInfo?.method && (
//                     <Typography><strong>Payment Method:</strong> {selectedOrder.paymentInfo.method}</Typography>
//                   )}
//                   {selectedOrder.paymentInfo?.updatedAt && (
//                     <Typography><strong>Last Updated:</strong> {formatDate(selectedOrder.paymentInfo.updatedAt)}</Typography>
//                   )}

//                   {selectedOrder.refundInfo && (
//                     <Box mt={2} p={2} bgcolor="info.light" borderRadius={1}>
//                       <Typography variant="subtitle2" color="info.dark">Refund Information:</Typography>
//                       <Typography variant="body2"><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</Typography>
//                       <Typography variant="body2"><strong>Amount:</strong> ₹{selectedOrder.refundInfo.amount}</Typography>
//                       <Typography variant="body2"><strong>Status:</strong> {selectedOrder.refundInfo.status}</Typography>
//                       <Typography variant="body2"><strong>Reason:</strong> {selectedOrder.refundInfo.reason}</Typography>
//                       {selectedOrder.refundInfo.estimatedSettlement && (
//                         <Typography variant="body2">
//                           <strong>Expected Settlement:</strong> {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
//                         </Typography>
//                       )}
//                     </Box>
//                   )}
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Items in this Order
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   {selectedOrder.items.map((item, index) => (
//                     <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
//                       <Typography><strong>Product ID:</strong> {item.productId}</Typography>
//                       <Typography><strong>Name:</strong> {item.name}</Typography>
//                       <Typography><strong>Price:</strong> ₹{item.price}</Typography>
//                       <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
//                       <Typography><strong>Subtotal:</strong> ₹{item.price * item.quantity}</Typography>
//                     </Box>
//                   ))}
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Container>
//   );
// };

// export default OrderJewel;


// // 3:
// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../commonComponents/AxiosInstance';

// const OrderJewel = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [syncing, setSyncing] = useState(null);
//     const [bulkSyncing, setBulkSyncing] = useState(false);
//     const [updatingStatus, setUpdatingStatus] = useState(null);
//     const [apiStats, setApiStats] = useState(null);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [cancelReason, setCancelReason] = useState('');

//     useEffect(() => {
//         fetchOrders();
//         fetchApiStats();
//     }, []);

//     // Fetch from DATABASE (Free - updated by webhooks)
//     const fetchOrders = async () => {
//         try {
//             setLoading(true);
//             const response = await axiosInstance.get('/api/orders');
//             setOrders(response.data.orders || []);
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchApiStats = async () => {
//         try {
//             const response = await axiosInstance.get('/api/api-stats');
//             setApiStats(response.data);
//         } catch (error) {
//             console.error('Error fetching API stats:', error);
//         }
//     };

//     // Sync single order with Razorpay (1-2 API calls)
//     const syncOrder = async (orderId) => {
//         setSyncing(orderId);
//         try {
//             const response = await axiosInstance.post(`/api/orders/${orderId}/sync`);

//             if (response.data.updated) {
//                 await fetchOrders(); // Refresh all orders
//                 alert(`✅ Order synced! Changes: ${response.data.changes.join(', ')}`);
//             } else {
//                 alert('ℹ️ Order is already up to date!');
//             }

//             fetchApiStats();
//         } catch (error) {
//             if (error.response?.status === 429) {
//                 alert('⚠️ Rate limit reached. Please try again later.');
//             } else {
//                 alert('❌ Failed to sync order');
//             }
//         } finally {
//             setSyncing(null);
//         }
//     };

//     // Bulk sync orders that need updating (Admin only - use sparingly)
//     const bulkSyncOrders = async () => {
//         if (!confirm('This will sync up to 10 orders that need updating. Continue?')) {
//             return;
//         }

//         setBulkSyncing(true);
//         try {
//             const response = await axiosInstance.post('/api/orders/sync-all', {
//                 limit: 10
//             });

//             await fetchOrders();
//             fetchApiStats();

//             alert(`✅ Bulk sync completed! ${response.data.results.length} orders processed.`);
//         } catch (error) {
//             alert('❌ Bulk sync failed');
//         } finally {
//             setBulkSyncing(false);
//         }
//     };

//     // Update order status (includes automatic refund if cancelling)
//     const updateOrderStatus = async (orderId, newStatus) => {
//         let reason = '';

//         if (newStatus === 'Cancelled') {
//             reason = prompt('Enter cancellation reason (optional):') || 'Cancelled by admin';
//         }

//         if (!confirm(`Update order status to ${newStatus}?`)) {
//             return;
//         }

//         setUpdatingStatus(orderId);
//         try {
//             const response = await axiosInstance.put(`/api/orders/${orderId}/status`, {
//                 status: newStatus,
//                 cancelReason: reason
//             });

//             await fetchOrders();
//             fetchApiStats();

//             if (newStatus === 'Cancelled' && response.data.order.refundInfo) {
//                 alert('✅ Order cancelled and refund initiated automatically!');
//             } else {
//                 alert('✅ Order status updated successfully!');
//             }
//         } catch (error) {
//             if (error.response?.status === 429) {
//                 alert('⚠️ Rate limit reached. Please try again later.');
//             } else {
//                 alert('❌ Failed to update order status');
//             }
//         } finally {
//             setUpdatingStatus(null);
//         }
//     };

//     const openOrderDetails = (order) => {
//         setSelectedOrder(order);
//         setShowModal(true);
//     };

//     const closeOrderDetails = () => {
//         setShowModal(false);
//         setSelectedOrder(null);
//         setCancelReason('');
//     };

//     if (loading) {
//         return (
//             <div className="container text-center py-5">
//                 <div className="spinner-border" role="status"></div>
//                 <p className="mt-3">Loading orders...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container-fluid my-4">
//             {/* Admin Header with Stats */}
//             <div className="row mb-4">
//                 <div className="col-md-6">
//                     <h2><i className="fas fa-shopping-cart"></i> Order Management</h2>
//                     <p className="text-muted">
//                         Auto-updated via webhooks. Click "Sync" for live verification.
//                     </p>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="row">
//                         <div className="col-md-6">
//                             {apiStats && (
//                                 <div className="card bg-info text-white">
//                                     <div className="card-body p-3">
//                                         <h6 className="mb-1">API Calls Remaining</h6>
//                                         <h3 className="mb-0">{apiStats.remainingCalls}</h3>
//                                         <small>of {apiStats.maxCallsPerHour} per hour</small>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card bg-success text-white">
//                                 <div className="card-body p-3">
//                                     <h6 className="mb-1">Total Orders</h6>
//                                     <h3 className="mb-0">{orders.length}</h3>
//                                     <small>All time</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mb-3">
//                 <button
//                     className="btn btn-primary me-2"
//                     onClick={fetchOrders}
//                 >
//                     <i className="fas fa-refresh"></i> Refresh
//                 </button>
//                 <button
//                     className="btn btn-warning"
//                     onClick={bulkSyncOrders}
//                     disabled={bulkSyncing}
//                 >
//                     {bulkSyncing ? (
//                         <>
//                             <span className="spinner-border spinner-border-sm me-2"></span>
//                             Bulk Syncing...
//                         </>
//                     ) : (
//                         <>
//                             <i className="fas fa-sync"></i> Bulk Sync (10 Orders)
//                         </>
//                     )}
//                 </button>
//             </div>

//             {/* Orders Table */}
//             <div className="table-responsive">
//                 <table className="table table-hover table-bordered">
//                     <thead className="table-dark">
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Customer</th>
//                             <th>Amount</th>
//                             <th>Order Status</th>
//                             <th>Payment</th>
//                             <th>Refund</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.length === 0 ? (
//                             <tr>
//                                 <td colspan="8" className="text-center py-4">
//                                     No orders found
//                                 </td>
//                             </tr>
//                         ) : (
//                             orders.map((order) => (
//                                 <tr key={order._id}>
//                                     <td>
//                                         <small className="font-monospace">
//                                             {order._id.slice(-8)}
//                                         </small>
//                                     </td>
//                                     <td>
//                                         <div>
//                                             <small className="text-muted">ID: {order.userId.toString().slice(-6)}</small>
//                                         </div>
//                                         <small>{order.phone}</small>
//                                     </td>
//                                     <td>
//                                         <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong>
//                                     </td>
//                                     <td>
//                                         <span className={`badge bg-${
//                                             order.status === 'Delivered' ? 'success' :
//                                             order.status === 'Pending' ? 'warning' :
//                                             order.status === 'Cancelled' ? 'danger' :
//                                             'info'
//                                         }`}>
//                                             {order.status}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         <span className={`badge bg-${
//                                             order.paymentInfo?.status === 'captured' ? 'success' :
//                                             order.paymentInfo?.status === 'failed' ? 'danger' :
//                                             'secondary'
//                                         }`}>
//                                             {order.paymentInfo?.status || 'pending'}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         {order.refundInfo ? (
//                                             <span className={`badge bg-${
//                                                 order.refundInfo.status === 'processed' ? 'success' :
//                                                 order.refundInfo.status === 'pending' ? 'warning' :
//                                                 'danger'
//                                             }`}>
//                                                 {order.refundInfo.status}
//                                             </span>
//                                         ) : (
//                                             <span className="badge bg-secondary">No refund</span>
//                                         )}
//                                     </td>
//                                     <td>
//                                         <small>{new Date(order.createdAt).toLocaleDateString('en-IN')}</small>
//                                     </td>
//                                     <td>
//                                         <div className="btn-group btn-group-sm">
//                                             <button
//                                                 className="btn btn-outline-primary"
//                                                 onClick={() => openOrderDetails(order)}
//                                                 title="View Details"
//                                             >
//                                                 <i className="fas fa-eye"></i>
//                                             </button>
//                                             <button
//                                                 className="btn btn-outline-success"
//                                                 onClick={() => syncOrder(order._id)}
//                                                 disabled={syncing === order._id}
//                                                 title="Sync with Razorpay"
//                                             >
//                                                 {syncing === order._id ? (
//                                                     <span className="spinner-border spinner-border-sm"></span>
//                                                 ) : (
//                                                     <i className="fas fa-sync-alt"></i>
//                                                 )}
//                                             </button>

//                                             {order.status === 'Pending' && (
//                                                 <>
//                                                     <button
//                                                         className="btn btn-outline-success"
//                                                         onClick={() => updateOrderStatus(order._id, 'Delivered')}
//                                                         disabled={updatingStatus === order._id}
//                                                         title="Mark as Delivered"
//                                                     >
//                                                         <i className="fas fa-check"></i>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-danger"
//                                                         onClick={() => updateOrderStatus(order._id, 'Cancelled')}
//                                                         disabled={updatingStatus === order._id}
//                                                         title="Cancel Order"
//                                                     >
//                                                         <i className="fas fa-times"></i>
//                                                     </button>
//                                                 </>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Order Details Modal */}
//             {showModal && selectedOrder && (
//                 <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//                     <div className="modal-dialog modal-xl modal-dialog-scrollable">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">
//                                     Order Details - {selectedOrder._id}
//                                 </h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={closeOrderDetails}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <div className="row">
//                                     {/* Payment Info */}
//                                     <div className="col-md-6 mb-3">
//                                         <div className="card h-100">
//                                             <div className="card-header bg-success text-white">
//                                                 <i className="fas fa-credit-card"></i> Payment Info
//                                                 <span className="badge bg-light text-dark float-end">
//                                                     Webhook Data
//                                                 </span>
//                                             </div>
//                                             <div className="card-body">
//                                                 {selectedOrder.paymentInfo ? (
//                                                     <>
//                                                         <p><strong>Payment ID:</strong> {selectedOrder.paymentInfo.paymentId || 'N/A'}</p>
//                                                         <p><strong>Status:</strong> <span className="badge bg-success">{selectedOrder.paymentInfo.status}</span></p>
//                                                         <p><strong>Method:</strong> {selectedOrder.paymentInfo.method || 'N/A'}</p>
//                                                         <p><strong>Amount:</strong> ₹{selectedOrder.paymentInfo.amount}</p>
//                                                         <small className="text-muted">
//                                                             Updated: {new Date(selectedOrder.paymentInfo.updatedAt).toLocaleString('en-IN')}
//                                                         </small>
//                                                     </>
//                                                 ) : (
//                                                     <p className="text-muted">No payment information</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Refund Info */}
//                                     <div className="col-md-6 mb-3">
//                                         <div className="card h-100">
//                                             <div className="card-header bg-warning">
//                                                 <i className="fas fa-undo"></i> Refund Info
//                                                 <span className="badge bg-light text-dark float-end">
//                                                     Webhook Data
//                                                 </span>
//                                             </div>
//                                             <div className="card-body">
//                                                 {selectedOrder.refundInfo ? (
//                                                     <>
//                                                         <p><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</p>
//                                                         <p><strong>Status:</strong> <span className="badge bg-warning">{selectedOrder.refundInfo.status}</span></p>
//                                                         <p><strong>Amount:</strong> ₹{selectedOrder.refundInfo.amount}</p>
//                                                         <p><strong>Speed:</strong> {selectedOrder.refundInfo.speed}</p>
//                                                         <p><strong>Reason:</strong> {selectedOrder.refundInfo.reason}</p>
//                                                         {selectedOrder.refundInfo.estimatedSettlement && (
//                                                             <p><strong>Est. Settlement:</strong> {new Date(selectedOrder.refundInfo.estimatedSettlement).toLocaleDateString('en-IN')}</p>
//                                                         )}
//                                                         {selectedOrder.refundInfo.notes && (
//                                                             <div className="alert alert-info mt-2 mb-0">
//                                                                 <small>{selectedOrder.refundInfo.notes}</small>
//                                                             </div>
//                                                         )}
//                                                     </>
//                                                 ) : (
//                                                     <p className="text-muted">No refund initiated</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Order Items */}
//                                 <div className="card mb-3">
//                                     <div className="card-header bg-light">
//                                         <strong>Order Items</strong>
//                                     </div>
//                                     <div className="card-body">
//                                         <table className="table table-sm mb-0">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Product</th>
//                                                     <th>Quantity</th>
//                                                     <th>Price</th>
//                                                     <th>Subtotal</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {selectedOrder.items.map((item, index) => (
//                                                     <tr key={index}>
//                                                         <td>{item.name}</td>
//                                                         <td>{item.quantity}</td>
//                                                         <td>₹{item.price.toLocaleString('en-IN')}</td>
//                                                         <td>₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                             <tfoot>
//                                                 <tr className="table-active">
//                                                     <td colSpan="3" className="text-end"><strong>Total:</strong></td>
//                                                     <td><strong>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</strong></td>
//                                                 </tr>
//                                             </tfoot>
//                                         </table>
//                                     </div>
//                                 </div>

//                                 {/* Customer & Delivery Info */}
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="card">
//                                             <div className="card-header bg-light">
//                                                 <strong>Delivery Address</strong>
//                                             </div>
//                                             <div className="card-body">
//                                                 <p>{selectedOrder.address}</p>
//                                                 <p className="mb-0"><strong>Phone:</strong> {selectedOrder.phone}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="card">
//                                             <div className="card-header bg-light">
//                                                 <strong>Order Status</strong>
//                                             </div>
//                                             <div className="card-body">
//                                                 <p><strong>Current Status:</strong> <span className={`badge bg-${
//                                                     selectedOrder.status === 'Delivered' ? 'success' :
//                                                     selectedOrder.status === 'Pending' ? 'warning' :
//                                                     selectedOrder.status === 'Cancelled' ? 'danger' :
//                                                     'info'
//                                                 }`}>{selectedOrder.status}</span></p>
//                                                 <p><strong>Created:</strong> {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
//                                                 {selectedOrder.cancelledAt && (
//                                                     <>
//                                                         <p><strong>Cancelled:</strong> {new Date(selectedOrder.cancelledAt).toLocaleString('en-IN')}</p>
//                                                         <p><strong>Cancelled By:</strong> {selectedOrder.cancelledBy}</p>
//                                                         <p className="mb-0"><strong>Reason:</strong> {selectedOrder.cancelReason}</p>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="modal-footer">
//                                 {selectedOrder.status === 'Pending' && (
//                                     <div className="me-auto">
//                                         <button
//                                             className="btn btn-success me-2"
//                                             onClick={() => {
//                                                 updateOrderStatus(selectedOrder._id, 'Delivered');
//                                                 closeOrderDetails();
//                                             }}
//                                             disabled={updatingStatus === selectedOrder._id}
//                                         >
//                                             <i className="fas fa-check"></i> Mark as Delivered
//                                         </button>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => {
//                                                 updateOrderStatus(selectedOrder._id, 'Cancelled');
//                                                 closeOrderDetails();
//                                             }}
//                                             disabled={updatingStatus === selectedOrder._id}
//                                         >
//                                             <i className="fas fa-times"></i> Cancel Order
//                                         </button>
//                                     </div>
//                                 )}
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => syncOrder(selectedOrder._id)}
//                                     disabled={syncing === selectedOrder._id}
//                                 >
//                                     {syncing === selectedOrder._id ? (
//                                         <>
//                                             <span className="spinner-border spinner-border-sm me-2"></span>
//                                             Syncing...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <i className="fas fa-sync-alt me-2"></i>
//                                             Verify with Razorpay
//                                         </>
//                                     )}
//                                 </button>
//                                 <button
//                                     className="btn btn-secondary"
//                                     onClick={closeOrderDetails}
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderJewel;

// // 4
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
  const [processingCapture, setProcessingCapture] = useState(null);

  useEffect(() => {
    fetchOrders();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // const response = await axiosInstance.get('/api/orders');
      const response = await axiosInstance.get('/api/orders?includeLiveStatus=true');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const capturePayment = async (orderId) => {
    setProcessingCapture(orderId);
    try {
      const response = await axiosInstance.post(`/api/capturePayment/${orderId}`);

      // Update the order in local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId
            ? { ...order, paymentInfo: response.data.paymentInfo }
            : order
        )
      );

      alert('Payment captured successfully!');
      fetchOrders(); // Refresh to get latest data
    } catch (error) {
      console.error("Failed to capture payment:", error);
      alert("Failed to capture payment. Please try again.");
    } finally {
      setProcessingCapture(null);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, cancelReason = '') => {
    setUpdatingStatusId(orderId);

    try {
      await axiosInstance.put(`/api/orders/${orderId}/status`, {
        status: newStatus,
        cancelReason: cancelReason || undefined
      });

      // Refresh orders to get updated data including refund info
      await fetchOrders();

      if (newStatus === 'Cancelled') {
        alert('Order cancelled. Refund has been automatically initiated.');
      } else {
        alert('Order status updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status. Please try again.');
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
          order._id === orderToCancel ? {
            ...order,
            status: 'Cancelled',
            cancelReason: cancelReason || 'Cancelled by admin',
            cancelledAt: new Date(),
            refundInfo: response.data.order.refundInfo
          } : order
        )
      );

      // Show success message about refund
      alert(`Order cancelled successfully! ${response.data.refundProcessed ? 'Automatic refund has been initiated.' : 'No refund needed or payment not captured yet.'}`);

      // Refresh data to get updated refund info
      fetchOrders();

    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setUpdatingStatusId(null);
      setShowCancelDialog(false);
      setOrderToCancel(null);
      setCancelReason('');
    }
  };

  const processManualRefund = async (orderId, amount) => {
    try {
      const response = await axiosInstance.post(`/api/orders/${orderId}/refund`, {
        amount,
        reason: 'Manual refund by admin',
        speed: 'optimum'
      });

      alert('Refund processed successfully!');
      fetchOrders(); // Refresh data
    } catch (error) {
      console.error("Failed to process refund:", error);
      alert(`Failed to process refund: ${error.response?.data?.message || error.message}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    if (!refundInfo || !refundInfo.refundId) return 'No Refund';

    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    return `Refund ${status}`;
  };

  const canCancelOrder = (order) => {
    return order.status !== 'Cancelled' && order.status !== 'Delivered';
  };

  const needsPaymentCapture = (paymentInfo) => {
    return paymentInfo?.status === 'authorized';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" className='fontSize25sml' gutterBottom sx={{ fontWeight: 'bold' }}>
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

                  return items.map((item, index) => (
                    <TableRow key={`${order._id}-${item.productId}-${index}`} hover>
                      <TableCell>{item.name}</TableCell>

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>₹{order.totalAmount}</TableCell>
                      )}

                      <TableCell>{item.quantity}</TableCell>

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <select
                            value={order.status}
                            disabled={updatingStatusId === order._id || !canCancelOrder(order)}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                              backgroundColor: canCancelOrder(order) ? 'white' : '#f5f5f5'
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

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <StatusChip
                              label={getPaymentStatusLabel(order.paymentInfo)}
                              status={order.paymentInfo?.status?.toLowerCase() || 'unknown'}
                              size="small"
                            />
                            {needsPaymentCapture(order.paymentInfo) && (
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                disabled={processingCapture === order._id}
                                onClick={() => capturePayment(order._id)}
                                sx={{ fontSize: '10px', padding: '2px 8px' }}
                              >
                                {processingCapture === order._id ? 'Capturing...' : 'Capture Payment'}
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <StatusChip
                            label={getRefundStatusText(order.refundInfo)}
                            status={order.refundInfo?.status?.toLowerCase() || 'none'}
                            size="small"
                          />
                        </TableCell>
                      )}

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
                  ));
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: '#f5f5f5',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
              }}
            />
          </StyledTableContainer>
        )}
      </Box>

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Cancel Order</AlertTitle>
            Cancelling this order will automatically process a refund if payment has been captured.
          </Alert>
          <TextField
            fullWidth
            label="Cancellation Reason"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Enter reason for cancellation..."
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmCancelOrder}
            color="error"
            variant="contained"
            disabled={updatingStatusId === orderToCancel}
          >
            {updatingStatusId === orderToCancel ? 'Processing...' : 'Confirm Cancellation'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <Typography variant="h6">Order Details - #{selectedOrder._id.slice(-8)}</Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Order Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography><strong>Status:</strong>
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

                  {selectedOrder.cancelReason && (
                    <Box mt={2} p={2} bgcolor="error.light" borderRadius={1}>
                      <Typography variant="subtitle2" color="error.dark">Cancellation Reason:</Typography>
                      <Typography variant="body2">{selectedOrder.cancelReason}</Typography>
                      {selectedOrder.cancelledAt && (
                        <Typography variant="body2"><strong>Cancelled on:</strong> {formatDate(selectedOrder.cancelledAt)}</Typography>
                      )}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Payment Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* <Typography><strong>Payment ID:</strong> {selectedOrder.paymentInfo?.paymentId || 'N/A'}</Typography> */}
                  <Typography><strong>Payment Status:</strong>
                    <StatusChip
                      label={getPaymentStatusLabel(selectedOrder.paymentInfo)}
                      status={selectedOrder.paymentInfo?.status?.toLowerCase() || 'unknown'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  {selectedOrder.paymentInfo?.method && (
                    <Typography><strong>Payment Method:</strong> {selectedOrder.paymentInfo.method}</Typography>
                  )}
                  {selectedOrder.paymentInfo?.updatedAt && (
                    <Typography><strong>Last Updated:</strong> {formatDate(selectedOrder.paymentInfo.updatedAt)}</Typography>
                  )}

                  {selectedOrder.refundInfo && (
                    <Box mt={2} p={2} bgcolor="info.light" borderRadius={1}>
                      <Typography variant="subtitle2" color="info.dark">Refund Information:</Typography>
                      <Typography variant="body2"><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</Typography>
                      <Typography variant="body2"><strong>Amount:</strong> ₹{selectedOrder.refundInfo.amount}</Typography>
                      <Typography variant="body2"><strong>Status:</strong> {selectedOrder.refundInfo.status}</Typography>
                      <Typography variant="body2"><strong>Reason:</strong> {selectedOrder.refundInfo.reason}</Typography>
                      {selectedOrder.refundInfo.estimatedSettlement && (
                        <Typography variant="body2">
                          <strong>Expected Settlement:</strong> {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Items in this Order
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {selectedOrder.items.map((item, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                      <Typography><strong>Product ID:</strong> {item.productId}</Typography>
                      <Typography><strong>Name:</strong> {item.name}</Typography>
                      <Typography><strong>Price:</strong> ₹{item.price}</Typography>
                      <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                      <Typography><strong>Subtotal:</strong> ₹{item.price * item.quantity}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
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

