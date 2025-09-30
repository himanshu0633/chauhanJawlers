import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import axiosInstance from '../common components/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Theme from '../../Theme';

export default function CollectionPage() {
  const { variety } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBanner, setFilteredBanner] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchAllProducts();
    fetchBanners();
  }, [])

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


  useEffect(() => {
    if (variety && products.length && banners.length) {
      // Find the correct banner
      const bannerForVariety = banners.find(b => b.variety?.toLowerCase() === variety.toLowerCase());
      setFilteredBanner(bannerForVariety);

      // Filter products for this variety
      const productsForVariety = products.filter(p => p.productvariety?.toLowerCase() === variety.toLowerCase());
      setFilteredProducts(productsForVariety);
    }
  }, [variety, products, banners]);


  return (
    <Box sx={{ backgroundColor: '#fff' }}>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
      >
        {banners.length > 0 && (
          <>
            {banners.map((item) => (
              <SwiperSlide key={item._id} style={{ width: "100% !important" }}>
                <Box>
                  <img
                    src={publicUrl(item.slider_image)}
                    alt={item.type}
                    style={{
                      height: "auto",
                      // width: "auto",
                      width: "100%",
                      // height: "350px",
                      maxWidth: "100%",
                      display: "block",
                      backgroundColor: "#fae6e1",
                    }}
                    onClick={() => navigate(`/allJewellery/${(item.variety || 'all').toLowerCase()}`)}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </>
        )}

      </Swiper>

      {/* Products Section */}
      <Box sx={{ backgroundColor: '#fff', py: '20px' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, lg: 3 },
            }}
          >
            {(variety ? filteredProducts : products).map((item) =>
            (<Card
              key={item._id}
              onClick={() => navigate(`/allJewellery?variety=${item.productvariety.toLowerCase()}`)}
              sx={{
                borderRadius: 0,
                boxShadow: 'none',
                border: '1px solid #eee',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                flexBasis: {
                  // xs: '45%',
                  xs: '30%',
                  sm: '23%',
                },
                maxWidth: {
                  // xs: '45%',
                  xs: '30%',
                  sm: '23%',
                },
                // minWidth: 0,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: { xs: 100, md: 120, lg: 200 },
                  width: '100%'
                }}
              >
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={publicUrl(item.media[0].url)} alt={item.name} />
              </Box>

              <CardContent
                sx={{
                  textAlign: 'center',
                  padding: { xs: '10px 4px' },
                  borderTop: '1px solid #eee',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 500,
                    // color: '#2C2C2C',
                    color: Theme.palette.primary.contrastText,
                    marginBottom: 1,
                    textAlign: 'center',
                  }}
                >
                  {item.productvariety}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 500,
                    color: '#2C2C2C',
                    marginBottom: 1,
                    lineHeight: 1.1,
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
            )
            )}
          </Box>
        </Container>
      </Box >
    </Box >
  );
}
