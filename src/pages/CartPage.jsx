import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton, Snackbar, Alert, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

// Sample cart items - replace with API data later
const sampleCartItems = [
  {
    id: 1,
    img: '/public/collection1.png',
    title: 'Dazzling Grace Drop Earrings',
    price: '₹ 59,101',
    oldPrice: '₹ 62,000',
    category: 'Earrings',
    quantity: 1,
    weight: '3.2 gm'
  },
  {
    id: 2,
    img: '/public/collection2.png',
    title: 'Royal Diamond Necklace',
    price: '₹ 1,25,000',
    oldPrice: '₹ 1,35,000',
    category: 'Necklace',
    quantity: 2,
    weight: '8.5 gm'
  },
  {
    id: 3,
    img: '/public/collection3.png',
    title: 'Elegant Gold Bracelet',
    price: '₹ 45,000',
    oldPrice: '',
    category: 'Bracelet',
    quantity: 1,
    weight: '5.1 gm'
  },
  {
    id: 4,
    img: '/public/collection1.png',
    title: 'Shimmering Pearl Earrings',
    price: '₹ 52,000',
    oldPrice: '₹ 55,000',
    category: 'Earrings',
    quantity: 1,
    weight: '2.8 gm'
  },
  {
    id: 5,
    img: '/public/collection2.png',
    title: 'Majestic Ruby Necklace',
    price: '₹ 1,15,000',
    oldPrice: '₹ 1,25,000',
    category: 'Necklace',
    quantity: 1,
    weight: '12.3 gm'
  },
  {
    id: 6,
    img: '/public/collection3.png',
    title: 'Classic Platinum Bracelet',
    price: '₹ 49,500',
    oldPrice: '₹ 53,000',
    category: 'Bracelet',
    quantity: 2,
    weight: '6.7 gm'
  }
];

