// import { Box, Typography, Container, styled } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// // You’ll fill these with real image URLs later:
// const images = [
//     "/masterSlider1.png",
//     "/masterSlider2.png",
//     "/masterSlider3.png",
//     "/masterSlider1.png",
//     "/masterSlider2.png",
//     "/masterSlider3.png",
// ];

// // Dummy product titles/categories for the overlay (center card)
// const overlayLabels = [
//     { title: "Dazzling Cuff", category: "Gold Bracelet" },
//     { title: "Classic Hoops", category: "Diamond Earring" },
//     { title: "New Arrival", category: "Teardrop Diamond Drop" }, // Center card
//     { title: "Elegant Pendant", category: "Gold Chain" },
//     { title: "Statement Ring", category: "Cocktail Ring" }
// ];

// // Card positions for desktop: [FarLeft, Left, Center, Right, FarRight]
// const CARD_LAYER_PROPS = [
//     { w: 270, h: 420, z: 1, l: "2%", t: "33%", s: 0.75, a: -13, r: undefined },
//     { w: 300, h: 420, z: 2, l: "13%", t: "18%", s: 0.89, a: -7, r: undefined},
//     { w: 325, h: 480, z: 5, l: "50%", t: "20%", s: 1, a: 0, r: undefined, centered: true },
//     { w: 300, h: 420, z: 2, l: undefined, t: "18%", s: 0.89, a: 7, r: "13%" },
//     { w: 270, h: 420, z: 1, l: undefined, t: "33%", s: 0.75, a: 13, r: "2%" },
// ];

// const SectionContainer = styled(Box)({
//     backgroundColor: "#fff",
//     paddingTop: "80px",
//     paddingBottom: "80px",
// });

// const HeaderContainer = styled(Container)({
//     textAlign: "center",
//     marginBottom: "34px",
// });

// const MainTitle = styled(Typography)({
//     fontFamily: "serif",
//     fontSize: "44px",
//     fontWeight: 700,
//     color: "#31202c",
//     marginBottom: "6px",
//     lineHeight: "1.1",
//     letterSpacing: "-0.5px",
//     "@media (max-width: 900px)": { fontSize: "34px" },
//     "@media (max-width: 600px)": { fontSize: "24px" },
// });

// const SubTitle = styled(Typography)({
//     fontSize: "18px",
//     fontWeight: 400,
//     color: "#8e7889",
//     letterSpacing: "0.3px",
//     "@media (max-width: 600px)": { fontSize: "15px" }
// });

// const SliderContainer = styled(Box)({
//     position: "relative",
//     width: "100%",
//     maxWidth: "960px",
//     margin: "0 auto",
//     height: "520px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "@media (max-width:900px)": {
//         height: "400px",
//         maxWidth: "600px",
//     },
//     "@media (max-width:600px)": {
//         height: "260px",
//         maxWidth: "330px",
//     },
// });

// const SlideCard = styled(Box, {
//     shouldForwardProp: (prop) => !["layer", "centered"].includes(prop),
// })(({ layer, centered }) => ({
//     position: "absolute",
//     width: layer.w,
//     height: layer.h,
//     left: centered ? `calc(50% - ${layer.w / 2}px)` : layer.l ?? "auto",
//     top: layer.t,
//     right: layer.r ?? "auto",
//     zIndex: layer.z,
//     opacity: layer.o,
//     transform: `scale(${layer.s}) rotate(${layer.a}deg)`,
//     boxShadow:
//         layer.z === 5
//             ? "0 18px 54px 0px rgba(80,40,50,0.23)"
//             : "0 3px 19px 0 rgba(100,60,90,0.07)",
//     background: "#eee",
//     borderRadius: "22px",
//     overflow: "hidden",
//     transition: "all .29s cubic-bezier(.35,.62,.47,1)",
//     display: "flex",
//     flexDirection: "column",
//     "@media (max-width:900px)": {
//         width: layer.w * 0.68,
//         height: layer.h * 0.68,
//         left: centered ? `calc(50% - ${(layer.w * 0.68) / 2}px)` : layer.l ?? "auto",
//         right: layer.r ?? "auto",
//     },
//     "@media (max-width:600px)": {
//         width: layer.w * 0.5,
//         height: layer.h * 0.5,
//         left: centered ? `calc(50% - ${(layer.w * 0.5) / 2}px)` : layer.l ?? "auto",
//         right: layer.r ?? "auto",
//     },
// }));

