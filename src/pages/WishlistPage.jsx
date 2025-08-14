// Replace this:
// const savedWishlist = localStorage.getItem('wishlist');

// With this:
// const response = await fetch('/api/wishlist');
// const wishlistData = await response.json();



//local storage se data show krwne ke liye   
// 


import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton, Chip, Snackbar, Alert } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useNavigate } from 'react-router-dom';

// Sample wishlist items - replace with API data later
const sampleWishlistItems = [
  {
    id: 1,
    img: '/public/collection1.png',
    title: 'Dazzling Grace Drop Earrings',
    price: '₹ 59,101',
    oldPrice: '₹ 62,000',
    category: 'Earrings'
  },
  {
    id: 2,
    img: '/public/collection2.png',
    title: 'Royal Diamond Necklace',
    price: '₹ 1,25,000',
    oldPrice: '₹ 1,35,000',
    category: 'Necklace'
  },
  {
    id: 3,
    img: '/public/collection3.png',
    title: 'Elegant Gold Bracelet',
    price: '₹ 45,000',
    oldPrice: '',
    category: 'Bracelet'
  },
  {
    id: 4,
    img: '/public/collection1.png',
    title: 'Shimmering Pearl Earrings',
    price: '₹ 52,000',
    oldPrice: '₹ 55,000',
    category: 'Earrings'
  },
  {
    id: 5,
    img: '/public/collection2.png',
    title: 'Majestic Ruby Necklace',
    price: '₹ 1,15,000',
    oldPrice: '₹ 1,25,000',
    category: 'Necklace'
  },
  {
    id: 6,
    img: '/public/collection3.png',
    title: 'Classic Platinum Bracelet',
    price: '₹ 49,500',
    oldPrice: '₹ 53,000',
    category: 'Bracelet'
  },
  {
    id: 7,
    img: '/public/collection1.png',
    title: 'Vintage Emerald Earrings',
    price: '₹ 65,000',
    oldPrice: '₹ 70,000',
    category: 'Earrings'
  },
  {
    id: 8,
    img: '/public/collection2.png',
    title: 'Golden Choker Necklace',
    price: '₹ 95,000',
    oldPrice: '₹ 1,05,000',
    category: 'Necklace'
  },
  {
    id: 9,
    img: '/public/collection3.png',
    title: 'Delicate Chain Bracelet',
    price: '₹ 32,000',
    oldPrice: '',
    category: 'Bracelet'
  },
  {
    id: 10,
    img: '/public/collection1.png',
    title: 'Radiant Crystal Earrings',
    price: '₹ 58,000',
    oldPrice: '₹ 60,500',
    category: 'Earrings'
  },
  {
    id: 11,
    img: '/public/collection2.png',
    title: 'Opulent Diamond Necklace',
    price: '₹ 1,35,000',
    oldPrice: '₹ 1,50,000',
    category: 'Necklace'
  },
  {
    id: 12,
    img: '/public/collection3.png',
    title: 'Luxury Cuff Bracelet',
    price: '₹ 55,000',
    oldPrice: '',
    category: 'Bracelet'
  },
  {
    id: 13,
    img: '/public/collection1.png',
    title: 'Floral Sapphire Earrings',
    price: '₹ 62,000',
    oldPrice: '₹ 68,000',
    category: 'Earrings'
  },
  {
    id: 14,
    img: '/public/collection2.png',
    title: 'Rose Gold Pendant Necklace',
    price: '₹ 88,000',
    oldPrice: '₹ 92,000',
    category: 'Necklace'
  },
  {
    id: 15,
    img: '/public/collection3.png',
    title: 'Minimalist Silver Bracelet',
    price: '₹ 28,500',
    oldPrice: '₹ 31,000',
    category: 'Bracelet'
  },
  {
    id: 16,
    img: '/public/collection1.png',
    title: 'Glamour Teardrop Earrings',
    price: '₹ 54,000',
    oldPrice: '',
    category: 'Earrings'
  },
  {
    id: 17,
    img: '/public/collection2.png',
    title: 'Statement Beaded Necklace',
    price: '₹ 72,000',
    oldPrice: '₹ 79,000',
    category: 'Necklace'
  },
  {
    id: 18,
    img: '/public/collection3.png',
    title: 'Diamond Accent Bracelet',
    price: '₹ 47,500',
    oldPrice: '₹ 50,000',
    category: 'Bracelet'
  },
  {
    id: 19,
    img: '/public/collection1.png',
    title: 'Elegant Hoop Earrings',
    price: '₹ 39,000',
    oldPrice: '₹ 42,000',
    category: 'Earrings'
  },
  {
    id: 20,
    img: '/public/collection2.png',
    title: 'Antique Gold Necklace',
    price: '₹ 1,10,000',
    oldPrice: '',
    category: 'Necklace'
  }
];