function EmptyCart({ onContinueShopping }) {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'center', md: 'flex-start' },
      justifyContent: 'center',
      gap: { xs: 3, md: 5 },
      pt: { xs: 2, md: 4 }
    }}>
      {/* Empty cart illustration */}
      <Box sx={{ 
        minWidth: { xs: 150, md: 190 }, 
        textAlign: 'center',
        order: { xs: 1, md: 1 }
      }}>
        <Box sx={{
          width: { xs: 100, md: 130 },
          height: { xs: 80, md: 110 },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto'
        }}>
          {/* Shopping bag */}
          <Box sx={{
            width: { xs: 70, md: 90 },
            height: { xs: 85, md: 110 },
            backgroundColor: '#f6f1ef',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <svg width="45" height="55" viewBox="0 0 65 75" fill="none">
              <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none"/>
              <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none"/>
              <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25"/>
              <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5"/>
            </svg>
          </Box>
        </Box>
      </Box>
      
      {/* Text content */}
      <Box sx={{ 
        textAlign: { xs: 'center', md: 'left' }, 
        mt: { xs: 2, md: 10 },
        order: { xs: 2, md: 2 },
        maxWidth: { xs: '100%', md: '400px' }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#702626', 
            fontWeight: 600, 
            mb: 0.75,
            fontSize: { xs: '18px', md: '20px' }
          }}
        >
          Your Cart Is Empty !
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3, 
            color: '#702626',
            fontSize: { xs: '14px', md: '16px' }
          }}
        >
          Add Chauhan Jewellers To Your Shopping Cart
        </Typography>
        <Button
          variant="contained"
          onClick={onContinueShopping}
          sx={{
            background: '#7d2a25',
            color: '#fff',
            borderRadius: '4px',
            px: { xs: 3, md: 4 },
            py: { xs: 1, md: 1.5 },
            textTransform: 'none',
            fontWeight: 500,
            fontSize: { xs: '14px', md: '16px' },
            '&:hover': { background: '#611f18' }
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}

function CartCard({ product, onRemove, onUpdateQuantity }) {
  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 2,
      boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
      border: '1px solid #eee',
      p: { xs: 1.5, sm: 2, md: 2 },
      mb: 1.5,
      position: 'relative',
      height: { xs: 280, sm: 300, md: 320, lg: 340 },
      width: { xs: 160, sm: 200, md: 240, lg: 280 },
      maxWidth: '100%',
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(70,21,7,0.15)'
      }
    }}>
      {/* Delete button */}
      <IconButton
        size="small"
        onClick={() => onRemove(product.id)}
        sx={{ 
          position: 'absolute', 
          top: { xs: 4, sm: 6, md: 8 },
          right: { xs: 4, sm: 6, md: 8 },
          backgroundColor: '#fff',
          border: '1px solid #bbb',
          zIndex: 2,
          width: { xs: 24, sm: 28, md: 32 },
          height: { xs: 24, sm: 28, md: 32 },
          '&:hover': {
            backgroundColor: '#f5f5f5',
            border: '1px solid #999'
          }
        }}
      >
        <DeleteOutlineIcon sx={{ 
          color: '#bbb', 
          fontSize: { xs: '14px', sm: '16px', md: '18px' }
        }} />
      </IconButton>
      
      {/* Product image container - responsive dimensions */}
      <Box sx={{
        width: '100%',
        height: { xs: 100, sm: 120, md: 140, lg: 160 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: { xs: 0.5, sm: 0.8, md: 1 },
        overflow: 'hidden',
        borderRadius: 1
      }}>
        <img
          src={product.img}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>
      
      {/* Content section - flexible height */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Title and price */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              color: '#333',
              fontFamily: 'serif',
              lineHeight: 1.2,
              mb: { xs: 0.3, sm: 0.5, md: 0.5 },
              fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
              height: { xs: '32px', sm: '36px', md: '40px', lg: '44px' },
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.3, sm: 0.5, md: 0.5 }, mb: { xs: 0.3, sm: 0.5, md: 0.5 } }}>
            <Typography
              sx={{
                fontWeight: 500,
                color: '#272727',
                fontSize: { xs: 11, sm: 12, md: 13, lg: 14 }
              }}
            >
              {product.price}
            </Typography>
            {product.oldPrice && (
              <Typography
                sx={{
                  color: '#bdbdbd',
                  fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
                  textDecoration: 'line-through'
                }}
              >
                {product.oldPrice}
              </Typography>
            )}
          </Box>

          {/* Weight */}
          <Typography
            sx={{
              color: '#666',
              fontSize: { xs: 9, sm: 10, md: 11, lg: 12 },
              mb: { xs: 0.3, sm: 0.5, md: 0.5 }
            }}
          >
            Weight: {product.weight}
          </Typography>
        </Box>
        
        {/* Quantity controls */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: { xs: 0.5, sm: 0.8, md: 1 }
        }}>
          <Typography
            sx={{
              fontSize: { xs: 10, sm: 11, md: 12, lg: 13 },
              color: '#333',
              fontWeight: 500
            }}
          >
            Qty:
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: 1,
            overflow: 'hidden'
          }}>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
              disabled={product.quantity <= 1}
              sx={{
                width: { xs: 24, sm: 28, md: 32 },
                height: { xs: 24, sm: 28, md: 32 },
                borderRadius: 0,
                color: product.quantity <= 1 ? '#ccc' : '#7d2a25',
                '&:hover': {
                  backgroundColor: product.quantity <= 1 ? 'transparent' : '#f5f5f5'
                }
              }}
            >
              <RemoveIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
            </IconButton>
            <Typography
              sx={{
                px: { xs: 1, sm: 1.5, md: 2 },
                fontSize: { xs: 11, sm: 12, md: 13, lg: 14 },
                fontWeight: 500,
                color: '#333',
                minWidth: { xs: '20px', sm: '24px', md: '28px' },
                textAlign: 'center'
              }}
            >
              {product.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
              sx={{
                width: { xs: 24, sm: 28, md: 32 },
                height: { xs: 24, sm: 28, md: 32 },
                borderRadius: 0,
                color: '#7d2a25',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <AddIcon sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Load cart items on component mount
  useEffect(() => {
    // For now, use localStorage. Later replace with API call
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Initialize with sample data for demonstration
      setCartItems(sampleCartItems);
      localStorage.setItem('cart', JSON.stringify(sampleCartItems));
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarMessage('Item removed from cart');
    setShowSnackbar(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarMessage('Quantity updated');
    setShowSnackbar(true);
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to home page
  };

  const handleCheckout = () => {
    // In a real app, navigate to checkout page
    setSnackbarMessage('Proceeding to checkout...');
    setShowSnackbar(true);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const discount = subtotal * 0.05; // 5% discount
  const total = subtotal - discount;

  const isEmpty = cartItems.length === 0;

  return (
    <Box sx={{ 
      px: { xs: 2, sm: 3, md: 5 }, 
      py: { xs: 2, md: 3 }, 
      minHeight: '100vh',
      backgroundColor: '#fafafa'
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: { xs: 2, md: 3 },
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 400, 
            color: '#222', 
            flex: 1,
            fontSize: { xs: '20px', md: '24px' }
          }}
        >
          Shopping Cart ({cartItems.length} items)
        </Typography>
      </Box>
      
      {/* Content */}
      {isEmpty ? (
        <EmptyCart onContinueShopping={handleContinueShopping} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
            {/* Cart Items Grid */}
            <Box sx={{ flex: 1 }}>
              <Grid 
                container 
                spacing={{ xs: 1, sm: 1.5, md: 1.5, lg: 2 }}
                justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
              >
                {cartItems.map((item) => (
                  <Grid
                    key={item.id}
                    item
                    xs={6}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={3}
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <CartCard 
                      product={item} 
                      onRemove={handleRemoveFromCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Order Summary */}
            <Box sx={{
              width: { xs: '100%', lg: 450 },
              background: '#fff',
              borderRadius: 2,
              p: { xs: 2.5, md: 3.5 },
              height: 'fit-content',
              boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
              border: '1px solid #eee',
              position: 'sticky',
              top: 20
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500, 
                  color: '#222', 
                  mb: 3,
                  fontSize: { xs: '20px', md: '22px' },
                  textAlign: 'center',
                  borderBottom: '2px solid #f0f0f0',
                  pb: 1.5
                }}
              >
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#555' }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>₹ {subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745' }}>Discount (5%)</Typography>
                  <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#28a745', fontWeight: 500 }}>-₹ {discount.toLocaleString()}</Typography>
                </Box>
                <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#333' }}>Total</Typography>
                  <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: '#7d2a25' }}>
                    ₹ {total.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={handleCheckout}
                fullWidth
                sx={{
                  background: '#7d2a25',
                  color: '#fff',
                  borderRadius: '10px',
                  py: { xs: 1.5, md: 2 },
                  textTransform: 'none',
                  fontWeight: 1000,
                  fontSize: { xs: '16px', md: '18px' },
                  '&:hover': { background: '#611f18' },
                  boxShadow: '0 2px 8px rgba(125,42,37,0.3)'
                }}
              >
                Proceed to Checkout
              </Button>

              {/* Additional Info */}
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                <Typography sx={{ 
                  fontSize: { xs: '12px', md: '14px' }, 
                  color: '#666', 
                  textAlign: 'center',
                  lineHeight: 1.4
                }}>
                  Free shipping on orders above ₹50,000
                </Typography>
              </Box>

              {/* Delivery Details */}
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                <Typography sx={{ 
                  fontSize: { xs: '16px', md: '18px' }, 
                  fontWeight: 600,
                  color: '#333', 
                  mb: 2,
                  fontFamily: 'serif'
                }}>
                  Delivery Details
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1.5, sm: 1 },
                  alignItems: { xs: 'stretch', sm: 'center' }
                }}>
                  {/* Country Selection */}
                  <Box sx={{
                    position: 'relative',
                    minWidth: { xs: '100%', sm: '80px' },
                    flexShrink: 0
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #ddd',
                      borderRadius: 1,
                      px: 2,
                      py: { xs: 1.2, md: 1.5 },
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#7d2a25'
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* India Flag */}
                        <Box sx={{
                          width: 20,
                          height: 15,
                          background: 'linear-gradient(135deg, #ff9933 0%, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)',
                          borderRadius: '2px',
                          position: 'relative'
                        }}>
                          <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 6,
                            height: 6,
                            background: '#000080',
                            borderRadius: '50%'
                          }} />
                        </Box>
                        <Typography sx={{
                          fontSize: { xs: '14px', md: '16px' },
                          fontWeight: 500,
                          color: '#333'
                        }}>
                          IN
                        </Typography>
                      </Box>
                      <Box sx={{
                        width: 0,
                        height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: '6px solid #666'
                      }} />
                    </Box>
                  </Box>

                  {/* Pincode Input */}
                  <Box sx={{
                    flex: 1,
                    position: 'relative'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #ddd',
                      borderRadius: 1,
                      px: 2,
                      py: { xs: 1.2, md: 1.5 },
                      background: 'linear-gradient(90deg, #fff5f2 0%, #fff 100%)',
                      '&:focus-within': {
                        borderColor: '#7d2a25',
                        boxShadow: '0 0 0 2px rgba(125,42,37,0.1)'
                      }
                    }}>
                      {/* Location Pin Icon */}
                      <Box sx={{
                        mr: 1.5,
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                      </Box>
                      <input
                        type="text"
                        placeholder="Enter Pincode"
                        style={{
                          border: 'none',
                          outline: 'none',
                          background: 'transparent',
                          width: '100%',
                          fontSize: '14px',
                          color: '#333'
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Check Button */}
                  <Button
                    variant="text"
                    sx={{
                      color: '#7d2a25',
                      fontWeight: 600,
                      fontSize: { xs: '14px', md: '16px' },
                      textTransform: 'none',
                      px: { xs: 2, md: 3 },
                      py: { xs: 1.2, md: 1.5 },
                      minWidth: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        backgroundColor: 'rgba(125,42,37,0.05)'
                      }
                    }}
                  >
                    Check
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          bottom: { xs: 80, sm: 20, md: 20 }
        }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            fontSize: { xs: '14px', sm: '16px' }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
