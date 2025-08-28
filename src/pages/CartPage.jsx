// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useNavigate } from 'react-router-dom';

// // Sample cart items - replace with API data later
// const sampleCartItems = [
//   {
//     id: 1,
//     img: '/public/collection1.png',
//     title: 'Dazzling Grace Drop Earrings',
//     price: '₹ 59,101',
//     oldPrice: '₹ 62,000',
//     category: 'Earrings',
//     quantity: 1,
//     weight: '3.2 gm'
//   },
//   {
//     id: 2,
//     img: '/public/collection2.png',
//     title: 'Royal Diamond Necklace',
//     price: '₹ 1,25,000',
//     oldPrice: '₹ 1,35,000',
//     category: 'Necklace',
//     quantity: 2,
//     weight: '8.5 gm'
//   },
//   {
//     id: 3,
//     img: '/public/collection3.png',
//     title: 'Elegant Gold Bracelet',
//     price: '₹ 45,000',
//     oldPrice: '',
//     category: 'Bracelet',
//     quantity: 1,
//     weight: '5.1 gm'
//   },
//   {
//     id: 4,
//     img: '/public/collection1.png',
//     title: 'Shimmering Pearl Earrings',
//     price: '₹ 52,000',
//     oldPrice: '₹ 55,000',
//     category: 'Earrings',
//     quantity: 1,
//     weight: '2.8 gm'
//   },
//   {
//     id: 5,
//     img: '/public/collection2.png',
//     title: 'Majestic Ruby Necklace',
//     price: '₹ 1,15,000',
//     oldPrice: '₹ 1,25,000',
//     category: 'Necklace',
//     quantity: 1,
//     weight: '12.3 gm'
//   },
//   {
//     id: 6,
//     img: '/public/collection3.png',
//     title: 'Classic Platinum Bracelet',
//     price: '₹ 49,500',
//     oldPrice: '₹ 53,000',
//     category: 'Bracelet',
//     quantity: 2,
//     weight: '6.7 gm'
//   }
// ];

// function EmptyCart({ onContinueShopping }) {
//   return (
//     <Box sx={{
//       width: '100%',
//       minHeight: '70vh',
//       display: 'flex',
//       flexDirection: { xs: 'column', md: 'row' },
//       alignItems: { xs: 'center', md: 'flex-start' },
//       justifyContent: 'center',
//       gap: { xs: 3, md: 5 },
//       pt: { xs: 2, md: 4 }
//     }}>
//       {/* Empty cart illustration */}
//       <Box sx={{
//         minWidth: { xs: 150, md: 190 },
//         textAlign: 'center',
//         order: { xs: 1, md: 1 }
//       }}>
//         <Box sx={{
//           width: { xs: 100, md: 130 },
//           height: { xs: 80, md: 110 },
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           mx: 'auto'
//         }}>
//           {/* Shopping bag */}
//           <Box sx={{
//             width: { xs: 70, md: 90 },
//             height: { xs: 85, md: 110 },
//             backgroundColor: '#f6f1ef',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'relative'
//           }}>
//             <svg width="45" height="55" viewBox="0 0 65 75" fill="none">
//               <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25" />
//               <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5" />
//             </svg>
//           </Box>
//         </Box>
//       </Box>

//       {/* Text content */}
//       <Box sx={{
//         textAlign: { xs: 'center', md: 'left' },
//         mt: { xs: 2, md: 10 },
//         order: { xs: 2, md: 2 },
//         maxWidth: { xs: '100%', md: '400px' }
//       }}>
//         <Typography
//           variant="h6"
//           sx={{
//             color: '#702626',
//             fontWeight: 600,
//             mb: 0.75,
//             fontSize: { xs: '18px', md: '20px' }
//           }}
//         >
//           Your Cart Is Empty !
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             mb: 3,
//             color: '#702626',
//             fontSize: { xs: '14px', md: '16px' }
//           }}
//         >
//           Add Chauhan Jewellers To Your Shopping Cart
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={onContinueShopping}
//           sx={{
//             background: '#7d2a25',
//             color: '#fff',
//             borderRadius: '4px',
//             px: { xs: 3, md: 4 },
//             py: { xs: 1, md: 1.5 },
//             textTransform: 'none',
//             fontWeight: 500,
//             fontSize: { xs: '14px', md: '16px' },
//             '&:hover': { background: '#611f18' }
//           }}
//         >
//           Continue Shopping
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// function CartCard({ product, onRemove, onUpdateQuantity }) {
//   return (
//     <Box sx={{
//       background: '#fff',
//       borderRadius: 2,
//       boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
//       border: '1px solid #eee',
//       p: { xs: 1.5, sm: 2, md: 2 },
//       mb: 1.5,
//       position: 'relative',
//       height: { xs: 280, sm: 300, md: 320, lg: 340 },
//       width: { xs: 160, sm: 200, md: 240, lg: 280 },
//       maxWidth: '100%',
//       mx: 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//       '&:hover': {
//         transform: 'translateY(-2px)',
//         boxShadow: '0 4px 12px rgba(70,21,7,0.15)'
//       }
//     }}>
//       {/* Delete button */}
//       <IconButton
//         size="small"
//         onClick={() => onRemove(product.id)}
//         sx={{
//           position: 'absolute',
//           top: { xs: 4, sm: 6, md: 8 },
//           right: { xs: 4, sm: 6, md: 8 },
//           backgroundColor: '#fff',
//           border: '1px solid #bbb',
//           zIndex: 2,
//           width: { xs: 24, sm: 28, md: 32 },
//           height: { xs: 24, sm: 28, md: 32 },
//           '&:hover': {
//             backgroundColor: '#f5f5f5',
//             border: '1px solid #999'
//           }
//         }}
//       >
//         <DeleteOutlineIcon sx={{
//           color: '#bbb',
//           fontSize: { xs: '14px', sm: '16px', md: '18px' }
//         }} />
//       </IconButton>

//       {/* Product image container - responsive dimensions */}
//       <Box sx={{
//         width: '100%',
//         height: { xs: 100, sm: 120, md: 140, lg: 160 },
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         mb: { xs: 0.5, sm: 0.8, md: 1 },
//         overflow: 'hidden',
//         borderRadius: 1
//       }}>
//         <img
//           src={product.img}
//           alt={product.title}
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             objectPosition: 'center'
//           }}
//         />
//       </Box>

//       {/* Content section - flexible height */}
//       <Box sx={{
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between'
//       }}>
//         {/* Title and price */}
//         <Box>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 400,
//               color: '#333',
//               fontFamily: 'serif',
//               lineHeight: 1.2,
//               mb: { xs: 0.3, sm: 0.5, md: 0.5 },
//               fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
//               height: { xs: '32px', sm: '36px', md: '40px', lg: '44px' },
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               overflow: 'hidden'
//             }}
//           >
//             {product.title}
//           </Typography>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.3, sm: 0.5, md: 0.5 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
//             <Typography
//               sx={{
//                 fontWeight: 500,
//                 color: '#272727',
//                 fontSize: { xs: 11, sm: 12, md: 13, lg: 14 }
//               }}
//             >
//               {product.price}
//             </Typography>
//             {product.oldPrice && (
//               <Typography
//                 sx={{
//                   color: '#bdbdbd',
//                   fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
//                   textDecoration: 'line-through'
//                 }}
//               >
//                 {product.oldPrice}
//               </Typography>
//             )}
//           </Box>

//           {/* Weight */}
//           <Typography
//             sx={{
//               color: '#666',
//               fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
//               mb: { xs: 0.3, sm: 0.5, md: 0.5 }
//             }}
//           >
//             Weight: {product.weight}
//           </Typography>
//         </Box>

//         {/* Quantity controls */}
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           mb: { xs: 0.5, sm: 0.8, md: 1 }
//         }}>
//           <Typography
//             sx={{
//               fontSize: { xs: 10, sm: 11, md: 12, lg: 13 },
//               color: '#333',
//               fontWeight: 500
//             }}
//           >
//             Qty:
//           </Typography>
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             border: '1px solid #ddd',
//             borderRadius: 1,
//             overflow: 'hidden'
//           }}>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
//               disabled={product.quantity <= 1}
//               sx={{
//                 width: { xs: 24, sm: 28, md: 32 },
//                 height: { xs: 24, sm: 28, md: 32 },
//                 borderRadius: 0,
//                 color: product.quantity <= 1 ? '#ccc' : '#7d2a25',
//                 '&:hover': {
//                   backgroundColor: product.quantity <= 1 ? 'transparent' : '#f5f5f5'
//                 }
//               }}
//             >
//               <RemoveIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//             <Typography
//               sx={{
//                 px: { xs: 1, sm: 1.5, md: 2 },
//                 fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
//                 fontWeight: 500,
//                 color: '#333',
//                 minWidth: { xs: '20px', sm: '24px', md: '28px' },
//                 textAlign: 'center'
//               }}
//             >
//               {product.quantity}
//             </Typography>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
//               sx={{
//                 width: { xs: 24, sm: 28, md: 32 },
//                 height: { xs: 24, sm: 28, md: 32 },
//                 borderRadius: 0,
//                 color: '#7d2a25',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <AddIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const navigate = useNavigate();

