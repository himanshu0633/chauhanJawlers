import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  useScrollTrigger,
  IconButton,
  Button,
  Snackbar,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addToWishlist, removeFromWishlist } from '../store/Action';
import { createSelector } from '@reduxjs/toolkit';
import TrendingKeywordsMarquee from "./WeddingpageParts/TrendingKeywordsMarquee";
import WeddingOccasionSlider from "./WeddingpageParts/WeddingOccasionSlider";
import { publicUrl } from "../commonComponents/PublicUrl";
import axiosInstance from "../commonComponents/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

// Wishlist selector
export const selectWishlist = createSelector(
  [state => Array.isArray(state.app?.wishlist) ? state.app.wishlist : []],
  wishlist => [...wishlist]
);

// Product Card Component for Wedding Page
function WeddingProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector(selectWishlist);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [units, setUnits] = useState(1);

  const isWishlisted = !!product && wishlist.some(item => String(item._id) === String(product._id));
  const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";
  const best = product.bestVariant || {};
  const canAddToCart = Boolean(product?.stock === "yes");

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      setSnackbarMsg('Removed from Wishlist');
    } else {
      dispatch(addToWishlist(product));
      setSnackbarMsg('Added to Wishlist');
    }
    setSnackbarOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!product) return;
    
    const cartItem = {
      ...product,
      selectedVariant: best,
      cartQty: units,
      unitPrice: Number(best.finalPrice || 0),
    };

    dispatch(addData(cartItem));
    // Navigate directly to cart page
    navigate("/cart");
  };

  const finalAmount = best?.finalPrice ? best.finalPrice : product.price ? product.price : 0;

  const increaseUnits = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUnits(prev => prev + 1);
  };

  const decreaseUnits = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUnits(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Box
      sx={{
        pb: 1,
        position: "relative",
        height: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        width: "100%",
        height: { xs: 200 },
        mx: 'auto',
        bgcolor: 'transparent',
        boxShadow: 'none',
        pt: 1,
        backgroundColor: '#fff'
      }}>
        <Box 
          onClick={() => navigate(`/singleProduct/${product._id}`)} 
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <img
            src={imgUrl}
            alt={product.name}
            style={{
              margin: 'auto',
              objectFit: 'cover',
              width: '100%',
              height: "100%",  
              borderRadius: '8px'
            }}
          />
        </Box>
        <IconButton
          onClick={handleWishlistClick}
          aria-label="add to wishlist"
          sx={{
            position: 'absolute',
            top: 8,
            right: 12,
            background: '#fff',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            p: '5px',
            color: 'inherit'
          }}
          size="small"
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
          )}
        </IconButton>
      </Box>

      <Box 
        onClick={() => navigate(`/singleProduct/${product._id}`)} 
        style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "serif",
            color: "#222",
            mt: 1,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500, fontSize: 17, color: '#222', fontFamily: 'cursive' }}
        >
          ₹{finalAmount}
        </Typography>
      </Box>

      {/* Quantity Selector and Add to Cart Button */}
      <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 600, color: '#2c2c2c' }}>
            Quantity:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, border: '1px solid #e0e0e0', borderRadius: 1, p: 0.5 }}>
            <IconButton 
              size="small" 
              onClick={decreaseUnits}
              sx={{ width: 24, height: 24, fontSize: 14 }}
            >
              -
            </IconButton>
            <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>
              {units}
            </Typography>
            <IconButton 
              size="small" 
              onClick={increaseUnits}
              sx={{ width: 24, height: 24, fontSize: 14 }}
            >
              +
            </IconButton>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          onClick={handleAddToCart} 
          disabled={!canAddToCart}
          sx={{
            backgroundColor: '#44170d',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            py: 0.75,
            '&:hover': {
              backgroundColor: '#5a1f12',
            },
            '&:disabled': {
              backgroundColor: '#e0e0e0',
              color: '#999',
            }
          }}
        >
          {canAddToCart ? "Add to Cart" : "Out of Stock"}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WeddingPage = () => {
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true });
  const [occasion, setOccasion] = useState([]);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredOccasionName, setFilteredOccasionName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shownCount, setShownCount] = useState(12);
  
  const [filters, setFilters] = useState({
    query: '',
    priceRange: 'all',
  });
  const [sortOption, setSortOption] = useState('relevance');

  const query = useQuery();
  const occasionQuery = query.get('occasion')?.toLowerCase() || '';
  const navigate = useNavigate();

  // Price buckets for filtering
  const priceBuckets = [
    { label: 'Under ₹25K', min: 0, max: 25000 },
    { label: '₹25K – ₹50K', min: 25000, max: 50000 },
    { label: '₹50K – ₹1L', min: 50000, max: 100000 },
    { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
  ];

  const loadMoreProducts = () => {
    setShownCount(prev => prev + 12);
  };

  const parseQuantityArray = (q) => {
    if (!q) return [];
    let arr = q;
    if (typeof q === "string") {
      try { arr = JSON.parse(q); } catch { return []; }
    }
    return Array.isArray(arr) ? arr : [];
  };

  const pickBestVariation = (arr) => {
    if (!arr || arr.length === 0) return {
      finalPrice: 0,
      gst: 0,
      discount: 0,
      weight: 0,
      makingPrice: 0
    };
    return arr.reduce((best, cur) =>
      parseFloat(cur.finalPrice || 0) < parseFloat(best.finalPrice || 0) ? cur : best, arr[0]);
  };

  // Preprocess products to calculate bestVariant and price
  const preprocessProducts = (productsRaw) => {
    return productsRaw.map((p) => {
      const quantityArr = parseQuantityArray(p.quantity?.[0]);
      const bestVariation = pickBestVariation(quantityArr);
      return {
        ...p,
        price: bestVariation ? parseFloat(bestVariation.finalPrice || 0) : 0,
        gst: bestVariation ? parseFloat(bestVariation.gst || 0) : null,
        discount: bestVariation ? parseFloat(bestVariation.discount || 0) : 0,
        weight: bestVariation ? parseFloat(bestVariation.weight || 0) : null,
        makingPrice: bestVariation ? parseFloat(bestVariation.makingPrice || 0) : null,
        quantityVariants: quantityArr,
        bestVariant: bestVariation,
      };
    });
  };

  // Fetch data on component mount
  const fetchOccasions = async () => {
    try {
      const response = await axiosInstance.get(`/user/allOccasions`);
      setOccasion(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching occasion:", error);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/allproducts`);
      const preprocessedProducts = preprocessProducts(response?.data ?? []);
      setProducts(preprocessedProducts);
    } catch (error) {
      setError('Could not load products. Please try again.');
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get("/user/allBanners");
      const bannerData = response.data;
      const mainBanners = bannerData.filter(
        (banner) =>
          banner.type === "EndSlider" &&
          Array.isArray(banner.slider_image) &&
          banner.slider_image.length > 0
      );
      setBanners(mainBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchOccasions();
    fetchAllProducts();
    fetchBanners();
  }, []);

  // Filter and sort products based on filters and occasion
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];
    let foundOccasionName = '';

    // Filter by occasion if specified
    if (occasionQuery && occasion.length > 0) {
      const foundOccasion = occasion.find(
        o => o.name.trim().toLowerCase() === occasionQuery.trim()
      );
      foundOccasionName = foundOccasion ? foundOccasion.name : '';
      
      filtered = filtered.filter(
        p => p.occasion && p.occasion.trim().toLowerCase() === occasionQuery.trim()
      );
    }

    // Apply search filter
    if (filters.query) {
      filtered = filtered.filter(p => 
        p.name && p.name.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.priceRange !== 'all') {
      const priceBucket = priceBuckets.find(b => b.label === filters.priceRange);
      if (priceBucket) {
        filtered = filtered.filter(p => 
          p.price >= priceBucket.min && p.price <= priceBucket.max
        );
      }
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return (a.price || 0) - (b.price || 0);
        case 'price-desc': return (b.price || 0) - (a.price || 0);
        case 'newest':
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        default: return 0;
      }
    });

    setFilteredProducts(filtered);
    setFilteredOccasionName(foundOccasionName);
  }, [occasionQuery, products, occasion, filters, sortOption]);

  // Reset shown count when filters change
  useEffect(() => {
    setShownCount(12);
  }, [filters, sortOption, occasionQuery]);

  const productsToDisplay = filteredProducts.slice(0, shownCount);

  const trendingItems = [
    "Bridal Necklace Sets",
    "Wedding Bangles",
    "Bridal Earrings",
    "Maang Tikka",
    "Diamond Jewellery",
  ];

  const trendingImages = {
    "Bridal Necklace Sets": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    "Wedding Bangles": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    "Bridal Earrings": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    "Maang Tikka": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    "Diamond Jewellery": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ pt: 5, pb: 3 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ 
              fontWeight: 700, 
              mb: 4, 
              fontFamily: 'serif', 
              color: '#8B1538', 
              fontSize: { xs: '28px', sm: '36px', md: '48px' } 
            }}
          >
            {filteredOccasionName ? filteredOccasionName : "Wedding Collection"}
          </Typography>

          {/* Filters and Sort Controls */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            mb: 3,
            gap: 1
          }}>
            <TextField
              label="Search Wedding Collection"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              sx={{ width: { xs: '48%', sm: '30%' } }}
            />
            <Select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              sx={{ width: { xs: '48%', sm: '30%' } }}
            >
              <MenuItem value="all">All Prices</MenuItem>
              {priceBuckets.map(bucket => (
                <MenuItem key={bucket.label} value={bucket.label}>
                  {bucket.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              sx={{ width: { xs: '48%', sm: '30%' } }}
            >
              <MenuItem value="relevance">Sort by: Relevance</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Product Grid */}
        {loading ? (
          <Typography align="center" sx={{ py: 4 }}>
            Loading wedding collection...
          </Typography>
        ) : error ? (
          <Typography align="center" color="error" sx={{ py: 4 }}>
            {error}
          </Typography>
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {occasionQuery
                ? `No products available for ${filteredOccasionName} occasion. Try browsing other occasions.`
                : "Try adjusting your filters or search terms"}
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                },
                gap: 2,
                justifyContent: "center",
              }}
            >
              {productsToDisplay.map((product) => (
                <WeddingProductCard key={product._id} product={product} />
              ))}
            </Box>

            {/* Load More */}
            {shownCount < filteredProducts.length && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={loadMoreProducts}
                  sx={{ px: 4, py: 1.5 }}
                >
                  View More ({filteredProducts.length - shownCount} remaining)
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Trending Keywords */}
        <TrendingKeywordsMarquee
          trigger={trigger}
          trendingItems={trendingItems}
          trendingImages={trendingImages}
        />

        {/* Wedding Occasions */}
        <Box sx={{ py: 8, backgroundColor: '#faf5f0', mt: 8 }}>
          <Container maxWidth="lg">
            <WeddingOccasionSlider />
          </Container>
        </Box>

        {/* Featured Articles */}
        <Box sx={{ py: 8, backgroundColor: "#fff" }}>
          <Container maxWidth="xl">
            {banners.length > 0 && (
              <Typography
                variant="h4"
                align="center"
                sx={{ 
                  fontWeight: 700, 
                  mb: 6, 
                  fontFamily: 'serif', 
                  color: '#8B1538', 
                  fontSize: { xs: '28px', sm: '36px', md: '48px' } 
                }}
              >
                Featured Collections
              </Typography>
            )}

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 } }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
            >
              {banners.map((item) => (
                <SwiperSlide key={item._id}>
                  <Box sx={{ width: "100%" }}>
                    <img
                      src={publicUrl(item.slider_image)}
                      alt={item.type}
                      style={{ width: "100%", height: "100%", maxWidth: "100%", objectFit: "contain", display: "block", cursor: "pointer", borderRadius: "12px" }}
                      onClick={() => navigate(`/allJewellery/${(item.variety || 'all').toLowerCase()}`)}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default WeddingPage;