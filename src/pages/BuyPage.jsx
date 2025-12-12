// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
//   MenuItem, Select, FormControl, InputLabel, Container, Paper, Card,
//   Checkbox, FormControlLabel
// } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import SecurityIcon from '@mui/icons-material/Security';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import axiosInstance from '../commonComponents/AxiosInstance';
// import { deleteProduct, updateData, clearProducts, addData } from '../store/Action';
// import { publicUrl } from '../commonComponents/PublicUrl';
// import Theme from '../../Theme';

// // ---------- helpers ----------
// const formatINR = (n) =>
//   new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(n || 0));

// // ---------- Single Product Card ----------
// function SingleProductCard({ product, units, onUpdateQuantity }) {
//   const quantity = units;
//   const variant = product?.selectedVariant ?? product?.quantity?.[0] ?? {};
//   const fp = Number(variant.final_price ?? variant.finalPrice ?? product?.unitPrice ?? product?.price ?? 0);
//   const navigate = useNavigate();
//   const [giftWrap, setGiftWrap] = useState(false);

//   if (!product) return null;

//   return (
//     <div className="cart-card">
//       {/* Product Header */}
//       <div className="cart-card-header">
//         <Typography variant="h6" className="product-name">
//           {product.name || 'Product Name'}
//         </Typography>
//         <Typography variant="h6" className="product-price">
//           {formatINR(fp)}
//         </Typography>
//       </div>

//       {/* Delivery Info */}
//       <div className="delivery-info">
//         <LocalShippingIcon className="delivery-icon" />
//         <Typography variant="body2" className="delivery-text">
//           Free Delivery
//         </Typography>
//       </div>

//       {/* Gift Wrap Section */}
//       <div className="gift-wrap-section">
//         <FormControlLabel
//           control={
//             <Checkbox 
//               checked={giftWrap} 
//               onChange={(e) => setGiftWrap(e.target.checked)}
//               size="small" 
//             />
//           }
//           label={
//             <Typography variant="body2" className="gift-wrap-text">
//               Add a gift wrap & a message with this item (+ ₹50)
//             </Typography>
//           }
//         />
//       </div>

//       {/* Product Details */}
//       <div className="product-details">
//         {/* Product Image */}
//         <div 
//           className="product-image"
//           onClick={() => navigate(`/singleProduct/${product._id}`)}
//         >
//           <img 
//             src={publicUrl(product?.media?.[0]?.url || product?.frontImage)} 
//             alt={product.name} 
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
//             }}
//           />
//         </div>

//         {/* Product Info */}
//         <div className="product-info">
//           <Typography variant="body2" className="product-name-sm">
//             {product.name}
//           </Typography>
//           {variant?.weight && (
//             <Typography variant="caption" className="product-weight">
//               Weight: {variant.weight}g{variant.carat ? ` / ${variant.carat}kt` : ""}
//             </Typography>
//           )}
          
//           {/* Quantity Controls */}
//           <div className="quantity-controls">
//             <Typography variant="body2" className="quantity-label">
//               Qty:
//             </Typography>
//             <div className="quantity-buttons">
//               <IconButton
//                 size="small"
//                 onClick={() => onUpdateQuantity(quantity - 1)}
//                 disabled={quantity <= 1}
//                 className="quantity-btn"
//               >
//                 <RemoveIcon />
//               </IconButton>
//               <Typography className="quantity-display">
//                 {quantity}
//               </Typography>
//               <IconButton
//                 size="small"
//                 onClick={() => onUpdateQuantity(quantity + 1)}
//                 className="quantity-btn"
//               >
//                 <AddIcon />
//               </IconButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Enhanced Order Summary with Address ----------
// function OrderSummary({ 
//   product,
//   units, 
//   subtotal, 
//   total, 
//   formData, 
//   handleCheckout, 
//   addresses, 
//   setFormData, 
//   setShowModal, 
//   phoneError, 
//   handlePhoneChange, 
//   handlePhoneBlur 
// }) {
//   const [giftWrapAll, setGiftWrapAll] = useState(false);
//   const [insurance, setInsurance] = useState(false);
//   const [expressDelivery, setExpressDelivery] = useState(false);

//   const deliveryFee = expressDelivery ? 199 : 0;
//   const giftWrapFee = giftWrapAll ? 80 : 0;
//   const insuranceFee = insurance ? Math.round(total * 0.02) : 0;
//   const finalTotal = total + deliveryFee + giftWrapFee + insuranceFee;

//   return (
//     <div className="order-summary">
//       {/* Header */}
//       <div className="summary-header">
//         <Typography variant="h5" className="summary-title">
//           Order Summary
//         </Typography>
//         <Typography variant="body2" className="summary-subtitle">
//           1 item in cart
//         </Typography>
//       </div>

//       {/* Delivery Address Section */}
//       <div className="address-section">
//         <div className="section-title">
//           <LocationOnIcon className="section-icon" />
//           <Typography variant="h6" className="section-title-text">
//             Delivery Address
//           </Typography>
//         </div>

//         {addresses?.length ? (
//           <div className="address-list">
//             {addresses.map((addr, idx) => (
//               <div
//                 key={`${addr.address}-${idx}`}
//                 className={`address-item ${formData.selectedAddress === addr.address ? 'selected' : ''}`}
//                 onClick={() => {
//                   setFormData((p) => ({ 
//                     ...p, 
//                     selectedAddress: addr.address,
//                     phone: addr.phone || p.phone,
//                     email: addr.email || p.email,
//                     name: addr.name || p.name
//                   }));
//                 }}
//               >
//                 <Typography className="address-radio">
//                   <input
//                     type="radio"
//                     name="selectedAddress"
//                     checked={formData.selectedAddress === addr.address}
//                     onChange={() => {
//                       setFormData((p) => ({ 
//                         ...p, 
//                         selectedAddress: addr.address,
//                         phone: addr.phone || p.phone,
//                         email: addr.email || p.email,
//                         name: addr.name || p.name
//                       }));
//                     }}
//                   />
//                   Address {idx + 1}
//                 </Typography>
//                 <Typography className="address-text">
//                   {addr.address}
//                 </Typography>
//                 {addr.email && (
//                   <Typography className="address-email" variant="caption">
//                     📧 {addr.email}
//                   </Typography>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="no-address">
//             <LocationOnIcon className="no-address-icon" />
//             <Typography className="no-address-text">No address saved yet</Typography>
//           </div>
//         )}

//         <Button 
//           variant="outlined" 
//           onClick={() => setShowModal(true)} 
//           fullWidth
//           className="add-address-btn"
//         >
//           + Add New Address
//         </Button>

//         {/* Phone Number Input */}
//         <div className="phone-input">
//           <Typography className="phone-label">Contact Number</Typography>
//           <TextField
//             fullWidth
//             size="small"
//             value={formData.phone}
//             onChange={handlePhoneChange}
//             onBlur={handlePhoneBlur}
//             error={phoneError}
//             helperText={phoneError ? "Phone number must be exactly 10 digits" : ""}
//             InputProps={{ 
//               startAdornment: <InputAdornment position="start">+91</InputAdornment>
//             }}
//             placeholder="Enter your phone number"
//           />
//         </div>
//       </div>

//       <Divider className="section-divider" />

//       {/* Price Breakdown */}
//       <div className="price-breakdown">
//         <div className="price-row">
//           <Typography variant="body2" className="price-label">
//             Subtotal ({units} {units === 1 ? 'item' : 'items'})
//           </Typography>
//           <Typography variant="body2" className="price-value">
//             {formatINR(subtotal)}
//           </Typography>
//         </div>

//         {/* Additional Services */}
//         <div className="service-option">
//           <FormControlLabel
//             control={
//               <Checkbox 
//                 checked={giftWrapAll} 
//                 onChange={(e) => setGiftWrapAll(e.target.checked)}
//                 size="small"
//               />
//             }
//             label={
//               <div className="service-label">
//                 <Typography variant="body2" className="service-name">
//                   Gift Wrap
//                 </Typography>
//                 <Typography variant="body2" className="service-price">
//                   +{formatINR(80)}
//                 </Typography>
//               </div>
//             }
//           />
//         </div>

