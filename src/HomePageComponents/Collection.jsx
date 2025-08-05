import { Box, Typography, Container, styled } from "@mui/material";
import React from "react";

const SectionContainer = styled(Box)({
    backgroundColor: "#F2EDED",
    padding: "80px 0",
    // minHeight: "700px",
});

const MainTitle = styled(Typography)({
    fontFamily: "serif",
    fontSize: "42px",
    fontWeight: 400,
    color: "#2C2C2C",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 1.2,
    "@media (max-width: 960px)": { fontSize: "36px" },
    "@media (max-width: 600px)": { fontSize: "28px" },
});

const SubTitle = styled(Typography)({
    fontSize: 18,
    fontWeight: 400,
    color: "#666",
    textAlign: "center",
    marginBottom: 60,
    letterSpacing: 0.5,
    "@media (max-width: 600px)": { fontSize: 16, marginBottom: 40 },
});

const Card = styled(Box)(({ height }) => ({
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    height,
    background: "#fff",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
    },
    "@media (max-width: 960px)": {
        height: height === "500px" ? "400px" : height === "240px" ? "200px" : height,
    },
    "@media (max-width: 600px)": {
        height: height === "500px" ? "300px" : height === "240px" ? "180px" : height,
    },
}));

const CollectionImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "transform 0.3s ease",
});

const ImageOverlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
        "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)",
    display: "flex",
    alignItems: "flex-end",
    padding: 24,
});

const CollectionText = styled(Box)({
    color: "#fff",
    textAlign: "left",
});

const CollectionName = styled(Typography)({
    fontSize: 24,
    fontWeight: 300,
    marginBottom: 4,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    "@media (max-width: 960px)": { fontSize: 20 },
    "@media (max-width: 600px)": { fontSize: 18 },
});

const CollectionScript = styled("span")({
    fontFamily: "cursive",
    fontStyle: "italic",
    fontWeight: 400,
});

const CollectionDescription = styled(Typography)({
    fontSize: 16,
    fontWeight: 300,
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    "@media (max-width: 960px)": { fontSize: 14 },
    "@media (max-width: 600px)": { fontSize: 12 },
});

// Reusable image component with fallback
const FallbackImage = ({ src, alt, fallbackSrc, ...props }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    return (
        <CollectionImage
            src={imgSrc}
            alt={alt}
            loading="lazy"
            onError={() => {
                if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
            }}
            {...props}
        />
    );
};

const collections = [
    {
        id: 1,
        image: "/collection1.png",
        name: "Shimmering",
        script: "circles",
        description: "of charm",
    },
    {
        id: 2,
        image: "/collection2.png",
        name: "Graceful",
        script: "Ear",
        description: "Glam",
    },
    {
        id: 3,
        image: "/collection3.png",
        name: "Casual",
        script: "Chic",
        description: "Chain",
    },
];

// === Main Component using Box/flex ===
function Collection() {
    return (
        <SectionContainer>
            <Container maxWidth="xl">
                <MainTitle>Chauhan Son's Collections</MainTitle>
                <SubTitle>Explore Our Newly Launched Collection</SubTitle>

                {/* Flex Row: Left Large Card, Right Two Stack Cards */}
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={3}
                    width="100%"
                >
                    {/* Left Large Card */}
                    <Box flex={1} minWidth={0} mb={{ xs: 3, md: 0 }}>
                        <Card height="500px">
                            <FallbackImage
                                src={collections[0].image}
                                alt={collections[0].name}
                                fallbackSrc="/placeholder.svg?height=500&width=400&text=Image+Not+Found"
                            />
                            <ImageOverlay>
                                <CollectionText>
                                    <CollectionName>
                                        {collections[0].name}{" "}
                                        <CollectionScript>{collections[0].script}</CollectionScript>
                                    </CollectionName>
                                    <CollectionDescription>
                                        {collections[0].description}
                                    </CollectionDescription>
                                </CollectionText>
                            </ImageOverlay>
                        </Card>
                    </Box>
                    {/* Right: Two vertically stacked cards */}
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        minWidth={0}
                    >
                        {[collections[1], collections[2]].map(
                            ({ id, name, script, description, image }) => (
                                <Card height="240px" key={id}>
                                    <FallbackImage
                                        src={image}
                                        alt={name}
                                        fallbackSrc="/placeholder.svg?height=240&width=400&text=Image+Not+Found"
                                    />
                                    <ImageOverlay>
                                        <CollectionText>
                                            <CollectionName>
                                                {name} <CollectionScript>{script}</CollectionScript>
                                            </CollectionName>
                                            <CollectionDescription>{description}</CollectionDescription>
                                        </CollectionText>
                                    </ImageOverlay>
                                </Card>
                            )
                        )}
                    </Box>
                </Box>
            </Container>
        </SectionContainer>
    );
}

export default Collection;

