import React from "react";
import { Box, Typography, Container, Card, CardMedia, CardContent, Button, Chip, styled } from "@mui/material";
import { Star } from "@mui/icons-material";

// ---- Styled Components ----
const SectionContainer = styled(Box)({
  backgroundColor: "#fff",
  paddingTop: 80,
  paddingBottom: 80,
});

const HeaderContainer = styled(Container)({
  textAlign: "center",
  marginBottom: 60,
});

const MainTitle = styled(Typography)({
  fontFamily: "serif",
  fontSize: 48,
  fontWeight: 400,
  color: "#2C2C2C",
  marginBottom: 12,
  lineHeight: 1.2,
  "@media (max-width:960px)": { fontSize: 40 },
  "@media (max-width:600px)": { fontSize: 32 },
});

const SubTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 400,
  color: "#666",
  letterSpacing: ".3px",
  "@media (max-width:600px)": { fontSize: 16 },
});

const FlexRow = styled(Box)({
  display: "flex",
  gap: "32px",
  maxWidth: 1100,
  margin: "0 auto",
  alignItems: "stretch",
  "@media (max-width:900px)": {
    flexDirection: "column",
    gap: 24,
    maxWidth: "95vw",
  },
});

const PromoCard = styled(Card)({
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
  transition: "transform 0.3s",
  "&:hover": { transform: "translateY(-5px)" },
  "@media (max-width:900px)": {
    minHeight: 380,
    maxWidth: "100%",
    width: "100%",
    marginBottom: 0,
  },
  "@media (max-width:600px)": {
    minHeight: 260,
  },
});

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

const PromoOverlay = styled(Box)({
  position: "relative",
  zIndex: 2,
  padding: "48px 36px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  height: "100%",
  "@media (max-width:600px)": {
    padding: "24px 16px",
  },
});

const PromoDiscount = styled(Typography)({
  fontSize: 48,
  fontWeight: "bold",
  marginBottom: 8,
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  "@media (max-width:960px)": { fontSize: 40 },
  "@media (max-width:600px)": { fontSize: 28 },
});

const PromoDates = styled(Typography)({
  fontSize: 14,
  marginBottom: 16,
  opacity: 0.9,
  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
});

const PromoButton = styled(Button)({
  backgroundColor: "rgba(255,255,255,0.14)",
  color: "#fff",
  padding: "8px 28px",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.33)",
  letterSpacing: ".4px",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
});

const RightFlexBox = styled(Box)({
  flex: "2 1 650px",
  // maxWidth: 700,
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  minWidth: "0",
  alignContent: "flex-start",
  "@media (max-width:1200px)": {
    // maxWidth: 520,
  },
  "@media (max-width:900px)": {
    // maxWidth: "100%",
    gap: "12px",
    justifyContent: "center",
  },
  "@media (max-width:500px)": {
    // flexDirection: "column",
    // flexWrap: "nowrap",
    gap: 10,
  },
});

const ProductCard = styled(Card)({
  borderRadius: 12,
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  width: "calc(33% - 14px)",
  // minWidth: 180,
  // maxWidth: 220,
  // height: 270,
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  transition: "transform 0.26s, box-shadow 0.26s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  "@media (max-width:900px)": {
    width: "calc(50% - 8px)", // 2 in a row
  },
  "@media (max-width:450px)": {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
  },
});

const ProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: 165,
  "@media (max-width:900px)": { height: 135 },
  "@media (max-width:600px)": { height: 100 },
});

const ProductImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const DiscountBadge = styled(Chip)({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "#FF8C00",
  color: "#fff",
  fontSize: 12,
  fontWeight: 600,
  height: 24,
  "& .MuiChip-label": {
    padding: "0 8px",
  },
});

const ProductInfo = styled(CardContent)({
  padding: "14px",
  flex: 1,
});

const ProductCategory = styled(Typography)({
  fontSize: 12,
  color: "#666",
  marginBottom: 2,
  textTransform: "capitalize",
});