//   // Load cart items on component mount
//   useEffect(() => {
//     // For now, use localStorage. Later replace with API call
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     } else {
//       // Initialize with sample data for demonstration
//       setCartItems(sampleCartItems);
//       localStorage.setItem('cart', JSON.stringify(sampleCartItems));
//     }
//   }, []);

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = cartItems.filter(item => item.id !== productId);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setSnackbarMessage('Item removed from cart');
//     setShowSnackbar(true);
//   };

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return;

//     const updatedCart = cartItems.map(item =>
//       item.id === productId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setSnackbarMessage('Quantity updated');
//     setShowSnackbar(true);
//   };

//   const handleContinueShopping = () => {
//     navigate('/'); // Navigate to home page
//   };

//   const handleCheckout = () => {
//     // In a real app, navigate to checkout page
//     setSnackbarMessage('Proceeding to checkout...');
//     setShowSnackbar(true);
//   };

//   // Calculate totals
//   const subtotal = cartItems.reduce((sum, item) => {
//     const price = parseInt(item.price.replace(/[^\d]/g, ''));
//     return sum + (price * item.quantity);
//   }, 0);

//   const discount = subtotal * 0.05; // 5% discount
//   const total = subtotal - discount;

//   const isEmpty = cartItems.length === 0;

//   return (
//     <Box sx={{
//       px: { xs: 2, sm: 3, md: 5 },
//       py: { xs: 2, md: 3 },
//       minHeight: '100vh',
//       backgroundColor: '#fafafa'
//     }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         alignItems: 'center',
//         mb: { xs: 2, md: 3 },
//         gap: 2,
//         flexWrap: 'wrap'
//       }}>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 400,
//             color: '#222',
//             flex: 1,
//             fontSize: { xs: '20px', md: '24px' }
//           }}
//         >
//           Shopping Cart ({cartItems.length} items)
//         </Typography>
//       </Box>

//       {/* Content */}
//       {isEmpty ? (
//         <EmptyCart onContinueShopping={handleContinueShopping} />
//       ) : (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
//             {/* Cart Items Grid */}
//             <Box sx={{ flex: 1 }}>
//               <Grid
//                 container
//                 spacing={{ xs: 1, sm: 1.5, md: 1.5, lg: 2 }}
//                 // justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
//                 justifyContent="center"
//               >
//                 {cartItems.map((item) => (
//                   <Grid
//                     key={item.id}
//                     item
//                     xs={6}
//                     sm={4}
//                     md={4}
//                     lg={4}
//                     xl={3}
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <CartCard
//                       product={item}
//                       onRemove={handleRemoveFromCart}
//                       onUpdateQuantity={handleUpdateQuantity}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>

//             {/* Order Summary */}
//             <Box sx={{
//               width: { xs: '100%', lg: 450 },
//               background: '#fff',
//               borderRadius: 2,
//               p: { xs: 2.5, md: 3.5 },
//               height: 'fit-content',
//               boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
//               border: '1px solid #eee',
//               position: 'sticky',
//               top: 20
//             }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 500,
//                   color: '#222',
//                   mb: 3,
//                   fontSize: { xs: '20px', md: '22px' },
//                   textAlign: 'center',
//                   borderBottom: '2px solid #f0f0f0',
//                   pb: 1.5
//                 }}
//               >
//                 Order Summary
//               </Typography>

//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#555' }}>Subtotal</Typography>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>₹ {subtotal.toLocaleString()}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745' }}>Discount (5%)</Typography>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745', fontWeight: 500 }}>-₹ {discount.toLocaleString()}</Typography>
//                 </Box>
//                 <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#333' }}>Total</Typography>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#7d2a25' }}>
//                     ₹ {total.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={handleCheckout}
//                 fullWidth
//                 sx={{
//                   background: '#7d2a25',
//                   color: '#fff',
//                   borderRadius: '10px',
//                   py: { xs: 1.5, md: 2 },
//                   textTransform: 'none',
//                   fontWeight: 1000,
//                   fontSize: { xs: '16px', md: '18px' },
//                   '&:hover': { background: '#611f18' },
//                   boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
//                 }}
//               >
//                 Proceed to Checkout
//               </Button>

//               {/* Additional Info */}
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
//                 <Typography sx={{
//                   fontSize: { xs: '12px', md: '14px' },
//                   color: '#666',
//                   textAlign: 'center',
//                   lineHeight: 1.4
//                 }}>
//                   Free shipping on orders above ₹50,000
//                 </Typography>
//               </Box>

//               {/* Delivery Details */}
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
//                 <Typography sx={{
//                   fontSize: { xs: '16px', md: '18px' },
//                   fontWeight: 600,
//                   color: '#333',
//                   mb: 2,
//                   fontFamily: 'serif'
//                 }}>
//                   Delivery Details
//                 </Typography>

//                 <Box sx={{
//                   display: 'flex',
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   gap: { xs: 1.5, sm: 1 },
//                   alignItems: { xs: 'stretch', sm: 'center' }
//                 }}>
//                   {/* Country Selection */}
//                   <Box sx={{
//                     position: 'relative',
//                     minWidth: { xs: '100%', sm: '80px' },
//                     flexShrink: 0
//                   }}>
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       border: '1px solid #ddd',
//                       borderRadius: 1,
//                       px: 2,
//                       py: { xs: 1.2, md: 1.5 },
//                       backgroundColor: '#fff',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         borderColor: '#7d2a25'
//                       }
//                     }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         {/* India Flag */}
//                         <Box sx={{
//                           width: 20,
//                           height: 15,
//                           background: 'linear-gradient(135deg, #ff9933 0%, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)',
//                           borderRadius: '2px',
//                           position: 'relative'
//                         }}>
//                           <Box sx={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             width: 6,
//                             height: 6,
//                             background: '#000080',
//                             borderRadius: '50%'
//                           }} />
//                         </Box>
//                         <Typography sx={{
//                           fontSize: { xs: '14px', md: '16px' },
//                           fontWeight: 500,
//                           color: '#333'
//                         }}>
//                           IN
//                         </Typography>
//                       </Box>
//                       <Box sx={{
//                         width: 0,
//                         height: 0,
//                         borderLeft: '4px solid transparent',
//                         borderRight: '4px solid transparent',
//                         borderTop: '6px solid #666'
//                       }} />
//                     </Box>
//                   </Box>

//                   {/* Pincode Input */}
//                   <Box sx={{
//                     flex: 1,
//                     position: 'relative'
//                   }}>
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       border: '1px solid #ddd',
//                       borderRadius: 1,
//                       px: 2,
//                       py: { xs: 1.2, md: 1.5 },
//                       background: 'linear-gradient(90deg, #fff5f2 0%, #fff 100%)',
//                       '&:focus-within': {
//                         borderColor: '#7d2a25',
//                         boxShadow: '0 0 0 2px rgba(125,42,37,0.1)'
//                       }
//                     }}>
//                       {/* Location Pin Icon */}
//                       <Box sx={{
//                         mr: 1.5,
//                         color: '#666',
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
//                         </svg>
//                       </Box>
//                       <input
//                         type="text"
//                         placeholder="Enter Pincode"
//                         style={{
//                           border: 'none',
//                           outline: 'none',
//                           background: 'transparent',
//                           width: '100%',
//                           fontSize: '14px',
//                           color: '#333'
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   {/* Check Button */}
//                   <Button
//                     variant="text"
//                     sx={{
//                       color: '#7d2a25',
//                       fontWeight: 600,
//                       fontSize: { xs: '14px', md: '16px' },
//                       textTransform: 'none',
//                       px: { xs: 2, md: 3 },
//                       py: { xs: 1.2, md: 1.5 },
//                       minWidth: { xs: '100%', sm: 'auto' },
//                       '&:hover': {
//                         backgroundColor: 'rgba(125,42,37,0.05)'
//                       }
//                     }}
//                   >
//                     Check
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{
//           bottom: { xs: 80, sm: 20, md: 20 }
//         }}
//       >
//         <Alert
//           onClose={() => setShowSnackbar(false)}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: { xs: '14px', sm: '16px' }
//           }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


// // 2:

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosInstance from '../common components/AxiosInstance';

// // Sample cart items - replace with API data later
// const sampleCartItems = [
//   {
//     id: 1,
//     img: '/public/collection1.png',
//     title: 'Dazzling Grace Drop Earrings',
//     price: '₹ 59,101',
//     oldPrice: '₹ 62,000',
//     category: 'Earrings',
//     quantity: 1,
//     weight: '3.2 gm'
//   },
//   {
//     id: 2,
//     img: '/public/collection2.png',
//     title: 'Royal Diamond Necklace',
//     price: '₹ 1,25,000',
//     oldPrice: '₹ 1,35,000',
//     category: 'Necklace',
//     quantity: 2,
//     weight: '8.5 gm'
//   },
//   {
//     id: 3,
//     img: '/public/collection3.png',
//     title: 'Elegant Gold Bracelet',
//     price: '₹ 45,000',
//     oldPrice: '',
//     category: 'Bracelet',
//     quantity: 1,
//     weight: '5.1 gm'
//   },
//   {
//     id: 4,
//     img: '/public/collection1.png',
//     title: 'Shimmering Pearl Earrings',
//     price: '₹ 52,000',
//     oldPrice: '₹ 55,000',
//     category: 'Earrings',
//     quantity: 1,
//     weight: '2.8 gm'
//   },
//   {
//     id: 5,
//     img: '/public/collection2.png',
//     title: 'Majestic Ruby Necklace',
//     price: '₹ 1,15,000',
//     oldPrice: '₹ 1,25,000',
//     category: 'Necklace',
//     quantity: 1,
//     weight: '12.3 gm'
//   },
//   {
//     id: 6,
//     img: '/public/collection3.png',
//     title: 'Classic Platinum Bracelet',
//     price: '₹ 49,500',
//     oldPrice: '₹ 53,000',
//     category: 'Bracelet',
//     quantity: 2,
//     weight: '6.7 gm'
//   }
// ];

// function EmptyCart({ onContinueShopping }) {
//   return (
//     <Box sx={{
//       width: '100%',
//       minHeight: '70vh',
//       display: 'flex',
//       flexDirection: { xs: 'column', md: 'row' },
//       alignItems: { xs: 'center', md: 'flex-start' },
//       justifyContent: 'center',
//       gap: { xs: 3, md: 5 },
//       pt: { xs: 2, md: 4 }
//     }}>
//       {/* Empty cart illustration */}
//       <Box sx={{
//         minWidth: { xs: 150, md: 190 },
//         textAlign: 'center',
//         order: { xs: 1, md: 1 }
//       }}>
//         <Box sx={{
//           width: { xs: 100, md: 130 },
//           height: { xs: 80, md: 110 },
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           mx: 'auto'
//         }}>
//           {/* Shopping bag */}
//           <Box sx={{
//             width: { xs: 70, md: 90 },
//             height: { xs: 85, md: 110 },
//             backgroundColor: '#f6f1ef',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'relative'
//           }}>
//             <svg width="45" height="55" viewBox="0 0 65 75" fill="none">
//               <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25" />
//               <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5" />
//             </svg>
//           </Box>
//         </Box>
//       </Box>

//       {/* Text content */}
//       <Box sx={{
//         textAlign: { xs: 'center', md: 'left' },
//         mt: { xs: 2, md: 10 },
//         order: { xs: 2, md: 2 },
//         maxWidth: { xs: '100%', md: '400px' }
//       }}>
//         <Typography
//           variant="h6"
//           sx={{
//             color: '#702626',
//             fontWeight: 600,
//             mb: 0.75,
//             fontSize: { xs: '18px', md: '20px' }
//           }}
//         >
//           Your Cart Is Empty !
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             mb: 3,
//             color: '#702626',
//             fontSize: { xs: '14px', md: '16px' }
//           }}
//         >
//           Add Chauhan Jewellers To Your Shopping Cart
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={onContinueShopping}
//           sx={{
//             background: '#7d2a25',
//             color: '#fff',
//             borderRadius: '4px',
//             px: { xs: 3, md: 4 },
//             py: { xs: 1, md: 1.5 },
//             textTransform: 'none',
//             fontWeight: 500,
//             fontSize: { xs: '14px', md: '16px' },
//             '&:hover': { background: '#611f18' }
//           }}
//         >
//           Continue Shopping
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// function CartCard({ product, onRemove, onUpdateQuantity }) {
//   return (
//     <Box sx={{
//       background: '#fff',
//       borderRadius: 2,
//       boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
//       border: '1px solid #eee',
//       p: { xs: 1.5, sm: 2, md: 2 },
//       mb: 1.5,
//       position: 'relative',
//       height: { xs: 280, sm: 300, md: 320, lg: 340 },
//       width: { xs: 160, sm: 200, md: 240, lg: 280 },
//       maxWidth: '100%',
//       mx: 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//       '&:hover': {
//         transform: 'translateY(-2px)',
//         boxShadow: '0 4px 12px rgba(70,21,7,0.15)'
//       }
//     }}>
//       {/* Delete button */}
//       <IconButton
//         size="small"
//         onClick={() => onRemove(product.id)}
//         sx={{
//           position: 'absolute',
//           top: { xs: 4, sm: 6, md: 8 },
//           right: { xs: 4, sm: 6, md: 8 },
//           backgroundColor: '#fff',
//           border: '1px solid #bbb',
//           zIndex: 2,
//           width: { xs: 24, sm: 28, md: 32 },
//           height: { xs: 24, sm: 28, md: 32 },
//           '&:hover': {
//             backgroundColor: '#f5f5f5',
//             border: '1px solid #999'
//           }
//         }}
//       >
//         <DeleteOutlineIcon sx={{
//           color: '#bbb',
//           fontSize: { xs: '14px', sm: '16px', md: '18px' }
//         }} />
//       </IconButton>

//       {/* Product image container - responsive dimensions */}
//       <Box sx={{
//         width: '100%',
//         height: { xs: 100, sm: 120, md: 140, lg: 160 },
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         mb: { xs: 0.5, sm: 0.8, md: 1 },
//         overflow: 'hidden',
//         borderRadius: 1
//       }}>
//         <img
//           src={product.img}
//           alt={product.title}
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             objectPosition: 'center'
//           }}
//         />
//       </Box>

//       {/* Content section - flexible height */}
//       <Box sx={{
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between'
//       }}>
//         {/* Title and price */}
//         <Box>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 400,
//               color: '#333',
//               fontFamily: 'serif',
//               lineHeight: 1.2,
//               mb: { xs: 0.3, sm: 0.5, md: 0.5 },
//               fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
//               height: { xs: '32px', sm: '36px', md: '40px', lg: '44px' },
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               overflow: 'hidden'
//             }}
//           >
//             {product.title}
//           </Typography>

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.3, sm: 0.5, md: 0.5 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
//             <Typography
//               sx={{
//                 fontWeight: 500,
//                 color: '#272727',
//                 fontSize: { xs: 11, sm: 12, md: 13, lg: 14 }
//               }}
//             >
//               {product.price}
//             </Typography>
//             {product.oldPrice && (
//               <Typography
//                 sx={{
//                   color: '#bdbdbd',
//                   fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
//                   textDecoration: 'line-through'
//                 }}
//               >
//                 {product.oldPrice}
//               </Typography>
//             )}
//           </Box>

//           {/* Weight */}
//           <Typography
//             sx={{
//               color: '#666',
//               fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
//               mb: { xs: 0.3, sm: 0.5, md: 0.5 }
//             }}
//           >
//             Weight: {product.weight}
//           </Typography>
//         </Box>

//         {/* Quantity controls */}
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           mb: { xs: 0.5, sm: 0.8, md: 1 }
//         }}>
//           <Typography
//             sx={{
//               fontSize: { xs: 10, sm: 11, md: 12, lg: 13 },
//               color: '#333',
//               fontWeight: 500
//             }}
//           >
//             Qty:
//           </Typography>
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             border: '1px solid #ddd',
//             borderRadius: 1,
//             overflow: 'hidden'
//           }}>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
//               disabled={product.quantity <= 1}
//               sx={{
//                 width: { xs: 24, sm: 28, md: 32 },
//                 height: { xs: 24, sm: 28, md: 32 },
//                 borderRadius: 0,
//                 color: product.quantity <= 1 ? '#ccc' : '#7d2a25',
//                 '&:hover': {
//                   backgroundColor: product.quantity <= 1 ? 'transparent' : '#f5f5f5'
//                 }
//               }}
//             >
//               <RemoveIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//             <Typography
//               sx={{
//                 px: { xs: 1, sm: 1.5, md: 2 },
//                 fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
//                 fontWeight: 500,
//                 color: '#333',
//                 minWidth: { xs: '20px', sm: '24px', md: '28px' },
//                 textAlign: 'center'
//               }}
//             >
//               {product.quantity}
//             </Typography>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
//               sx={{
//                 width: { xs: 24, sm: 28, md: 32 },
//                 height: { xs: 24, sm: 28, md: 32 },
//                 borderRadius: 0,
//                 color: '#7d2a25',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <AddIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default function CartPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [OriginalAddress, setOriginalAddress] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formData, setFormData] = useState({
//     flat: '',
//     landmark: '',
//     state: '',
//     city: '',
//     country: 'India',
//     phone: '',
//     selectedAddress: ''
//   });

//   const cartItems = useSelector((state) => state.app.data);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       setIsAuthenticated(true);
//     } else {
//       // window.location.href = '/login';
//       navigate('/login')
//     }
//   }, []);

//   // if (isAuthenticated === null) return null;


//   const totalPrice = cartItems.reduce((acc, item) => {
//     const price = parseFloat(item.consumer_price || item.price || 0);
//     return acc + price * (item.quantity || 1);
//   }, 0);

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;

//     // Dispatch update action to Redux
//     const updatedItem = cartItems.find((item) => item._id === itemId);
//     if (updatedItem) {
//       const updatedProduct = { ...updatedItem, quantity: newQuantity };
//       dispatch(updateData(updatedProduct));  // Replace with your Redux action
//       toast.success('Item quantity updated!', { position: 'top-right', autoClose: 2000 });
//     }
//   };


//  const handleRemoveItem = (itemId) => {
//   dispatch(deleteProduct(itemId));  // Replace with your Redux action
//   toast.info('Item removed from cart.', { position: 'top-right', autoClose: 2000 });
// };


//   const handleAddAddress = async () => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     const userId = userData?._id;

//     if (!userId) {
//       toast.error("User ID not found.");
//       return;
//     }

//     const fullAddress = `${formData.flat}, ${formData.landmark}, ${formData.city}, ${formData.state}, ${formData.country}`;

//     try {
//       const response = await axiosInstance.put(`admin/updateAdmin/${userId}`, {
//         address: [...addresses, fullAddress],
//         phone: formData.phone,
//       });

//       if (response.status === 200) {
//         toast.success("Address added successfully");
//         setAddresses((prev) => [...prev, fullAddress]);
//         setFormData({ ...formData, selectedAddress: fullAddress });
//         setShowModal(false);
//       }
//     } catch (error) {
//       toast.error("Failed to update address");
//       console.error("Address update error:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/states', {
//           country: 'India'
//         });
//         setStates(res.data.data.states.map(s => s.name));
//       } catch (err) {
//         console.error('Error fetching states', err);
//       }
//     };
//     fetchStates();
//   }, []);

//   useEffect(() => {
//     if (!formData.state) return;

//     const fetchCities = async () => {
//       try {
//         const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
//           country: 'India',
//           state: formData.state
//         });
//         setCities(res.data.data);
//       } catch (err) {
//         console.error('Error fetching cities', err);
//       }
//     };
//     fetchCities();
//   }, [formData.state]);

//   // const loadRazorpayScript = () => {
//   //   return new Promise((resolve) => {
//   //     const script = document.createElement("script");
//   //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   //     script.onload = () => resolve(true);
//   //     script.onerror = () => resolve(false);
//   //     document.body.appendChild(script);
//   //   });
//   // };

//   const handleCheckout = () => {
//     if (!formData.selectedAddress) {
//       toast.warn("Please select an address before checkout.");
//       return;
//     }

//     const options = {
//       key: "rzp_live_hgk55iUzVRpKZ1", // Your Razorpay key
//       amount: totalPrice * 100, // In paise
//       currency: "INR",
//       name: "My Shop",
//       description: "Order Payment",
//       handler: async function (response) {
//         try {
//           toast.success("Payment successful!");

//           const userData = JSON.parse(localStorage.getItem('userData'));
//           const orderPayload = {
//             userId: userData?._id,
//             items: cartItems.map(item => ({
//               productId: item._id,
//               name: item.name,
//               quantity: item.quantity || 1,
//               price: parseFloat(item.consumer_price || item.price || 0),
//             })),
//             address: formData.selectedAddress,
//             phone: formData.phone || "9999999999",
//             totalAmount: totalPrice,
//             paymentId: response.razorpay_payment_id,
//           };

//           const res = await axiosInstance.post('/api/createOrder', orderPayload);

//           if (res.status === 201) {
//             dispatch(clearProducts()); // Clear the cart
//             navigate("/success"); // Redirect to success page
//           } else {
//             toast.error("Failed to place order.");
//           }
//         } catch (error) {
//           console.error("Order creation error:", error);
//           toast.error("Something went wrong while placing the order.");
//         }
//       },

//       prefill: {
//         name: "Test User",
//         email: "test@example.com",
//         contact: formData.phone || "9999999999",
//       },
//       notes: {
//         address: formData.selectedAddress,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const razorpay = new window.Razorpay(options); // Instantiate Razorpay
//     razorpay.open(); // Open the Razorpay checkout
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     const userId = userData?._id;

//     if (!userId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/admin/readAdmin/${userId}`);

//       const userInfo = response?.data?.data; // ✅ Actual user data is nested here

//       console.log("✅ Fetched user info:", userInfo);
//       console.log("✅ Fetched address:", userInfo?.address);

//       setOriginalAddress(userInfo);

//       if (Array.isArray(userInfo?.address)) {
//         setAddresses(userInfo.address);
//       } else {
//         console.warn("⚠️ Address is not an array.");
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   };

//   useEffect(() => {
//     console.log("Addresses state updated:", addresses);
//   }, [addresses]);

//   const isEmpty = cartItems.length === 0;


//   return (
//     <Box sx={{
//       px: { xs: 2, sm: 3, md: 5 },
//       py: { xs: 2, md: 3 },
//       minHeight: '100vh',
//       backgroundColor: '#fafafa'
//     }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         alignItems: 'center',
//         mb: { xs: 2, md: 3 },
//         gap: 2,
//         flexWrap: 'wrap'
//       }}>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 400,
//             color: '#222',
//             flex: 1,
//             fontSize: { xs: '20px', md: '24px' }
//           }}
//         >
//           Shopping Cart ({cartItems.length} items)
//         </Typography>
//       </Box>

//       {/* Content */}
//       {isEmpty ? (
//         <EmptyCart onContinueShopping={handleContinueShopping} />
//       ) : (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
//             {/* Cart Items Grid */}
//             <Box sx={{ flex: 1 }}>
//               <Grid
//                 container
//                 spacing={{ xs: 1, sm: 1.5, md: 1.5, lg: 2 }}
//                 // justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
//                 justifyContent="center"
//               >
//                 {cartItems.map((item) => (
//                   <Grid
//                     key={item.id}
//                     item
//                     xs={6}
//                     sm={4}
//                     md={4}
//                     lg={4}
//                     xl={3}
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <CartCard
//                       product={item}
//                       onRemove={handleRemoveItem}
//                       onUpdateQuantity={handleQuantityChange}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>

//             {/* Order Summary */}
//             <Box sx={{
//               width: { xs: '100%', lg: 450 },
//               background: '#fff',
//               borderRadius: 2,
//               p: { xs: 2.5, md: 3.5 },
//               height: 'fit-content',
//               boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
//               border: '1px solid #eee',
//               position: 'sticky',
//               top: 20
//             }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 500,
//                   color: '#222',
//                   mb: 3,
//                   fontSize: { xs: '20px', md: '22px' },
//                   textAlign: 'center',
//                   borderBottom: '2px solid #f0f0f0',
//                   pb: 1.5
//                 }}
//               >
//                 Order Summary
//               </Typography>

//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#555' }}>Subtotal</Typography>
//                   {/* <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>₹ {subtotal.toLocaleString()}</Typography> */}
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745' }}>Discount (5%)</Typography>
//                   {/* <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745', fontWeight: 500 }}>-₹ {discount.toLocaleString()}</Typography> */}
//                 </Box>
//                 <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#333' }}>Total</Typography>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#7d2a25' }}>
//                     {/* ₹ {total.toLocaleString()} */}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={handleCheckout}
//                 fullWidth
//                 sx={{
//                   background: '#7d2a25',
//                   color: '#fff',
//                   borderRadius: '10px',
//                   py: { xs: 1.5, md: 2 },
//                   textTransform: 'none',
//                   fontWeight: 1000,
//                   fontSize: { xs: '16px', md: '18px' },
//                   '&:hover': { background: '#611f18' },
//                   boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
//                 }}
//               >
//                 Proceed to Checkout
//               </Button>

//               {/* Additional Info */}
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
//                 <Typography sx={{
//                   fontSize: { xs: '12px', md: '14px' },
//                   color: '#666',
//                   textAlign: 'center',
//                   lineHeight: 1.4
//                 }}>
//                   Free shipping on orders above ₹50,000
//                 </Typography>
//               </Box>

//               {/* Delivery Details */}
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
//                 <Typography sx={{
//                   fontSize: { xs: '16px', md: '18px' },
//                   fontWeight: 600,
//                   color: '#333',
//                   mb: 2,
//                   fontFamily: 'serif'
//                 }}>
//                   Delivery Details
//                 </Typography>

//                 <Box sx={{
//                   display: 'flex',
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   gap: { xs: 1.5, sm: 1 },
//                   alignItems: { xs: 'stretch', sm: 'center' }
//                 }}>
//                   {/* Country Selection */}
//                   <Box sx={{
//                     position: 'relative',
//                     minWidth: { xs: '100%', sm: '80px' },
//                     flexShrink: 0
//                   }}>
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       border: '1px solid #ddd',
//                       borderRadius: 1,
//                       px: 2,
//                       py: { xs: 1.2, md: 1.5 },
//                       backgroundColor: '#fff',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         borderColor: '#7d2a25'
//                       }
//                     }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         {/* India Flag */}
//                         <Box sx={{
//                           width: 20,
//                           height: 15,
//                           background: 'linear-gradient(135deg, #ff9933 0%, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)',
//                           borderRadius: '2px',
//                           position: 'relative'
//                         }}>
//                           <Box sx={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             width: 6,
//                             height: 6,
//                             background: '#000080',
//                             borderRadius: '50%'
//                           }} />
//                         </Box>
//                         <Typography sx={{
//                           fontSize: { xs: '14px', md: '16px' },
//                           fontWeight: 500,
//                           color: '#333'
//                         }}>
//                           IN
//                         </Typography>
//                       </Box>
//                       <Box sx={{
//                         width: 0,
//                         height: 0,
//                         borderLeft: '4px solid transparent',
//                         borderRight: '4px solid transparent',
//                         borderTop: '6px solid #666'
//                       }} />
//                     </Box>
//                   </Box>

//                   {/* Pincode Input */}
//                   <Box sx={{
//                     flex: 1,
//                     position: 'relative'
//                   }}>
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       border: '1px solid #ddd',
//                       borderRadius: 1,
//                       px: 2,
//                       py: { xs: 1.2, md: 1.5 },
//                       background: 'linear-gradient(90deg, #fff5f2 0%, #fff 100%)',
//                       '&:focus-within': {
//                         borderColor: '#7d2a25',
//                         boxShadow: '0 0 0 2px rgba(125,42,37,0.1)'
//                       }
//                     }}>
//                       {/* Location Pin Icon */}
//                       <Box sx={{
//                         mr: 1.5,
//                         color: '#666',
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
//                         </svg>
//                       </Box>
//                       <input
//                         type="text"
//                         placeholder="Enter Pincode"
//                         style={{
//                           border: 'none',
//                           outline: 'none',
//                           background: 'transparent',
//                           width: '100%',
//                           fontSize: '14px',
//                           color: '#333'
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   {/* Check Button */}
//                   <Button
//                     variant="text"
//                     sx={{
//                       color: '#7d2a25',
//                       fontWeight: 600,
//                       fontSize: { xs: '14px', md: '16px' },
//                       textTransform: 'none',
//                       px: { xs: 2, md: 3 },
//                       py: { xs: 1.2, md: 1.5 },
//                       minWidth: { xs: '100%', sm: 'auto' },
//                       '&:hover': {
//                         backgroundColor: 'rgba(125,42,37,0.05)'
//                       }
//                     }}
//                   >
//                     Check
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Snackbar for notifications */}
//       <Snackbar
//         // open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{
//           bottom: { xs: 80, sm: 20, md: 20 }
//         }}
//       >
//         <Alert
//           // onClose={() => setShowSnackbar(false)}
//           severity="success"
//           sx={{
//             width: '100%',
//             fontSize: { xs: '14px', sm: '16px' }
//           }}
//         >
//           {/* {snackbarMessage} */}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


