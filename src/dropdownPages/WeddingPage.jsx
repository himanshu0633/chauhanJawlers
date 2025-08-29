// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   useScrollTrigger,
//   styled,
// } from "@mui/material";
// import { keyframes } from "@emotion/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import TrendingKeywordsMarquee from "./WeddingpageParts/TrendingKeywordsMarquee";
// import WeddingOccasionSlider from "./WeddingpageParts/WeddingOccasionSlider";
// import FindMyCommunity from "../common components/FindMyCommunity";
// import { publicUrl } from "../common components/PublicUrl";
// import axiosInstance from "../common components/AxiosInstance";
// import { useLocation } from "react-router-dom";

// // Animation presets
// const shimmer = keyframes`
//   0% { background-position: -468px 0 }
//   100% { background-position: 468px 0 }
// `;
// const float = keyframes`
//   0% { transform: translateY(0px) }
//   50% { transform: translateY(-10px) }
//   100% { transform: translateY(0px) }
// `;


// const titleStyle = {
//   textAlign: "center",
//   mb: 6,
//   fontWeight: 500,
//   color: "#8B1538",
//   fontFamily: '"Playfair Display", serif'
// };

// const categoryItemStyle = {
//   borderRadius: 3,
//   overflow: "hidden",
//   boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
//   background: "#fff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   pb: 1.5,
//   width: { xs: 130, sm: 150, md: 170 },
//   // height: { xs: 180, sm: 200 },
//   minWidth: { xs: 130, sm: 150, md: 170 },
//   cursor: "pointer",
//   border: "1px solid rgba(139,21,56,0.08)"
// };

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const WeddingPage = () => {
//   const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true });
//   const [occasion, setOccasion] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredOccasionName, setFilteredOccasionName] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const query = useQuery();
//   const occasionQuery = query.get('occasion')?.toLowerCase() || '';

//   useEffect(() => {
//     fetchOccasions();
//     fetchAllProducts();
//   }, []);

//   // Filter products by occasionQuery after products loaded
//   useEffect(() => {
//     if (occasionQuery && products.length > 0 && occasion.length > 0) {
//       // Find occasion display name
//       const foundOccasion = occasion.find(
//         o => o.name.trim().toLowerCase() === occasionQuery.trim()
//       );
//       setFilteredOccasionName(foundOccasion ? foundOccasion.name : '');

//       // Set filtered products in a separate state, do not mutate original products!
//       setFilteredProducts(
//         products.filter(
//           p => p.occasion && p.occasion.trim().toLowerCase() === occasionQuery.trim()
//         )
//       );
//     } else {
//       // Show all products if no query
//       setFilteredProducts(products);
//       setFilteredOccasionName('');
//     }
//   }, [occasionQuery, products, occasion]);


//   const fetchOccasions = async () => {
//     try {
//       const response = await axiosInstance.get(`/user/allOccasions`);
//       setOccasion(response?.data ?? []);
//     } catch (error) {
//       console.error("Error fetching occasion:", error);
//     }
//   };
//   const fetchAllProducts = async () => {
//     try {
//       const response = await axiosInstance.get(`/user/allproducts`);
//       setProducts(response?.data ?? []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const trendingItems = [
//     "Accessories",
//     "Long Necklace",
//     "Bangles",
//     "Necklace Sets",
//     "Diamond Jewellery",
//   ];
//   const trendingImages = {
//     Accessories:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
//     "Long Necklace":
//       "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
//     Bangles:
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
//     "Necklace Sets":
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     "Diamond Jewellery":
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//   };


//   return (
//     <Box sx={{ backgroundColor: "#fff", overflowX: "hidden", position: "relative" }}>

//       {/* Handpicked for the Bride */}
//       <Container maxWidth="lg" sx={{ mt: 10 }}>
//         <Typography variant="h4" component="h2" sx={titleStyle}>
//           <Typography variant="h4" component="h2" sx={titleStyle}>
//             Handpicked for the {filteredOccasionName || "Bride"}
//           </Typography>
//         </Typography>

//         <Box sx={{
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           gap: { xs: 1, sm: 2 },
//           px: { xs: 1, sm: 2 }
//         }}>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item, index) => (
//               <Box sx={categoryItemStyle} key={item._id || index}>
//                 <Box
//                   component="img"
//                   src={publicUrl(item.media?.[0]?.url)}
//                   alt={item.name}
//                   sx={{
//                     width: "100%",
//                     height: { xs: 110, sm: 130 },
//                     objectFit: "cover",
//                     borderTopLeftRadius: 12,
//                     borderTopRightRadius: 12
//                   }}
//                 />
//                 <Typography variant="body2" sx={{
//                   mt: 1,
//                   fontWeight: 600,
//                   color: "#8B1538",
//                   textAlign: "center",
//                   fontSize: { xs: "0.85rem", sm: "0.9rem" },
//                   px: 0.5
//                 }}>
//                   {item.name}
//                 </Typography>
//               </Box>
//             ))
//           ) : (
//             <Typography>No products found for this occasion.</Typography>
//           )}
//         </Box>

//       </Container>

//       {/* Trending Keywords */}
//       <TrendingKeywordsMarquee
//         trigger={trigger}
//         trendingItems={trendingItems}
//         trendingImages={trendingImages}
//       />

//       {/* Wedding Occasions */}
//       <Box sx={{ py: 8, backgroundColor: "#faf5f0" }}>
//         <Container maxWidth="lg">
//           <WeddingOccasionSlider />
//         </Container>
//       </Box>

//       {/* Services Section */}
//       <Box sx={{ py: 8, backgroundColor: "#faf5f0" }}>
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
//             {["Golden Harvest", "Book An Appointment", "Talk to Jewellery Expert", "Locate Store"].map((service, i) => (
//               <Box key={i} sx={{ width: 250, height: 250, position: "relative" }}>
//                 <Typography sx={{ position: "absolute", left: 21, top: 20 }}>{service}</Typography>
//                 <img
//                   src={`https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/${i + 1}.png`}
//                   alt={service}
//                   style={{
//                     position: "absolute",
//                     maxWidth: "120px",
//                     top: "25%",
//                   }}
//                 />
//                 <Button sx={{ position: "absolute", left: 20, bottom: 20, background: "#832729", color: "#fff" }}>
//                   {i === 0 ? "Read More" : i === 1 ? "Schedule Now" : i === 2 ? "Connect Now" : "Visit Store"}
//                 </Button>
//               </Box>
//             ))}
//           </Box>
//         </Container>
//       </Box>

//       {/* Featured Articles */}
//       <Box sx={{ py: 8, backgroundColor: "#fff" }}>
//         <Container maxWidth="lg">
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
//             autoplay={{ delay: 4000, disableOnInteraction: false }}
//             loop={true}
//           >
//             {[1, 2, 3, 4].map((i) => (
//               <SwiperSlide key={i}>
//                 <Box>
//                   <img
//                     src={`https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/${i}.jpg`}
//                     alt={`Article ${i}`}
//                     style={{ width: "100%", height: "220px", objectFit: "cover" }}
//                   />
//                 </Box>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default WeddingPage;

// 2:
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  useScrollTrigger,
  styled,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import TrendingKeywordsMarquee from "./WeddingpageParts/TrendingKeywordsMarquee";
import WeddingOccasionSlider from "./WeddingpageParts/WeddingOccasionSlider";
import FindMyCommunity from "../common components/FindMyCommunity";
import { publicUrl } from "../common components/PublicUrl";
import axiosInstance from "../common components/AxiosInstance";
import { useLocation } from "react-router-dom";

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
  // height: { xs: 180, sm: 200 },
  minWidth: { xs: 130, sm: 150, md: 170 },
  cursor: "pointer",
  border: "1px solid rgba(139,21,56,0.08)"
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WeddingPage = () => {
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true });
  const [occasion, setOccasion] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredOccasionName, setFilteredOccasionName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const query = useQuery();
  const occasionQuery = query.get('occasion')?.toLowerCase() || '';

  useEffect(() => {
    fetchOccasions();
    fetchAllProducts();
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

      {/* Handpicked for the Bride */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
          <Typography variant="h4" component="h2" sx={titleStyle}>
            Handpicked for the {filteredOccasionName || "Bride"}
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
    </Box>
  );
};

export default WeddingPage;

