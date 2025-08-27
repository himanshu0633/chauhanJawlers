import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  useTheme,
  styled,
  Button,
} from "@mui/material";
import axiosInstance from "../common components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { publicUrl } from "../common components/PublicUrl";
import CustomLoader from "../common components/CustomLoader";

// ===== Slider Component & styles (your existing code) =====

const categoryData = [
  {
    key: "women",
    image: "/exclusive1.png",
    label: "Women Jewellery",
  },
  {
    key: "men",
    image: "/exclusive2.png",
    label: "Men Jewellery",
  },
  {
    key: "kids",
    image: "/exclusive3.png",
    label: "Kids Jewellery",
  },
];

const RootBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  padding: "64px 0 32px 0",
  [theme.breakpoints.down("sm")]: {
    padding: "32px 0 12px 0",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontWeight: 600,
  fontSize: 32,
  color: "#18191F",
  textAlign: "center",
  marginBottom: 4,
  [theme.breakpoints.down("sm")]: {
    fontSize: 22,
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 15,
  color: "#555",
  textAlign: "center",
  marginBottom: 28,
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
    marginBottom: 16,
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 18,
  overflow: "hidden",
  position: "relative",
  width: 230,
  height: 335,
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: 172,
    height: 245,
  },
  [theme.breakpoints.down("sm")]: {
    width: 128,
    height: 188,
    borderRadius: 12,
  },
  background: "#F9F9F9",
}));

const CategoryImg = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  transition: ".23s transform",
}));

const CategoryLabel = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  padding: "16px 0 12px 0",
  fontSize: 19,
  fontWeight: 500,
  color: "#191919",
  background: "rgba(255,255,255,0.79)",
  textAlign: "center",
  letterSpacing: "0.08em",
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
  [theme.breakpoints.down("md")]: {
    fontSize: 15,
    padding: "10px 0 7px 0",
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    padding: "7px 0 3px 0",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}));

const getSliderSettings = (theme) => ({
  dots: false,
  infinite: true,
  speed: 450,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2200,
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: theme.breakpoints.values.md, // 900px
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 500,
      settings: { slidesToShow: 2 },
    },
  ],
});

// ===== Promo Duo Cards Component and styles =====

const PromoRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "#faf6f6",
  padding: "56px 0",
  display: "flex",
  justifyContent: "center",
  "@media (max-width:900px)": {
    padding: "32px 0",
  },
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "28px",
  maxWidth: 800,
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "18px",
    maxWidth: 400,
  },
}));

const PromoBlock = styled(Box)(({ theme, variant }) => ({
  flex: "1 1 0",
  minWidth: 0,
  background: variant === "right" ? "#a66554" : "#faf6f6",
  borderRadius: "17px",
  minHeight: 280,
  position: "relative",
  boxShadow:
    variant === "right"
      ? "0 0 0 2px #dfb396 inset"
      : "0 0 0 2px #efdcce inset",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: variant === "right" ? "34px 28px" : "34px 32px",
  [theme.breakpoints.down("sm")]: {
    padding: variant === "right" ? "22px 18px" : "22px 14px",
  },
}));

const VerticalBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 38,
  top: 0,
  bottom: 0,
  width: 8,
  background: "#f5b14f",
  borderRadius: 8,
  [theme.breakpoints.down("sm")]: {
    width: 6,
    // left: 21,
  },
}));

const HorizontalBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  height: 8,
  bottom: 95,
  background: "#f5b14f",
  borderRadius: 8,
  [theme.breakpoints.down("sm")]: {
    height: 6,
    bottom: 62,
  },
}));

const LeftContent = styled(Box)({
  marginLeft: 50, // to accommodate Starburst/vertical stripe
  position: "relative",
});

const MainText = styled(Typography)(({ theme, color }) => ({
  fontFamily: "Georgia, serif",
  color: color || "#4e3143",
  fontWeight: 500,
  fontSize: 28,
  marginBottom: 9,
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
    marginBottom: 7,
  },
}));

const SubText = styled(Typography)(({ theme, color }) => ({
  color: color || "#897f88",
  fontWeight: 400,
  fontSize: 16,
  marginBottom: 33,
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
    marginBottom: 18,
  },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  background: "#f5b14f",
  color: "#fff",
  fontWeight: 600,
  fontSize: 17,
  padding: "13px 31px",
  borderRadius: 7,
  boxShadow: "none",
  textTransform: "none",
  fontFamily: "inherit",
  alignSelf: "flex-start",
  "&:hover": {
    background: "#ea9e3a",
  },
  [theme.breakpoints.down("lg")]: {
    padding: "8px 18px",
    fontSize: 15,
    borderRadius: 5,
  },
}));

const RightHeader = styled(Box)({
  marginBottom: 9,
  display: "flex",
  alignItems: "center",
  gap: 9,
});

const RightTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Georgia, serif",
  fontWeight: 500,
  fontSize: 35,
  color: "#fff",
  [theme.breakpoints.down("lg")]: {
    fontSize: 23,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
}));

const RightText = styled(Typography)(({ theme }) => ({
  color: "#f7e3cb",
  fontWeight: 400,
  fontSize: 15,
  lineHeight: 1.5,
  margin: "9px 0 24px 0",
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    margin: "0px 0 8px 0",
  },
}));

// ===== Combined Component =====

export default function Exclusive() {
  const theme = useTheme();
  const sliderSettings = getSliderSettings(theme);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/allproducts`);
      setProducts(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching occasion:", error);
    } finally {
      setLoading(false)
    }
  };


  return (
    <>
      <RootBox>
        <Title component="h2">Exclusively For You</Title>
        <SubTitle>Browse for Him or Her</SubTitle>
        <Box sx={{ maxWidth: 1080, margin: "0 auto", px: { xs: 1.5, sm: 3 } }}>
          {loading ? <CustomLoader /> : (
            <>
              <Slider {...sliderSettings}>
                {products.map((item) => (
                  <Box key={item._id} sx={{ px: 1.3 }}>
                    <CategoryCard onClick={() => navigate(`/allJewellery`)}>
                      <CategoryImg
                        component="img"
                        src={publicUrl(item.media[0].url)}
                        alt={item.label}
                        onError={(e) => {
                          e.target.src = "/placeholder-category.png";
                        }}
                      />
                      <CategoryLabel>{item.name}</CategoryLabel>
                    </CategoryCard>
                  </Box>
                ))}
              </Slider>
            </>
          )}
        </Box>
      </RootBox>

      {/* Promo Duo Cards Section */}
      <PromoRoot>
        <FlexBox>
          <PromoBlock>
            <VerticalBar />
            <HorizontalBar />
            <img className="giftImgPos" src="/ylwFlower.png" alt="img" />
            <LeftContent>
              <MainText>Gift Your Way</MainText>
              <SubText>STARTING AT ₹5,000</SubText>
              <StyledButton>Explore Now</StyledButton>
            </LeftContent>
          </PromoBlock>

          <PromoBlock variant="right">
            <div><img className="digiGoldLogoSize" src="/logo.svg" alt="img" /></div>
            <RightHeader>
              <RightTitle>
                Exchange your Old
                Gold for 100% Value!
              </RightTitle>
            </RightHeader>
            <RightText>
              Unlock full value for your old gold
              <br />
              today with our Exchange Program!
            </RightText>
            <StyledButton variant="right">Know More</StyledButton>
          </PromoBlock>
        </FlexBox>
      </PromoRoot>
    </>
  );
}
