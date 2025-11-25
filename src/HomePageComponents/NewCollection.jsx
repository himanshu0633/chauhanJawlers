import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Card, CardMedia, CardContent, Button, Chip, styled } from "@mui/material";
import axiosInstance from "../commonComponents/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { publicUrl } from "../commonComponents/PublicUrl";
import Theme from "../../Theme";
import { useDispatch } from 'react-redux';
import { addData } from '../store/Action';
import { toast, ToastContainer } from 'react-toastify';

// ---- Styled Components ----
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  paddingTop: 80,
  paddingBottom: 80,
  [theme.breakpoints.down('lg')]: { 
    paddingTop: 60, 
    paddingBottom: 60 
  },
  [theme.breakpoints.down('md')]: { 
    paddingTop: 40, 
    paddingBottom: 40 
  },
  [theme.breakpoints.down('sm')]: { 
    paddingTop: 30, 
    paddingBottom: 30 
  },
}));

const HeaderContainer = styled(Container)({
  textAlign: "center",
  marginBottom: 30,
});

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontSize: 48,
  fontWeight: 600,
  color: Theme.palette.primary,
  marginBottom: 12,
  lineHeight: 1.2,
  [theme.breakpoints.down('lg')]: { fontSize: 42 },
  [theme.breakpoints.down('md')]: { fontSize: 36 },
  [theme.breakpoints.down('sm')]: { fontSize: 28 },
  [theme.breakpoints.down('xs')]: { fontSize: 24 },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  color: "#666",
  letterSpacing: ".3px",
  [theme.breakpoints.down('md')]: { fontSize: 17 },
  [theme.breakpoints.down('sm')]: { fontSize: 16 },
  [theme.breakpoints.down('xs')]: { fontSize: 14 },
}));

const FlexRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "32px",
  maxWidth: 1100,
  margin: "0 auto",
  alignItems: "stretch",
  [theme.breakpoints.down('lg')]: {
    gap: "28px",
    maxWidth: "95%",
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
    gap: 24,
    maxWidth: "90%",
  },
  [theme.breakpoints.down('sm')]: {
    gap: 20,
    maxWidth: "100%",
  },
}));

const PromoCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  overflow: "hidden",
  flex: "1 1 340px",
  minWidth: "320px",
  minHeight: 500,
  maxWidth: 420,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": { 
    transform: "translateY(-5px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: 450,
    minWidth: "280px",
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 380,
    maxWidth: "100%",
    width: "100%",
    minWidth: "auto",
    margin: "0 auto",
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 300,
    borderRadius: 12,
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: 250,
  },
}));

const PromoImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  objectFit: "cover",
  objectPosition: "center",
});

const PromoOverlay = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  padding: "48px 36px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  height: "100%",
  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
  [theme.breakpoints.down('lg')]: {
    padding: "40px 28px",
  },
  [theme.breakpoints.down('md')]: {
    padding: "32px 24px",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "24px 20px",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "20px 16px",
  },
}));

const PromoButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(46, 37, 37, 0.46)",
  color: "#fff",
  padding: "8px 28px",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.33)",
  letterSpacing: ".4px",
  "&:hover": { 
    backgroundColor: "rgba(0,0,0,0.25)",
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "6px 20px",
    fontSize: 13,
  },
  [theme.breakpoints.down('xs')]: {
    padding: "5px 16px",
    fontSize: 12,
  },
}));

const RightFlexBox = styled(Box)(({ theme }) => ({
  flex: "2 1 650px",
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  minWidth: "0",
  alignContent: "flex-start",
  [theme.breakpoints.down('lg')]: {
    gap: "16px",
  },
  [theme.breakpoints.down('md')]: {
    gap: "12px",
    justifyContent: "center",
    flex: "2 1 0",
  },
  [theme.breakpoints.down('sm')]: {
    gap: "10px",
  },
  [theme.breakpoints.down('xs')]: {
    gap: "8px",
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  width: "calc(33.333% - 14px)",
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  transition: "transform 0.26s, box-shadow 0.26s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  [theme.breakpoints.down('lg')]: {
    width: "calc(33.333% - 11px)",
  },
  [theme.breakpoints.down('md')]: {
    width: "calc(50% - 6px)",
  },
  [theme.breakpoints.down('sm')]: {
    width: "calc(50% - 5px)",
    borderRadius: 10,
  },
  [theme.breakpoints.down('xs')]: {
    width: "calc(50% - 4px)",
    borderRadius: 8,
  },
  // For very small screens, show 1 column
  [theme.breakpoints.down(400)]: {
    width: "100%",
    maxWidth: "280px",
    margin: "0 auto",
  },
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 170,
  [theme.breakpoints.down('lg')]: { 
    height: 160 
  },
  [theme.breakpoints.down('md')]: { 
    height: 155 
  },
  [theme.breakpoints.down('sm')]: { 
    height: 140 
  },
  [theme.breakpoints.down('xs')]: { 
    height: 130 
  },
  [theme.breakpoints.down(400)]: { 
    height: 150 
  },
}));

const ProductImage = styled(CardMedia)({
  height: "100%",
  width: "100%",
  maxWidth: "100%",
  display: "block",
  cursor: "pointer",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "#44170b",
  color: "#fff",
  fontSize: 12,
  fontWeight: 600,
  height: 24,
  "& .MuiChip-label": {
    padding: "0 8px",
  },
  [theme.breakpoints.down('sm')]: {
    height: 22,
    fontSize: 11,
    top: 6,
    right: 6,
    "& .MuiChip-label": {
      padding: "0 6px",
    },
  },
  [theme.breakpoints.down('xs')]: {
    height: 20,
    fontSize: 10,
  },
}));