// const SlideImage = styled("img")({
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     objectPosition: "center",
//     display: "block",
// });

// const CenterOverlay = styled(Box)({
//     position: "absolute",
//     left: "50%",
//     bottom: "20px",
//     width: "82%",
//     transform: "translateX(-50%)",
//     background: "rgba(54, 38, 41, 0.88)",
//     borderRadius: "12px",
//     padding: "13px 20px 11px 16px",
//     boxShadow: "0 4px 16px 0 rgba(0,0,0,.13)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start"
// });

// const OverlayTitle = styled(Typography)({
//     color: "#fff",
//     fontWeight: 500,
//     fontSize: "16px",
//     letterSpacing: ".08em",
//     lineHeight: 1.28,
//     marginBottom: "2px"
// });
// const OverlayCategory = styled(Typography)({
//     color: "#ecd4d6",
//     fontWeight: 300,
//     fontSize: "13px",
//     opacity: 0.82
// });

// const NavigationArrow = styled(Box)(({ direction }) => ({
//     position: "absolute",
//     top: "50%",
//     transform: "translateY(-50%)",
//     left: direction === "prev" ? "-54px" : "auto",
//     right: direction === "next" ? "-54px" : "auto",
//     zIndex: 15,
//     width: "38px",
//     height: "38px",
//     borderRadius: "50%",
//     backgroundColor: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     boxShadow: "0 2px 12px rgba(100,80,80,0.17)",
//     transition: "all .20s",
//     "&:hover": {
//         backgroundColor: "#f8e3ef",
//         transform: "translateY(-50%) scale(1.07)",
//         boxShadow: "0 6px 22px rgba(102,44,56,0.21)",
//     },
//     "@media (max-width:900px)": {
//         left: direction === "prev" ? "-30px" : "auto",
//         right: direction === "next" ? "-30px" : "auto",
//         width: "28px",
//         height: "28px",
//     },
//     "@media (max-width:600px)": {
//         left: direction === "prev" ? "-5px" : "auto",
//         right: direction === "next" ? "-5px" : "auto",
//         width: "20px",
//         height: "20px",
//     }
// }));

// export default function MasterDaimondSlider() {
//     return (
//         <SectionContainer>
//             <HeaderContainer maxWidth="lg">
//                 <MainTitle>Master the Art of Diamond Styling</MainTitle>
//                 <SubTitle>Elevate Every Look with Fashion-Forward Diamond Jewellery</SubTitle>
//             </HeaderContainer>
//             <SliderContainer>
//                 <NavigationArrow direction="prev">
//                     <ChevronLeft sx={{ fontSize: "22px", color: "#bf224b" }} />
//                 </NavigationArrow>
//                 <NavigationArrow direction="next">
//                     <ChevronRight sx={{ fontSize: "22px", color: "#bf224b" }} />
//                 </NavigationArrow>
//                 {CARD_LAYER_PROPS.map((layer, idx) => (
//                     <SlideCard key={idx} layer={layer} centered={!!layer.centered}>
//                         <SlideImage
//                             src={images[idx]}
//                             alt="img"
//                             style={{
//                                 opacity: layer.o,
//                                 filter: layer.z === 5 ? "none" : "brightness(0.91)",
//                             }}
//                         />
//                         {layer.z === 5 && (
//                             <CenterOverlay>
//                                 <OverlayTitle>{overlayLabels[idx].title}</OverlayTitle>
//                                 <OverlayCategory>{overlayLabels[idx].category}</OverlayCategory>
//                             </CenterOverlay>
//                         )}
//                     </SlideCard>
//                 ))}
//             </SliderContainer>
//         </SectionContainer>
//     );
// }

