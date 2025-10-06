// import React, { useEffect, useState } from "react";
// import { Box, Typography, Container, Card, CardMedia, CardContent, Button, Chip, styled } from "@mui/material";
// import axiosInstance from "../commonComponents/AxiosInstance";
// import { useNavigate } from "react-router-dom";
// import { publicUrl } from "../commonComponents/PublicUrl";
// import Theme from "../../Theme";

// // ---- Styled Components ----
// const SectionContainer = styled(Box)({
//   backgroundColor: "#fff",
//   paddingTop: 80,
//   paddingBottom: 80,
//   "@media (max-width:600px)": { paddingTop: 20, paddingBottom: 40 },
// });

// const HeaderContainer = styled(Container)({
//   textAlign: "center",
//   marginBottom: 30,
// });

// const MainTitle = styled(Typography)({
//   fontFamily: "serif",
//   fontSize: 48,
//   fontWeight: 600,
//   color: Theme.palette.primary,
//   marginBottom: 12,
//   lineHeight: 1.2,
//   "@media (max-width:960px)": { fontSize: 40 },
//   "@media (max-width:600px)": { fontSize: 32 },
// });

// const SubTitle = styled(Typography)({
//   fontSize: 18,
//   fontWeight: 400,
//   color: "#666",
//   letterSpacing: ".3px",
//   "@media (max-width:600px)": { fontSize: 16 },
// });

// const FlexRow = styled(Box)({
//   display: "flex",
//   gap: "32px",
//   maxWidth: 1100,
//   margin: "0 auto",
//   alignItems: "stretch",
//   "@media (max-width:900px)": {
//     flexDirection: "column",
//     gap: 24,
//     maxWidth: "95vw",
//   },
// });

// const PromoCard = styled(Card)({
//   position: "relative",
//   borderRadius: 16,
//   overflow: "hidden",
//   flex: "1 1 340px",
//   minWidth: "320px",
//   minHeight: 500,
//   maxWidth: 420,
//   cursor: "pointer",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-end",
//   transition: "transform 0.3s",
//   "&:hover": { transform: "translateY(-5px)" },
//   "@media (max-width:900px)": {
//     minHeight: 380,
//     maxWidth: "100%",
//     width: "100%",
//     marginBottom: 0,
//   },
//   "@media (max-width:600px)": {
//     minHeight: 260,
//   },
// });

// const PromoImage = styled(CardMedia)({
//   width: "100%",
//   height: "100%",
//   position: "absolute",
//   top: 0,
//   left: 0,
//   zIndex: 1,
//   objectFit: "cover",
//   objectPosition: "center",
// });

// const PromoOverlay = styled(Box)({
//   position: "relative",
//   zIndex: 2,
//   padding: "48px 36px",
//   color: "#fff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   justifyContent: "flex-end",
//   height: "100%",
//   "@media (max-width:600px)": {
//     padding: "24px 16px",
//   },
// });

// const PromoDiscount = styled(Typography)({
//   fontSize: 48,
//   fontWeight: "bold",
//   marginBottom: 8,
//   textShadow: "0 2px 4px rgba(0,0,0,0.3)",
//   "@media (max-width:960px)": { fontSize: 40 },
//   "@media (max-width:600px)": { fontSize: 28 },
// });

// const PromoDates = styled(Typography)({
//   fontSize: 14,
//   marginBottom: 16,
//   opacity: 0.9,
//   textShadow: "0 1px 2px rgba(0,0,0,0.3)",
// });

// const PromoButton = styled(Button)({
//   backgroundColor: "rgba(46, 37, 37, 0.46)",
//   color: "#fff",
//   padding: "8px 28px",
//   fontSize: 14,
//   fontWeight: 600,
//   textTransform: "none",
//   borderRadius: "6px",
//   border: "1px solid rgba(255,255,255,0.33)",
//   letterSpacing: ".4px",
//   "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
// });

// const RightFlexBox = styled(Box)({
//   flex: "2 1 650px",
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "20px",
//   minWidth: "0",
//   alignContent: "flex-start",
//   "@media (max-width:1200px)": {
//     // maxWidth: 520,
//   },
//   "@media (max-width:900px)": {
//     // maxWidth: "100%",
//     gap: "12px",
//     justifyContent: "center",
//     flex: "2 1 0",
//   },
//   "@media (max-width:500px)": {
//     // flexDirection: "column",
//     // flexWrap: "nowrap",
//     gap: 10,
//   },
// });

