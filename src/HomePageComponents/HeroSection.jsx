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
});

const Slide = styled(Box)({
    width: "100%",
    height: "auto",
    padding: "0",        // 🔥 Removed side gap
    cursor: "pointer",
});

const SlideImage = styled("img")(({ theme }) => ({
    width: "100%",
    height: "200px",
    display: "block",
    objectFit: "cover",
    borderRadius: "0px",  // 🔥 Full width edge to edge
    margin: 0,

    [theme.breakpoints.up("sm")]: {
        height: "260px",
    },
    [theme.breakpoints.up("md")]: {
        height: "330px",
    },
    [theme.breakpoints.up("lg")]: {
        height: "380px",
    },
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",

    "& .slick-dots": {
        bottom: "10px",
        "& li button:before": {
            color: "#7A7469",
            opacity: 0.5,
        },
        "& li.slick-active button:before": {
            color: "#7A7469",
            opacity: 1,
        },
    },

    "& .slick-prev, & .slick-next": {
        zIndex: 20,
        width: "45px",
        height: "45px",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        "&:before": { fontSize: "22px" },
        [theme.breakpoints.down("md")]: {
            display: "none",  // 🔥 Mobile me arrows hide
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
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,  // Mobile arrows removed
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
                                loading="lazy"
                            />
                        </Slide>
                    ))}
                </Slider>
            </SliderWrapper>
        </SliderContainer>
    )
}

export default HeroSection
