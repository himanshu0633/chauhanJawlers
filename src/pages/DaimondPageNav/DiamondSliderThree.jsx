// import React, { useEffect, useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import axiosInstance from '../../common components/AxiosInstance';
// import { publicUrl } from '../../common components/PublicUrl';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

// const fetchData = async () => {
//     try {
//         const response = await axiosInstance.get(`/user/allcategories`);
//         setCategoryName(response?.data ?? []);
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//     }
// };

// const diamondCategories = categoryName.filter(
//     category => category.variety?.toLowerCase() === 'diamond'
// );

//     return (
//         <Box
//             sx={{
//                 backgroundColor: '#fff',
//                 pb: { xs: 3, md: 5 },
//                 mt: { xs: 2, md: 4 },
//                 mx: 'auto',
//                 width: { xs: '99%', md: '90%' },
//                 maxWidth: 1350,
//                 borderRadius: 2,
//                 p: { xs: 1, md: 2 },
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
//             }}
//         >
//             <Swiper
//                 modules={[Navigation]}
//                 navigation={true}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 style={{ width: '100%' }}
//             >
//                 {diamondCategories.map((slide) => (
//                     <SwiperSlide key={slide._id}>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column', md: 'row' },
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 minHeight: { xs: 320, md: 350 }
//                             }}
//                         >
//                             {/* Left: Text */}
//                             <Box
//                                 sx={{
//                                     flex: 1.1,
//                                     pl: { xs: 0, md: 6 },
//                                     py: 2,
//                                     textAlign: { xs: "center", md: "left" }
//                                 }}
//                             >
//                                 <Typography
//                                     variant="h3"
//                                     fontWeight={700}
//                                     sx={{
//                                         fontFamily: '"Abhaya Libre", serif',
//                                         color: "#3d2216",
//                                         mb: 1,
//                                         fontSize: { xs: 24, md: 36 }
//                                     }}
//                                 >
//                                     {slide.name}
//                                 </Typography>
//                                 <Typography
//                                     variant="body1"
//                                     fontWeight={400}
//                                     color="#6d4c41"
//                                     sx={{ fontSize: { xs: 13, md: 17 }, maxWidth: 330 }}
//                                 >
//                                     {slide.description}
//                                 </Typography>
//                             </Box>

//                             {/* Right: Image */}
//                             <Box
//                                 sx={{
//                                     flex: 1,
//                                     pr: { xs: 0, md: 8 },
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: { xs: "center", md: "end" }
//                                 }}
//                             >
//                                 <Box
//                                     component="img"
//                                     src={publicUrl(slide.image)}
//                                     alt={slide.name}
//                                     sx={{
//                                         width: { xs: 190, sm: 250, md: 320 },
//                                         height: { xs: 190, sm: 220, md: 230 },
//                                         objectFit: "cover",
//                                         borderRadius: 3,
//                                         boxShadow: '0 8px 28px 4px rgba(60,30,18,0.08)'
//                                     }}
//                                 />
//                             </Box>
//                         </Box>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </Box>
//     );
// };

// export default DiamondSliderThree;


// 2:
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, IconButton, Button } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { ChevronRight } from '@mui/icons-material';
// import Slider from 'react-slick';
// import { publicUrl } from '../../common components/PublicUrl';
// import axiosInstance from '../../common components/AxiosInstance';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from 'react-router-dom';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);
//     const navigate = useNavigate()

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get(`/user/allcategories`);
//                 setCategoryName(response?.data ?? []);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const diamondCategories = categoryName.filter(
//         (category) => category.variety?.toLowerCase() === 'diamond'
//     );

