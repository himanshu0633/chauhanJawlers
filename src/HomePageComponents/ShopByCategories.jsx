import { Box, Typography, Card, CardMedia, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../commonComponents/AxiosInstance";
import { publicUrl } from "../commonComponents/PublicUrl";
import { useNavigate } from "react-router-dom";
import Theme from "../../Theme";

const ShopByCategories = () => {
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const assignedRouteToPath = {
    allJewellery: "/allJewellery",
    wedding: "/wedding",
    gifting: "/gifting",
    collection: "/collection",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/allcategories`);
      const data = response?.data || [];
      const mapped = data.map((cat) => ({
        apiId: cat._id,
        label: cat.name,
        variety: cat.variety,
        image: cat.image,
        assignedRoute: cat.assignedRoute,
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
      const route = assignedRouteToPath[item.assignedRoute] || "/allJewellery";

      if (item.label && item.label.toLowerCase() === "all jewellery") {
        navigate(route);
        return;
      }

      if (item.assignedRoute && item.assignedRoute !== "allJewellery") {
        navigate(route);
        return;
      }

      if (item.label && item.label.trim()) {
        navigate(`/allJewellery?category=${item.label.toLowerCase()}`);
        return;
      }

      navigate("/allJewellery");
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("/allJewellery");
    }
  };

  const settings = {
    dots: true,
    infinite: categoryName.length > 4,
    speed: 500,
    slidesToShow: Math.max(1, Math.min(categoryName.length, 7)),
    slidesToScroll: Math.min(4, categoryName.length),
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536, // xl
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 6)),
          slidesToScroll: Math.min(3, categoryName.length),
        }
      },
      {
        breakpoint: 1200, // lg
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 5)),
          slidesToScroll: Math.min(3, categoryName.length),
          dots: true,
        }
      },
      {
        breakpoint: 900, // md
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 4)),
          slidesToScroll: Math.min(2, categoryName.length),
          dots: false,
        }
      },
      {
        breakpoint: 768, // sm
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 3)),
          slidesToScroll: Math.min(2, categoryName.length),
          dots: false,
        }
      },
      {
        breakpoint: 600, // xs
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 2)),
          slidesToScroll: 1,
          dots: false,
        }
      },
      {
        breakpoint: 400, // xxs - very small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          centerMode: true,
          centerPadding: "40px",
        }
      }
    ],
  };

  // Card dimensions for different screen sizes
  const getCardDimensions = () => ({
    height: {
      xs: 160,  // mobile
      sm: 180,  // small tablet
      md: 200,  // tablet
      lg: 200,  // desktop
    },
    imageHeight: {
      xs: 120,  // mobile
      sm: 120,  // small tablet
      md: 140,  // tablet
      lg: 140,  // desktop
    },
    maxWidth: {
      xs: 140,  // mobile
      sm: 160,  // small tablet
      md: 180,  // tablet
      lg: 200,  // desktop
    },
    fontSize: {
      xs: "0.65rem",  // mobile
      sm: "0.7rem",   // small tablet
      md: "0.75rem",  // tablet
      lg: "0.75rem",  // desktop
    }
  });

  const cardDims = getCardDimensions();

  return (
    <Box sx={{ 
      bgcolor: "#fff", 
      py: { xs: 3, sm: 4, md: 5, lg: 6 },
      px: { xs: 1, sm: 0 } 
    }}>
      <Container maxWidth="xl">
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 3, sm: 4, md: 5, lg: 6 }}>
          <Typography
            variant="h3"
            fontFamily="serif"
            fontWeight={600}
            color={Theme.palette.primary}
            fontSize={{ 
              xs: "24px", 
              sm: "32px", 
              md: "40px", 
              lg: "48px" 
            }}
            sx={{ 
              lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              mb: { xs: 1, sm: 1, md: 2 }
            }}
          >
            Find Your Perfect Match
          </Typography>
          <Typography
            variant="h6"
            fontFamily="serif"
            fontWeight={300}
            color="#2C2C2C"
            fontSize={{ 
              xs: "0.875rem", 
              sm: "1rem", 
              md: "1.1rem", 
              lg: "1.2rem" 
            }}
            sx={{ 
              lineHeight: { xs: 1.3, sm: 1.4, md: 1.5 }
            }}
          >
            Shop By Categories
          </Typography>
        </Box>

        <Box sx={{ 
          px: { xs: 0.5, sm: 1, md: 2 },
          mx: { xs: -0.5, sm: 0 } // Compensate for mobile padding
        }}>
          {loading ? (
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 4,
                color: "#2C2C2C",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
              }}
            >
              Loading...
            </Box>
          ) : categoryName.length > 0 ? (
            categoryName.length > 1 ? (
              // Multiple categories - Slider
              <Slider {...settings}>
                {categoryName.map((item, id) => (
                  <Box
                    key={item.apiId ?? id}
                    sx={{ 
                      px: { xs: 0.5, sm: 1 }, 
                      py: { xs: 0.5, sm: 1 },
                      boxSizing: "border-box",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        width: "100%",
                        height: cardDims.height,
                        maxWidth: cardDims.maxWidth,
                        borderRadius: { xs: 3, sm: 4 },
                        "&:hover": { 
                          transform: { xs: "translateY(-2px)", sm: "translateY(-4px)" },
                          boxShadow: 3
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: { xs: 0.5, sm: 1 },
                        border: "1px solid #f0f0f0",
                      }}
                      onClick={() => handleCategoryNavigation(item)}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: cardDims.imageHeight,
                          borderRadius: { xs: "12px", sm: "16px" },
                          overflow: "hidden",
                          backgroundColor: "#f8f8f8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={publicUrl(item.image)}
                          alt={item.label}
                          loading="lazy"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            }
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="#2C2C2C"
                        fontSize={cardDims.fontSize}
                        fontFamily="monospace"
                        sx={{
                          letterSpacing: { xs: 0.5, sm: 1 },
                          textTransform: "uppercase",
                          textAlign: "center",
                          mt: { xs: 0.5, sm: 1 },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                          minHeight: { xs: 24, sm: 30 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 0.5,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Card>
                  </Box>
                ))}
              </Slider>
            ) : (
              // Single category - Centered with same styling
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%', 
                py: 1 
              }}>
                {categoryName.map((item) => (
                  <Box 
                    key={item.apiId} 
                    sx={{ 
                      px: { xs: 0.5, sm: 1 }, 
                      py: { xs: 0.5, sm: 1 },
                      boxSizing: "border-box",
                      textAlign: "center"
                    }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        width: "100%",
                        height: cardDims.height,
                        maxWidth: cardDims.maxWidth,
                        borderRadius: { xs: 3, sm: 4 },
                        "&:hover": { 
                          transform: { xs: "translateY(-2px)", sm: "translateY(-4px)" },
                          boxShadow: 3
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: { xs: 0.5, sm: 1 },
                        border: "1px solid #f0f0f0",
                      }}
                      onClick={() => handleCategoryNavigation(item)}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: cardDims.imageHeight,
                          borderRadius: { xs: "12px", sm: "16px" },
                          overflow: "hidden",
                          backgroundColor: "#f8f8f8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={publicUrl(item.image)}
                          alt={item.label}
                          loading="lazy"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            }
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="#2C2C2C"
                        fontSize={cardDims.fontSize}
                        fontFamily="monospace"
                        sx={{
                          letterSpacing: { xs: 0.5, sm: 1 },
                          textTransform: "uppercase",
                          textAlign: "center",
                          mt: { xs: 0.5, sm: 1 },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                          minHeight: { xs: 20, sm: 24 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 0.5,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Card>
                  </Box>
                ))}
              </Box>
            )
          ) : (
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 4,
                color: "#2C2C2C",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
              }}
            >
              No categories found
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ShopByCategories;