const ProductName = styled(Typography)({
  fontSize: 15,
  fontWeight: 500,
  color: "#2C2C2C",
  marginBottom: 8,
  lineHeight: 1.3,
  "@media (max-width:600px)": { fontSize: 13 },
});

const RatingContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
  marginBottom: 8,
});

const PriceContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const CurrentPrice = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#2C2C2C",
});

const OriginalPrice = styled(Typography)({
  fontSize: 13,
  color: "#999",
  textDecoration: "line-through",
});

const RatingStars = styled("span")({
  display: "flex",
  alignItems: "center",
});

const RatingText = styled(Typography)({
  fontSize: 12,
  color: "#666",
  marginLeft: 4,
});

function StarRating({ rating }) {
  return (
    <RatingStars>
      {[...Array(5)].map((_, idx) => (
        <Star
          key={idx}
          sx={{
            fontSize: 14,
            color: idx < Math.floor(rating) ? "#FFD700" : "#E0E0E0",
          }}
        />
      ))}
      <RatingText>{rating.toFixed(1)}</RatingText>
    </RatingStars>
  );
}

// ---- Product data ----
const products = [
  {
    id: 1,
    name: "Golden Elegance Bracelet",
    category: "bracelet",
    image: "/newCollectionImg1.png",
    currentPrice: "$420.00",
    originalPrice: "$600.00",
    discount: "30% off",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Gold Diamond Ring",
    category: "ring",
    image: "/newCollectionImg2.png",
    currentPrice: "$175.00",
    originalPrice: "$260.00",
    discount: "30% off",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Golden Bracelet",
    category: "bracelet",
    image: "/newCollectionImg3.png",
    currentPrice: "$385.00",
    originalPrice: "$550.00",
    discount: "30% off",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Green Diamond Earrings",
    category: "earrings",
    image: "/newCollectionImg4.png",
    currentPrice: "$315.00",
    originalPrice: "$450.00",
    discount: "30% off",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Gold Bracelet",
    category: "bracelet",
    image: "/newCollectionImg5.png",
    currentPrice: "$280.00",
    originalPrice: "$400.00",
    discount: "30% off",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Gold Bangles",
    category: "bangle",
    image: "/newCollectionImg6.png",
    currentPrice: "$420.00",
    originalPrice: "$500.00",
    discount: "30% off",
    rating: 4.8,
  },
];

// ---- Main Component ----
export default function NewCollection() {
  return (
    <SectionContainer>
      <HeaderContainer maxWidth="xl">
        <MainTitle>New Collections</MainTitle>
        <SubTitle>Elevate Every Look with Fashion-Forward Diamond Jewellery</SubTitle>
      </HeaderContainer>

      <FlexRow>
        {/* Left Promo Card */}
        <PromoCard>
          <PromoImage
            src="/newCollectionLady.png"
            title="30% Off Sale"
            component="img"
          />
          <PromoOverlay>
            <PromoDiscount>30% off</PromoDiscount>
            <PromoDates>06 MAY - 16 May</PromoDates>
            <PromoButton variant="outlined">SHOP NOW</PromoButton>
          </PromoOverlay>
        </PromoCard>

        {/* Right flex product cards */}
        <RightFlexBox>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImageContainer>
                <ProductImage
                  src={product.image}
                  title={product.name}
                  component="img"
                  onError={(e) => {
                    e.target.src = "/newCollectionLady.png";
                  }}
                />
                <DiscountBadge label={product.discount} />
              </ProductImageContainer>

              <ProductInfo>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName>{product.name}</ProductName>
                <RatingContainer>
                  <StarRating rating={product.rating} />
                </RatingContainer>
                <PriceContainer>
                  <CurrentPrice>{product.currentPrice}</CurrentPrice>
                  <OriginalPrice>{product.originalPrice}</OriginalPrice>
                </PriceContainer>
              </ProductInfo>
            </ProductCard>
          ))}
        </RightFlexBox>
      </FlexRow>
    </SectionContainer>
  );
}
