// import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from "@mui/material";
// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import axiosInstance from "../common components/AxiosInstance";
// import { publicUrl } from "../common components/PublicUrl";
// import { useNavigate } from "react-router-dom";

// const ShopByCategories = () => {
//     const [categoryName, setCategoryName] = useState([]);
//     const [loading, setLoading] = useState(true)
//     const navigate = useNavigate()

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/user/allcategories`);
//             setCategoryName(response?.data ?? []);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         } finally {
//             setLoading(false)
//         }
//     };

//     const assignedRouteToPath = {
//         allJewellery: '/allJewellery',
//         diamond: '/allJewellery',
//         gold: '/allJewellery',
//         silver: '/allJewellery',
//         // dailywear: '/allJewellery',
//         wedding: '/wedding',
//         gifting: '/gifting',
//         collection: '/collection',
//     };

//     const settings = {
//         dots: true,
//         infinite: categoryName.length > 1,
//         speed: 500,
//         slidesToShow: Math.max(1, Math.min(categoryName.length, 7)),
//         slidesToScroll: 1,
//         arrows: false,
//         initialSlide: 0,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: Math.max(1, Math.min(categoryName.length, 5)),
//                     slidesToScroll: 1,
//                     infinite: categoryName.length >= 5
//                 }
//             },
//             {
//                 breakpoint: 700,
//                 settings: {
//                     slidesToShow: Math.max(1, Math.min(categoryName.length, 4)),
//                     slidesToScroll: 1,
//                     infinite: categoryName.length >= 3
//                 }
//             },
//             {
//                 breakpoint: 500,
//                 settings: {
//                     slidesToShow: Math.max(1, Math.min(categoryName.length, 3)),
//                     slidesToScroll: 1,
//                     infinite: categoryName.length >= 2
//                 }
//             }
//         ]
//     };

//     // const ViewAllCard = (
//     //     <Card
//     //         sx={{
//     //             borderRadius: 4,
//     //             height: "100%",
//     //             display: "flex",
//     //             alignItems: "center",
//     //             justifyContent: "center",
//     //             flexDirection: "column",
//     //             minHeight: { xs: 180, md: 220 },
//     //             border: "1px solid #fff",
//     //             bgcolor: "transparent",
//     //             cursor: "pointer",
//     //             transition: "0.3s",
//     //             "&:hover": { transform: "translateY(-4px)" },
//     //             [theme.breakpoints.down("lg")]: { display: "none" },
//     //         }}
//     //         // TODO: wire up click to navigate if needed
//     //         onClick={() => { }}
//     //     >
//     //         <CardContent sx={{ textAlign: "center" }}>
//     //             <Typography variant="h4" fontFamily="serif" fontWeight={300} color="#2C2C2C" mb={1} fontSize={{ xs: "1.3rem", md: "2rem" }}>
//     //                 10 +
//     //             </Typography>
//     //             <Typography variant="body2" color="#666" mb={2}>
//     //                 Categories To Choose From
//     //             </Typography>
//     //             <Typography variant="body2" fontWeight={600} color="#2C2C2C" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
//     //                 VIEW ALL
//     //             </Typography>
//     //         </CardContent>
//     //     </Card>
//     // );


//     return (
//         <Box sx={{ bgcolor: "#F0E5CB", py: { xs: 4, sm: 6, md: 8 } }}>
//             <Container maxWidth="xl">
//                 <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
//                     <Typography
//                         variant="h3"
//                         fontFamily="serif"
//                         fontWeight={400}
//                         color="#2C2C2C"
//                         fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
//                     >
//                         Find Your Perfect Match
//                     </Typography>
//                     <Typography
//                         variant="h6"
//                         fontFamily="serif"
//                         fontWeight={300}
//                         color="#2C2C2C"
//                         fontSize={{ xs: "1rem", sm: "1.1rem", md: "1.2rem" }}
//                     >
//                         Shop By Categories
//                     </Typography>
//                 </Box>


//                 {/* <Box sx={{ px: { xs: 1, sm: 2 } }}>
//                     {loading ? "Loading..." : (
//                         <Slider {...settings} >
//                             {categoryName.map((item, id) => (
//                                 <Box key={item?.id ?? id} sx={{ px: 1 }}>
//                                     <Card
//                                         sx={{
//                                             borderRadius: 4,
//                                             cursor: "pointer",
//                                             transition: "0.3s",
//                                             height: "100%",
//                                             width: "100%",
//                                             borderRadius: '50%',
//                                             "&:hover": { transform: "translateY(-4px)" },
//                                             display: "flex",
//                                             flexDirection: "column",
//                                         }}
//                                         // onClick={() => {
//                                         //     const route = assignedRouteToPath[item.assignedRoute];
//                                         //     if (route) {
//                                         //         navigate(route);
//                                         //     } else {
//                                         //         navigate(`/category/${item.apiId}`);
//                                         //     }
//                                         // }}

//                                         onClick={() => {
//                                             const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
//                                             navigate(route + `?category=${item.name.toLowerCase()}`);
//                                         }}

//                                     // onClick={() => {
//                                     //     const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
//                                     //     // create a safe slug (lowercase, trimmed, spaces -> hyphens)
//                                     //     const slug = String(item?.name || '')
//                                     //         .trim()
//                                     //         .toLowerCase()
//                                     //         .replace(/\s+/g, '-');
//                                     //     navigate(`${route}?category=${encodeURIComponent(slug)}`);
//                                     // }}
//                                     >
//                                         <CardMedia
//                                             component="img"
//                                             src={publicUrl(item.image)}
//                                             alt={item.name}
//                                             loading="lazy"
//                                             sx={{ height: { xs: 100, md: 130 }, objectFit: "cover" }}
//                                         />
//                                     </Card>
//                                     <Typography
//                                         variant="body2"
//                                         fontWeight={600}
//                                         color="#2C2C2C"
//                                         fontSize="0.7rem"
//                                         paddingBottom={{ xs: 0, sm: "20px" }}
//                                         sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
//                                     >
//                                         {item.name}
//                                     </Typography>
//                                 </Box>
//                             ))}

//                             <Box sx={{ px: 1 }}>{ViewAllCard}</Box>
//                         </Slider>
//                     )}

//                 </Box> */}

//                 <Box sx={{ px: { xs: 1, sm: 2 } }}>
//                     {loading ? "Loading..." : (
//                         categoryName.length > 1 ? (
//                             <Slider {...settings}>
//                                 {categoryName.map((item, id) => (
//                                     <Box key={item?.id ?? id} sx={{ px: 1 }}>
//                                         <Card
//                                             sx={{
//                                                 cursor: "pointer",
//                                                 transition: "0.3s",
//                                                 width: "100%",
//                                                 borderRadius: "50%",
//                                                 "&:hover": { transform: "translateY(-4px)" },
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                             }}
//                                             onClick={() => {
//                                                 const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
//                                                 navigate(route + `?category=${item.name.toLowerCase()}`);
//                                             }}
//                                         >
//                                             <CardMedia
//                                                 component="img"
//                                                 src={publicUrl(item.image)}
//                                                 alt={item.name}
//                                                 loading="lazy"
//                                                 sx={{ height: { xs: 100, md: 130 }, objectFit: "cover" }}
//                                             />
//                                         </Card>
//                                         <Typography
//                                             variant="body2"
//                                             fontWeight={600}
//                                             color="#2C2C2C"
//                                             fontSize="0.7rem"
//                                             paddingBottom={{ xs: 0, sm: "20px" }}
//                                             sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
//                                         >
//                                             {item.name}
//                                         </Typography>
//                                     </Box>
//                                 ))}

//                                 {/* Optional: show this only when there are many categories */}
//                                 {/* {categoryName.length > 7 && <Box sx={{ px: 1 }}>{ViewAllCard}</Box>} */}
//                             </Slider>
//                         ) : (
//                             // Exactly one category → render without Slider so it doesn’t stretch full width
//                             <Grid container justifyContent="center">
//                                 {categoryName.map((item, id) => (
//                                     <Grid item key={item?.id ?? id}>
//                                         <Box sx={{ px: 1 }}>
//                                             <Card
//                                                 sx={{
//                                                     cursor: "pointer",
//                                                     transition: "0.3s",
//                                                     borderRadius: "50%",
//                                                     display: "inline-block",
//                                                     "&:hover": { transform: "translateY(-4px)" },
//                                                 }}
//                                                 onClick={() => {
//                                                     const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
//                                                     navigate(route + `?category=${item.name.toLowerCase()}`);
//                                                 }}
//                                             >
//                                                 <CardMedia
//                                                     component="img"
//                                                     src={publicUrl(item.image)}
//                                                     alt={item.name}
//                                                     loading="lazy"
//                                                     sx={{ height: { xs: 100, md: 130 }, width: { xs: 100, md: 130 }, objectFit: "cover", borderRadius: "50%" }}
//                                                 />
//                                             </Card>
//                                             <Typography
//                                                 variant="body2"
//                                                 fontWeight={600}
//                                                 color="#2C2C2C"
//                                                 fontSize="0.7rem"
//                                                 sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
//                                             >
//                                                 {item.name}
//                                             </Typography>
//                                         </Box>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         )
//                     )}
//                 </Box>

//             </Container >
//         </Box >
//     );
// };

// export default ShopByCategories;


import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";
import { useNavigate } from "react-router-dom";

const ShopByCategories = () => {
    const [categoryName, setCategoryName] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user/allcategories`);
            setCategoryName(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false)
        }
    };

    const assignedRouteToPath = {
        allJewellery: '/allJewellery',
        diamond: '/allJewellery',
        gold: '/allJewellery',
        silver: '/allJewellery',
        // dailywear: '/allJewellery',
        wedding: '/wedding',
        gifting: '/gifting',
        collection: '/collection',
    };

    const settings = {
        dots: true,
        infinite: categoryName.length > 4,
        speed: 500,
        slidesToShow: Math.max(1, Math.min(categoryName.length, 7)),
        slidesToScroll: 1,
        arrows: false,
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

    return (
        <Box sx={{ bgcolor: "#F0E5CB", py: { xs: 4, sm: 6, md: 8 } }}>
            <Container maxWidth="xl">
                <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
                    <Typography
                        variant="h3"
                        fontFamily="serif"
                        fontWeight={400}
                        color="#2C2C2C"
                        fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
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
                    {loading ? "Loading..." : (
                        categoryName.length > 1 ? (
                            <Slider {...settings}>
                                {categoryName.map((item, id) => (
                                    <Box key={item?.id ?? id} sx={{ px: 1 }}>
                                        <Card
                                            sx={{
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                width: "100%",
                                                borderRadius: 4,
                                                "&:hover": { transform: "translateY(-4px)" },
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                            onClick={() => {
                                                const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
                                                navigate(route + `?category=${item.name.toLowerCase()}`);
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                src={publicUrl(item.image)}
                                                alt={item.name}
                                                loading="lazy"
                                                sx={{ height: { xs: 100, md: 130 }, objectFit: "cover" }}
                                            />
                                        </Card>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                            color="#2C2C2C"
                                            fontSize="0.7rem"
                                            paddingBottom={{ xs: 0, sm: "20px" }}
                                            sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Slider>
                        ) : (
                            <Grid container justifyContent="center">
                                {categoryName.map((item, id) => (
                                    <Grid item key={item?.id ?? id}>
                                        <Box sx={{ px: 1 }}>
                                            <Card
                                                sx={{
                                                    cursor: "pointer",
                                                    transition: "0.3s",
                                                    borderRadius: "50%",
                                                    display: "inline-block",
                                                    "&:hover": { transform: "translateY(-4px)" },
                                                }}
                                                onClick={() => {
                                                    const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;
                                                    navigate(route + `?category=${item.name.toLowerCase()}`);
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    src={publicUrl(item.image)}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    sx={{ height: { xs: 100, md: 130 }, width: { xs: 100, md: 130 }, objectFit: "cover", borderRadius: "50%" }}
                                                />
                                            </Card>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color="#2C2C2C"
                                                fontSize="0.7rem"
                                                sx={{ letterSpacing: 1, textTransform: "uppercase", textAlign: "center", my: 1 }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    )}
                </Box>

            </Container >
        </Box >
    );
};

export default ShopByCategories;

