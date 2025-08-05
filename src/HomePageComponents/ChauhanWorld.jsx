import { Box, Typography, Container, styled } from "@mui/material";

// ------ STYLES ------

const SectionContainer = styled(Box)({
    backgroundColor: "#fff",
    paddingTop: "80px",
    paddingBottom: "80px",
    "@media (max-width: 1024px)": { paddingTop: "0px", }
});

const HeaderContainer = styled(Container)({
    textAlign: "center",
    marginBottom: "60px",
});

const MainTitle = styled(Typography)({
    fontFamily: "serif",
    fontSize: "48px",
    fontWeight: 400,
    color: "#2C2C2C",
    marginBottom: "12px",
    lineHeight: "1.2",
    "@media (max-width: 960px)": { fontSize: "40px" },
    "@media (max-width: 600px)": { fontSize: "32px" },
});

const SubTitle = styled(Typography)({
    fontSize: "18px",
    fontWeight: 400,
    color: "#666",
    letterSpacing: ".3px",
    "@media (max-width: 600px)": { fontSize: "16px" }
});

const FlexCardGrid = styled(Box)({
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    // width: 1100,
    overflow: "hidden",
    margin: "0 auto",
    // minHeight: 600,
    justifyContent: "center",
    alignItems: "center",
    // "@media (max-width: 1140px)": { width: 800, minHeight: 440 },
    // "@media (max-width: 600px)": { width: 340, minHeight: 300 }
});

const CategoryCard = styled(Box)({
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    width: 480,
    height: 340,
    margin: 16,
    background: "#f6f1ed",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.22)"
    },
    "@media (max-width: 1100px)": { width: 350, height: 250, margin: 10 },
    "@media (max-width: 780px)": { width: 250, height: 250, margin: 5 },
    "@media (max-width: 700px)": { width: 200, height: 220, margin: 5 }
});

const CategoryImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
});

const CategoryOverlay = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
    padding: "40px 20px 20px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    "@media (max-width: 960px)": { padding: "22px 8px 10px" },
    "@media (max-width: 600px)": { padding: "10px" }
});

const CategoryName = styled(Typography)({
    fontSize: 32,
    fontWeight: 400,
    color: "#fff",
    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
    textAlign: "center",
    "@media (max-width: 960px)": { fontSize: 22 },
    "@media (max-width: 600px)": { fontSize: 14 }
});

const CenterDecoration = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 10,
    width: 80, height: 80,
    transform: "translate(-50%, -50%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    "@media (max-width: 600px)": { width: 54, height: 54 }
});

const SunburstIcon = styled("div")({
    width: 50,
    height: 50,
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 10,
        height: 10,
        backgroundColor: "#FFD700",
        borderRadius: "50%",
        zIndex: 2,
    },
    "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 50,
        height: 50,
        background: `url('/ylwFlower.png') center/cover no-repeat`,
        borderRadius: "50%",
        zIndex: 1,
    },
    "@media (max-width: 600px)": {
        width: 34, height: 34,
        "&::after": {
            width: 34, height: 34,
        }
    }
});

const categories = [
    {
        id: 1,
        name: "Wedding",
        image: "/worldActorImg1.png"
    },
    {
        id: 2,
        name: "Diamond",
        image: "/worldActorImg2.png"
    },
    {
        id: 3,
        name: "Gold",
        image: "/worldActorImg3.png"
    },
    {
        id: 4,
        name: "Dailywear",
        image: "/worldActorImg4.png"
    }
];

export default function ChauhanWorld() {
    return (
        <SectionContainer>
            <HeaderContainer maxWidth="xl">
                <MainTitle>Chauhan Son's World</MainTitle>
                <SubTitle>
                    Elevate Every Look with Fashion-Forward Diamond Jewellery
                </SubTitle>
            </HeaderContainer>

            <Container maxWidth="xl">
                <FlexCardGrid>
                    {/* 2x2 Category Cards */}
                    {[0, 1, 2, 3].map(i => (
                        <CategoryCard key={categories[i].id}>
                            <CategoryImage
                                src={categories[i].image}
                                alt={`${categories[i].name} Jewelry Collection`}
                                loading="lazy"
                                onError={e => {
                                    e.target.src = "/placeholder.svg?height=280&width=400&text=Image+Not+Found";
                                }}
                            />
                            <CategoryOverlay>
                                <CategoryName>{categories[i].name}</CategoryName>
                            </CategoryOverlay>
                        </CategoryCard>
                    ))}
                    {/* Center gold decoration */}
                    <CenterDecoration>
                        <SunburstIcon />
                    </CenterDecoration>
                </FlexCardGrid>
            </Container>
        </SectionContainer>
    );
}
