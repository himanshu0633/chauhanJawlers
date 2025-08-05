import React from 'react';
import { Box, Typography, Button, Grid, IconButton, Chip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';


const wishlistItems = [
  // Fill with product objects when items are in the wishlist, leave [] for empty
  // {
  //   img: 'https://example.com/image.jpg',
  //   title: 'Product title...',
  //   price: '₹ 37,038',
  //   oldPrice: '₹ 38,845',
  //   status: 'Only 1 left', // or 'Best Seller', or ''
  // },
  // ... more items
];

function EmptyWishlist() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'center', md: 'flex-start' },
      justifyContent: 'center',
      gap: 5,
      pt: 4
    }}>
      <Box sx={{ minWidth: 190, textAlign: 'center' }}>
        {/* Replace with your SVG or image */}
        <svg width="130" height="110" viewBox="0 0 150 112" fill="none">
          <rect x="20" y="40" width="90" height="60" rx="2.5" fill="#e0d9d5"/>
          <rect x="40" y="60" width="50" height="10" rx="2.5" fill="#c2bcb8"/>
          <rect x="30" y="83" width="30" height="5" rx="2.5" fill="#c2bcb8"/>
          <text x="58" y="56" fill="#c2bcb8" fontSize="10">×</text>
          <g>
            <ellipse cx="80" cy="20" rx="10" ry="7" fill="#f4dddd"/>
            <text x="75" y="24" fill="#d5888c" fontSize="18">♥</text>
          </g>
        </svg>
      </Box>
      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mt: { xs: 2, md: 10 } }}>
        <Typography variant="h6" sx={{ color: '#702626', fontWeight: 600, mb: 0.75 }}>
          Your Wishlist Is Empty !
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Add Tanishq To Your Jewellery Wardrobe
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: '#7d2a25',
            color: '#fff',
            borderRadius: '4px',
            px: 4,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { background: '#611f18' }
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}

function WishlistCard({ product }) {
  return (
    <Box sx={{
      background: '#fff',
      borderRadius: 2,
      boxShadow: '0 .5px 4px 0 rgba(70,21,7,0.08)',
      border: '1px solid #eee',
      p: 2,
      mb: 1.5,
      position: 'relative',
      minHeight: 260,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <DeleteOutlineIcon sx={{ color: '#bbb' }} />
      </IconButton>
      {/* Product status */}
      {product.status && (
        <Chip
          label={product.status}
          color={product.status === 'Only 1 left' ? 'error' : 'primary'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background:
              product.status === 'Only 1 left' ? '#b40202' : '#7d2a25',
            color: '#fff',
            fontWeight: 500,
            fontSize: 13,
          }}
        />
      )}
      {/* Product image */}
      <Box sx={{
        width: '100%',
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1.2
      }}>
        <img
          src={product.img}
          alt={product.title}
          style={{
            maxWidth: '90%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
      {/* Title and price */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 400,
          color: '#333',
          fontFamily: 'serif',
          lineHeight: 1.1,
          mb: 1,
          fontSize: 16
        }}
      >
        {product.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography
          sx={{
            fontWeight: 500,
            color: '#272727',
            fontSize: 16
          }}
        >{product.price}</Typography>
        {product.oldPrice && (
          <Typography
            sx={{
              color: '#bdbdbd',
              fontSize: 14,
              textDecoration: 'line-through'
            }}
          >
            {product.oldPrice}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        sx={{
          background: '#7d2a25',
          color: '#fff',
          borderRadius: '3px',
          textTransform: 'none',
          fontWeight: 500,
          py: 1,
          fontSize: 15,
          '&:hover': { background: '#611f18' }
        }}
        fullWidth
      >
        Move To Cart
      </Button>
    </Box>
  );
}

export default function WishlistPage() {
  // Toggle between [] for empty and [{...}] for items to test both views
  const isEmpty = wishlistItems.length === 0;

  return (
    <Box sx={{ px: { xs: 2, md: 5 }, py: 3 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3,
        gap: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 400, color: '#222', flex: 1 }}>
          Wishlist
        </Typography>
        {!isEmpty && (
          <Button
            startIcon={<ShareOutlinedIcon />}
            variant="outlined"
            sx={{
              borderRadius: '18px',
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 80,
              background: '#fff',
              border: '1px solid #bbb'
            }}
            size="small"
          >
            Share
          </Button>
        )}
      </Box>
      {isEmpty ? (
        <EmptyWishlist />
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((item, idx) => (
            <Grid
              key={idx}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              sx={{ display: 'flex' }}
            >
              <WishlistCard product={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
