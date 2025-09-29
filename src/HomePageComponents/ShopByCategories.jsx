
import { Box, Typography, Card, CardMedia, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";
import { useNavigate } from "react-router-dom";

const ShopByCategories = () => {
    const [categoryName, setCategoryName] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const assignedRouteToPath = {
        allJewellery: '/allJewellery',
        wedding: '/wedding',
        gifting: '/gifting',
        collection: '/collection',
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user/allcategories`);
            const data = response?.data || [];
            const mapped = data.map(cat => ({
                apiId: cat._id,
                label: cat.name,
                variety: cat.variety,
                image: cat.image, // keep image path only
                assignedRoute: cat.assignedRoute
            }));
            setCategoryName(mapped);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryNavigation = (item) => {
        try {
            const route = assignedRouteToPath[item.assignedRoute] || '/allJewellery';

            if (item.label && item.label.toLowerCase() === "all jewellery") {
                navigate(route);
                return;
            }

            if (item.assignedRoute && item.assignedRoute !== 'allJewellery') {
                navigate(route);
                return;
            }

            if (item.label && item.label.trim()) {
                navigate(`/allJewellery?category=${item.label.toLowerCase()}`);
                return;
            }

            navigate('/allJewellery');

        } catch (error) {
            console.error("Navigation error:", error);
            navigate('/allJewellery');
        }
    };

    const settings = {
        dots: true,
        infinite: categoryName.length > 4,
        speed: 500,
        slidesToShow: Math.max(1, Math.min(categoryName.length, 7)),
        slidesToScroll: 4,
        arrows: false,
        autoplay: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.max(1, Math.min(categoryName.length, 5)),
                    slidesToScroll: 1,
                    infinite: categoryName.length >= 5
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: Math.max(1, Math.min(categoryName.length, 4)),
                    slidesToScroll: 1,
                    infinite: categoryName.length >= 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: Math.max(1, Math.min(categoryName.length, 3)),
                    slidesToScroll: 1,
                    infinite: categoryName.length >= 2
                }
            }
        ]
    };

    const CARD_W = { xs: 140, sm: 160, md: 180 };  
    const MEDIA_H = { xs: 100, sm: 120, md: 140 };


    return (
        <Box sx={{ bgcolor: "#fff", py: { xs: 4, sm: 6, md: 6 } }}>
            <Container maxWidth="xl">
                <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
                    <Typography
                        variant="h3"
                        fontFamily="serif"
                        fontWeight={600}
                        color="#2C2C2C"
                        fontSize={{ xs: "32px", sm: "40px", md: "48px" }}
                    >
                        Find Your Perfect Match
                    </Typography>
                    <Typography
                        variant="h6"
                        fontFamily="serif"
                        fontWeight={300}
                        color="#2C2C2C"
                        fontSize={{ xs: "1rem", sm: "1.1rem", md: "1.2rem" }}
                    >
                        Shop By Categories
                    </Typography>
                </Box>

                <Box sx={{ px: { xs: 1, sm: 2 } }}>
                    {loading ? (
                        "Loading..."
                    ) : categoryName.length > 1 ? (
                        <Slider {...settings}>
                            {categoryName.map((item, id) => (
                                <Box
                                    key={item.apiId ?? id}
                                    sx={{
                                        px: 1,
                                        py: 1,
                                        width: CARD_W,        
                                        boxSizing: "border-box"
                                    }}
                                >
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            transition: "0.3s",
                                            width: "100%",        
                                            maxWidth: 200,        
                                            borderRadius: 4,
                                            "&:hover": { transform: "translateY(-4px)" },
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}
                                        onClick={() => handleCategoryNavigation(item)}
                                    >
                                        <CardMedia
                                            component="img"
                                            src={publicUrl(item.image)}
                                            alt={item.label}
                                            loading="lazy"
                                            sx={{
                                                width: "100%",
                                                height: MEDIA_H,    
                                                objectFit: "contain",
                                                pt: 1,             
                                                backgroundColor: "#fff",
                                               borderRadius:4
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            color="#2C2C2C"
                                            fontSize="0.7rem"
                                            fontFamily="monospace"
                                            sx={{
                                                letterSpacing: 1,
                                                textTransform: "uppercase",
                                                textAlign: "center",
                                                py: 1,
                                                px: 1,
                                                width: "100%",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Card>
                                </Box>
                            ))}
                        </Slider>
                    ) : (
                        categoryName.map((item) => (
                            <Box key={item.apiId ?? item.label} sx={{ px: 1, textAlign: 'center' }}>
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        borderRadius: 4,
                                        display: "inline-block",
                                        "&:hover": { transform: "translateY(-4px)" },
                                    }}
                                    onClick={() => handleCategoryNavigation(item)}
                                >
                                    <CardMedia
                                        component="img"
                                        src={publicUrl(item.image)}
                                        alt={item.label}
                                        loading="lazy"
                                        sx={{
                                            height: MEDIA_H,
                                            width: MEDIA_H,
                                            objectFit: "contain",   
                                            borderRadius: 4,
                                            p: 1,
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                </Card>
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    color="#2C2C2C"
                                    fontSize="0.7rem"
                                    sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        ))
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ShopByCategories;
