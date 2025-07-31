"use client"

import { Box, Typography, Container, Button, styled } from "@mui/material"
import { PlayArrow, ArrowForward } from "@mui/icons-material"
import { useState, useRef } from "react"

const SectionContainer = styled(Box)({
    backgroundColor: "#fff",
    paddingTop: "80px",
    paddingBottom: "80px",
})

const HeaderContainer = styled(Container)({
    textAlign: "center",
    marginBottom: "40px",
})

const MainTitle = styled(Typography)({
    fontFamily: "serif",
    fontSize: "48px",
    fontWeight: "400",
    color: "#2C2C2C",
    marginBottom: "8px",
    lineHeight: "1.2",
    "@media (max-width: 960px)": {
        fontSize: "40px",
    },
    "@media (max-width: 600px)": {
        fontSize: "32px",
    },
})

const SubTitle = styled(Typography)({
    fontSize: "16px",
    fontWeight: "400",
    color: "#666",
    letterSpacing: "0.3px",
    "@media (max-width: 600px)": {
        fontSize: "14px",
    },
})

const VideoContainer = styled(Box)({
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    cursor: "pointer",
    "@media (max-width: 960px)": {
        maxWidth: "700px",
    },
    "@media (max-width: 600px)": {
        maxWidth: "100%",
        margin: "0 20px",
    },
})

const VideoElement = styled("video")({
    width: "100%",
    height: "500px",
    objectFit: "cover",
    objectPosition: "center",
    "@media (max-width: 960px)": {
        height: "400px",
    },
    "@media (max-width: 600px)": {
        height: "300px",
    },
})

const VideoOverlay = styled(Box)(({ isPlaying }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isPlaying ? "transparent" : "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    opacity: isPlaying ? 0 : 1,
    pointerEvents: isPlaying ? "none" : "auto",
}))

const PlayButton = styled(Box)({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "#fff",
        transform: "scale(1.1)",
    },
    "@media (max-width: 600px)": {
        width: "60px",
        height: "60px",
    },
})

const BrandLogo = styled(Box)({
    position: "absolute",
    top: "30px",
    left: "30px",
    zIndex: 5,
    "@media (max-width: 600px)": {
        top: "20px",
        left: "20px",
    },
})

const LogoContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "8px 12px",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
})

const CrownIcon = styled("div")({
    width: "24px",
    height: "24px",
    background: "linear-gradient(45deg, #FFD700, #FFA500)",
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "-3px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "0",
        height: "0",
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderBottom: "6px solid #FFD700",
    },
    "&::after": {
        content: '""',
        position: "absolute",
        top: "6px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "3px",
        height: "3px",
        backgroundColor: "#8B4513",
        borderRadius: "50%",
    },
})

const LogoText = styled(Typography)({
    fontSize: "12px",
    fontWeight: "600",
    color: "#2C2C2C",
    lineHeight: "1.2",
})

const BottomSection = styled(Box)({
    textAlign: "center",
    marginTop: "40px",
})

const ExploreButton = styled(Button)({
    backgroundColor: "#fff",
    color: "#2C2C2C",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "none",
    borderRadius: "25px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    "&:hover": {
        backgroundColor: "#f5f5f5",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
    "@media (max-width: 600px)": {
        padding: "10px 20px",
        fontSize: "14px",
    },
})

const DescriptionText = styled(Typography)({
    fontSize: "18px",
    fontWeight: "300",
    color: "#666",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
    "@media (max-width: 600px)": {
        fontSize: "16px",
        padding: "0 20px",
    },
})

export default function ExchangeOffer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
                setIsPlaying(false)
            } else {
                videoRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    const handleVideoEnded = () => {
        setIsPlaying(false)
    }

    const handleVideoPause = () => {
        setIsPlaying(false)
    }

    return (
        <SectionContainer>
            <HeaderContainer maxWidth="xl">
                <MainTitle>Exchange Program</MainTitle>
                <SubTitle>Trusted by 7,00+ families</SubTitle>
            </HeaderContainer>

            <Container maxWidth="xl">
                <VideoContainer onClick={handlePlayClick}>
                    <VideoElement
                        ref={videoRef}
                        onEnded={handleVideoEnded}
                        onPause={handleVideoPause}
                        poster="/placeholder.svg?height=500&width=900&text=Luxury+Bridal+Jewelry+Video+Poster"
                    >
                        <source src="/placeholder.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </VideoElement>

                    <BrandLogo>
                        <LogoContainer>
                            <img src="/logo.svg" alt="img" />
                        </LogoContainer>
                    </BrandLogo>

                    <VideoOverlay isPlaying={isPlaying}>
                        <PlayButton>
                            <PlayArrow sx={{ fontSize: "32px", color: "#2C2C2C", marginLeft: "4px" }} />
                        </PlayButton>
                    </VideoOverlay>
                </VideoContainer>

                <BottomSection>
                    <ExploreButton
                        variant="contained"
                        endIcon={<ArrowForward sx={{ fontSize: "18px" }} />}
                        onClick={() => console.log("Explore Now clicked")}
                    >
                        Explore Now
                    </ExploreButton>

                    <DescriptionText>
                        Join us in celebrating your treasured moments with jewellery designed to last a lifetime.
                    </DescriptionText>
                </BottomSection>
            </Container>
        </SectionContainer>
    )
}