// //3:
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import axiosInstance from '../common components/AxiosInstance';
import { deleteProduct, updateData, clearProducts } from '../store/Action';
import { publicUrl } from '../common components/PublicUrl';

// ---------- helpers ----------
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(n || 0));

const getItemPriceNumber = (item) => parseFloat(item?.consumer_price ?? item?.price ?? 0) || 0;

// per-item cart quantity (fallback to old 'quantity' if you have legacy items)
const getCartQty = (item) =>
  typeof item?.cartQty === 'number'
    ? item.cartQty
    : (typeof item?.quantity === 'number' ? item.quantity : 1);

// robust unit price (variant > unitPrice > consumer_price > price)
const getUnitPrice = (item) =>
  Number(
    item?.unitPrice ??
    item?.selectedVariant?.final_price ??
    item?.selectedVariant?.finalPrice ??
    item?.consumer_price ??
    item?.price ??
    0
  );


// ---------- Empty state ----------
function EmptyCart({ onContinueShopping }) {
  return (
    <Box sx={{
      width: '100%', minHeight: '70vh', display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' },
      justifyContent: 'center', gap: { xs: 3, md: 5 }, pt: { xs: 2, md: 4 }
    }}>
      <Box sx={{ minWidth: { xs: 150, md: 190 }, textAlign: 'center', order: { xs: 1, md: 1 } }}>
        <Box sx={{ width: { xs: 100, md: 130 }, height: { xs: 80, md: 110 }, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
          <Box sx={{
            width: { xs: 70, md: 90 }, height: { xs: 85, md: 110 }, backgroundColor: '#f6f1ef',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
          }}>
            <svg width="45" height="55" viewBox="0 0 65 75" fill="none">
              <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
              <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
              <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25" />
              <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5" />
            </svg>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mt: { xs: 2, md: 10 }, order: { xs: 2, md: 2 }, maxWidth: { xs: '100%', md: 400 } }}>
        <Typography variant="h6" sx={{ color: '#702626', fontWeight: 600, mb: 0.75, fontSize: { xs: '18px', md: '20px' } }}>
          Your Cart Is Empty!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#702626', fontSize: { xs: '14px', md: '16px' } }}>
          Add Chauhan Jewellers to your shopping cart
        </Typography>
        <Button
          variant="contained"
          onClick={onContinueShopping}
          sx={{
            background: '#7d2a25', color: '#fff', borderRadius: '4px',
            px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 }, textTransform: 'none',
            fontWeight: 500, fontSize: { xs: '14px', md: '16px' }, '&:hover': { background: '#611f18' }
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}

// ---------- Item card ----------
function CartCard({ product, onRemove, onUpdateQuantity }) {
  const quantity = product.cartQty ?? (typeof product.quantity === 'number' ? product.quantity : 1);

  const parsedQuantities = useMemo(() => {
    const src = product?.quantity;
    if (!src) return [];

    // Already an array (most common after PDP):
    if (Array.isArray(src)) {
      return src.flatMap((entry) => {
        if (!entry) return [];
        if (typeof entry === 'object') return [entry];        // already parsed objects
        if (typeof entry === 'string') {
          try {
            const parsed = JSON.parse(entry);                 // may be object or array
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch { return []; }
        }
        return [];
      });
    }

    // Sometimes it's a single JSON string
    if (typeof src === 'string') {
      try {
        const parsed = JSON.parse(src);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch { return []; }
    }

    return [];
  }, [product?.quantity]);

  return (
    <Box sx={{
      background: '#fff', borderRadius: 2, boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
      border: '1px solid #eee', p: { xs: 1.5, sm: 2, md: 2 }, mb: 1.5, position: 'relative',
      // height: { xs: 280, sm: 300, md: 320, lg: 340 }, 
      width: { xs: 160, sm: 200, md: 240, lg: 280 },
      maxWidth: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(70,21,7,0.15)' }
    }}>
      <IconButton
        size="small"
        onClick={() => onRemove(product._id)}
        sx={{
          position: 'absolute', top: { xs: 4, sm: 6, md: 8 }, right: { xs: 4, sm: 6, md: 8 },
          backgroundColor: '#fff', border: '1px solid #bbb', zIndex: 2, width: { xs: 24, sm: 28, md: 32 },
          height: { xs: 24, sm: 28, md: 32 },
          '&:hover': { backgroundColor: '#f5f5f5', border: '1px solid #999' }
        }}
      >
        <DeleteOutlineIcon sx={{ color: '#bbb', fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
      </IconButton>

      <Box sx={{
        width: '100%', height: { xs: 100, sm: 120, md: 140, lg: 160 }, display: 'flex',
        alignItems: 'center', justifyContent: 'center', mb: { xs: 0.5, sm: 0.8, md: 1 }, overflow: 'hidden', borderRadius: 1
      }}>
        <img src={publicUrl(product?.media?.[0]?.url)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400, color: '#333', fontFamily: 'serif',
              mb: { xs: 0.3, sm: 0.5, md: 0.5 }, fontSize: { xs: 11, sm: 12, md: 15, lg: 20 },
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}
          >
            {product.name}
          </Typography>

          {parsedQuantities.map((q, idx) => {
            const fp = Number(q.final_price ?? q.finalPrice ?? q?.['0']?.finalPrice ?? 0);
            // const disc = q.discount ?? q?.['0']?.discount ?? '-';
            return (
              <Box key={idx} sx={{ mt: 0.5 }}>
                <Typography variant="caption" color="textSecondary">
                  Final Price: {formatINR(fp)}
                  {/* | Discount: {disc !== '-' ? `${disc}%` : '-'} */}
                </Typography>
              </Box>
            );
          })}

          {product.weight && (
            <Typography sx={{ color: '#666', fontSize: { xs: 9, sm: 10, md: 11, lg: 12 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
              Weight: {product.weight}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 0.5, sm: 0.8, md: 1 } }}>
          <Typography sx={{ fontSize: { xs: 10, sm: 11, md: 12, lg: 13 }, color: '#333', fontWeight: 500 }}>
            Qty:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product._id, quantity - 1)}
              disabled={quantity <= 1}
              sx={{
                width: { xs: 24, sm: 28, md: 32 }, height: { xs: 24, sm: 28, md: 32 }, borderRadius: 0,
                color: quantity <= 1 ? '#ccc' : '#7d2a25',
                '&:hover': { backgroundColor: quantity <= 1 ? 'transparent' : '#f5f5f5' }
              }}
            >
              <RemoveIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
            </IconButton>
            <Typography sx={{ px: { xs: 1, sm: 1.5, md: 2 }, fontSize: { xs: 11, sm: 12, md: 13, lg: 14 }, fontWeight: 500, color: '#333', minWidth: { xs: 20, sm: 24, md: 28 }, textAlign: 'center' }}>
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product._id, quantity + 1)}
              sx={{ width: { xs: 24, sm: 28, md: 32 }, height: { xs: 24, sm: 28, md: 32 }, borderRadius: 0, color: '#7d2a25', '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <AddIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ---------- main ----------
export default function CartPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [originalAddress, setOriginalAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    flat: '', landmark: '', state: '', city: '', country: 'India', phone: '', selectedAddress: ''
  });
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const cartItems = useSelector((state) => state.app.data || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----- auth check -----
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setIsAuthenticated(true);
    else navigate('/login');
  }, [navigate]);

  // ----- totals -----
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => {
      const qty = item.cartQty ?? (typeof item.quantity === 'number' ? item.quantity : 1);
      const price = Number(
        item.unitPrice ??
        item.selectedVariant?.final_price ??
        item.selectedVariant?.finalPrice ??
        0
      );
      return sum + price * qty;
    }, 0),
    [cartItems]
  );

  const discountRate = 0; // change if you add coupons
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  // ----- qty / remove -----
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItem = cartItems.find((i) => i._id === itemId);
    if (!updatedItem) return;

    const updatedProduct = {
      ...updatedItem,
      cartQty: newQuantity,
      // keep this extra line only for backward-compat if you already stored numeric 'quantity'
      ...(typeof updatedItem.quantity === 'number' ? { quantity: newQuantity } : {})
    };

    dispatch(updateData(updatedProduct));
    toast.success('Item quantity updated!', { position: 'top-right', autoClose: 1500 });
  };


  const handleRemoveItem = (itemId) => {
    dispatch(deleteProduct(itemId));
    toast.info('Item removed from cart.', { position: 'top-right', autoClose: 1500 });
  };

  const handleClearCart = () => {
    dispatch(clearProducts());
    toast.info('Cart cleared.', { position: 'top-right', autoClose: 1500 });
  };

  const handleContinueShopping = () => navigate(-1);

  // ----- address: add/save/select -----
  const handleAddAddress = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?._id;
    if (!userId) {
      toast.error('User ID not found.');
      return;
    }
    const fullAddress = `${formData.flat}, ${formData.landmark}, ${formData.city}, ${formData.state}, ${formData.country}`;
    try {
      const response = await axiosInstance.put(`admin/updateAdmin/${userId}`, {
        address: [...addresses, fullAddress],
        phone: formData.phone,
      });
      if (response.status === 200) {
        toast.success('Address added successfully');
        setAddresses((prev) => [...prev, fullAddress]);
        setFormData((p) => ({ ...p, selectedAddress: fullAddress }));
        setShowModal(false);
      }
    } catch (error) {
      toast.error('Failed to update address');
      console.error('Address update error:', error);
    }
  };

  // ----- states/cities -----
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/states', { country: 'India' });
        setStates(res?.data?.data?.states?.map((s) => s.name) || []);
      } catch (e) {
        console.error('Error fetching states', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!formData.state) return;
    (async () => {
      try {
        const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
          country: 'India', state: formData.state
        });
        setCities(res?.data?.data || []);
      } catch (e) {
        console.error('Error fetching cities', e);
      }
    })();
  }, [formData.state]);

  // ----- load user addresses -----
  useEffect(() => {
    (async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData?._id;
        if (!userId) return;
        const response = await axiosInstance.get(`/admin/readAdmin/${userId}`);
        const userInfo = response?.data?.data;
        setOriginalAddress(userInfo);
        if (Array.isArray(userInfo?.address)) setAddresses(userInfo.address);
      } catch (e) {
        console.error('Error fetching address:', e);
      }
    })();
  }, []);

  // ----- razorpay -----
  const handleCheckout = () => {
    if (!formData.selectedAddress) {
      toast.warn('Please select an address before checkout.');
      return;
    }
    if (!window.Razorpay) {
      toast.error('Payment SDK not loaded. Please add Razorpay script on the page.');
      return;
    }
    const options = {
      key: 'rzp_live_hgk55iUzVRpKZ1',
      amount: Math.round(total * 100), // paise
      currency: 'INR',
      name: 'My Shop',
      description: 'Order Payment',
      handler: async function (response) {
        try {
          toast.success('Payment successful!');
          const userData = JSON.parse(localStorage.getItem('userData'));
          const orderPayload = {
            userId: userData?._id,
            // checkout payload price/qty (inside handleCheckout)
            // items: cartItems.map(item => ({
            //   productId: item._id,
            //   name: item.name,
            //   quantity: item.cartQty ?? (typeof item.quantity === 'number' ? item.quantity : 1),
            //   price: item.unitPrice ?? 0,
            // })),
            items: cartItems.map((item) => {
              const qty = item.cartQty ?? (typeof item.quantity === 'number' ? item.quantity : 1);
              const price = Number(
                item.unitPrice ??
                item.selectedVariant?.final_price ??
                item.selectedVariant?.finalPrice ??
                0
              );
              return {
                productId: item._id,
                name: item.name,
                quantity: qty,
                price,
              };
            }),

            address: formData.selectedAddress,
            phone: formData.phone || '9999999999',
            totalAmount: total,
            paymentId: response.razorpay_payment_id,
          };
          const res = await axiosInstance.post('/api/createOrder', orderPayload);
          if (res.status === 201) {
            dispatch(clearProducts());
            navigate('/success');
          } else {
            toast.error('Failed to place order.');
          }
        } catch (err) {
          console.error('Order creation error:', err);
          toast.error('Something went wrong while placing the order.');
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: formData.phone || '9999999999',
      },
      notes: { address: formData.selectedAddress },
      theme: { color: '#3399cc' },
    };
    const rz = new window.Razorpay(options);
    rz.open();
  };

  const isEmpty = (cartItems?.length || 0) === 0;

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: { xs: 4, lg: 5 }, minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 }, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 400, color: '#222', flex: 1, fontSize: { xs: '20px', md: '24px' } }}>
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </Typography>
        {!isEmpty && (
          <Button onClick={handleClearCart} variant="text" sx={{ textTransform: 'none', color: '#7d2a25', fontWeight: 600 }}>
            Clear Cart
          </Button>
        )}
      </Box>

      {/* Content */}
      {isEmpty ? (
        <EmptyCart onContinueShopping={handleContinueShopping} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
            {/* Items */}
            <Box sx={{ flex: 1 }}>
              <Grid container spacing={{ xs: 1, sm: 1.5, md: 1.5, lg: 2 }} justifyContent="center">
                {cartItems.map((item) => (
                  <Grid key={item._id} item xs={6} sm={4} md={4} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CartCard product={item} onRemove={handleRemoveItem} onUpdateQuantity={handleQuantityChange} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Summary */}
            <Box sx={{
              width: { xs: '100%', lg: 450 }, background: '#fff', borderRadius: 2, p: { xs: 2.5, md: 3.5 },
              height: 'fit-content', boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)', border: '1px solid #eee',
              position: 'sticky', top: 20
            }}>
              <Typography variant="h6" sx={{
                fontWeight: 500, color: '#222', mb: 3, fontSize: { xs: '20px', md: '22px' },
                textAlign: 'center', borderBottom: '2px solid #f0f0f0', pb: 1.5
              }}>
                Order Summary
              </Typography>

              {/* Saved addresses */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>Delivery Address</Typography>
                  <Button variant="text" onClick={() => setShowModal(true)} sx={{ textTransform: 'none', color: '#7d2a25', fontWeight: 700 }}>
                    + Add New Address
                  </Button>
                </Box>
                {addresses?.length ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {addresses.map((addr, idx) => (
                      <Box
                        key={`${addr}-${idx}`}
                        sx={{
                          border: '1px solid #eee', borderRadius: 1, px: 1.5, py: 1,
                          background: formData.selectedAddress === addr ? 'rgba(125,42,37,0.06)' : '#fff',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData((p) => ({ ...p, selectedAddress: addr }))}
                      >
                        <Typography sx={{ fontSize: 14 }}>
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={formData.selectedAddress === addr}
                            onChange={() => setFormData((p) => ({ ...p, selectedAddress: addr }))}
                            style={{ marginRight: 8 }}
                          />
                          {addr}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ color: '#777', fontSize: 14 }}>No address saved yet. Please add one.</Typography>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Money rows */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                  <Typography sx={{ color: '#555' }}>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{formatINR(subtotal)}</Typography>
                  
                </Box>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                  <Typography sx={{ color: '#28a745' }}>Discount</Typography>
                  <Typography sx={{ color: '#28a745', fontWeight: 600 }}>
                    {discount ? `- ${formatINR(discount)}` : formatINR(0)}
                  </Typography>
                </Box> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                  <Typography sx={{ color: '#555' }}>Shipping</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#28a745' }}>FREE</Typography>
                </Box>
                <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: '#333' }}>Total</Typography>
                  <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: '#7d2a25' }}>
                    {formatINR(total)}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={handleCheckout}
                fullWidth
                sx={{
                  background: '#7d2a25', color: '#fff', borderRadius: '10px',
                  py: { xs: 1.5, md: 2 }, textTransform: 'none', fontWeight: 1000,
                  fontSize: { xs: '16px', md: '18px' }, '&:hover': { background: '#611f18' },
                  boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
                }}
              >
                Proceed to Checkout
              </Button>

              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, color: '#666', lineHeight: 1.4 }}>
                  Free shipping on orders above ₹50,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Add address dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Address</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Flat / House"
              fullWidth
              size="small"
              value={formData.flat}
              onChange={(e) => setFormData((p) => ({ ...p, flat: e.target.value }))}
            />
            <TextField
              label="Landmark"
              fullWidth
              size="small"
              value={formData.landmark}
              onChange={(e) => setFormData((p) => ({ ...p, landmark: e.target.value }))}
            />

            <FormControl size="small" fullWidth sx={{ gridColumn: { xs: 'auto', sm: '1 / span 2' } }}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                label="State"
                value={formData.state}
                onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value, city: '' }))}
              >
                <MenuItem value=""><em>Select State</em></MenuItem>
                {states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth sx={{ gridColumn: { xs: 'auto', sm: '1 / span 2' } }}>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                label="City"
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                disabled={!formData.state}
              >
                <MenuItem value=""><em>Select City</em></MenuItem>
                {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField label="Country" fullWidth size="small" value="India" disabled />
            <TextField
              label="Phone Number"
              fullWidth
              size="small"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleAddAddress} variant="contained" sx={{ fontWeight: 600 }}>Add Address</Button>
          <Button onClick={() => setShowModal(false)} variant="outlined" color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar (optional app-level messages) */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 80, sm: 20, md: 20 } }}
      >
        <Alert severity={snack.severity} sx={{ width: '100%', fontSize: { xs: '14px', sm: '16px' } }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
//   MenuItem, Select, FormControl, InputLabel
// } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// import axiosInstance from '../common components/AxiosInstance';
// import { deleteProduct, updateData, clearProducts } from '../store/Action';
// import { publicUrl } from '../common components/PublicUrl';


// // ---------- helpers ----------
// const formatINR = (n) =>
//   new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(n || 0));

// const getItemPriceNumber = (item) => parseFloat(item?.consumer_price ?? item?.price ?? 0) || 0;

// // per-item cart quantity (fallback to old 'quantity' if you have legacy items)
// const getCartQty = (item) =>
//   typeof item?.cartQty === 'number'
//     ? item.cartQty
//     : (typeof item?.quantity === 'number' ? item.quantity : 1);

// // robust unit price (variant > unitPrice > consumer_price > price)
// const getUnitPrice = (item) =>
//   Number(
//     item?.unitPrice ??
//     item?.selectedVariant?.final_price ??
//     item?.selectedVariant?.finalPrice ??
//     item?.consumer_price ??
//     item?.price ??
//     0
//   );


// // ---------- Empty state ----------
// function EmptyCart({ onContinueShopping }) {
//   return (
//     <Box sx={{
//       width: '100%', minHeight: '70vh', display: 'flex',
//       flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' },
//       justifyContent: 'center', gap: { xs: 3, md: 5 }, pt: { xs: 2, md: 4 }
//     }}>
//       <Box sx={{ minWidth: { xs: 150, md: 190 }, textAlign: 'center', order: { xs: 1, md: 1 } }}>
//         <Box sx={{ width: { xs: 100, md: 130 }, height: { xs: 80, md: 110 }, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
//           <Box sx={{
//             width: { xs: 70, md: 90 }, height: { xs: 85, md: 110 }, backgroundColor: '#f6f1ef',
//             borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
//           }}>
//             <svg width="45" height="55" viewBox="0 0 65 75" fill="none">
//               <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none" />
//               <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25" />
//               <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5" />
//             </svg>
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mt: { xs: 2, md: 10 }, order: { xs: 2, md: 2 }, maxWidth: { xs: '100%', md: 400 } }}>
//         <Typography variant="h6" sx={{ color: '#702626', fontWeight: 600, mb: 0.75, fontSize: { xs: '18px', md: '20px' } }}>
//           Your Cart Is Empty!
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, color: '#702626', fontSize: { xs: '14px', md: '16px' } }}>
//           Add Chauhan Jewellers to your shopping cart
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={onContinueShopping}
//           sx={{
//             background: '#7d2a25', color: '#fff', borderRadius: '4px',
//             px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 }, textTransform: 'none',
//             fontWeight: 500, fontSize: { xs: '14px', md: '16px' }, '&:hover': { background: '#611f18' }
//           }}
//         >
//           Continue Shopping
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// // ---------- Item card ----------
// function CartCard({ product, onRemove, onUpdateQuantity }) {
//   const quantity = product.quantity || 1;

