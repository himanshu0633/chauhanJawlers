import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Fade,
  Grow,
  Zoom,
  useScrollTrigger,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  Search,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import TrendingKeywordsMarquee from "../common components/TrendingKeywordsMarquee";
import WeddingOccasionSlider from "../common components/WeddingOccasionSlider";
import FindMyCommunity from "../common components/FindMyCommunity";

// Animation presets
const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;
const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

// Styled button
const GlowButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    right: "-50%",
    bottom: "-50%",
    background:
      "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
    transform: "rotate(45deg)",
    animation: `${shimmer} 3s infinite linear`,
    opacity: 0,
    transition: "opacity 0.3s",
  },
  "&:hover:before": { opacity: 1 },
});

const WeddingPage = () => {
  const [wishlist, setWishlist] = useState({});
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true });

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const communityBrides = [
    "Bihari Bride",
    "Tamil Bride",
    "Telugu Bride",
    "Kannadiga Bride",
    "Gujarati Bride",
    "Marathi Bride",
    "Bengali Bride",
    "Punjabi Bride",
    "UP Bride",
    "Marwari Bride",
    "Odia Bride",
    "Muslim Bride",
  ];

  const brideCategories = [
    {
      name: "Necklace Set",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Long Necklace",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Bangles",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Diamond",
      image:
        "https://images.unsplash.com/photo-1599640842225-85d111c20e42?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mangalsutra",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const trendingItems = [
    "Accessories",
    "Long Necklace",
    "Bangles",
    "Necklace Sets",
    "Diamond Jewellery",
  ];
  const trendingImages = {
    Accessories:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "Long Necklace":
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    Bangles:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    "Necklace Sets":
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "Diamond Jewellery":
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  };

  const sectionTitleStyle = {
    textAlign: "center",
    mb: 6,
    fontWeight: 500,
    color: "#8B1538",
    fontFamily: '"Playfair Display", serif',
    position: "relative",
  };

  const titleStyle = {
    textAlign: "center",
    mb: 6,
    fontWeight: 500,
    color: "#8B1538",
    fontFamily: '"Playfair Display", serif'
  };

  const categoryItemStyle = {
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pb: 1.5,
    width: { xs: 130, sm: 150, md: 170 },
    height: { xs: 180, sm: 200 },
    minWidth: { xs: 130, sm: 150, md: 170 },
    cursor: "pointer",
    border: "1px solid rgba(139,21,56,0.08)"
  };


  return (
    <Box sx={{ backgroundColor: "#fff", overflowX: "hidden", position: "relative" }}>
      {/* Community Brides  */}
      <FindMyCommunity />

      {/* Handpicked for the Bride */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={titleStyle}>
          Handpicked for the Bride
        </Typography>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2 }
        }}>
          {brideCategories.map((category, index) => (
            <Box sx={categoryItemStyle} key={index}>
              <Box
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  width: "100%",
                  height: { xs: 110, sm: 130 },
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12
                }}
              />
              <Box sx={{
                position: "absolute",
                top: 6,
                right: 6,
                zIndex: 2
              }}>
                <IconButton size="small" sx={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  width: 24,
                  height: 24
                }}>
                  <FavoriteBorder sx={{ color: "#8B1538" }} />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{
                mt: 1,
                fontWeight: 600,
                color: "#8B1538",
                textAlign: "center",
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                px: 0.5
              }}>
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>



      {/* Trending Keywords */}
      <TrendingKeywordsMarquee
        trigger={trigger}
        trendingItems={trendingItems}
        trendingImages={trendingImages}
      />

      {/* Wedding Occasions */}
      <Box sx={{ py: 8, backgroundColor: "#faf5f0" }}>
        <Container maxWidth="lg">
          <WeddingOccasionSlider />
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, backgroundColor: "#faf5f0" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
            {["Golden Harvest", "Book An Appointment", "Talk to Jewellery Expert", "Locate Store"].map((service, i) => (
              <Box key={i} sx={{ width: 250, height: 250, position: "relative" }}>
                <Typography sx={{ position: "absolute", left: 21, top: 20 }}>{service}</Typography>
                <img
                  src={`https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/${i + 1}.png`}
                  alt={service}
                  style={{
                    position: "absolute",
                    maxWidth: "120px",
                    right: "20px",
                    top: "25%",
                  }}
                />
                <Button sx={{ position: "absolute", left: 20, bottom: 20, background: "#832729", color: "#fff" }}>
                  {i === 0 ? "Read More" : i === 1 ? "Schedule Now" : i === 2 ? "Connect Now" : "Visit Store"}
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Articles */}
      <Box sx={{ py: 8, backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
          >
            {[1, 2, 3, 4].map((i) => (
              <SwiperSlide key={i}>
                <Box>
                  <img
                    src={`https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/${i}.jpg`}
                    alt={`Article ${i}`}
                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* Featured Collections */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={sectionTitleStyle}>
          Featured Collections
        </Typography>
        <Box sx={{ width: "100%", borderRadius: 4, overflow: "hidden" }}>
          <img
            src="/src/img/rivaah-tt-desktop.jpg"
            alt="Featured Collections"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Container>

      {/* Store Banner */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
          <img
            src="/src/img/storeBannerDesktop.png"
            alt="Store Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default WeddingPage;