//         <div className="service-option">
//           <FormControlLabel
//             control={
//               <Checkbox 
//                 checked={expressDelivery} 
//                 onChange={(e) => setExpressDelivery(e.target.checked)}
//                 size="small"
//               />
//             }
//             label={
//               <div className="service-label">
//                 <div>
//                   <Typography variant="body2" className="service-name">
//                     Express Delivery
//                   </Typography>
//                   <Typography variant="caption" className="service-desc">
//                     Delivery in 24 hours
//                   </Typography>
//                 </div>
//                 <Typography variant="body2" className="service-price">
//                   +{formatINR(199)}
//                 </Typography>
//               </div>
//             }
//           />
//         </div>

//         <div className="service-option">
//           <FormControlLabel
//             control={
//               <Checkbox 
//                 checked={insurance} 
//                 onChange={(e) => setInsurance(e.target.checked)}
//                 size="small"
//               />
//             }
//             label={
//               <div className="service-label">
//                 <div>
//                   <Typography variant="body2" className="service-name">
//                     Jewelry Insurance
//                   </Typography>
//                   <Typography variant="caption" className="service-desc">
//                     Theft & Damage protection (1 year)
//                   </Typography>
//                 </div>
//                 <Typography variant="body2" className="service-price">
//                   +{formatINR(insuranceFee)}
//                 </Typography>
//               </div>
//             }
//           />
//         </div>

//         {/* Final Total */}
//         <div className="final-total">
//           <Typography variant="h6" className="total-label">
//             Total Amount
//           </Typography>
//           <Typography variant="h5" className="total-value">
//             {formatINR(finalTotal)}
//           </Typography>
//         </div>
//       </div>

//       {/* Progress Bar for Free Shipping */}
//       <div className="shipping-progress">
//         <div className="progress-header">
//           <Typography variant="caption" className="progress-title">
//             🚚 Free Shipping
//           </Typography>
//           <Typography variant="caption" className="progress-amount">
//             {finalTotal >= 50000 ? 'Unlocked! 🎉' : `${formatINR(50000 - finalTotal)} more to go`}
//           </Typography>
//         </div>
//         <div className="progress-bar">
//           <div 
//             className="progress-fill"
//             style={{ width: `${Math.min((finalTotal / 50000) * 100, 100)}%` }}
//           />
//         </div>
//         <Typography variant="caption" className="progress-note">
//           Get free shipping on orders above ₹50,000
//         </Typography>
//       </div>

//       {/* Checkout Button - Direct to payment */}
//       <Button
//         variant="contained"
//         onClick={() => handleCheckout(finalTotal)}
//         disabled={!formData.selectedAddress || !formData.phone || phoneError}
//         fullWidth
//         className="checkout-btn"
//       >
//         🛒 Proceed to Secure Checkout
//       </Button>

//       {/* Trust Badges */}
//       <div className="trust-badges">
//         <div className="badge-container">
//           <div className="badge">
//             <SecurityIcon className="badge-icon" />
//             <Typography variant="caption" className="badge-text">
//               100% Secure
//             </Typography>
//           </div>
//           <div className="badge">
//             <LocalShippingIcon className="badge-icon" />
//             <Typography variant="caption" className="badge-text">
//               Free Returns
//             </Typography>
//           </div>
//           <div className="badge">
//             <CardGiftcardIcon className="badge-icon" />
//             <Typography variant="caption" className="badge-text">
//               Gift Ready
//             </Typography>
//           </div>
//         </div>
//         <Typography variant="caption" className="security-note">
//           🔒 SSL Encrypted · 256-bit Security
//         </Typography>
//       </div>
//     </div>
//   );
// }

// // ---------- main ----------
// export default function BuyNowPage() {
//   const [showModal, setShowModal] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [originalAddress, setOriginalAddress] = useState(null);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [phoneError, setPhoneError] = useState(false);
//   const [units, setUnits] = useState(1);
//   const [formData, setFormData] = useState({
//     flat: '', landmark: '', state: '', city: '', country: 'India', 
//     phone: '', selectedAddress: '', pincode: '', email: '', name: ''
//   });
//   const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Debug navigation state
//   console.log('Location state:', location.state);

//   // Get product data from navigation state with better error handling
//   const { product, units: initialUnits } = location.state || {};
  
//   // Initialize units from navigation state
//   useEffect(() => {
//     if (initialUnits) {
//       setUnits(initialUnits);
//     }
//   }, [initialUnits]);

//   // Fallback: If no product in state, try to get from localStorage or redirect
//   useEffect(() => {
//     if (!product) {
//       const savedProduct = localStorage.getItem('buyNowProduct');
//       if (savedProduct) {
//         // If we have saved product, use it
//         const parsedProduct = JSON.parse(savedProduct);
//         navigate('/buy-now', { 
//           state: { product: parsedProduct, units: units },
//           replace: true 
//         });
//       } else {
//         // If no product found, redirect back after a delay
//         toast.error('Product not found. Redirecting...');
//         setTimeout(() => {
//           navigate(-1);
//         }, 2000);
//       }
//     } else {
//       // Save product to localStorage as backup
//       localStorage.setItem('buyNowProduct', JSON.stringify(product));
//     }
//   }, [product, navigate, units]);

//   // Pre-fill email and name from localStorage if available
//   useEffect(() => {
//     const savedEmail = localStorage.getItem('cartEmail');
//     const savedName = localStorage.getItem('cartName');
//     if (savedEmail || savedName) {
//       setFormData(p => ({
//         ...p,
//         email: savedEmail || p.email,
//         name: savedName || p.name
//       }));
//     }
//   }, []);

//   // Load addresses from localStorage or API
//   useEffect(() => {
//     // Load addresses from localStorage first
//     const cartAddresses = JSON.parse(localStorage.getItem('cartAddresses') || '[]');
//     if (cartAddresses.length > 0) {
//       setAddresses(cartAddresses);
//       if (!formData.selectedAddress && cartAddresses.length > 0) {
//         setFormData((p) => ({ 
//           ...p, 
//           selectedAddress: cartAddresses[0].address,
//           phone: cartAddresses[0].phone || p.phone,
//           email: cartAddresses[0].email || p.email,
//           name: cartAddresses[0].name || p.name
//         }));
//       }
//       return;
//     }

//     // Fallback to API if user is authenticated
//     (async () => {
//       try {
//         const userData = JSON.parse(localStorage.getItem('userData'));
//         const userId = userData?._id;
//         if (!userId) return;
        
//         const response = await axiosInstance.get(`/admin/readAdmin/${userId}`);
//         const userInfo = response?.data?.data;
//         setOriginalAddress(userInfo);
//         if (Array.isArray(userInfo?.address)) {
//           const formattedAddresses = userInfo.address.map(addr => ({
//             address: addr,
//             email: userInfo.email,
//             name: userInfo.name,
//             phone: userInfo.phone
//           }));
//           setAddresses(formattedAddresses);
//           // Also save to localStorage for future use
//           localStorage.setItem('cartAddresses', JSON.stringify(formattedAddresses));
//           if (!formData.selectedAddress && formattedAddresses.length > 0) {
//             setFormData((p) => ({ 
//               ...p, 
//               selectedAddress: formattedAddresses[0].address,
//               phone: formattedAddresses[0].phone || p.phone,
//               email: formattedAddresses[0].email || p.email,
//               name: formattedAddresses[0].name || p.name
//             }));
//           }
//         }
//       } catch (e) {
//         console.error('Error fetching address:', e);
//       }
//     })();
//   }, []);

//   if (!product) {
//     return (
//       <div className="error-container">
//         <Typography variant="h5" className="error-text">
//           Loading product...
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={() => navigate('/')}
//           className="back-button"
//         >
//           Go Back to Home
//         </Button>
//       </div>
//     );
//   }

//   // ----- totals -----
//   const unitPrice = Number(
//     product.unitPrice ??
//     product.selectedVariant?.final_price ??
//     product.selectedVariant?.finalPrice ??
//     product.price ??
//     0
//   );

//   const subtotal = unitPrice * units;
//   const discountRate = 0;
//   const discount = subtotal * discountRate;
//   const total = subtotal - discount;