//   const parsedQuantities = useMemo(() => {
//     if (!Array.isArray(product.quantity)) return [];
//     try {
//       // Each entry is a stringified array, like: '[{"weight":"10", ...}]'
//       return product.quantity.flatMap(raw =>
//         Array.isArray(raw)
//           ? raw
//           : JSON.parse(raw)
//       );
//     } catch {
//       return [];
//     }
//   }, [product.quantity]);




//   return (
//     <Box sx={{
//       background: '#fff', borderRadius: 2, boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
//       border: '1px solid #eee', p: { xs: 1.5, sm: 2, md: 2 }, mb: 1.5, position: 'relative',
//       // height: { xs: 280, sm: 300, md: 320, lg: 340 },
//       width: { xs: 160, sm: 200, md: 240, lg: 280 },
//       maxWidth: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
//       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//       '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(70,21,7,0.15)' }
//     }}>
//       <IconButton
//         size="small"
//         onClick={() => onRemove(product._id)}
//         sx={{
//           position: 'absolute', top: { xs: 4, sm: 6, md: 8 }, right: { xs: 4, sm: 6, md: 8 },
//           backgroundColor: '#fff', border: '1px solid #bbb', zIndex: 2, width: { xs: 24, sm: 28, md: 32 },
//           height: { xs: 24, sm: 28, md: 32 },
//           '&:hover': { backgroundColor: '#f5f5f5', border: '1px solid #999' }
//         }}
//       >
//         <DeleteOutlineIcon sx={{ color: '#bbb', fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//       </IconButton>