const ProductInfo = styled(CardContent)(({ theme }) => ({
  padding: "14px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down('sm')]: {
    padding: "12px",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "10px",
  },
}));

const ProductCategory = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: "#666",
  marginBottom: 2,
  textTransform: "capitalize",
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 10,
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  fontWeight: 500,
  color: "#2C2C2C",
  marginBottom: 4,
  lineHeight: 1.2,
  textTransform: 'capitalize',
  minHeight: '36px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: { 
    fontSize: 14,
    minHeight: '34px',
  },
  [theme.breakpoints.down('sm')]: { 
    fontSize: 13,
    minHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: { 
    fontSize: 12,
    minHeight: '30px',
  },
}));

const PriceContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
});

const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: "#2C2C2C",
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 14,
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '6px',
  padding: '6px 12px',
  minHeight: '36px',
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
    padding: '5px 10px',
    minHeight: '34px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
    padding: '4px 8px',
    minHeight: '32px',
  },
}));

// ---- Main Component ----
export default function NewCollection() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const parseQuantityArray = (q) => {
    if (!q) return [];
    let arr = q;
    if (typeof q === "string") {
      try { arr = JSON.parse(q); } catch { return []; }
    }
    // Handle double-stringified arrays
    if (Array.isArray(arr) && arr.length === 1 && typeof arr[0] === 'string') {
      try { arr = JSON.parse(arr[0]); } catch { return []; }
    }
    return Array.isArray(arr) ? arr : [];
  };

  const pickBestVariation = (arr) => {
    if (!arr.length) return null;
    // Return the variant with the lowest finalPrice
    return arr.reduce((best, cur) =>
      parseFloat(cur.finalPrice) < parseFloat(best.finalPrice) ? cur : best, arr[0]);
  };

  const preprocessProducts = (productsRaw) => productsRaw.map((p) => {
    const quantityArr = parseQuantityArray(p.quantity?.[0]);
    const bestVariation = pickBestVariation(quantityArr);
    return {
      ...p,
      price: bestVariation ? parseFloat(bestVariation.finalPrice) : 0,
      gst: bestVariation ? parseFloat(bestVariation.gst) : null,
      discount: bestVariation ? parseFloat(bestVariation.discount) : 0,
      weight: bestVariation ? parseFloat(bestVariation.weight) : null,
      makingPrice: bestVariation ? parseFloat(bestVariation.makingPrice) : null,
      quantityVariants: quantityArr,
      bestVariant: bestVariation,
    };
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/user/allproducts');
      const processedProducts = preprocessProducts(response.data);

      // Sort by createdAt descending (latest first)
      processedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllProducts(processedProducts);
    } catch (error) {
      setError('Could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!product || !product.bestVariant) return;

    const variant = product.bestVariant;

    // Check product-level stock status
    const isInStock = String(product.stock).toLowerCase() === 'yes';
    if (!isInStock) {
      toast.error('This product is out of stock!', { position: 'top-right', autoClose: 2000 });
      return;
    }

    const cartItem = {
      ...product,
      selectedVariant: variant,
      cartQty: 1,
      unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
    };

    toast.success('Item added to cart!', { position: 'top-right', autoClose: 2000 });
    dispatch(addData(cartItem));
  };

  return (
    <SectionContainer>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <HeaderContainer maxWidth="xl">
        <MainTitle>New Collections</MainTitle>
        <SubTitle>Elevate Every Look with Fashion-Forward Jewellery</SubTitle>
      </HeaderContainer>

      <FlexRow>
        {/* Left Promo Card */}
        <PromoCard onClick={() => navigate('/allJewellery')}>
          <PromoImage
            src="/newcollectionmainimg.jpg"
            title="30% Off Sale"
            component="img"
            onError={(e) => {
              e.target.src = "/newCollectionLady.png";
            }}
          />
          <PromoOverlay>
            <PromoButton variant="outlined">SHOP NOW</PromoButton>
          </PromoOverlay>
        </PromoCard>

        {/* Right flex product cards */}
        <RightFlexBox>
          {allProducts.slice(0, 6).map((product) => {
            // Check product-level stock status
            const isInStock = String(product.stock).toLowerCase() === 'yes';

            return (
              <ProductCard key={product._id}>
                <ProductImageContainer>
                  <ProductImage
                    onClick={() => navigate(`/singleProduct/${product._id}`)}
                    src={publicUrl(product?.media[0]?.url)}
                    title={product.name}
                    component="img"
                    onError={(e) => {
                      e.target.src = "/newCollectionLady.png";
                    }}
                  />
                  {product.discount > 0 && (
                    <DiscountBadge label={`${product.discount}% OFF`} />
                  )}
                </ProductImageContainer>

                <ProductInfo>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductName>{product.name}</ProductName>
                  <PriceContainer>
                    <CurrentPrice>₹{product.price?.toLocaleString()}</CurrentPrice>
                  </PriceContainer>
                  <AddToCartButton
                    variant="contained"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={!isInStock}
                    title={!isInStock ? 'Out of stock' : 'Add to Cart'}
                  >
                    {isInStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </RightFlexBox>
      </FlexRow>
    </SectionContainer>
  );
}