//   // ----- qty / remove -----
//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity < 1) return;
//     setUnits(newQuantity);
//   };

//   const handleAddToCart = () => {
//     const cartItem = {
//       ...product,
//       cartQty: units,
//       unitPrice: unitPrice,
//     };

//     dispatch(addData(cartItem));
//     toast.success('Item added to cart successfully!', { position: 'top-right', autoClose: 1500 });
//   };

//   const handleContinueShopping = () => navigate(-1);

//   const handleAddAddress = async () => {
//     // Email validation
//     if (!formData.email?.trim()) {
//       toast.error('Email is required');
//       return;
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email.trim())) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     if (!formData.name?.trim()) {
//       toast.error('Full name is required');
//       return;
//     }

//     if (!formData.flat?.trim()) {
//       toast.error('Flat / House is required');
//       return;
//     }
    
//     if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
//       toast.error('Phone number is required and must be exactly 10 digits');
//       return;
//     }

//     if (!formData.pincode?.trim()) {
//       toast.error('Pincode is required');
//       return;
//     }

//     const addressObj = {
//       address: `${formData.flat}, ${formData.landmark}, ${formData.city}, ${formData.state}, ${formData.country} ,${formData.pincode}`,
//       email: formData.email.trim(),
//       name: formData.name.trim(),
//       phone: formData.phone
//     };

//     try {
//       // Save address locally with email
//       const newAddresses = [...addresses, addressObj];
//       setAddresses(newAddresses);
      
//       // Save to localStorage for persistence
//       const cartAddresses = JSON.parse(localStorage.getItem('cartAddresses') || '[]');
//       cartAddresses.push(addressObj);
//       localStorage.setItem('cartAddresses', JSON.stringify(cartAddresses));
      
//       // Save email and name separately for future use
//       localStorage.setItem('cartEmail', formData.email.trim());
//       localStorage.setItem('cartName', formData.name.trim());
      
//       toast.success('Address added successfully');
//       setFormData((p) => ({ ...p, selectedAddress: addressObj.address }));
//       setShowModal(false);
      
//       // Reset form but keep email/name for next time
//       setFormData({
//         flat: '', landmark: '', state: '', city: '', country: 'India', 
//         phone: '', selectedAddress: addressObj.address, pincode: '',
//         email: formData.email, // Keep email
//         name: formData.name    // Keep name
//       });
//     } catch (error) {
//       toast.error('Failed to add address');
//       console.error('Address add error:', error);
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

//   // ----- razorpay -----
//   const handleCheckout = (finalTotal) => {
//     // Direct payment flow - no login check
//     if (!formData.selectedAddress) {
//       toast.warn('Please select an address before checkout.');
//       return;
//     }

//     const phoneNumber = formData.phone || originalAddress?.phone || "";
//     const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
//     // Check if phone number is provided
//     if (!phoneNumber || phoneNumber.length !== 10) {
//       toast.warn('Please enter a valid 10-digit phone number before checkout.');
//       return;
//     }

//     const options = {
//       key: 'rzp_test_RpQ1JwSJEy6yAw', // Replace with your Razorpay key
//       amount: Math.round(finalTotal * 100),
//       currency: 'INR',
//       name: 'Chauhan Sons Jewellers',
//       description: 'Order Payment',
//       handler: async function (response) {
//         try {
//           toast.success('Payment successful!');

//           // Get user data from localStorage or use form data
//           const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//           const userEmail = userData?.email || formData.email || 'guest@example.com';
//           const userName = userData?.name || formData.name || 'Guest User';
//           const userId = userData?._id || 'guest';

//           const orderPayload = {
//             userId: userId,
//             userEmail: userEmail,
//             userName: userName,
//             items: [{
//               productId: product._id,
//               name: product.name,
//               quantity: units,
//               price: unitPrice,
//             }],
//             address: formData.selectedAddress,
//             phone: phoneNumber,
//             totalAmount: finalTotal,
//             // paymentId: response.razorpay_payment_id,
//           };
          
//           console.log("Order payload:", orderPayload);
          
//           const res = await axiosInstance.post('/api/createOrder', orderPayload);
//           if (res.status === 201) {
//             // Clear stored data after successful order
//             localStorage.removeItem('buyNowProduct');
//             localStorage.removeItem('cartAddresses');
//             navigate('/successOrder');
//           } else {
//             toast.error('Failed to place order.');
//           }
//         } catch (err) {
//           console.error('Order creation error:', err);
//           toast.error('Something went wrong while placing the order.');
//         }
//       },
//       prefill: {
//         name: userData?.name || formData.name || 'Customer',
//         email: userData?.email || formData.email || 'customer@example.com',
//         contact: phoneNumber,
//       },
//       notes: { address: formData.selectedAddress },
//       theme: { color: Theme.palette.primary.main },
//     };
    
//     const rz = new window.Razorpay(options);
//     rz.open();
//   };

//   const handlePhoneChange = (e) => {
//     let value = e.target.value.replace(/\D/g, '');
//     if (value.length > 10) value = value.slice(0, 10);
//     setFormData((p) => ({ ...p, phone: value }));
//   };

//   const handlePhoneBlur = () => {
//     setPhoneError(formData.phone.length !== 10 || !/^[1-9][0-9]{9}$/.test(formData.phone));
//   };

//   return (
//     <div className="cart-page">
//       <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
//       {/* Header */}
//       <div className="cart-header">
//         <div className="header-left">
//           <ShoppingBagIcon className="cart-icon" />
//           <Typography variant="h4" className="cart-title">
//             Buy Now
//           </Typography>
//         </div>
//         <div className="header-actions">
//           <Button onClick={handleAddToCart} variant="outlined" className="add-to-cart-btn">
//             Add to Cart Instead
//           </Button>
//           <Button onClick={handleContinueShopping} variant="text" className="continue-btn">
//             Continue Shopping
//           </Button>
//         </div>
//       </div>

//       {/* Item Count */}
//       <Typography variant="h6" className="cart-count">
//         1 item in your order
//       </Typography>

//       {/* Content */}
//       <div className="cart-content">
//         {/* Left Column - Product */}
//         <div className="products-column">
//           <Paper className="products-paper">
//             <Typography variant="h6" className="products-title">
//               Your Item
//             </Typography>
//             <div className="products-list">
//               <SingleProductCard 
//                 product={product}
//                 units={units}
//                 onUpdateQuantity={handleQuantityChange}
//               />
//             </div>
//           </Paper>
//         </div>

//         {/* Right Column - Order Summary */}
//         <div className="summary-column">
//           <OrderSummary
//             product={product}
//             units={units}
//             subtotal={subtotal}
//             total={total}
//             formData={formData}
//             handleCheckout={handleCheckout}
//             addresses={addresses}
//             setFormData={setFormData}
//             setShowModal={setShowModal}
//             phoneError={phoneError}
//             handlePhoneChange={handlePhoneChange}
//             handlePhoneBlur={handlePhoneBlur}
//           />
//         </div>
//       </div>

//       {/* Add address dialog */}
//       <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
//         <DialogTitle className="dialog-title">Add New Address</DialogTitle>
//         <form onSubmit={(e) => { e.preventDefault(); handleAddAddress(); }}>
//           <DialogContent className="dialog-content">
//             <div className="address-form-grid">
//               <TextField
//                 label="Full Name"
//                 fullWidth
//                 required
//                 size="small"
//                 value={formData.name}
//                 onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
//               />
//               <TextField
//                 label="Email"
//                 fullWidth
//                 required
//                 size="small"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
//                 onBlur={() => {
//                   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                   if (formData.email && !emailRegex.test(formData.email)) {
//                     toast.error('Please enter a valid email address');
//                   }
//                 }}
//               />
//               <TextField
//                 label="Flat / House"
//                 fullWidth
//                 required
//                 size="small"
//                 value={formData.flat}
//                 onChange={(e) => setFormData((p) => ({ ...p, flat: e.target.value }))}
//               />
//               <TextField
//                 label="Landmark"
//                 fullWidth
//                 size="small"
//                 value={formData.landmark}
//                 onChange={(e) => setFormData((p) => ({ ...p, landmark: e.target.value }))}
//               />
//               <FormControl size="small" fullWidth className="form-control-wide">
//                 <InputLabel id="state-label">State</InputLabel>
//                 <Select
//                   labelId="state-label"
//                   label="State"
//                   value={formData.state}
//                   required
//                   onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value, city: '' }))}
//                 >
//                   <MenuItem value=""><em>Select State</em></MenuItem>
//                   {states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//                 </Select>
//               </FormControl>
//               <FormControl size="small" fullWidth className="form-control-wide">
//                 <InputLabel id="city-label">City</InputLabel>
//                 <Select
//                   labelId="city-label"
//                   label="City"
//                   value={formData.city}
//                   required
//                   onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
//                   disabled={!formData.state}
//                 >
//                   <MenuItem value=""><em>Select City</em></MenuItem>
//                   {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
//                 </Select>
//               </FormControl>
//               <TextField label="Country" fullWidth required size="small" value="India" disabled />
//               <TextField
//                 label="Phone Number"
//                 fullWidth
//                 required
//                 size="small"
//                 value={formData.phone}
//                 onChange={handlePhoneChange}
//                 onBlur={handlePhoneBlur}
//                 error={phoneError}
//                 helperText={phoneError ? "Phone number must be exactly 10 digits" : ""}
//                 InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
//               />
//               <TextField
//                 label="Pincode"
//                 fullWidth
//                 required
//                 size="small"
//                 value={formData.pincode}
//                 onChange={(e) => setFormData((p) => ({ ...p, pincode: e.target.value }))}
//               />
//             </div>
//           </DialogContent>
//           <DialogActions className="dialog-actions">
//             <Button type="submit" variant="contained" className="add-address-dialog-btn">
//               Add Address
//             </Button>
//             <Button onClick={() => setShowModal(false)} variant="outlined" color="secondary">
//               Cancel
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snack.severity} sx={{ width: '100%' }}>
//           {snack.msg}
//         </Alert>
//       </Snackbar>