//       <Box sx={{
//         width: '100%', height: { xs: 100, sm: 120, md: 140, lg: 160 }, display: 'flex',
//         alignItems: 'center', justifyContent: 'center', mb: { xs: 0.5, sm: 0.8, md: 1 }, overflow: 'hidden', borderRadius: 1
//       }}>
//         <img src={publicUrl(product?.media?.[0]?.url)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
//       </Box>

//       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//         <Box>
//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 400, color: '#333', fontFamily: 'serif',
//               mb: { xs: 0.3, sm: 0.5, md: 0.5 }, fontSize: { xs: 11, sm: 12, md: 15, lg: 20 },
//               display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
//             }}
//           >
//             {product.name}
//           </Typography>

//           {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.3, sm: 0.5, md: 0.5 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
//             <Typography sx={{ fontWeight: 500, color: '#272727', fontSize: { xs: 11, sm: 12, md: 13, lg: 14 } }}>
//               {formatINR(getItemPriceNumber(product))}
//             </Typography>
//             {product.retail_price && (
//               <Typography sx={{ color: '#bdbdbd', fontSize: { xs: 9, sm: 10, md: 11, lg: 12 }, textDecoration: 'line-through' }}>
//                 {formatINR(product.retail_price)}
//               </Typography>
//             )}
//           </Box> */}