// const ProductCard = styled(Card)({
//   borderRadius: 12,
//   overflow: "hidden",
//   display: "flex",
//   flexDirection: "column",
//   width: "calc(33% - 14px)",
//   boxSizing: "border-box",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
//   transition: "transform 0.26s, box-shadow 0.26s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//   },
//   "@media (max-width:900px)": {
//     width: "calc(50% - 8px)",
//   },
// });

// const ProductImageContainer = styled(Box)({
//   position: "relative",
//   width: "100%",
//   height: 200,
//   "@media (max-width:900px)": { height: 155 }
// });

// const ProductImage = styled(CardMedia)({
//   height: "100%",
//   width: "100%",
//   maxWidth: "100%",
//   display: "block",
//   cursor: "pointer",
// });

// const DiscountBadge = styled(Chip)({
//   position: "absolute",
//   top: 10,
//   right: 10,
//   backgroundColor: "#44170b",
//   color: "#fff",
//   fontSize: 12,
//   fontWeight: 600,
//   height: 24,
//   "& .MuiChip-label": {
//     padding: "0 8px",
//   },
// });

// const ProductInfo = styled(CardContent)({
//   padding: "14px",
//   flex: 1,
// });

// const ProductCategory = styled(Typography)({
//   fontSize: 12,
//   color: "#666",
//   marginBottom: 2,
//   textTransform: "capitalize",
// });

// const ProductName = styled(Typography)({
//   fontSize: 15,
//   fontWeight: 500,
//   color: "#2C2C2C",
//   marginBottom: 8,
//   lineHeight: 1.3,
//   textTransform: 'capitalize',
//   "@media (max-width:600px)": { fontSize: 13 },
// });

// const PriceContainer = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   gap: 8,
// });

// const CurrentPrice = styled(Typography)({
//   fontSize: 16,
//   fontWeight: 600,
//   color: "#2C2C2C",
// });


// // ---- Main Component ----
// export default function NewCollection() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   const canAddToCart = Boolean(allProducts?.stock === 'yes');
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);



//   const parseQuantityArray = (q) => {
//     if (!q) return [];
//     let arr = q;
//     if (typeof q === "string") {
//       try { arr = JSON.parse(q); } catch { return []; }
//     }
//     return Array.isArray(arr) ? arr : [];
//   };

//   const pickBestVariation = (arr) => {
//     if (!arr.length) return null;
//     // Lowest finalPrice variant
//     return arr.reduce((best, cur) =>
//       parseFloat(cur.finalPrice) < parseFloat(best.finalPrice) ? cur : best, arr[0]);
//   };

//   const preprocessProducts = (productsRaw) => productsRaw.map((p) => {
//     const quantityArr = parseQuantityArray(p.quantity?.[0]);
//     const bestVariation = pickBestVariation(quantityArr);
//     return {
//       ...p,
//       price: bestVariation ? parseFloat(bestVariation.finalPrice) : 0,
//       gst: bestVariation ? parseFloat(bestVariation.gst) : null,
//       discount: bestVariation ? parseFloat(bestVariation.discount) : 0,
//       weight: bestVariation ? parseFloat(bestVariation.weight) : null,
//       makingPrice: bestVariation ? parseFloat(bestVariation.makingPrice) : null,
//       quantityVariants: quantityArr,
//       bestVariant: bestVariation,
//     };
//   });

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const fetchAllProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get('/user/allproducts');
//       // setAllProducts(response.data);
//       const processedProducts = preprocessProducts(response.data);

//       // Sort by createdAt descending (latest first)
//       processedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setAllProducts(processedProducts);
//     } catch (error) {
//       setError('Could not load products. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!product) return;
//     const variant = product.quantity[selectedVariantIndex];
//     if (!variant) return;

//     const unit = Number(variant.final_price ?? variant.finalPrice ?? 0);

//     const cartItem = {
//       ...product,
//       selectedVariant: variant,
//       cartQty: 1,  // initial quantity
//       unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
//     };

//     toast.success('Item added to cart!', { position: 'top-right', autoClose: 2000 });
//     dispatch(addData(cartItem));
//   };