//     // Custom arrows using IconButton and MUI icons for material style
//     const PrevArrow = (props) => {
//         const { onClick } = props;
//         return (
//             <IconButton
//                 onClick={onClick}
//                 sx={{
//                     position: 'absolute',
//                     top: '45%',
//                     left: 10,
//                     zIndex: 10,
//                     width: 52,
//                     height: 52,
//                     bgcolor: 'transparent',
//                     border: '2px solid #888',
//                     color: '#fff',
//                     borderRadius: '50%',
//                     transition: 'all 0.3s',
//                     '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
//                 }}
//             >
//                 <ArrowBackIosNewIcon />
//             </IconButton>
//         );
//     };

//     const NextArrow = (props) => {
//         const { onClick } = props;
//         return (
//             <IconButton
//                 onClick={onClick}
//                 sx={{
//                     position: 'absolute',
//                     top: '45%',
//                     right: 10,
//                     zIndex: 10,
//                     width: 52,
//                     height: 52,
//                     bgcolor: 'transparent',
//                     border: '2px solid #888',
//                     color: '#fff',
//                     borderRadius: '50%',
//                     transition: 'all 0.3s',
//                     '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
//                 }}
//             >
//                 <ArrowForwardIosIcon />
//             </IconButton>
//         );
//     };

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         prevArrow: <PrevArrow />,
//         nextArrow: <NextArrow />,
//         adaptiveHeight: true,
//     };

//     return (
//         <Box
//             sx={{
//                 bgcolor: '#161b27',
//                 p: { xs: 2, md: 4 },
//                 minHeight: 400,
//                 width: '100%',
//                 maxWidth: 1400,
//                 mx: 'auto',
//                 borderRadius: 0,
//                 position: 'relative',
//             }}
//         >
//             <Slider {...settings}>
//                 {diamondCategories.map((cat) => (
//                     <Box
//                         key={cat._id}
//                         sx={{
//                             display: 'flex !important',
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             minHeight: 350,
//                             px: 2,
//                             width: '80% !important',
//                             mx: "auto !important",
//                         }}
//                     >
//                         {/* Text Left */}
//                         <Box
//                             sx={{
//                                 width: '45%',
//                                 // maxWidth: '50%',
//                                 color: '#fff',
//                                 pr: 5,
//                                 textAlign: 'left',
//                             }}
//                         >
//                             <Typography
//                                 variant="h2"
//                                 fontFamily="'Playfair Display', serif"
//                                 fontWeight={700}
//                                 mb={2}
//                                 sx={{ fontSize: 38, textTransform: "capitalize" }}
//                             >
//                                 {cat.name}
//                             </Typography>
//                             <Typography
//                                 variant="body1"
//                                 fontFamily="'Inter', sans-serif"
//                                 sx={{
//                                     color: '#ebebeb',
//                                     fontSize: 18,
//                                     mb: 4,
//                                     maxWidth: 480,
//                                     textTransform: "capitalize"
//                                 }}
//                             >
//                                 {cat.description}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 endIcon={<ChevronRight />}
//                                 // onClick={() => navigate(`/allJewellery/${cat.productvariety}`)}
//                                 onClick={() => navigate(`/allJewellery/${cat.variety?.toLowerCase() || 'all'}`)}
//                                 sx={{
//                                     bgcolor: 'linear-gradient(90deg,#f3f3f3,#e0e0e0)',
//                                     color: '#fff',
//                                     fontWeight: 600,
//                                     borderRadius: 8,
//                                     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
//                                     px: 4,
//                                     py: 1.5,
//                                     fontSize: 18,
//                                     textTransform: 'none',
//                                     mb: 1,
//                                     '&:hover': { bgcolor: '#ebebeb', color: '#000' },
//                                 }}
//                             >
//                                 Shop Now
//                             </Button>
//                         </Box>
//                         {/* Image Right */}
//                         <Box
//                             sx={{
//                                 width: '35%',
//                                 // maxWidth: '50%',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <Box
//                                 component="img"
//                                 src={publicUrl(cat.image)}
//                                 alt={cat.name}
//                                 sx={{
//                                     width: 300,
//                                     height: 300,
//                                     objectFit: 'cover',
//                                     borderRadius: '50%',
//                                     boxShadow:
//                                         '0 0 0 12px rgba(255,255,255,0.02), 0 4px 40px #141929',
//                                 }}
//                             />
//                         </Box>
//                     </Box>
//                 ))}
//             </Slider>

