import Slider from "react-slick"
import { Box, styled } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../commonComponents/AxiosInstance"
import { useEffect, useState } from "react"
import { publicUrl } from "../commonComponents/PublicUrl"

const SliderContainer = styled(Box)({
    width: "100%",
    overflow: "hidden",
})

const Slide = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "auto",
    padding: "0 10px",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
        padding: "0 5px",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "0",
    },
}));

const SlideImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    display: "block",
    margin: "0 auto",
    borderRadius: "10px",
    objectFit: "fill",
    
    // Large screens
    [theme.breakpoints.up("xl")]: {
        height: "500px",
    },
    [theme.breakpoints.between("lg", "xl")]: {
        height: "400px",
    },
    [theme.breakpoints.between("md", "lg")]: {
        height: "350px",
    },
    [theme.breakpoints.between("sm", "md")]: {
        height: "300px",
    },
    [theme.breakpoints.down("sm")]: {
        height: "150px",
        borderRadius: "8px",
    },
    [theme.breakpoints.down("xs")]: {
        height: "200px",
        borderRadius: "6px",
    },
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",

    // scoped slick styles
    "& .slick-dots": {
        bottom: "10px",
        "& li": {
            width: "12px",
            height: "12px",
            margin: "0 4px",
            borderRadius: "50%",
            backgroundColor: "rgba(122, 116, 105, 0.7)",
            transition: "all 0.3s ease",
            "& button": {
                width: "12px",
                height: "12px",
                padding: "0",
                "&:before": {
                    fontSize: "8px",
                    color: "transparent",
                    opacity: 1,
                    width: "12px",
                    height: "12px",
                    lineHeight: "12px",
                }
            },
            "&.slick-active": {
                backgroundColor: "#fff",
                transform: "scale(1.2)",
            },
        },
        [theme.breakpoints.down("sm")]: {
            bottom: "5px",
            "& li": {
                width: "10px",
                height: "10px",
                margin: "0 3px",
                "& button": {
                    width: "10px",
                    height: "10px",
                    "&:before": {
                        fontSize: "6px",
                        width: "10px",
                        height: "10px",
                        lineHeight: "10px",
                    }
                },
            },
        },
    },
    
    "& .slick-prev, & .slick-next": {
        width: "50px",
        height: "50px",
        zIndex: 10,
        top: "50% !important",
        transform: "translateY(-50%) !important",
        borderRadius: "50%",
        backgroundColor: "rgba(122, 116, 105, 0.7)",
        color: "#fff",
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: "rgba(122, 116, 105, 0.9)",
        },
        
        [theme.breakpoints.down("lg")]: {
            width: "40px",
            height: "40px",
        },
        [theme.breakpoints.down("md")]: {
            width: "35px",
            height: "35px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "30px",
            height: "30px",
            display: "none !important", // Hide arrows on mobile for cleaner look
        },
        
        "&::before": {
            fontSize: "20px",
            lineHeight: "1",
            opacity: 1,
            color: "#fff",
        },
    },
    
    "& .slick-prev": {
        left: "15px",
        [theme.breakpoints.down("lg")]: {
            left: "10px",
        },
        [theme.breakpoints.down("md")]: {
            left: "5px",
        },
    },
    
    "& .slick-next": {
        right: "15px",
        [theme.breakpoints.down("lg")]: {
            right: "10px",
        },
        [theme.breakpoints.down("md")]: {
            right: "5px",
        },
    },
}));

function HeroSection() {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/user/allBanners");
            const bannerData = response.data;

            const mainBanners = bannerData.filter(
                (banner) =>
                    banner.type === "HomePageSlider" &&
                    Array.isArray(banner.slider_image) &&
                    banner.slider_image.length > 0
            );

            setBanners(mainBanners);

        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        centerMode: true,
        centerPadding: "100px",
        arrows: true,
        responsive: [
            {
                breakpoint: 1440, // xl
                settings: {
                    centerPadding: "80px",
                }
            },
            {
                breakpoint: 1200, // lg
                settings: {
                    centerPadding: "60px",
                }
            },
            {
                breakpoint: 900, // md
                settings: {
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 768, // sm
                settings: {
                    centerMode: false,
                    centerPadding: "0px",
                    arrows: false, // Hide arrows on mobile
                }
            },
            {
                breakpoint: 480, // xs
                settings: {
                    centerMode: false,
                    centerPadding: "0px",
                    arrows: false,
                    dots: true,
                }
            }
        ]
    };

    return (
        <SliderContainer>
            <SliderWrapper>
                <Slider {...settings}>
                    {banners.map((item, index) => (
                        <Slide 
                            key={index}
                            onClick={() => navigate(`/collection/${(item.variety || 'all').toLowerCase()}`)}
                        >
                            <SlideImage 
                                src={publicUrl(item.slider_image[0])} 
                                alt={`slide-${index}`}
                                loading="lazy" // Add lazy loading for better performance
                            />
                        </Slide>
                    ))}
                </Slider>
            </SliderWrapper>
        </SliderContainer>
    )
}

export default HeroSection