//       <style jsx>{`
//         .cart-page {
//           padding: 2rem;
//           min-height: 100vh;
//           background-color: #fafafa;
//           max-width: 100%;
//         }

//         .cart-header {
//           display: flex;
//           align-items: center;
//           margin-bottom: 2rem;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .header-left {
//           display: flex;
//           align-items: center;
//           flex: 1;
//         }

//         .cart-icon {
//           color: #7d2a25;
//           margin-right: 1rem;
//           font-size: 32px;
//         }

//         .cart-title {
//           font-weight: 600;
//           color: #333;
//           font-size: 24px;
//         }

//         .header-actions {
//           display: flex;
//           gap: 1rem;
//         }

//         .add-to-cart-btn {
//           text-transform: none;
//           border-color: #7d2a25;
//           color: #7d2a25;
//         }

//         .add-to-cart-btn:hover {
//           border-color: #611f18;
//           background-color: rgba(125,42,37,0.04);
//         }

//         .continue-btn {
//           text-transform: none;
//           color: #7d2a25;
//           font-weight: 600;
//         }

//         .cart-count {
//           margin-bottom: 1.5rem;
//           color: #666;
//           font-size: 16px;
//         }

//         .cart-content {
//           display: grid;
//           grid-template-columns: 2fr 1fr;
//           gap: 2rem;
//         }

//         .products-paper {
//           padding: 1.5rem;
//         }

//         .products-title {
//           font-weight: 600;
//           margin-bottom: 1.5rem;
//           color: #333;
//         }

//         .error-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 50vh;
//           gap: 2rem;
//         }

//         .error-text {
//           color: #d32f2f;
//           text-align: center;
//         }

//         .back-button {
//           background: #7d2a25;
//         }

//         /* Cart Card Styles */
//         .cart-card {
//           background: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//           border: 1px solid #e0e0e0;
//           padding: 1.5rem;
//           margin-bottom: 1rem;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         .cart-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 16px rgba(0,0,0,0.12);
//         }

//         .cart-card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 1rem;
//         }

//         .product-name {
//           font-weight: 600;
//           color: #333;
//           font-size: 18px;
//         }

//         .product-price {
//           font-weight: 700;
//           color: #333;
//           font-size: 18px;
//         }

//         .delivery-info {
//           display: flex;
//           align-items: center;
//           margin-bottom: 1rem;
//         }

//         .delivery-icon {
//           color: #28a745;
//           font-size: 16px;
//           margin-right: 0.5rem;
//         }

//         .delivery-text {
//           color: #28a745;
//           font-weight: 500;
//         }

//         .gift-wrap-section {
//           background: #f8f9fa;
//           padding: 1rem;
//           margin-bottom: 1rem;
//           border-radius: 4px;
//         }

//         .gift-wrap-text {
//           font-weight: 500;
//         }

//         .product-details {
//           display: flex;
//           gap: 1rem;
//         }

//         .product-image {
//           width: 80px;
//           height: 80px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           border-radius: 4px;
//           cursor: pointer;
//           flex-shrink: 0;
//         }

//         .product-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .product-info {
//           flex: 1;
//         }

//         .product-name-sm {
//           font-weight: 500;
//           color: #333;
//           margin-bottom: 0.25rem;
//         }

//         .product-weight {
//           color: #666;
//           display: block;
//         }

//         .quantity-controls {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-top: 0.5rem;
//         }

//         .quantity-label {
//           color: #333;
//           font-weight: 500;
//         }

//         .quantity-buttons {
//           display: flex;
//           align-items: center;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//         }

//         .quantity-btn {
//           width: 28px;
//           height: 28px;
//           color: #333;
//         }

//         .quantity-display {
//           padding: 0 0.75rem;
//           font-size: 14px;
//           font-weight: 500;
//           min-width: 30px;
//           text-align: center;
//         }

//         .remove-btn {
//           color: #666;
//           align-self: flex-start;
//         }

//         /* Order Summary Styles */
//         .order-summary {
//           padding: 1.5rem;
//           background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
//           border: 1px solid #e0e0e0;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.08);
//           border-radius: 12px;
//           height: fit-content;
//         }

//         .summary-header {
//           text-align: center;
//           margin-bottom: 1.5rem;
//           padding-bottom: 1rem;
//           border-bottom: 2px solid #f0f0f0;
//         }

//         .summary-title {
//           font-weight: 700;
//           color: #2c3e50;
//           margin-bottom: 0.5rem;
//         }

//         .summary-subtitle {
//           color: #7f8c8d;
//           font-size: 12px;
//         }

//         .address-section {
//           margin-bottom: 1.5rem;
//         }

//         .section-title {
//           display: flex;
//           align-items: center;
//           margin-bottom: 1rem;
//         }

//         .section-icon {
//           color: #7d2a25;
//           margin-right: 0.5rem;
//         }

//         .section-title-text {
//           font-weight: 600;
//           color: #333;
//           font-size: 16px;
//         }

//         .address-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//           margin-bottom: 1rem;
//         }

//         .address-item {
//           border: 2px solid #e0e0e0;
//           border-radius: 8px;
//           padding: 1rem;
//           background: #fff;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         .address-item.selected {
//           border-color: #7d2a25;
//           background: rgba(125,42,37,0.04);
//         }

//         .address-item:hover {
//           border-color: #ccc;
//           transform: translateY(-1px);
//         }

//         .address-radio {
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 0.5rem;
//         }

//         .address-text {
//           font-size: 13px;
//           color: #666;
//           line-height: 1.4;
//         }

//         .address-email {
//           display: block;
//           margin-top: 4px;
//           color: #666;
//           font-size: 12px;
//         }

//         .no-address {
//           text-align: center;
//           padding: 1rem 0;
//           margin-bottom: 1rem;
//         }

//         .no-address-icon {
//           color: #ccc;
//           font-size: 32px;
//           margin-bottom: 0.5rem;
//         }

//         .no-address-text {
//           color: #999;
//           margin-bottom: 1rem;
//         }

//         .add-address-btn {
//           border-color: #7d2a25;
//           color: #7d2a25;
//           margin-bottom: 1rem;
//         }

//         .add-address-btn:hover {
//           border-color: #611f18;
//           background-color: rgba(125,42,37,0.04);
//         }