//         </Box>
//     );
// };

// export default DiamondSliderThree;


// 3:
import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChevronRight } from '@mui/icons-material';
import Slider from 'react-slick';
import { publicUrl } from '../../common components/PublicUrl';
import axiosInstance from '../../common components/AxiosInstance';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const DiamondSliderThree = () => {
    const [categoryName, setCategoryName] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/user/allcategories`);
                setCategoryName(response?.data ?? []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchData();
    }, []);

    const diamondCategories = categoryName.filter(
        (category) => category.variety?.toLowerCase() === 'diamond'
    );

    // Custom arrows using IconButton and MUI icons for material style
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '45%',
                    left: 10,
                    zIndex: 10,
                    width: { xs: 30, sm: 52 },
                    height: { xs: 30, sm: 52 },
                    bgcolor: 'transparent',
                    border: '2px solid #888',
                    color: '#fff',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '45%',
                    right: 10,
                    zIndex: 10,
                    width: { xs: 30, sm: 52 },
                    height: { xs: 30, sm: 52 },
                    bgcolor: 'transparent',
                    border: '2px solid #888',
                    color: '#fff',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        adaptiveHeight: true,
    };

    return (
        <Box
            sx={{
                bgcolor: '#161b27',
                p: { xs: 0, md: 4 },
                minHeight: 400,
                width: '100%',
                maxWidth: 1400,
                mx: 'auto',
                borderRadius: 0,
                position: 'relative',
            }}
        >
            <Slider {...settings}>
                {diamondCategories.map((cat) => (
                    <Box
                        key={cat._id}
                        sx={{
                            display: 'flex !important',
                            // flexDirection: 'row',
                            flexDirection: { xs: 'column-reverse', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minHeight: 350,
                            height: "100%",
                            px: 2,
                            py: 4,
                            // width: '80% !important',
                            width: { xs: "95% !important", md: "80% !important" },
                            mx: "auto !important",
                        }}
                    >
                        {/* Text Left */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: "45%" },
                                // maxWidth: '50%',
                                color: '#fff',
                                // textAlign: 'left',
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontFamily="'Playfair Display', serif"
                                fontWeight={700}
                                mb={2}
                                sx={{ fontSize:{xs: 28, md: 38}, textTransform: "capitalize" }}
                            >
                                {cat.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontFamily="'Inter', sans-serif"
                                sx={{
                                    color: '#ebebeb',
                                    fontSize: 18,
                                    mb: 2,
                                    textTransform: "capitalize"
                                }}
                            >
                                {cat.description}
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ChevronRight />}
                                // onClick={() => navigate(`/allJewellery/${cat.productvariety}`)}
                                onClick={() => navigate(`/allJewellery/${cat.variety?.toLowerCase() || 'all'}`)}
                                sx={{
                                    bgcolor: 'linear-gradient(90deg,#f3f3f3,#e0e0e0)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    borderRadius: 8,
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                                    px: 4,
                                    py: 1,
                                    fontSize: 18,
                                    textTransform: 'none',
                                    mb: 1,
                                    '&:hover': { bgcolor: '#ebebeb', color: '#000' },
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                        {/* Image Right */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: "35%" },
                                // maxWidth: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                src={publicUrl(cat.image)}
                                alt={cat.name}
                                sx={{
                                    width: { xs: 200, md: 300 },
                                    height: { xs: 200, md: 300 },
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    boxShadow:
                                        '0 0 0 12px rgba(255,255,255,0.02), 0 4px 40px #141929',
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Slider>

        </Box>
    );
};

export default DiamondSliderThree;