import React from 'react';
import { Box, Card, CardMedia, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const jewelryProducts = [
    { id: 1, name: "Subtle Sparkle Diamond Bangle", image: "/masterSlider1.png", category: "Bangles" },
    { id: 2, name: "Elegant Pearl Drop Earrings", image: "/masterSlider2.png", category: "Earrings" },
    { id: 3, name: "Royal Emerald Ring", image: "/masterSlider3.png", category: "Rings" },
    { id: 4, name: "Diamond Pendant Necklace", image: "/masterSlider4.jpg", category: "Necklaces" },
    { id: 5, name: "Gold Chain Bracelet", image: "/masterSlider2.png", category: "Bracelets" },
    { id: 6, name: "Sapphire Stud Earrings", image: "/masterSlider4.jpg", category: "Earrings" }
];


const MasterDaimondSlider = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const swiperConfig = {
        modules: [Navigation, EffectCoverflow, Autoplay],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: isMobile ? 1 : 3,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
        },
        navigation: true,
        breakpoints: {
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
        },
    };

    return (
        <Box
            sx={{
                maxWidth: 1400,
                mx: 'auto',
                py: { xs: 7, md: 10 },
                px: 2,
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: '1.5rem', md: '2.5rem' },
                    fontWeight: 400,
                    color: '#333',
                    mb: { xs: 2, md: 5 },
                    lineHeight: 1.2,
                }}
            >
                Elevate Every Look with Fashion-Forward Diamond Jewellery
            </Typography>

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    // left: "-2%",
                    overflow: 'visible',
                    // overflow: 'hidden',
                    backgroundColor: '#2b0a07',
                    borderRadius: 3,
                    py: { xs: 4, md: 7 },
                    px: { xs: 2, md: 3 },
                    // Swiper container overrides
                    '& .swiper': { padding: '30px 0' },
                    '& .swiper-slide': {
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'center center',
                    },
                    // Active slide styles
                    '& .swiper-slide-active': {
                        transform: 'scale(1.15)',
                        zIndex: 5,
                        '.luxury-product-card': {
                            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                            transform: 'scale(1.15)',
                            filter: 'brightness(1.1)',
                        },
                    },
                    // Adjacent slides
                    '& .swiper-slide-prev, & .swiper-slide-next': {
                        transform: 'scale(0.8) translateZ(-50px)',
                        zIndex: 3,
                        opacity: 0.6,
                        '.luxury-product-card': {
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                            transform: 'scale(0.8)',
                        },
                        '.MuiCardMedia-root': {
                            filter: 'blur(1px)',
                        },
                    },
                    // Background slides
                    '& .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)': {
                        transform: 'scale(0.6) translateZ(-100px)',
                        zIndex: 1,
                        opacity: 0.4,
                        '.luxury-product-card': {
                            boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                            transform: 'scale(0.6)',
                        },
                        '.MuiCardMedia-root': {
                            filter: 'blur(2px)',
                        },
                    },
                    // Navigation Buttons (default Swiper styles overridden for minimal styling)
                    '& .swiper-button-prev, & .swiper-button-next': {
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: '#2b0a07',
                        width: { xs: 30, md: 40 },
                        height: { xs: 30, md: 40 },
                        borderRadius: '50%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            // transform: 'scale(1.1)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        },
                    },
                }}
            >
                <Swiper {...swiperConfig}>
                    {jewelryProducts.map(product => (
                        <SwiperSlide key={product.id} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card
                                className="luxury-product-card"
                                sx={{
                                    width: { xs: 250, sm: 280, md: 300 },
                                    height: { xs: 375, sm: 420, md: 450 },
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                    position: 'relative',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="75%"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        transition: 'filter 0.3s ease',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        p: 2,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(5px)',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#333',
                                            fontWeight: 700,
                                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                                            lineHeight: 1.2,
                                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#666',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontSize: '0.75rem',
                                            mt: 0.5,
                                        }}
                                    >
                                        {product.category}
                                    </Typography>
                                </Box>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default MasterDaimondSlider;

