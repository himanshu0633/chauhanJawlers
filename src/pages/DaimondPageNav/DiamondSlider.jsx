import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import axiosInstance from '../../common components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { publicUrl } from '../../common components/PublicUrl';

const DiamondSlider = () => {
    const [products, setProducts] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const textSwiperRef = useRef(null);
    const imageSwiperRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get(`/user/allproducts`);
            setProducts(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const diamondProducts = products.filter(
        (product) => product.productvariety?.toLowerCase() === 'diamond'
    );

    const handlePrev = () => {
        if (textSwiperRef.current && imageSwiperRef.current) {
            textSwiperRef.current.swiper.slidePrev();
            imageSwiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (textSwiperRef.current && imageSwiperRef.current) {
            textSwiperRef.current.swiper.slideNext();
            imageSwiperRef.current.swiper.slideNext();
        }
    };

    const GradientButton = styled(Button)(() => ({
        background: 'linear-gradient(to bottom, #FFFFFF, #757983)',
        color: '#0D1323',
        fontWeight: 500,
        borderRadius: '50px',
        padding: '4px 16px',
        textTransform: 'none',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(189, 190, 192, 0.5)',
            background: 'linear-gradient(to bottom, #FFFFFF, #757983)',
        },
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
    }));

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: { xs: '1rem', md: '1.5rem' }, // Reduced padding
                backgroundColor: '#ffffff', // White background
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 0,
                mt: { xs: '2rem', md: '3rem' }, // Reduced margins
                pb: { xs: '2rem', md: '2rem' },
                boxShadow: '0 2px 8px rgba(255, 255, 255, 0)'
            }}
        >
            {/* Main Heading */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mt: { xs: '2rem', md: '3rem' }, // Reduced margin
                textAlign: 'center',
                px: { xs: 2, md: 0 }
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 500,
                        fontSize: { xs: '1.3rem', md: '2.2rem' }, // Smaller heading
                        lineHeight: { xs: '1.4', md: '1.3' },
                        maxWidth: { xs: '250px', md: '100%' },
                        color: '#000000', // Dark black text
                        fontFamily: '"Abhaya Libre", serif'
                    }}
                >
                    Chauhan Jewellers' 100% natural diamonds
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '0.7rem', md: '0.9rem' }, // Smaller subtitle
                        fontWeight: 400,
                        color: '#000000', // Dark black text
                        maxWidth: { md: '600px' },
                        mt: 1,
                        fontFamily: '"Inter", sans-serif',
                        px: { xs: 2, md: 0 }
                    }}
                >
                    are sourced ethically and undergo a 5-step process that ensures our customers receive nothing but the finest and most authentic pieces.
                </Typography>
            </Box>

            {/* Slider Content */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: { xs: 0, md: '2rem' }, // Reduced margin
                pb: { xs: 4, md: 0 }
            }}>
                {/* Text Content */}
                <Box sx={{
                    // width: { xs: '100%', md: '40%' },
                    width: "45%",
                    textAlign: { xs: 'center', md: 'left' },
                    pb: { xs: 4, md: 0 },
                    px: { xs: 2, md: 4 },
                    position: 'relative'
                }}>
                    <Swiper
                        ref={textSwiperRef}
                        modules={[Thumbs]}
                        spaceBetween={0}
                        slidesPerView={1}
                        thumbs={{ swiper: thumbsSwiper }}
                        allowSlideNext={true}
                        allowSlidePrev={true}
                        watchOverflow={true}
                    >
                        {diamondProducts.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <Box sx={{ my: 2 }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            color: '#000000', // Dark black text
                                            fontSize: { xs: '1.3rem', md: '1.8rem' }, // Smaller slide titles
                                            fontFamily: '"Abhaya Libre", serif',
                                            mb: 1,
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {slide.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#000000', // Dark black text
                                            fontWeight: 300,
                                            fontSize: { xs: '0.7rem', md: '0.8rem' }, // Smaller slide descriptions
                                            fontFamily: '"Inter", sans-serif',
                                            mb: 1,
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {slide.description}
                                    </Typography>
                                    <GradientButton
                                        variant="contained"
                                        onClick={() => navigate(`/singleProduct/${slide._id}`)}
                                        sx={{ mt: 2, mx: "auto" }}
                                        endIcon={
                                            <Box sx={{
                                                width: '32px',
                                                height: '32px',
                                                p: '5px',
                                                ml: 1,
                                                backgroundColor: { xs: '#0D1323', md: '#BDBEC0' },
                                                borderRadius: '50%',
                                                display: 'inline-flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                transition: 'background-color 0.15s ease',
                                                '&:hover': {
                                                    backgroundColor: '#0D1323'
                                                }
                                            }}>
                                                <svg width="9" height="11" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 1.5L4.5 4.5L1.5 7.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Box>
                                        }
                                    >
                                        View
                                    </GradientButton>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        // mt: 2,
                        mb: { xs: 2, md: 0 }
                    }}>
                        <Box
                            onClick={handlePrev}
                            sx={{
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#2c3e50',
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: '#1a2639'
                                }
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Box>
                        <Box
                            onClick={handleNext}
                            sx={{
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#2c3e50',
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: '#1a2639'
                                }
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Box>
                    </Box>
                </Box>

                {/* Image Slider */}
                <Box sx={{
                    // width: { xs: '100%', md: '60%' },
                    width: "50%",
                    position: 'relative',
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-end' },
                    alignItems: 'center',
                    px: { xs: 2, md: 0 }
                }}>
                    <Box sx={{
                        position: 'relative',
                        zIndex: 5,
                        p: { xs: 3, md: 4 },
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        mx: { xs: 'auto', md: 0 }
                    }}>
                        <Box sx={{
                            width: { xs: '22rem', md: '38rem' }, 
                            height: { xs: '15rem', md: '23rem' },
                            // borderRadius: '50%',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <Swiper
                                ref={imageSwiperRef}
                                modules={[Thumbs, Scrollbar]}
                                spaceBetween={10}
                                slidesPerView={1}
                                onSwiper={setThumbsSwiper}
                                scrollbar={{
                                    hide: false,
                                    draggable: true
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                {diamondProducts.map((slide, index) => (
                                    <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { md: "460px !important" } }}>
                                        <Box
                                            component="img"
                                            src={publicUrl(slide.media[0].url)}
                                            alt={slide.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                // transform: {
                                                //     xs: 'scale(1.8)',
                                                //     md: index === 1 ? 'scale(1.4)' : index === 3 ? 'scale(1.4)' : 'scale(1.8)'
                                                // },
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DiamondSlider;