//           {/* parsedQuantities.length > 0 && */}
//           {
//             parsedQuantities.map((q, idx) => (
//               <Box key={idx} sx={{ mt: 0.5 }}>
//                 <Typography variant="caption" color="textSecondary">
//                   Final Price: {formatINR(q.finalPrice)} | Discount: {q.discount}%
//                 </Typography>
//               </Box>
//             ))}



//           {product.weight && (
//             <Typography sx={{ color: '#666', fontSize: { xs: 9, sm: 10, md: 11, lg: 12 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
//               Weight: {product.weight}
//             </Typography>
//           )}
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 0.5, sm: 0.8, md: 1 } }}>
//           <Typography sx={{ fontSize: { xs: 10, sm: 11, md: 12, lg: 13 }, color: '#333', fontWeight: 500 }}>
//             Qty:
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product._id, quantity - 1)}
//               disabled={quantity <= 1}
//               sx={{
//                 width: { xs: 24, sm: 28, md: 32 }, height: { xs: 24, sm: 28, md: 32 }, borderRadius: 0,
//                 color: quantity <= 1 ? '#ccc' : '#7d2a25',
//                 '&:hover': { backgroundColor: quantity <= 1 ? 'transparent' : '#f5f5f5' }
//               }}
//             >
//               <RemoveIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//             <Typography sx={{ px: { xs: 1, sm: 1.5, md: 2 }, fontSize: { xs: 11, sm: 12, md: 13, lg: 14 }, fontWeight: 500, color: '#333', minWidth: { xs: 20, sm: 24, md: 28 }, textAlign: 'center' }}>
//               {quantity}
//             </Typography>
//             <IconButton
//               size="small"
//               onClick={() => onUpdateQuantity(product._id, quantity + 1)}
//               sx={{ width: { xs: 24, sm: 28, md: 32 }, height: { xs: 24, sm: 28, md: 32 }, borderRadius: 0, color: '#7d2a25', '&:hover': { backgroundColor: '#f5f5f5' } }}
//             >
//               <AddIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// // ---------- main ----------
// export default function CartPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [originalAddress, setOriginalAddress] = useState(null);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formData, setFormData] = useState({
//     flat: '', landmark: '', state: '', city: '', country: 'India', phone: '', selectedAddress: ''
//   });
//   const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