function EmptyWishlist({ onContinueShopping }) {
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
      {/* Empty wishlist illustration */}
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
          {/* Box */}
          <Box sx={{
            width: { xs: 70, md: 90 },
            height: { xs: 45, md: 60 },
            backgroundColor: '#e0d9d5',
            borderRadius: '2.5px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: { xs: -8, md: -10 },
              left: { xs: -4, md: -5 },
              width: { xs: 78, md: 100 },
              height: { xs: 12, md: 15 },
              backgroundColor: '#c2bcb8',
              borderRadius: '2.5px',
              transform: 'rotate(-5deg)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: { xs: -6, md: -8 },
              right: { xs: -2, md: -3 },
              width: { xs: 73, md: 95 },
              height: { xs: 10, md: 12 },
              backgroundColor: '#c2bcb8',
              borderRadius: '2.5px',
              transform: 'rotate(5deg)'
            }
          }}>
            {/* Box details */}
            <Box sx={{
              position: 'absolute',
              top: { xs: 15, md: 20 },
              left: { xs: 15, md: 20 },
              width: { xs: 40, md: 50 },
              height: { xs: 8, md: 10 },
              backgroundColor: '#c2bcb8',
              borderRadius: '2.5px'
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: { xs: 6, md: 8 },
              left: { xs: 12, md: 15 },
              width: { xs: 25, md: 30 },
              height: { xs: 4, md: 5 },
              backgroundColor: '#c2bcb8',
              borderRadius: '2.5px'
            }} />
            <Typography sx={{
              position: 'absolute',
              top: { xs: 12, md: 16 },
              left: { xs: 30, md: 38 },
              color: '#c2bcb8',
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 'bold'
            }}>
              ×
            </Typography>
          </Box>
          {/* Floating heart */}
          <Box sx={{
            position: 'absolute',
            top: { xs: 8, md: 10 },
            right: { xs: 15, md: 20 },
            width: { xs: 16, md: 20 },
            height: { xs: 16, md: 20 },
            backgroundColor: '#f4dddd',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #d5888c'
          }}>
            <Typography sx={{
              color: '#d5888c',
              fontSize: { xs: '12px', md: '14px' },
              lineHeight: 1
            }}>
              ♥
            </Typography>
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
          Your Wishlist Is Empty !
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: '#702626',
            fontSize: { xs: '14px', md: '16px' }
          }}
        >
          Add Chauhan Jewellers To Your Jewellery Wardrobe
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

function WishlistCard({ product, onRemove, onMoveToCart }) {
  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 2,
      boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
      border: '1px solid #eee',
      p: { xs: 1.5, sm: 2, md: 2 },
      mb: 1.5,
      position: 'relative',
      // height: { xs: 260, sm: 280, md: 300, lg: 320 },
      width: { xs: 160, sm: 200, md: 240, lg: 280 },
      maxWidth: '100%',
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 1,
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
        </Box>

        {/* Move to cart button - fixed at bottom */}
        <Button
          variant="contained"
          onClick={() => onMoveToCart(product)}
          sx={{
            background: '#7d2a25',
            color: '#fff',
            borderRadius: '3px',
            textTransform: 'none',
            fontWeight: 500,
            py: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.8 },
            fontSize: { xs: 10, sm: 11, md: 12, lg: 14 },
            '&:hover': { background: '#611f18' }
          }}
          fullWidth
        >
          Move To Cart
        </Button>
      </Box>
    </Box>
  );
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Load wishlist items on component mount
  useEffect(() => {
    // For now, use localStorage. Later replace with API call
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    } else {
      // Initialize with sample data for demonstration
      setWishlistItems(sampleWishlistItems);
      localStorage.setItem('wishlist', JSON.stringify(sampleWishlistItems));
    }
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setSnackbarMessage('Item removed from wishlist');
    setShowSnackbar(true);
  };

  const handleMoveToCart = (product) => {
    // In a real app, you would add this to cart and remove from wishlist
    // For now, we'll just remove it from wishlist
    handleRemoveFromWishlist(product.id);
    setSnackbarMessage(`${product.title} moved to cart`);
    setShowSnackbar(true);
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to home page
  };

  const handleShare = () => {
    // In a real app, implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: 'Check out my jewellery wishlist!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      setSnackbarMessage('Wishlist link copied to clipboard!');
      setShowSnackbar(true);
    }
  };

  const isEmpty = wishlistItems.length === 0;

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
          Wishlist
        </Typography>
        {!isEmpty && (
          <Button
            startIcon={<ShareOutlinedIcon />}
            variant="outlined"
            onClick={handleShare}
            sx={{
              borderRadius: '18px',
              textTransform: 'none',
              fontWeight: 500,
              minWidth: { xs: 70, md: 80 },
              background: '#fff',
              border: '1px solid #bbb',
              color: '#7d2a25',
              fontSize: { xs: '13px', md: '14px' },
              '&:hover': {
                border: '1px solid #7d2a25',
                background: '#fafafa'
              }
            }}
            size="small"
          >
            Share
          </Button>
        )}
      </Box>

      {/* Content */}
      {isEmpty ? (
        <EmptyWishlist onContinueShopping={handleContinueShopping} />
      ) : (
        <Grid
          container
          spacing={{ xs: 1, sm: 1.5, md: 2, lg: 2.5 }}
          justifyContent="center"
        >
          {wishlistItems.map((item) => (
            <Grid
              key={item.id}
              item
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={2}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <WishlistCard
                product={item}
                onRemove={handleRemoveFromWishlist}
                onMoveToCart={handleMoveToCart}
              />
            </Grid>
          ))}
        </Grid>
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
