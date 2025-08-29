import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    CardMedia,
    useTheme,
    useMediaQuery
} from '@mui/material';
import axiosInstance from '../common components/AxiosInstance';
import { publicUrl } from '../common components/PublicUrl';
import { useNavigate } from 'react-router-dom';

const GiftingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [occasion, setOccasion] = useState([]);
    const [latestBanner, setLatestBanner] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOccasions();
        fetchBanners();
    }, [])
    const fetchOccasions = async () => {
        try {
            const response = await axiosInstance.get(`/user/allOccasions`);
            const latestOccasions = response?.data ?? [];

            // Sort by createdAt descending (recent first)
            latestOccasions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setOccasion(latestOccasions);
        } catch (error) {
            console.error("Error fetching occasion:", error);
        }
    };

    const fetchBanners = async () => {
        try {
            const response = await axiosInstance.get("/user/allBanners");
            const bannerData = response.data;

            // Optionally filter banners if you want only some types (e.g. "HomePageSlider")
            const filteredBanners = bannerData.filter(banner => banner.type === "HomePageSlider");

            // Sort descending by creation date
            filteredBanners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Pick the latest banner
            const latest = filteredBanners.length > 0 ? filteredBanners[0] : null;

            setLatestBanner(latest);

        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };


    // Price Range Gifts
    const priceRanges = [
        {
            range: 'Under ₹20,000',
            description: 'Thoughtful gifts that won\'t break the bank',
            items: 12,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop'
        },
        {
            range: '₹20,000 - ₹50,000',
            description: 'Premium pieces for special occasions',
            items: 18,
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=200&fit=crop'
        },
        {
            range: '₹50,000 - ₹1,00,000',
            description: 'Luxury gifts for milestone moments',
            items: 15,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop'
        },
        {
            range: 'Above ₹1,00,000',
            description: 'Exclusive pieces for extraordinary occasions',
            items: 8,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop'
        }
    ];

    // Responsive font sizes
    const responsiveTitle = {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 'bold'
    };

    const responsiveSubtitle = {
        fontSize: isMobile ? '0.9rem' : '1.1rem'
    };

    return (
        <Container maxWidth="xl" sx={{ py: 0, bgcolor: '#f9f6f2', px: isSmallMobile ? 1 : 2 }}>

            {/* Hero Section with Rakhi Banner */}
            <Box sx={{
                position: 'relative',
                height: { xs: '30vh', sm: '40vh', md: '60vh' },
                mb: { xs: 3, md: 5 },
                borderRadius: 2,
                overflow: 'hidden'
            }}>
                <CardMedia
                    component="img"
                    image={latestBanner && latestBanner.slider_image && latestBanner.slider_image.length > 0 && publicUrl(latestBanner.slider_image[0])}
                    alt="Latest festival banner"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/allJewellery`)}
                />
            </Box>


            {/* Gift By Range Section */}
            {/* <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography sx={{ ...responsiveTitle, mb: 1 }}>
                    Gift By Range
                </Typography>
                <Typography sx={{ ...responsiveSubtitle, color: 'text.secondary', mb: 3 }}>
                    Explore The Gifting Range That Fits Your Budget
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    {priceRanges.map((range, index) => (
                        <Box key={index} sx={{
                            width: { xs: '45%', sm: '22%' },
                            borderRadius: 2,
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}>
                            <CardMedia
                                component="img"
                                image={range.image}
                                alt={range.range}
                                sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                            />
                            <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: isSmallMobile ? '0.8rem' : '0.9rem' }}>
                                {range.range}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box> */}

            {/* Shop by Occasion Section */}
            <Box sx={{ mb: 6 }}>
                <Typography sx={{ ...responsiveTitle, textAlign: 'center', mb: 1 }}>
                    Shop by Occasion
                </Typography>
                <Typography sx={{ ...responsiveSubtitle, textAlign: 'center', mb: 3 }}>
                    Explore the curated Gifting List for Every Occasion
                </Typography>

                {occasion.length > 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        {occasion.slice(0, 6).map((occasionItem, index) => (
                            <Box key={index} sx={{
                                width: { xs: '45%', sm: '22%' },
                                borderRadius: 2,
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}>
                                <CardMedia
                                    component="img"
                                    image={publicUrl(occasionItem.image)}
                                    alt={occasionItem.name}
                                    sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                                    onClick={() => { navigate(`/allJewellery?occasion=${occasionItem._id}`) }}
                                // onClick={() => { navigate(`/gifting/allJewellery?occasion=${item._id}`) }}
                                />
                                <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: isSmallMobile ? '0.8rem' : '0.9rem' }}>
                                    {occasionItem.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography>No products found for this occasion.</Typography>
                )}

            </Box>

            {/* Late in Planning Gift Cards and Gold Coins */}
            <Box sx={{ mb: 6 }}>
                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 1, sm: 3 },
                    mb: 4,
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        <CardMedia
                            component="img"
                            image="/collection1.png"
                            alt="Gift Card Banner"
                            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
                        />
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography sx={{ ...responsiveTitle, mb: 2 }}>
                            Late in planning?
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            Explore Gift Cards for your last minute gifting needs
                        </Typography>
                        <Button
                            variant="contained"
                            // href="https://www.tanishq.co.in/shop/gift-card?lang=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Buy Gift Cards
                        </Button>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column-reverse', md: 'row' },
                    gap: { xs: 1, sm: 3 },
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography sx={{ ...responsiveTitle, mb: 1 }}>
                            Or gold coins
                        </Typography>
                        <Typography sx={{ mb: 3 }}>
                            Explore Gift Coins for your last minute gifting needs
                        </Typography>
                        <Button
                            variant="contained"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Buy Gold Coins
                        </Button>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/crossSection/goldcoins.jpg"
                            alt="Gold Coins Banner"
                            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default GiftingPage;