//         .phone-input {
//           margin-bottom: 1rem;
//         }

//         .phone-label {
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//           font-size: 14px;
//         }

//         .section-divider {
//           margin: 1rem 0;
//         }

//         .price-breakdown {
//           margin-bottom: 1.5rem;
//         }

//         .price-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 0.75rem;
//         }

//         .price-label {
//           color: #34495e;
//           font-weight: 500;
//         }

//         .price-value {
//           font-weight: 600;
//           color: #2c3e50;
//         }

//         .service-option {
//           margin-bottom: 1rem;
//         }

//         .service-label {
//           display: flex;
//           justify-content: space-between;
//           width: 100%;
//         }

//         .service-name {
//           font-weight: 500;
//         }

//         .service-desc {
//           color: #7f8c8d;
//         }

//         .service-price {
//           color: #7f8c8d;
//         }

//         .final-total {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-top: 1rem;
//           padding-top: 1rem;
//           border-top: 2px solid #e0e0e0;
//         }

//         .total-label {
//           font-weight: 700;
//           color: #2c3e50;
//         }

//         .total-value {
//           font-weight: 800;
//           color: #e74c3c;
//         }

//         .shipping-progress {
//           margin-bottom: 1.5rem;
//           padding: 1rem;
//           background: #e8f5e8;
//           border-radius: 8px;
//         }

//         .progress-header {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 0.5rem;
//         }

//         .progress-title {
//           font-weight: 600;
//           color: #27ae60;
//         }

//         .progress-amount {
//           color: #27ae60;
//         }

//         .progress-bar {
//           width: 100%;
//           height: 6px;
//           background: #bdc3c7;
//           border-radius: 12px;
//           overflow: hidden;
//         }

//         .progress-fill {
//           height: 100%;
//           background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
//           transition: width 0.5s ease;
//         }

//         .progress-note {
//           color: #27ae60;
//           margin-top: 0.25rem;
//           display: block;
//         }

//         .checkout-btn {
//           background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
//           color: #fff;
//           border-radius: 12px;
//           padding: 0.75rem;
//           text-transform: none;
//           font-weight: 700;
//           font-size: 16px;
//           box-shadow: 0 6px 20px rgba(231, 76, 60, 0.3);
//           margin-bottom: 1rem;
//         }

//         .checkout-btn:hover {
//           background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
//           box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
//           transform: translateY(-2px);
//         }

//         .checkout-btn:disabled {
//           background: #bdc3c7;
//           transform: none;
//           box-shadow: none;
//         }

//         .trust-badges {
//           text-align: center;
//           padding-top: 1rem;
//           border-top: 1px solid #ecf0f1;
//         }

//         .badge-container {
//           display: flex;
//           justify-content: space-around;
//           align-items: center;
//           margin-bottom: 0.5rem;
//         }

//         .badge {
//           text-align: center;
//         }

//         .badge-icon {
//           color: #27ae60;
//           font-size: 20px;
//         }

//         .badge-text {
//           color: #27ae60;
//           font-weight: 600;
//           display: block;
//         }

//         .security-note {
//           color: #7f8c8d;
//           font-size: 10px;
//         }

//         /* Dialog Styles */
//         .dialog-title {
//           font-weight: bold;
//           color: #7d2a25;
//         }

