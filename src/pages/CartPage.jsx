// // option2: use it when multiple products with different quantities are added to the cart (single product option3 is used):
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
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../common components/AxiosInstance';
import { deleteProduct, updateData, clearProducts } from '../store/Action';
import { publicUrl } from '../common components/PublicUrl';

// ---------- helpers ----------
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(n || 0));

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
  const quantity = product.cartQty ?? 1;
  const variant = product.selectedVariant ?? {};
  const fp = Number(variant.final_price ?? variant.finalPrice ?? 0);

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
              color: '#333', fontFamily: 'serif',
              mb: { xs: 0.3, sm: 0.5, md: 0.5 }, fontSize: { xs: 11, sm: 12, md: 15, lg: 20 }, fontWeight: 500,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              textTransform: 'capitalize'
            }}
          >
            {product.name}
          </Typography>


          <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column' }} >
            <Typography variant="caption" color="textSecondary">
              Final Price: {formatINR(fp)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {variant.weight ? `Weight: ${variant.weight}g` : ""}
              {variant.carat ? ` / ${variant.carat}kt` : ""}
            </Typography>
          </Box>

          {/* {parsedQuantities.map((q, idx) => {
            const fp = Number(q.final_price ?? q.finalPrice ?? q?.['0']?.finalPrice ?? 0);
            return (
              <Box key={idx} sx={{ mt: 0.5 }}>
                <Typography variant="caption" color="textSecondary">
                  Final Price: {formatINR(fp)}
                </Typography>
              </Box>
            );
          })} */}



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
  const [phoneError, setPhoneError] = useState(false);
  const [formData, setFormData] = useState({
    flat: '', landmark: '', state: '', city: '', country: 'India', phone: '', selectedAddress: '', pincode: ''
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


  const handleRemoveItem = (itemCompositeKey) => {
    dispatch(deleteProduct(itemCompositeKey));
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
    const phoneNumber = formData.phone || originalAddress?.phone || "";

    const options = {
      key: 'rzp_live_RCKnQvruACO5FH',
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
            phone: phoneNumber,
            totalAmount: total,
            paymentId: response.razorpay_payment_id,
          };
          const res = await axiosInstance.post('/api/createOrder', orderPayload);
          if (res.status === 201) {
            dispatch(clearProducts());
            navigate('/successOrder');
            // toast.success('Order placed successfully!');
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
        contact: phoneNumber,
      },
      notes: { address: formData.selectedAddress },
      theme: { color: '#3399cc' },
    };
    const rz = new window.Razorpay(options);
    rz.open();
  };

  // const handlePhoneChange = (e) => {
  //   const value = e.target.value;
  //   if (/^\d{0,10}$/.test(value)) {
  //     setFormData((p) => ({ ...p, phone: value }));
  //   }
  // };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((p) => ({ ...p, phone: value }));
  };

  // const handlePhoneBlur = () => {
  //   setPhoneError(formData.phone.length !== 10);
  // };
  const handlePhoneBlur = () => {
    setPhoneError(formData.phone.length !== 10 || !/^[1-9][0-9]{9}$/.test(formData.phone));
  };

  const isEmpty = (cartItems?.length || 0) === 0;

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: { xs: 4, lg: 5 }, minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
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
                  <Grid key={item._id} xs={6} sm={4} md={4} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CartCard product={item}
                      // onRemove={handleRemoveItem} 
                      onRemove={() => handleRemoveItem(`${item._id}__${item.selectedVariant?.weight || ''}_${item.selectedVariant?.carat || ''}`)}
                      onUpdateQuantity={handleQuantityChange} />
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
                  py: 1, textTransform: 'none', fontWeight: 600,
                  fontSize: { xs: '16px', md: '18px' }, '&:hover': { background: '#611f18' },
                  boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
                }}
              >
                Proceed to Checkout
              </Button>

              {/* <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                <Typography sx={{ fontSize: { xs: '12px', md: '14px' }, color: '#666', lineHeight: 1.4 }}>
                  Free shipping on orders above ₹50,000
                </Typography>
              </Box> */}
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
              // onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              error={phoneError}
              helperText={phoneError ? "Phone number must be exactly 10 digits" : ""}
              InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
            />
            <TextField
              label="Pincode"
              fullWidth
              size="small"
              value={formData.pincode}
              onChange={(e) => setFormData((p) => ({ ...p, pincode: e.target.value }))}
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


