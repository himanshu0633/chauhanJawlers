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
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: "0",
    },
}));

const SlideImage = styled("img")(({ theme }) => ({
    height: "auto",
    // height: "230px",
    // width: "auto",
    width: "100%",
    maxWidth: "100%",
    display: "block",
    margin: "0 auto",
    borderRadius: "10px",
    [theme.breakpoints.down("lg")]: {
        width: "auto",
        height: "180px",
    },
}));
const SliderWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff",

    // scoped slick styles
    "& .slick-dots": {
        bottom: "5px",
        "& li": {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            // backgroundColor: "#7A7469B0",
            transition: "all 0.3s ease",
        },
        "& li.slick-active": {
            // backgroundColor: "#fff",
        },
    },
    "& .slick-prev, & .slick-next": {
        width: "70px",
        height: "70px",
        zIndex: 10,
        top: "50% !important",
        transform: "translateY(-50%) !important",
        borderRadius: "50%",
        // backgroundColor: "#7A7469B0",
        // color: "#fff",
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
    "& .slick-prev": {
        left: "20px",
        [theme.breakpoints.down("lg")]: {
            left: "10px",
        },
    },
    "& .slick-next": {
        right: "20px",
        [theme.breakpoints.down("lg")]: {
            right: "10px",
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
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,      // Full-width on small screens
                    centerPadding: "0px",   // Remove peeking effect on mobile
                }
            }
        ]
    };


    return (
        <SliderContainer>
            <SliderWrapper>
                <Slider {...settings} >
                    {banners.map((item, index) => (
                        <Slide key={index}
                            onClick={() => navigate(`/collection/${(item.variety || 'all').toLowerCase()}`)}
                        >
                            <SlideImage src={publicUrl(item.slider_image[0])} alt={`slide-${index}`} />
                        </Slide>
                    ))}
                </Slider>
            </SliderWrapper>
        </SliderContainer>
    )
}

export default HeroSection