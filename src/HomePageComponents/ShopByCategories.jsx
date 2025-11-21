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
    dots: true, // Keep dots on desktop/laptop
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
          infinite: categoryName.length >= 5,
          dots: false, // Remove dots on tablet (1024px and below)
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 4)),
          slidesToScroll: 1,
          infinite: categoryName.length >= 3,
          dots: false, // Remove dots on mobile
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: Math.max(1, Math.min(categoryName.length, 3)),
          slidesToScroll: 1,
          infinite: categoryName.length >= 2,
          dots: false, // Remove dots on small mobile
        },
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: "#fff", py: { xs: 4, sm: 6, md: 6 } }}>
      <Container maxWidth="xl">
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
          <Typography
            variant="h3"
            fontFamily="serif"
            fontWeight={600}
            color={Theme.palette.primary}
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
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 4,
                color: "#2C2C2C",
                fontSize: "1.1rem"
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
                    sx={{ px: 1, py: 1, boxSizing: "border-box" }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "0.3s",
                        width: "100%",
                        height: 200,
                        maxWidth: 200,
                        borderRadius: 4,
                        "&:hover": { transform: "translateY(-4px)" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                      onClick={() => handleCategoryNavigation(item)}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 140,
                          borderRadius: "16px",
                          overflow: "hidden",
                          backgroundColor: "#fff",
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
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="#2C2C2C"
                        fontSize="0.75rem"
                        fontFamily="monospace"
                        sx={{
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          textAlign: "center",
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                          minHeight: 30,
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
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 1 }}>
                {categoryName.map((item) => (
                  <Box 
                    key={item.apiId} 
                    sx={{ 
                      px: 1, 
                      py: 1, 
                      boxSizing: "border-box",
                      textAlign: "center"
                    }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "0.3s",
                        width: "100%",
                        height: 200,
                        maxWidth: 200,
                        borderRadius: 4,
                        "&:hover": { transform: "translateY(-4px)" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                      onClick={() => handleCategoryNavigation(item)}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 120,
                          borderRadius: "16px",
                          overflow: "hidden",
                          backgroundColor: "#fff",
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
                          }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="#2C2C2C"
                        fontSize="0.75rem"
                        fontFamily="monospace"
                        sx={{
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          textAlign: "center",
                          mt: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                          minHeight: 20,
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
                fontSize: "1.1rem"
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