//   return (
//     <SectionContainer>
//       <HeaderContainer maxWidth="xl">
//         <MainTitle>New Collections</MainTitle>
//         <SubTitle>Elevate Every Look with Fashion-Forward Jewellery</SubTitle>
//       </HeaderContainer>

//       <FlexRow>
//         {/* Left Promo Card */}
//         <PromoCard>
//           <PromoImage
//             src="/newcollectionmainimg.jpg"
//             title="30% Off Sale"
//             component="img"
//           />
//           <PromoOverlay>
//             {/* <PromoDiscount>30% off</PromoDiscount>
//             <PromoDates>06 MAY - 16 May</PromoDates> */}
//             <PromoButton variant="outlined" onClick={() => navigate('/allJewellery')}>SHOP NOW</PromoButton>
//           </PromoOverlay>
//         </PromoCard>

//         {/* Right flex product cards */}
//         <RightFlexBox>
//           {allProducts.slice(0, 6).map((product) => (
//             <ProductCard key={product._id} >
//               <ProductImageContainer>
//                 <ProductImage
//                   onClick={() => navigate(`/singleProduct/${product._id}`)}
//                   src={publicUrl(product.media[0].url)}
//                   title={product.name}
//                   component="img"
//                   onError={(e) => {
//                     e.target.src = "/newCollectionLady.png";
//                   }}
//                 />
//                 <DiscountBadge label={`${product.discount}% OFF`} />
//               </ProductImageContainer>

//               <ProductInfo>
//                 <ProductCategory>{product.category}</ProductCategory>
//                 <ProductName>{product.name}</ProductName>
//                 <PriceContainer>
//                   <CurrentPrice>₹{product.price}</CurrentPrice>
//                 </PriceContainer>
//                 {/* <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddToCart}>ADD TO Cart</Button> */}
//                 <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddToCart} disabled={!canAddToCart} title={!canAddToCart ? 'Selected variant is out of stock' : 'Add to Cart'} >ADD TO Cart</Button>
//               </ProductInfo>
//             </ProductCard>
//           ))}
//         </RightFlexBox>
//       </FlexRow>
//     </SectionContainer>
//   );
// }

// // 2:
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
const SectionContainer = styled(Box)({
  backgroundColor: "#fff",
  paddingTop: 80,
  paddingBottom: 80,
  "@media (max-width:600px)": { paddingTop: 20, paddingBottom: 40 },
});

const HeaderContainer = styled(Container)({
  textAlign: "center",
  marginBottom: 30,
});

const MainTitle = styled(Typography)({
  fontFamily: "serif",
  fontSize: 48,
  fontWeight: 600,
  color: Theme.palette.primary,
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
  backgroundColor: "rgba(46, 37, 37, 0.46)",
  color: "#fff",
  padding: "8px 28px",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.33)",
  letterSpacing: ".4px",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.25)" },
});

const RightFlexBox = styled(Box)({
  flex: "2 1 650px",
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
    flex: "2 1 0",
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
  display: "flex",
  flexDirection: "column",
  width: "calc(33% - 14px)",
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  transition: "transform 0.26s, box-shadow 0.26s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  "@media (max-width:900px)": {
    width: "calc(50% - 8px)",
  },
});

const ProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: 170,
  "@media (max-width:900px)": { height: 155 }
});

const ProductImage = styled(CardMedia)({
  height: "100%",
  width: "100%",
  maxWidth: "100%",
  display: "block",
  cursor: "pointer",
  objectFit: "contain",
});

const DiscountBadge = styled(Chip)({
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "#44170b",
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
  marginBottom: 4,
  lineHeight: 1.2,
  textTransform: 'capitalize',
  "@media (max-width:600px)": { fontSize: 13 },
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
        <PromoCard>
          <PromoImage
            src="/newcollectionmainimg.jpg"
            title="30% Off Sale"
            component="img"
          />
          <PromoOverlay>
            <PromoButton variant="outlined" onClick={() => navigate('/allJewellery')}>SHOP NOW</PromoButton>
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
                    src={publicUrl(product.media[0].url)}
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
                    <CurrentPrice>₹{product.price}</CurrentPrice>
                  </PriceContainer>
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => handleAddToCart(product)}
                    disabled={!isInStock}
                    title={!isInStock ? 'Out of stock' : 'Add to Cart'}
                  >
                    {isInStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                  </Button>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </RightFlexBox>
      </FlexRow>
    </SectionContainer>
  );
}