//         .dialog-content {
//           padding-top: 0.5rem;
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .address-form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .form-control-wide {
//           grid-column: 1 / span 2;
//         }

//         .dialog-actions {
//           padding: 0 1.5rem 1rem 1.5rem;
//         }

//         .add-address-dialog-btn {
//           font-weight: 600;
//           background: #7d2a25;
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .cart-page {
//             padding: 1rem;
//           }

//           .cart-content {
//             grid-template-columns: 1fr;
//             gap: 1rem;
//           }

//           .cart-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }

//           .header-actions {
//             width: 100%;
//             justify-content: space-between;
//           }

//           .address-form-grid {
//             grid-template-columns: 1fr;
//           }

//           .form-control-wide {
//             grid-column: 1;
//           }

//           .badge-container {
//             flex-direction: column;
//             gap: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




// Niche baale me loader hai cart page bala  


import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
  MenuItem, Select, FormControl, InputLabel, Container, Paper, Card,
  Checkbox, FormControlLabel, Backdrop, CircularProgress
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../commonComponents/AxiosInstance';
import { addData } from '../store/Action';
import { publicUrl } from '../commonComponents/PublicUrl';
import Theme from '../../Theme';

// ---------- helpers ----------
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(n || 0));

// ---------- Single Product Card ----------
function SingleProductCard({ product, units, onUpdateQuantity }) {
  const quantity = units;
  const variant = product?.selectedVariant ?? product?.quantity?.[0] ?? {};
  const fp = Number(variant.final_price ?? variant.finalPrice ?? product?.unitPrice ?? product?.price ?? 0);
  const navigate = useNavigate();
  const [giftWrap, setGiftWrap] = useState(false);

  if (!product) return null;

  return (
    <div className="cart-card">
      {/* Product Header */}
      <div className="cart-card-header">
        <Typography variant="h6" className="product-name">
          {product.name || 'Product Name'}
        </Typography>
        <Typography variant="h6" className="product-price">
          {formatINR(fp)}
        </Typography>
      </div>

      {/* Delivery Info */}
      <div className="delivery-info">
        <LocalShippingIcon className="delivery-icon" />
        <Typography variant="body2" className="delivery-text">
          Free Delivery
        </Typography>
      </div>

      {/* Gift Wrap Section */}
      <div className="gift-wrap-section">
        <FormControlLabel
          control={
            <Checkbox 
              checked={giftWrap} 
              onChange={(e) => setGiftWrap(e.target.checked)}
              size="small" 
            />
          }
          label={
            <Typography variant="body2" className="gift-wrap-text">
              Add a gift wrap & a message with this item (+ ₹50)
            </Typography>
          }
        />
      </div>

      {/* Product Details */}
      <div className="product-details">
        {/* Product Image */}
        <div 
          className="product-image"
          onClick={() => navigate(`/singleProduct/${product._id}`)}
        >
          <img 
            src={publicUrl(product?.media?.[0]?.url || product?.frontImage)} 
            alt={product.name} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <Typography variant="body2" className="product-name-sm">
            {product.name}
          </Typography>
          {variant?.weight && (
            <Typography variant="caption" className="product-weight">
              Weight: {variant.weight}g{variant.carat ? ` / ${variant.carat}kt` : ""}
            </Typography>
          )}
          
          {/* Quantity Controls */}
          <div className="quantity-controls">
            <Typography variant="body2" className="quantity-label">
              Qty:
            </Typography>
            <div className="quantity-buttons">
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="quantity-btn"
              >
                <RemoveIcon />
              </IconButton>
              <Typography className="quantity-display">
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity(quantity + 1)}
                className="quantity-btn"
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Enhanced Order Summary with Address ----------
function OrderSummary({ 

  units, 
  subtotal, 
  total, 
  formData, 
  handleCheckout, 
  addresses, 
  setFormData, 
  setShowModal, 
  phoneError, 
  handlePhoneChange, 
  handlePhoneBlur 
}) {
  const [giftWrapAll, setGiftWrapAll] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);

  const deliveryFee = expressDelivery ? 199 : 0;
  const giftWrapFee = giftWrapAll ? 80 : 0;
  const insuranceFee = insurance ? Math.round(total * 0.02) : 0;
  const finalTotal = total + deliveryFee + giftWrapFee + insuranceFee;

  return (
    <div className="order-summary">
      {/* Header */}
      <div className="summary-header">
        <Typography variant="h5" className="summary-title">
          Order Summary
        </Typography>
        <Typography variant="body2" className="summary-subtitle">
          1 item in cart
        </Typography>
      </div>

      {/* Delivery Address Section */}
      <div className="address-section">
        <div className="section-title">
          <LocationOnIcon className="section-icon" />
          <Typography variant="h6" className="section-title-text">
            Delivery Address
          </Typography>
        </div>

        {addresses?.length ? (
          <div className="address-list">
            {addresses.map((addr, idx) => (
              <div
                key={`${addr.address}-${idx}`}
                className={`address-item ${formData.selectedAddress === addr.address ? 'selected' : ''}`}
                onClick={() => {
                  setFormData((p) => ({ 
                    ...p, 
                    selectedAddress: addr.address,
                    phone: addr.phone || p.phone,
                    email: addr.email || p.email,
                    name: addr.name || p.name
                  }));
                }}
              >
                <Typography className="address-radio">
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={formData.selectedAddress === addr.address}
                    onChange={() => {
                      setFormData((p) => ({ 
                        ...p, 
                        selectedAddress: addr.address,
                        phone: addr.phone || p.phone,
                        email: addr.email || p.email,
                        name: addr.name || p.name
                      }));
                    }}
                  />
                  Address {idx + 1}
                </Typography>
                <Typography className="address-text">
                  {addr.address}
                </Typography>
                {addr.email && (
                  <Typography className="address-email" variant="caption">
                    📧 {addr.email}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-address">
            <LocationOnIcon className="no-address-icon" />
            <Typography className="no-address-text">No address saved yet</Typography>
          </div>
        )}

        <Button 
          variant="outlined" 
          onClick={() => setShowModal(true)} 
          fullWidth
          className="add-address-btn"
        >
          + Add New Address
        </Button>

        {/* Phone Number Input */}
        <div className="phone-input">
          <Typography className="phone-label">Contact Number</Typography>
          <TextField
            fullWidth
            size="small"
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            error={phoneError}
            helperText={phoneError ? "Phone number must be exactly 10 digits" : ""}
            InputProps={{ 
              startAdornment: <InputAdornment position="start">+91</InputAdornment>
            }}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <Divider className="section-divider" />

      {/* Price Breakdown */}
      <div className="price-breakdown">
        <div className="price-row">
          <Typography variant="body2" className="price-label">
            Subtotal ({units} {units === 1 ? 'item' : 'items'})
          </Typography>
          <Typography variant="body2" className="price-value">
            {formatINR(subtotal)}
          </Typography>
        </div>

        {/* Additional Services */}
        <div className="service-option">
          <FormControlLabel
            control={
              <Checkbox 
                checked={giftWrapAll} 
                onChange={(e) => setGiftWrapAll(e.target.checked)}
                size="small"
              />
            }
            label={
              <div className="service-label">
                <Typography variant="body2" className="service-name">
                  Gift Wrap
                </Typography>
                <Typography variant="body2" className="service-price">
                  +{formatINR(80)}
                </Typography>
              </div>
            }
          />
        </div>

        <div className="service-option">
          <FormControlLabel
            control={
              <Checkbox 
                checked={expressDelivery} 
                onChange={(e) => setExpressDelivery(e.target.checked)}
                size="small"
              />
            }
            label={
              <div className="service-label">
                <div>
                  <Typography variant="body2" className="service-name">
                    Express Delivery
                  </Typography>
                  <Typography variant="caption" className="service-desc">
                    Delivery in 24 hours
                  </Typography>
                </div>
                <Typography variant="body2" className="service-price">
                  +{formatINR(199)}
                </Typography>
              </div>
            }
          />
        </div>

        <div className="service-option">
          <FormControlLabel
            control={
              <Checkbox 
                checked={insurance} 
                onChange={(e) => setInsurance(e.target.checked)}
                size="small"
              />
            }
            label={
              <div className="service-label">
                <div>
                  <Typography variant="body2" className="service-name">
                    Jewelry Insurance
                  </Typography>
                  <Typography variant="caption" className="service-desc">
                    Theft & Damage protection (1 year)
                  </Typography>
                </div>
                <Typography variant="body2" className="service-price">
                  +{formatINR(insuranceFee)}
                </Typography>
              </div>
            }
          />
        </div>

        {/* Final Total */}
        <div className="final-total">
          <Typography variant="h6" className="total-label">
            Total Amount
          </Typography>
          <Typography variant="h5" className="total-value">
            {formatINR(finalTotal)}
          </Typography>
        </div>
      </div>

      {/* Progress Bar for Free Shipping */}
      <div className="shipping-progress">
        <div className="progress-header">
          <Typography variant="caption" className="progress-title">
            🚚 Free Shipping
          </Typography>
          <Typography variant="caption" className="progress-amount">
            {finalTotal >= 50000 ? 'Unlocked! 🎉' : `${formatINR(50000 - finalTotal)} more to go`}
          </Typography>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min((finalTotal / 50000) * 100, 100)}%` }}
          />
        </div>
        <Typography variant="caption" className="progress-note">
          Get free shipping on orders above ₹50,000
        </Typography>
      </div>

      {/* Checkout Button - Direct to payment */}
      <Button
        variant="contained"
        onClick={() => handleCheckout(finalTotal)}
        disabled={!formData.selectedAddress || !formData.phone || phoneError}
        fullWidth
        className="checkout-btn"
      >
        🛒 Proceed to Secure Checkout
      </Button>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="badge-container">
          <div className="badge">
            <SecurityIcon className="badge-icon" />
            <Typography variant="caption" className="badge-text">
              100% Secure
            </Typography>
          </div>
          <div className="badge">
            <LocalShippingIcon className="badge-icon" />
            <Typography variant="caption" className="badge-text">
              Free Returns
            </Typography>
          </div>
          <div className="badge">
            <CardGiftcardIcon className="badge-icon" />
            <Typography variant="caption" className="badge-text">
              Gift Ready
            </Typography>
          </div>
        </div>
        <Typography variant="caption" className="security-note">
          🔒 SSL Encrypted · 256-bit Security
        </Typography>
      </div>
    </div>
  );
}

// ---------- main ----------
export default function BuyNowPage() {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [originalAddress, setOriginalAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneError, setPhoneError] = useState(false);
  const [units, setUnits] = useState(1);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [formData, setFormData] = useState({
    flat: '', landmark: '', state: '', city: '', country: 'India', 
    phone: '', selectedAddress: '', pincode: '', email: '', name: ''
  });
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debug navigation state
  console.log('Location state:', location.state);

  // Get product data from navigation state with better error handling
  const { product, units: initialUnits } = location.state || {};
  
  // Initialize units from navigation state
  useEffect(() => {
    if (initialUnits) {
      setUnits(initialUnits);
    }
  }, [initialUnits]);

  // Fallback: If no product in state, try to get from localStorage or redirect
  useEffect(() => {
    if (!product) {
      const savedProduct = localStorage.getItem('buyNowProduct');
      if (savedProduct) {
        // If we have saved product, use it
        const parsedProduct = JSON.parse(savedProduct);
        navigate('/buy-now', { 
          state: { product: parsedProduct, units: units },
          replace: true 
        });
      } else {
        // If no product found, redirect back after a delay
        toast.error('Product not found. Redirecting...');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } else {
      // Save product to localStorage as backup
      localStorage.setItem('buyNowProduct', JSON.stringify(product));
    }
  }, [product, navigate, units]);

  // Pre-fill email and name from localStorage if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('cartEmail');
    const savedName = localStorage.getItem('cartName');
    if (savedEmail || savedName) {
      setFormData(p => ({
        ...p,
        email: savedEmail || p.email,
        name: savedName || p.name
      }));
    }
  }, []);

  // Load addresses from localStorage or API
  useEffect(() => {
    // Load addresses from localStorage first
    const cartAddresses = JSON.parse(localStorage.getItem('cartAddresses') || '[]');
    if (cartAddresses.length > 0) {
      setAddresses(cartAddresses);
      if (!formData.selectedAddress && cartAddresses.length > 0) {
        setFormData((p) => ({ 
          ...p, 
          selectedAddress: cartAddresses[0].address,
          phone: cartAddresses[0].phone || p.phone,
          email: cartAddresses[0].email || p.email,
          name: cartAddresses[0].name || p.name
        }));
      }
      return;
    }

    // Fallback to API if user is authenticated
    (async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData?._id;
        if (!userId) return;
        
        const response = await axiosInstance.get(`/admin/readAdmin/${userId}`);
        const userInfo = response?.data?.data;
        setOriginalAddress(userInfo);
        if (Array.isArray(userInfo?.address)) {
          const formattedAddresses = userInfo.address.map(addr => ({
            address: addr,
            email: userInfo.email,
            name: userInfo.name,
            phone: userInfo.phone
          }));
          setAddresses(formattedAddresses);
          // Also save to localStorage for future use
          localStorage.setItem('cartAddresses', JSON.stringify(formattedAddresses));
          if (!formData.selectedAddress && formattedAddresses.length > 0) {
            setFormData((p) => ({ 
              ...p, 
              selectedAddress: formattedAddresses[0].address,
              phone: formattedAddresses[0].phone || p.phone,
              email: formattedAddresses[0].email || p.email,
              name: formattedAddresses[0].name || p.name
            }));
          }
        }
      } catch (e) {
        console.error('Error fetching address:', e);
      }
    })();
  }, []);

  if (!product) {
    return (
      <div className="error-container">
        <Typography variant="h5" className="error-text">
          Loading product...
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          className="back-button"
        >
          Go Back to Home
        </Button>
      </div>
    );
  }

  // ----- totals -----
  const unitPrice = Number(
    product.unitPrice ??
    product.selectedVariant?.final_price ??
    product.selectedVariant?.finalPrice ??
    product.price ??
    0
  );

  const subtotal = unitPrice * units;
  const discountRate = 0;
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  // ----- qty / remove -----
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setUnits(newQuantity);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      cartQty: units,
      unitPrice: unitPrice,
    };

    dispatch(addData(cartItem));
    toast.success('Item added to cart successfully!', { position: 'top-right', autoClose: 1500 });
  };

  const handleContinueShopping = () => navigate(-1);

  const handleAddAddress = async () => {
    // Email validation
    if (!formData.email?.trim()) {
      toast.error('Email is required');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.name?.trim()) {
      toast.error('Full name is required');
      return;
    }

    if (!formData.flat?.trim()) {
      toast.error('Flat / House is required');
      return;
    }
    
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      toast.error('Phone number is required and must be exactly 10 digits');
      return;
    }

    if (!formData.pincode?.trim()) {
      toast.error('Pincode is required');
      return;
    }

    const addressObj = {
      address: `${formData.flat}, ${formData.landmark}, ${formData.city}, ${formData.state}, ${formData.country} ,${formData.pincode}`,
      email: formData.email.trim(),
      name: formData.name.trim(),
      phone: formData.phone
    };

    try {
      // Save address locally with email
      const newAddresses = [...addresses, addressObj];
      setAddresses(newAddresses);
      
      // Save to localStorage for persistence
      const cartAddresses = JSON.parse(localStorage.getItem('cartAddresses') || '[]');
      cartAddresses.push(addressObj);
      localStorage.setItem('cartAddresses', JSON.stringify(cartAddresses));
      
      // Save email and name separately for future use
      localStorage.setItem('cartEmail', formData.email.trim());
      localStorage.setItem('cartName', formData.name.trim());
      
      toast.success('Address added successfully');
      setFormData((p) => ({ ...p, selectedAddress: addressObj.address }));
      setShowModal(false);
      
      // Reset form but keep email/name for next time
      setFormData({
        flat: '', landmark: '', state: '', city: '', country: 'India', 
        phone: '', selectedAddress: addressObj.address, pincode: '',
        email: formData.email, // Keep email
        name: formData.name    // Keep name
      });
    } catch (error) {
      toast.error('Failed to add address');
      console.error('Address add error:', error);
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

  // ----- razorpay -----
  const handleCheckout = (finalTotal) => {
    // Direct payment flow - no login check
    if (!formData.selectedAddress) {
      toast.warn('Please select an address before checkout.');
      return;
    }

    const phoneNumber = formData.phone || originalAddress?.phone || "";
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Check if phone number is provided
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.warn('Please enter a valid 10-digit phone number before checkout.');
      return;
    }

    const options = {
      key: 'rzp_test_RpQ1JwSJEy6yAw',
      amount: Math.round(finalTotal * 100),
      currency: 'INR',
      name: 'Chauhan Sons Jewellers',
      description: 'Order Payment',
      handler: async function (response) {
        try {
          // Show processing loader
          setIsProcessingOrder(true);
          
          // Show payment success toast
          toast.success('Payment successful! Processing your order...');

          // Get user data from localStorage or use form data
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          const userEmail = userData?.email || formData.email || 'guest@example.com';
          const userName = userData?.name || formData.name || 'Guest User';
          const userId = userData?._id || 'guest';

          const orderPayload = {
            userId: userId,
            userEmail: userEmail,
            userName: userName,
            items: [{
              productId: product._id,
              name: product.name,
              quantity: units,
              price: unitPrice,
            }],
            address: formData.selectedAddress,
            phone: phoneNumber,
            totalAmount: finalTotal,
            paymentId: response.razorpay_payment_id,
          };
          
          console.log("Order payload:", orderPayload);
          
          // Simulate processing delay for better UX
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const res = await axiosInstance.post('/api/createOrder', orderPayload);
          if (res.status === 201) {
            // Show success message
            toast.success('Order confirmed! Redirecting...');
            
            // Clear stored data after successful order
            localStorage.removeItem('buyNowProduct');
            localStorage.removeItem('cartAddresses');
            
            // Add small delay for user to see success message
            setTimeout(() => {
              setIsProcessingOrder(false);
              navigate('/successOrder');
            }, 1500);
          } else {
            setIsProcessingOrder(false);
            toast.error('Failed to place order.');
          }
        } catch (err) {
          setIsProcessingOrder(false);
          console.error('Order creation error:', err);
          toast.error('Something went wrong while placing the order.');
        }
      },
      prefill: {
        name: userData?.name || formData.name || 'Customer',
        email: userData?.email || formData.email || 'customer@example.com',
        contact: phoneNumber,
      },
      notes: { address: formData.selectedAddress },
      theme: { color: Theme.palette.primary.main },
    };
    
    const rz = new window.Razorpay(options);
    rz.open();
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((p) => ({ ...p, phone: value }));
  };

  const handlePhoneBlur = () => {
    setPhoneError(formData.phone.length !== 10 || !/^[1-9][0-9]{9}$/.test(formData.phone));
  };

  return (
    <div className="cart-page">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
      {/* Processing Order Loader */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(4px)'
        }}
        open={isProcessingOrder}
      >
        <div className="order-processing-loader">
          <CircularProgress color="inherit" size={60} />
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 3, 
              color: '#fff',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Processing Your Order...
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '300px',
              textAlign: 'center'
            }}
          >
            Please wait while we confirm your payment and create your order.
          </Typography>
        </div>
      </Backdrop>

      {/* Header */}
      <div className="cart-header">
        <div className="header-left">
          <ShoppingBagIcon className="cart-icon" />
          <Typography variant="h4" className="cart-title">
            Buy Now
          </Typography>
        </div>
        <div className="header-actions">
          <Button onClick={handleAddToCart} variant="outlined" className="add-to-cart-btn">
            Add to Cart Instead
          </Button>
          <Button onClick={handleContinueShopping} variant="text" className="continue-btn">
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Item Count */}
      <Typography variant="h6" className="cart-count">
        1 item in your order
      </Typography>

      {/* Content */}
      <div className="cart-content">
        {/* Left Column - Product */}
        <div className="products-column">
          <Paper className="products-paper">
            <Typography variant="h6" className="products-title">
              Your Item
            </Typography>
            <div className="products-list">
              <SingleProductCard 
                product={product}
                units={units}
                onUpdateQuantity={handleQuantityChange}
              />
            </div>
          </Paper>
        </div>

        {/* Right Column - Order Summary */}
        <div className="summary-column">
          <OrderSummary
            product={product}
            units={units}
            subtotal={subtotal}
            total={total}
            formData={formData}
            handleCheckout={handleCheckout}
            addresses={addresses}
            setFormData={setFormData}
            setShowModal={setShowModal}
            phoneError={phoneError}
            handlePhoneChange={handlePhoneChange}
            handlePhoneBlur={handlePhoneBlur}
          />
        </div>
      </div>

      {/* Add address dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle className="dialog-title">Add New Address</DialogTitle>
        <form onSubmit={(e) => { e.preventDefault(); handleAddAddress(); }}>
          <DialogContent className="dialog-content">
            <div className="address-form-grid">
              <TextField
                label="Full Name"
                fullWidth
                required
                size="small"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              />
              <TextField
                label="Email"
                fullWidth
                required
                size="small"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (formData.email && !emailRegex.test(formData.email)) {
                    toast.error('Please enter a valid email address');
                  }
                }}
              />
              <TextField
                label="Flat / House"
                fullWidth
                required
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
              <FormControl size="small" fullWidth className="form-control-wide">
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  label="State"
                  value={formData.state}
                  required
                  onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value, city: '' }))}
                >
                  <MenuItem value=""><em>Select State</em></MenuItem>
                  {states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth className="form-control-wide">
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  label="City"
                  value={formData.city}
                  required
                  onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                  disabled={!formData.state}
                >
                  <MenuItem value=""><em>Select City</em></MenuItem>
                  {cities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Country" fullWidth required size="small" value="India" disabled />
              <TextField
                label="Phone Number"
                fullWidth
                required
                size="small"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                error={phoneError}
                helperText={phoneError ? "Phone number must be exactly 10 digits" : ""}
                InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
              />
              <TextField
                label="Pincode"
                fullWidth
                required
                size="small"
                value={formData.pincode}
                onChange={(e) => setFormData((p) => ({ ...p, pincode: e.target.value }))}
              />
            </div>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button type="submit" variant="contained" className="add-address-dialog-btn">
              Add Address
            </Button>
            <Button onClick={() => setShowModal(false)} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} sx={{ width: '100%' }}>
          {snack.msg}
        </Alert>
      </Snackbar>

      <style jsx>{`
        .cart-page {
          padding: 2rem;
          min-height: 100vh;
          background-color: #fafafa;
          max-width: 100%;
        }

        .cart-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .header-left {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .cart-icon {
          color: #7d2a25;
          margin-right: 1rem;
          font-size: 32px;
        }

        .cart-title {
          font-weight: 600;
          color: #333;
          font-size: 24px;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .add-to-cart-btn {
          text-transform: none;
          border-color: #7d2a25;
          color: #7d2a25;
        }

        .add-to-cart-btn:hover {
          border-color: #611f18;
          background-color: rgba(125,42,37,0.04);
        }

        .continue-btn {
          text-transform: none;
          color: #7d2a25;
          font-weight: 600;
        }

        .cart-count {
          margin-bottom: 1.5rem;
          color: #666;
          font-size: 16px;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .products-paper {
          padding: 1.5rem;
        }

        .products-title {
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
        }

        /* Order Processing Loader */
        .order-processing-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgba(125, 42, 37, 0.9);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          min-width: 350px;
          min-height: 250px;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          gap: 2rem;
        }

        .error-text {
          color: #d32f2f;
          text-align: center;
        }

        .back-button {
          background: #7d2a25;
        }

        /* Cart Card Styles */
        .cart-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border: 1px solid #e0e0e0;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cart-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .cart-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .product-name {
          font-weight: 600;
          color: #333;
          font-size: 18px;
        }

        .product-price {
          font-weight: 700;
          color: #333;
          font-size: 18px;
        }

        .delivery-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .delivery-icon {
          color: #28a745;
          font-size: 16px;
          margin-right: 0.5rem;
        }

        .delivery-text {
          color: #28a745;
          font-weight: 500;
        }

        .gift-wrap-section {
          background: #f8f9fa;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 4px;
        }

        .gift-wrap-text {
          font-weight: 500;
        }

        .product-details {
          display: flex;
          gap: 1rem;
        }

        .product-image {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          flex: 1;
        }

        .product-name-sm {
          font-weight: 500;
          color: #333;
          margin-bottom: 0.25rem;
        }

        .product-weight {
          color: #666;
          display: block;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
        }

        .quantity-label {
          color: #333;
          font-weight: 500;
        }

        .quantity-buttons {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .quantity-btn {
          width: 28px;
          height: 28px;
          color: #333;
        }

        .quantity-display {
          padding: 0 0.75rem;
          font-size: 14px;
          font-weight: 500;
          min-width: 30px;
          text-align: center;
        }

        .remove-btn {
          color: #666;
          align-self: flex-start;
        }

        /* Order Summary Styles */
        .order-summary {
          padding: 1.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-radius: 12px;
          height: fit-content;
        }

        .summary-header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .summary-title {
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .summary-subtitle {
          color: #7f8c8d;
          font-size: 12px;
        }

        .address-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-icon {
          color: #7d2a25;
          margin-right: 0.5rem;
        }

        .section-title-text {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }

        .address-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .address-item {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 1rem;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .address-item.selected {
          border-color: #7d2a25;
          background: rgba(125,42,37,0.04);
        }

        .address-item:hover {
          border-color: #ccc;
          transform: translateY(-1px);
        }

        .address-radio {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .address-text {
          font-size: 13px;
          color: #666;
          line-height: 1.4;
        }

        .address-email {
          display: block;
          margin-top: 4px;
          color: #666;
          font-size: 12px;
        }

        .no-address {
          text-align: center;
          padding: 1rem 0;
          margin-bottom: 1rem;
        }

        .no-address-icon {
          color: #ccc;
          font-size: 32px;
          margin-bottom: 0.5rem;
        }

        .no-address-text {
          color: #999;
          margin-bottom: 1rem;
        }

        .add-address-btn {
          border-color: #7d2a25;
          color: #7d2a25;
          margin-bottom: 1rem;
        }

        .add-address-btn:hover {
          border-color: #611f18;
          background-color: rgba(125,42,37,0.04);
        }

        .phone-input {
          margin-bottom: 1rem;
        }

        .phone-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 14px;
        }

        .section-divider {
          margin: 1rem 0;
        }

        .price-breakdown {
          margin-bottom: 1.5rem;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .price-label {
          color: #34495e;
          font-weight: 500;
        }

        .price-value {
          font-weight: 600;
          color: #2c3e50;
        }

        .service-option {
          margin-bottom: 1rem;
        }

        .service-label {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .service-name {
          font-weight: 500;
        }

        .service-desc {
          color: #7f8c8d;
        }

        .service-price {
          color: #7f8c8d;
        }

        .final-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #e0e0e0;
        }

        .total-label {
          font-weight: 700;
          color: #2c3e50;
        }

        .total-value {
          font-weight: 800;
          color: #e74c3c;
        }

        .shipping-progress {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #e8f5e8;
          border-radius: 8px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .progress-title {
          font-weight: 600;
          color: #27ae60;
        }

        .progress-amount {
          color: #27ae60;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #bdc3c7;
          border-radius: 12px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
          transition: width 0.5s ease;
        }

        .progress-note {
          color: #27ae60;
          margin-top: 0.25rem;
          display: block;
        }

        .checkout-btn {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: #fff;
          border-radius: 12px;
          padding: 0.75rem;
          text-transform: none;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.3);
          margin-bottom: 1rem;
        }

        .checkout-btn:hover {
          background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
          box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
          transform: translateY(-2px);
        }

        .checkout-btn:disabled {
          background: #bdc3c7;
          transform: none;
          box-shadow: none;
        }

        .trust-badges {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid #ecf0f1;
        }

        .badge-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .badge {
          text-align: center;
        }

        .badge-icon {
          color: #27ae60;
          font-size: 20px;
        }

        .badge-text {
          color: #27ae60;
          font-weight: 600;
          display: block;
        }

        .security-note {
          color: #7f8c8d;
          font-size: 10px;
        }

        /* Dialog Styles */
        .dialog-title {
          font-weight: bold;
          color: #7d2a25;
        }

        .dialog-content {
          padding-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .address-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-control-wide {
          grid-column: 1 / span 2;
        }

        .dialog-actions {
          padding: 0 1.5rem 1rem 1.5rem;
        }

        .add-address-dialog-btn {
          font-weight: 600;
          background: #7d2a25;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .cart-page {
            padding: 1rem;
          }

          .cart-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .cart-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .address-form-grid {
            grid-template-columns: 1fr;
          }

          .form-control-wide {
            grid-column: 1;
          }

          .badge-container {
            flex-direction: column;
            gap: 1rem;
          }

          .order-processing-loader {
            min-width: 280px;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}