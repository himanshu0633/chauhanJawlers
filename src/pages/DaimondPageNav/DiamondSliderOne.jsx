import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Corrected import: 'Loop' has been removed.
import { Navigation, Autoplay } from 'swiper/modules';
import {
    Box,
    Typography,
    styled,
    useTheme,
    useMediaQuery,
    IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Main component wrapper with a dark theme
const StyledSection = styled(Box)(({ theme }) => ({
    backgroundColor: '#081029', // A deep, dark blue background
    padding: theme.spacing(6, 0),
    overflow: 'hidden',
    position: 'relative',
}));

// Container for the title and desktop navigation arrows
const HeadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    padding: theme.spacing(0, 6), // Horizontal padding for the container
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        textAlign: 'center',
        padding: theme.spacing(0, 2),
        marginBottom: theme.spacing(4),
    },
}));

// "A companion for every occasion"
const SubtitleText = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem',
    fontWeight: 300,
    color: '#B0C4DE', // Light steel blue for subtitle
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
}));

// "Chauhan Jewellers World of Diamonds"
const TitleText = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: '2.2rem',
    color: '#FFFFFF',
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
        fontSize: '1.75rem',
    },
}));

// Styles for the circular slide images
const SlideImage = styled('img')(({ theme }) => ({
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto',
    display: 'block',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    [theme.breakpoints.down('md')]: {
        width: '220px',
        height: '220px',
    },
}));

// Slide category title (e.g., "HIGH JEWELLERY")
const SlideTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: '#FFFFFF',
    fontSize: '1.1rem',
    marginTop: theme.spacing(3),
    textAlign: 'center',
}));

// Slide description text
const SlideDescription = styled(Typography)({
    fontSize: '0.8rem',
    fontWeight: 300,
    color: '#B0C4DE',
    marginTop: '0.5rem',
    textAlign: 'center',
    maxWidth: '250px',
    margin: '0.5rem auto 0 auto',
    lineHeight: 1.4,
});

// Custom navigation buttons for the slider
const NavButton = styled(IconButton)({
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&.swiper-button-disabled': {
        opacity: 0.2,
        cursor: 'not-allowed',
    },
});

const DiamondSliderOne = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const slides = [
        {
            id: 1,
            img: "https://staticimg.tanishq.co.in/microsite/diamond/images/worldofDiamond/high-value-d1.jpg",
            title: "HIGH JEWELLERY",
            description: "The epitome of luxury and refinement",
        },
        {
            id: 2,
            img: "https://staticimg.tanishq.co.in/microsite/diamond/images/worldofDiamond/unbound-d.png",
            title: "ELEGANCE",
            description: "Shine bright like a diamond for your special day"
        },
        {
            id: 3,
            img: "https://staticimg.tanishq.co.in/microsite/diamond/images/worldofDiamond/solitaires-d.png",
            title: "SOLITAIRES",
            description: "A captivating statement of elegance and sophistication"
        },
        {
            id: 4,
            img: "https://staticimg.tanishq.co.in/microsite/diamond/images/worldofDiamond/everyday-diamonds1-d.png",
            title: "EVERYDAY DIAMONDS",
            description: "Styling Diamond Jewellery for effortless Glamour"
        },
    ];

    return (
        <StyledSection>
            <HeadingContainer>
                <Box>
                    <SubtitleText>
                        A companion for every occasion
                    </SubtitleText>
                    <TitleText>
                        Chauhan Jewellers World of Diamonds
                    </TitleText>
                </Box>
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <NavButton className="diamond-swiper-prev">
                            <ArrowBackIosNewIcon fontSize="small" />
                        </NavButton>
                        <NavButton className="diamond-swiper-next">
                            <ArrowForwardIosIcon fontSize="small" />
                        </NavButton>
                    </Box>
                )}
            </HeadingContainer>

            <Swiper
                // You only need to register Autoplay and Navigation here
                modules={[Navigation, Autoplay]}
                loop={true} // The 'loop' prop enables the infinite loop
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={isMobile ? 1.3 : 3}
                centeredSlides={isMobile}
                navigation={{
                    prevEl: '.diamond-swiper-prev',
                    nextEl: '.diamond-swiper-next',
                }}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                            <SlideImage
                                src={slide.img}
                                alt={slide.title}
                            />
                            <SlideTitle>
                                {slide.title}
                            </SlideTitle>
                            <SlideDescription>
                                {slide.description}
                            </SlideDescription>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledSection>
    );
};

export default DiamondSliderOne;