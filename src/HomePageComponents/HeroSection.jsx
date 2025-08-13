import Slider from "react-slick"
import { Box, GlobalStyles, styled } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SliderContainer = styled(Box)({
    position: "relative",
    width: "100%",
    // height: "600px",
    overflow: "hidden",
    backgroundColor: "#000",
})

const Slide = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 600,
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.up("xl")]: {
        height: 1000,
    },
    [theme.breakpoints.down("lg")]: {
        height: 400,
    },
    [theme.breakpoints.down("sm")]: {
        height: 250,
    },
}))

const SlideImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
})

const SlickArrowStyles = () => {
    const theme = useTheme()
    return (
        <GlobalStyles
            styles={{
                ".slick-prev, .slick-next": {
                    width: "70px",
                    height: "70px",
                    zIndex: 10,
                    top: "50% !important",
                    transform: "translateY(-50%) !important",
                    borderRadius: "50%",
                    backgroundColor: "#7A7469B0",
                    color: "#fff",
                    transition: "all 0.3s ease",
                    [theme.breakpoints.down("lg")]: {
                        width: "40px",
                        height: "40px",
                        "&::before": {
                            fontSize: "20px !important",
                            lineHeight: "40px",
                        },
                    },
                    "&::before": {
                        fontSize: "32px",
                        lineHeight: "40px",
                    },
                },
                ".slick-prev": {
                    left: "20px",
                    [theme.breakpoints.down("lg")]: {
                        left: "10px",
                    },
                },
                ".slick-next": {
                    right: "20px",
                    [theme.breakpoints.down("lg")]: {
                        right: "10px",
                    },
                },
            }}
        />
    )
}

const SlickDots = () => {
    const theme = useTheme()
    return (
        <GlobalStyles
            styles={{
                ".slick-dots": {
                    bottom: "5px",
                    "& li": {
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#7A7469B0",
                        transition: "all 0.3s ease",
                    },
                    "& li.slick-active": {
                        backgroundColor: "#fff",
                    },
                },
            }}
        />
    )
}

const slideImages = ["/hero_img.png", "/hero_img.png"]

function HeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
    }

    return (
        <SliderContainer>
            <SlickArrowStyles />
            <Slider {...settings}>
                {slideImages.map((item, index) => (
                    <Slide key={index}>
                        <SlideImage src={item} alt={`slide-${index}`} />
                    </Slide>
                ))}
            </Slider>
            <SlickDots/>
        </SliderContainer>
    )
}

export default HeroSection

