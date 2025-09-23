import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  useScrollTrigger,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import TrendingKeywordsMarquee from "./WeddingpageParts/TrendingKeywordsMarquee";
import WeddingOccasionSlider from "./WeddingpageParts/WeddingOccasionSlider";
import FindMyCommunity from "../common components/FindMyCommunity";
import { publicUrl } from "../common components/PublicUrl";
import axiosInstance from "../common components/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

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
  width: { xs: 150, md: 170 },
  // height: { xs: 180, sm: 200 },
  minWidth: { xs: 150, md: 170 },
  cursor: "pointer",
  border: "1px solid rgba(139,21,56,0.08)"
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WeddingPage = () => {
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true });
  const [occasion, setOccasion] = useState([]);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredOccasionName, setFilteredOccasionName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const query = useQuery();
  const occasionQuery = query.get('occasion')?.toLowerCase() || '';
  const navigate = useNavigate();

  useEffect(() => {
    fetchOccasions();
    fetchAllProducts();
    fetchBanners();
  }, []);

  // Filter products by occasionQuery after products loaded
  useEffect(() => {
    if (occasionQuery && products.length > 0 && occasion.length > 0) {
      // Find occasion display name
      const foundOccasion = occasion.find(
        o => o.name.trim().toLowerCase() === occasionQuery.trim()
      );
      setFilteredOccasionName(foundOccasion ? foundOccasion.name : '');

      // Set filtered products in a separate state, do not mutate original products!
      setFilteredProducts(
        products.filter(
          p => p.occasion && p.occasion.trim().toLowerCase() === occasionQuery.trim()
        )
      );
    } else {
      // Show all products if no query
      setFilteredProducts(products);
      setFilteredOccasionName('');
    }
  }, [occasionQuery, products, occasion]);

  const fetchOccasions = async () => {
    try {
      const response = await axiosInstance.get(`/user/allOccasions`);
      setOccasion(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching occasion:", error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axiosInstance.get(`/user/allproducts`);
      setProducts(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get("/user/allBanners");
      const bannerData = response.data;
      const mainBanners = bannerData.filter(
        (banner) =>
          banner.type === "EndSlider" &&
          Array.isArray(banner.slider_image) &&
          banner.slider_image.length > 0
      );
      setBanners(mainBanners);

    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

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


  return (
    <Box sx={{ backgroundColor: "#fff", overflowX: "hidden", position: "relative" }}>

      {/* Handpicked for the occasion */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Typography variant="h4" component="h2" sx={titleStyle}>
          Handpicked for the {filteredOccasionName || "all occasions"}
        </Typography>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2 }
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <Box sx={categoryItemStyle} key={item._id || index}>
                <Box
                  component="img"
                  src={publicUrl(item.media?.[0]?.url)}
                  onClick={() => navigate(`/singleProduct/${item._id}`)}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: { xs: 110, sm: 130 },
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                />
                <Typography variant="body2" sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: "#8B1538",
                  textAlign: "center",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  px: 0.5
                }}>
                  {item.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No products found for this occasion.</Typography>
          )}
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

      {/* Featured Articles */}
      <Box sx={{ py: 8, backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          {banners.length > 0 ?
            (<h1 className="text-center">Featured Articles</h1>) : ""}

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
          >
            {banners.length > 0 && (
              <>
                {banners.map((item) => (
                  <SwiperSlide key={item._id}>
                    <Box>
                      <img
                        src={publicUrl(item.slider_image)}
                        alt={item.type}
                        style={{ width: "100%", height: "220px", objectFit: "cover", cursor: "pointer", borderRadius: "12px" }}
                        onClick={() => navigate(`/allJewellery/${(item.variety || 'all').toLowerCase()}`)}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </>
            )}

          </Swiper>
        </Container>
      </Box>
    </Box>
  );
};

export default WeddingPage;

