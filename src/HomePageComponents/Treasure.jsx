import { Box, Typography, Button, Grid, Container, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../commonComponents/AxiosInstance"
import { publicUrl } from "../commonComponents/PublicUrl"

const SectionContainer = styled(Box)({
    position: "relative",
    backgroundImage: "url('/treasureBg.png')",
    backgroundSize: "inherit",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
})

const ContentOverlay = styled(Container)({
    position: "relative",
    zIndex: 2,
    paddingTop: "80px",
    paddingBottom: "120px",
    color: "#fff",
    height: "100%",
    display: "flex",
    alignItems: "center",
})

const TextContent = styled(Box)({
    maxWidth: "500px",
    "@media (max-width: 960px)": {
        maxWidth: "100%",
        textAlign: "center",
    },
})

const MainTitle = styled(Typography)({
    fontFamily: "serif",
    fontSize: "48px",
    fontWeight: "400",
    marginBottom: "20px",
    lineHeight: "1.2",
    "@media (max-width: 960px)": {
        fontSize: "40px",
    },
    "@media (max-width: 600px)": {
        fontSize: "32px",
    },
})

const Description = styled(Typography)({
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "1.6",
    marginBottom: "30px",
    opacity: 0.95,
    "@media (max-width: 600px)": {
        fontSize: "14px",
    },
})

const CTAButton = styled(Button)({
    backgroundColor: "#8B4513",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "14px",
    fontWeight: "500",
    textTransform: "none",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    "&:hover": {
        backgroundColor: "#7A3A0F",
        boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
    },
    "@media (max-width: 600px)": {
        padding: "10px 24px",
        fontSize: "13px",
    },
})

const CategorySection = styled(Box)({
    position: "relative",
    zIndex: 3,
    marginTop: "-60px",
    paddingBottom: "60px",
})

const CategoryCard = styled(Box)({
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    width: "160px",
    height: "200px",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
    },
    "@media (max-width: 600px)": {
        height: "160px",
        width: "110px",
    },
})

const CategoryImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",     // PERFECT CLEAN FIT
  objectPosition: "center top", // top se image seedhi dikhni chahiye
});
const CategoryOverlay = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: "20px",
  background:
    "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
  display: "flex",
  alignItems: "flex-end",
});

const CategoryName = styled(Typography)({
    fontSize: { xs: "12px", md: "18px" },
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
})


function Treasure() {
    const [subcategoryName, setSubCategoryName] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubCategories();
    }, [])
    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get(`/user/allSubcategories`);
            setSubCategoryName(response?.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    return (
        <Box>
            <SectionContainer>
                <ContentOverlay maxWidth="lg">
                    <TextContent>
                        <MainTitle>Latest Treasures</MainTitle>
                        <Description>
                            From Monday to Friday, discover a daily dose of elegance with our newest arrivals—each piece thoughtfully
                            designed to elevate your everyday style.
                        </Description>
                        <CTAButton variant="contained" onClick={() => { navigate("/allJewellery") }}>500+ New Items</CTAButton>
                    </TextContent>
                </ContentOverlay>
            </SectionContainer>
<CategorySection>
  <Container maxWidth="xl">
    <Box display="flex" gap={2} justifyContent="center">
      {subcategoryName.slice(1, 4).map((item) => (
        <Grid item xs={4} key={item._id}>
          <CategoryCard
            onClick={() =>
              navigate(`/allJewellery?subcategory=${item._id}`)
            }
          >
            <CategoryImage
              src={publicUrl(item.image)}
              alt={item.name}
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "/placeholder.svg?height=200&width=300&text=Image+Not+Found";
              }}
            />
            <CategoryOverlay>
              <CategoryName>{item.name}</CategoryName>
            </CategoryOverlay>
          </CategoryCard>
        </Grid>
      ))}
    </Box>
  </Container>
</CategorySection>


        </Box>
    )
}
export default Treasure;