import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";

const ShopByCategories = () => {
    const [categoryName, setCategoryName] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user/allcategories`);
            setCategoryName(response?.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    return (
        <Box sx={{ bgcolor: "#F0E5CB", py: { xs: 4, sm: 6, md: 8 } }}>
            <Container maxWidth="xl">
                <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
                    <Typography variant="h3" fontFamily="serif" fontWeight={400} color="#2C2C2C" fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}>
                        Find Your Perfect Match
                    </Typography>
                    <Typography variant="h6" fontFamily="serif" fontWeight={300} color="#2C2C2C" fontSize={{ xs: "1rem", sm: "1.1rem", md: "1.2rem" }}>
                        Shop By Categories
                    </Typography>
                </Box>
                <Grid container spacing={{ xs: 2, sm: 3 }} flexWrap="wrap" justifyContent="center">
                
                    {categoryName.map((item, id) => (
                        <Grid item key={id} sx={{
                            flexBasis: { xs: "46%", md: "25%", lg: "20%" },
                            maxWidth: { xs: "46%", md: "25%", lg: "20%" },
                            flexShrink: 0,
                        }}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    height: "100%",
                                    width: "100%",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                    },
                                    display: "flex", flexDirection: "column",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={publicUrl(item.image)}
                                    alt={item.name}
                                    sx={{ height: { xs: 180, lg: 280 }, objectFit: "cover" }}
                                />
                                <Typography variant="body2" fontWeight={600} color="#2C2C2C" fontSize={{ xs: "0.8rem", md: "0.9rem" }} sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}>
                                    {item.name}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item sx={{
                        flexBasis: { xs: "90%", sm: "40%", md: "25%", lg: "20%" },
                        maxWidth: { xs: "90%", sm: "40%", md: "25%", lg: "20%" },
                        flexShrink: 0,
                    }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                minHeight: { xs: 180, md: 220 },
                                border: "1px solid #fff",
                                bgcolor: "transparent",
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": { transform: "translateY(-4px)" },
                            }}
                        >
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h4" fontFamily="serif" fontWeight={300} color="#2C2C2C" mb={1} fontSize={{ xs: "1.3rem", md: "2rem" }}>
                                    10 +
                                </Typography>
                                <Typography variant="body2" color="#666" mb={2}>
                                    Categories To Choose From
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#2C2C2C" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
                                    VIEW ALL
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>)
};

export default ShopByCategories;