//   const cartItems = useSelector((state) => state.app.data || []);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ----- auth check -----
//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     if (userData) setIsAuthenticated(true);
//     else navigate('/login');
//   }, [navigate]);

//   // ----- totals -----
//   const subtotal = useMemo(
//     () => cartItems.reduce((sum, item) => sum + getItemPriceNumber(item) * (item.quantity || 1), 0),
//     [cartItems]
//   );
//   const discountRate = 0; // change if you add coupons
//   const discount = subtotal * discountRate;
//   const total = subtotal - discount;

//   // ----- qty / remove -----
//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedItem = cartItems.find((i) => i._id === itemId);
//     if (!updatedItem) return;
//     const updatedProduct = { ...updatedItem, quantity: newQuantity };
//     dispatch(updateData(updatedProduct));
//     toast.success('Item quantity updated!', { position: 'top-right', autoClose: 1500 });
//   };

//   const handleRemoveItem = (itemId) => {
//     dispatch(deleteProduct(itemId));
//     toast.info('Item removed from cart.', { position: 'top-right', autoClose: 1500 });
//   };

//   const handleClearCart = () => {
//     dispatch(clearProducts());
//     toast.info('Cart cleared.', { position: 'top-right', autoClose: 1500 });
//   };

//   const handleContinueShopping = () => navigate(-1);

//   // ----- address: add/save/select -----
//   const handleAddAddress = async () => {
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     const userId = userData?._id;
//     if (!userId) {
//       toast.error('User ID not found.');
//       return;
//     }
//     const fullAddress = `${formData.flat}, ${formData.landmark}, ${formData.city}, ${formData.state}, ${formData.country}`;
//     try {
//       const response = await axiosInstance.put(`admin/updateAdmin/${userId}`, {
//         address: [...addresses, fullAddress],
//         phone: formData.phone,
//       });
//       if (response.status === 200) {
//         toast.success('Address added successfully');
//         setAddresses((prev) => [...prev, fullAddress]);
//         setFormData((p) => ({ ...p, selectedAddress: fullAddress }));
//         setShowModal(false);
//       }
//     } catch (error) {
//       toast.error('Failed to update address');
//       console.error('Address update error:', error);
//     }
//   };

//   // ----- states/cities -----
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/states', { country: 'India' });
//         setStates(res?.data?.data?.states?.map((s) => s.name) || []);
//       } catch (e) {
//         console.error('Error fetching states', e);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (!formData.state) return;
//     (async () => {
//       try {
//         const res = await axiosInstance.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
//           country: 'India', state: formData.state
//         });
//         setCities(res?.data?.data || []);
//       } catch (e) {
//         console.error('Error fetching cities', e);
//       }
//     })();
//   }, [formData.state]);

//   // ----- load user addresses -----
//   useEffect(() => {
//     (async () => {
//       try {
//         const userData = JSON.parse(localStorage.getItem('userData'));
//         const userId = userData?._id;
//         if (!userId) return;
//         const response = await axiosInstance.get(`/admin/readAdmin/${userId}`);
//         const userInfo = response?.data?.data;
//         setOriginalAddress(userInfo);
//         if (Array.isArray(userInfo?.address)) setAddresses(userInfo.address);
//       } catch (e) {
//         console.error('Error fetching address:', e);
//       }
//     })();
//   }, []);

//   // ----- razorpay -----
//   const handleCheckout = () => {
//     if (!formData.selectedAddress) {
//       toast.warn('Please select an address before checkout.');
//       return;
//     }
//     if (!window.Razorpay) {
//       toast.error('Payment SDK not loaded. Please add Razorpay script on the page.');
//       return;
//     }
//     const options = {
//       key: 'rzp_live_hgk55iUzVRpKZ1',
//       amount: Math.round(total * 100), // paise
//       currency: 'INR',
//       name: 'My Shop',
//       description: 'Order Payment',
//       handler: async function (response) {
//         try {
//           toast.success('Payment successful!');
//           const userData = JSON.parse(localStorage.getItem('userData'));
//           const orderPayload = {
//             userId: userData?._id,
//             items: cartItems.map((item) => ({
//               productId: item._id,
//               name: item.name,
//               quantity: item.quantity || 1,
//               price: getItemPriceNumber(item),
//             })),
//             address: formData.selectedAddress,
//             phone: formData.phone || '9999999999',
//             totalAmount: total,
//             paymentId: response.razorpay_payment_id,
//           };
//           const res = await axiosInstance.post('/api/createOrder', orderPayload);
//           if (res.status === 201) {
//             dispatch(clearProducts());
//             navigate('/success');
//           } else {
//             toast.error('Failed to place order.');
//           }
//         } catch (err) {
//           console.error('Order creation error:', err);
//           toast.error('Something went wrong while placing the order.');
//         }
//       },
//       prefill: {
//         name: 'Test User',
//         email: 'test@example.com',
//         contact: formData.phone || '9999999999',
//       },
//       notes: { address: formData.selectedAddress },
//       theme: { color: '#3399cc' },
//     };
//     const rz = new window.Razorpay(options);
//     rz.open();
//   };

//   const isEmpty = (cartItems?.length || 0) === 0;

//   return (
//     <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: { xs: 4, lg: 5 }, minHeight: '100vh', backgroundColor: '#fafafa' }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 }, gap: 2, flexWrap: 'wrap' }}>
//         <Typography variant="h6" sx={{ fontWeight: 400, color: '#222', flex: 1, fontSize: { xs: '20px', md: '24px' } }}>
//           Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
//         </Typography>
//         {!isEmpty && (
//           <Button onClick={handleClearCart} variant="text" sx={{ textTransform: 'none', color: '#7d2a25', fontWeight: 600 }}>
//             Clear Cart
//           </Button>
//         )}
//       </Box>

//       {/* Content */}
//       {isEmpty ? (
//         <EmptyCart onContinueShopping={handleContinueShopping} />
//       ) : (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
//             {/* Items */}
//             <Box sx={{ flex: 1 }}>
//               <Grid container spacing={{ xs: 1, sm: 1.5, md: 1.5, lg: 2 }} justifyContent="center">
//                 {cartItems.map((item) => (
//                   <Grid key={item._id} item xs={6} sm={4} md={4} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <CartCard product={item} onRemove={handleRemoveItem} onUpdateQuantity={handleQuantityChange} />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>

//             {/* Summary */}
//             <Box sx={{
//               width: { xs: '100%', lg: 450 }, background: '#fff', borderRadius: 2, p: { xs: 2.5, md: 3.5 },
//               height: 'fit-content', boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)', border: '1px solid #eee',
//               position: 'sticky', top: 20
//             }}>
//               <Typography variant="h6" sx={{
//                 fontWeight: 500, color: '#222', mb: 3, fontSize: { xs: '20px', md: '22px' },
//                 textAlign: 'center', borderBottom: '2px solid #f0f0f0', pb: 1.5
//               }}>
//                 Order Summary
//               </Typography>

//               {/* Saved addresses */}
//               <Box sx={{ mb: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                   <Typography sx={{ fontWeight: 600 }}>Delivery Address</Typography>
//                   <Button variant="text" onClick={() => setShowModal(true)} sx={{ textTransform: 'none', color: '#7d2a25', fontWeight: 700 }}>
//                     + Add New Address
//                   </Button>
//                 </Box>
//                 {addresses?.length ? (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                     {addresses.map((addr, idx) => (
//                       <Box
//                         key={`${addr}-${idx}`}
//                         sx={{
//                           border: '1px solid #eee', borderRadius: 1, px: 1.5, py: 1,
//                           background: formData.selectedAddress === addr ? 'rgba(125,42,37,0.06)' : '#fff',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => setFormData((p) => ({ ...p, selectedAddress: addr }))}
//                       >
//                         <Typography sx={{ fontSize: 14 }}>
//                           <input
//                             type="radio"
//                             name="selectedAddress"
//                             checked={formData.selectedAddress === addr}
//                             onChange={() => setFormData((p) => ({ ...p, selectedAddress: addr }))}
//                             style={{ marginRight: 8 }}
//                           />
//                           {addr}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 ) : (
//                   <Typography sx={{ color: '#777', fontSize: 14 }}>No address saved yet. Please add one.</Typography>
//                 )}
//               </Box>

//               <Divider sx={{ my: 2 }} />

//               {/* Money rows */}
//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
//                   <Typography sx={{ color: '#555' }}>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</Typography>
//                   <Typography sx={{ fontWeight: 600 }}>{formatINR(subtotal)}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
//                   <Typography sx={{ color: '#28a745' }}>Discount</Typography>
//                   <Typography sx={{ color: '#28a745', fontWeight: 600 }}>
//                     {discount ? `- ${formatINR(discount)}` : formatINR(0)}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
//                   <Typography sx={{ color: '#555' }}>Shipping</Typography>
//                   <Typography sx={{ fontWeight: 600, color: '#28a745' }}>FREE</Typography>
//                 </Box>
//                 <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: '#333' }}>Total</Typography>
//                   <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: '#7d2a25' }}>
//                     {formatINR(total)}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={handleCheckout}
//                 fullWidth
//                 sx={{
//                   background: '#7d2a25', color: '#fff', borderRadius: '10px',
//                   py: { xs: 1.5, md: 2 }, textTransform: 'none', fontWeight: 1000,
//                   fontSize: { xs: '16px', md: '18px' }, '&:hover': { background: '#611f18' },
//                   boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
//                 }}
//               >
//                 Proceed to Checkout
//               </Button>

//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
//                 <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, color: '#666', lineHeight: 1.4 }}>
//                   Free shipping on orders above ₹50,000
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Add address dialog */}
//       <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Address</DialogTitle>
//         <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//             <TextField
//               label="Flat / House"
//               fullWidth
//               size="small"
//               value={formData.flat}
//               onChange={(e) => setFormData((p) => ({ ...p, flat: e.target.value }))}
//             />
//             <TextField
//               label="Landmark"
//               fullWidth
//               size="small"
//               value={formData.landmark}
//               onChange={(e) => setFormData((p) => ({ ...p, landmark: e.target.value }))}
//             />

//             <FormControl size="small" fullWidth sx={{ gridColumn: { xs: 'auto', sm: '1 / span 2' } }}>
//               <InputLabel id="state-label">State</InputLabel>
//               <Select
//                 labelId="state-label"
//                 label="State"
//                 value={formData.state}
//                 onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value, city: '' }))}
//               >
//                 <MenuItem value=""><em>Select State</em></MenuItem>
//                 {states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//               </Select>
//             </FormControl>

//             <FormControl size="small" fullWidth sx={{ gridColumn: { xs: 'auto', sm: '1 / span 2' } }}>
//               <InputLabel id="city-label">City</InputLabel>
//               <Select
//                 labelId="city-label"
//                 label="City"
//                 value={formData.city}
//                 onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
//                 disabled={!formData.state}
//               >
//                 <MenuItem value=""><em>Select City</em></MenuItem>
//                 {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
//               </Select>
//             </FormControl>

//             <TextField label="Country" fullWidth size="small" value="India" disabled />
//             <TextField
//               label="Phone Number"
//               fullWidth
//               size="small"
//               value={formData.phone}
//               onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
//               InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2 }}>
//           <Button onClick={handleAddAddress} variant="contained" sx={{ fontWeight: 600 }}>Add Address</Button>
//           <Button onClick={() => setShowModal(false)} variant="outlined" color="secondary">Cancel</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar (optional app-level messages) */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         sx={{ bottom: { xs: 80, sm: 20, md: 20 } }}
//       >
//         <Alert severity={snack.severity} sx={{ width: '100%', fontSize: { xs: '14px', sm: '16px' } }}>
//           {snack.msg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

