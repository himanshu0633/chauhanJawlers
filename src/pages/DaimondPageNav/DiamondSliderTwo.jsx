import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, EffectCoverflow } from 'swiper/modules';
import {
  Box,
  Typography,
  Link,
  styled,
  useMediaQuery,
  Container,
  IconButton,
  useTheme
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import axiosInstance from '../../commonComponents/AxiosInstance';
import { publicUrl } from '../../commonComponents/PublicUrl';
import { useNavigate } from 'react-router-dom';

const DiamondSliderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '1.5rem 0', // reduced padding
  color: '#2c3e50',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'auto'
}));

const SlideImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  },
}));

const DiamondSliderTwo = () => {
  const [subcategoryName, setSubCategoryName] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const scrollbarRef = useRef(null);
  const mainSwiperRef = useRef(null);
  const subSwiperRef = useRef(null);

  const [categoryName, setCategoryName] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchSubCategory();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/user/allcategories`);
      setCategoryName(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await axiosInstance.get(`/user/allSubcategories`);
      setSubCategoryName(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };


  // Filter subcategories whose category's variety is 'diamond'
  const filteredSubcategories = subcategoryName.filter(
    (subcat) => subcat.category_id?.variety?.toLowerCase() === 'diamond'
  );


  const [, setActiveSlide] = useState(0);

  const subSlides = [
    {
      id: 1,
      title: "Finger Rings",
      items: [
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/eng-ring-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/eng-ring-m.png",
          title: "Engagement Rings",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-form-him-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-form-him-m.png",
          title: "Rings For Him",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/platinum-rings-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/platinum-rings-m.png",
          title: "Platinum Rings",
          link: "#"
        }
      ]
    },
    {
      id: 2,
      title: "Earrings",
      items: [
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/drops-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/drops-m.png",
          title: "Drops & Danglers",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/studs-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/studs-m.png",
          title: "Studs & Tops",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/hoops-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/hoops-m.png",
          title: "Hoops & Huggies",
          link: "#"
        }
      ]
    },
    {
      id: 3,
      title: "Neckwear",
      items: [
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/pendant-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/pendant-d.png",
          title: "Pendants",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/mangalsutra-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/mangalsutra-d.png",
          title: "Mangalsutras",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/necklace-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/necklace-d.png",
          title: "Necklaces",
          link: "#"
        }
      ]
    },
    {
      id: 4,
      title: "Bangles & Bracelets",
      items: [
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bangle-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bangle-m.png",
          title: "Bangles",
          link: "#"
        },
        {
          desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bracelet-d.png",
          mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bracelet-m.png",
          title: "Bracelets",
          link: "#"
        }
      ]
    }
  ];

  return (
    <DiamondSliderContainer>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#000',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: { xs: '0.55rem', md: '0.7rem' },
              mb: '0.5rem'
            }}
          >
            FIND YOUR PERFECT PIECE
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              textAlign: 'center',
              fontSize: { xs: '1.1rem', md: '1.6rem' },
              color: '#000',
              fontFamily: '"Abhaya Libre", serif'
            }}
          >
            Discover brilliant design across categories
          </Typography>
        </Box>

        {/* Main Slider */}
        <Box sx={{ position: 'relative', py: '0.8rem' }}>
          <Swiper
            ref={mainSwiperRef}
            modules={[Navigation, EffectCoverflow, Scrollbar]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={isMobile ? 8 : 30}
            initialSlide={2}
            coverflowEffect={{
              rotate: isMobile ? 15 : 30,
              stretch: 0,
              depth: isMobile ? 120 : 300,
              modifier: 1.6,
              slideShadows: true,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            scrollbar={{
              el: scrollbarRef.current,
              hide: false,
              draggable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 8 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 }
            }}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.realIndex);
              if (subSwiperRef.current) {
                subSwiperRef.current.slideTo(swiper.realIndex);
              }
            }}
            onInit={(swiper) => {
              mainSwiperRef.current = swiper;
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.params.scrollbar.el = scrollbarRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              swiper.scrollbar.init();
              swiper.scrollbar.updateSize();
              setActiveSlide(2);
            }}
            style={{ width: '100%' }}
          >
            {filteredSubcategories.map((slide) => (
              <SwiperSlide key={slide._id}>
                <Box
                  sx={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    maxWidth: { xs: '220px', md: '400px' },
                    margin: '0 auto',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 18px 35px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <SlideImage
                    src={isMobile ? publicUrl(slide.image) : publicUrl(slide.image)}
                    alt={slide.name}
                    sx={{
                      borderRadius: 0,
                      width: '100%',
                      height: 'auto',
                      maxHeight: { xs: '150px', md: '270px' },
                      objectFit: 'cover'
                    }}
                    onClick={() => navigate(`/allJewellery/${slide.category_id.variety?.toLowerCase() || 'all'}`)}
                  />

                </Box>
                <Typography sx={{ textAlign: 'center', mt: '0.5rem', fontSize: '24px', fontWeight: 600 }}>{slide.name}</Typography>
              </SwiperSlide>
            ))}
          </Swiper>

          {!isMobile && (
            <>
              <IconButton ref={navigationPrevRef} sx={navButtonStyle('left')}><ChevronLeft /></IconButton>
              <IconButton ref={navigationNextRef} sx={navButtonStyle('right')}><ChevronRight /></IconButton>
            </>
          )}

          <Box
            ref={scrollbarRef}
            sx={{
              height: '3px',
              mt: 1.5,
              mx: 'auto',
              width: isMobile ? '60%' : '40%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '2px',
              '& .swiper-scrollbar-drag': {
                backgroundColor: '#555',
                borderRadius: '2px'
              }
            }}
          />
        </Box>
      </Container>
    </DiamondSliderContainer>
  );
};

const navButtonStyle = (side) => ({
  position: 'absolute',
  [side]: 20,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: 'rgba(255,255,255,0.85)',
  color: 'black',
  width: 38,
  height: 38,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
    transform: 'translateY(-50%) scale(1.05)',
  },
  transition: 'all 0.3s ease'
});

export default DiamondSliderTwo;


// import React, { useEffect, useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Scrollbar, EffectCoverflow } from 'swiper/modules';
// import {
//   Box,
//   Typography,
//   Link,
//   styled,
//   useMediaQuery,
//   Container,
//   IconButton,
//   useTheme
// } from '@mui/material';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/scrollbar';
// import 'swiper/css/effect-coverflow';
// import axiosInstance from '../../commonComponents/AxiosInstance';

// const DiamondSliderContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: '#ffffff',
//   padding: '1.5rem 0', // reduced padding
//   color: '#2c3e50',
//   position: 'relative',
//   overflow: 'hidden',
//   minHeight: 'auto'
// }));

// const SlideImage = styled('img')(({ theme }) => ({
//   width: '100%',
//   height: 'auto',
//   borderRadius: theme.shape.borderRadius,
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'scale(1.05)'
//   },
// }));

// const DiamondSliderTwo = () => {
//   const [subcategoryName, setSubCategoryName] = useState([]);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigationPrevRef = useRef(null);
//   const navigationNextRef = useRef(null);
//   const scrollbarRef = useRef(null);
//   const mainSwiperRef = useRef(null);
//   const subSwiperRef = useRef(null);

//   useEffect(() => {
//     const fetchSubCategory = async () => {
//       try {
//         const response = await axiosInstance.get(`/user/allSubcategories`);
//         setSubCategoryName(response?.data ?? []);
//       } catch (error) {
//         console.error("Error fetching sub categories:", error);
//       }
//     };
//     fetchSubCategory();
//   }, []);

//   const [, setActiveSlide] = useState(0);

//   const mainSlides = [
//     {
//       id: 1,
//       desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-desktop.png",
//       mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-mobile.png",
//       title: "Finger Rings",
//       link: "#"
//     },
//     {
//       id: 2,
//       desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/earring-desktop.png",
//       mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/earring-mobile.png",
//       title: "Earrings",
//       link: "#"
//     },
//     {
//       id: 3,
//       desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/neckwear-desktop.png",
//       mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/neckwear-mobile.png",
//       title: "Neckwear",
//       link: "#"
//     },
//     {
//       id: 4,
//       desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bb-desktop.png",
//       mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bb-mobile.png",
//       title: "Bangles & Bracelets",
//       link: "#"
//     }
//   ];

//   const subSlides = [
//     {
//       id: 1,
//       title: "Finger Rings",
//       items: [
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/eng-ring-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/eng-ring-m.png",
//           title: "Engagement Rings",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-form-him-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/rings-form-him-m.png",
//           title: "Rings For Him",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/platinum-rings-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/platinum-rings-m.png",
//           title: "Platinum Rings",
//           link: "#"
//         }
//       ]
//     },
//     {
//       id: 2,
//       title: "Earrings",
//       items: [
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/drops-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/drops-m.png",
//           title: "Drops & Danglers",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/studs-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/studs-m.png",
//           title: "Studs & Tops",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/hoops-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/hoops-m.png",
//           title: "Hoops & Huggies",
//           link: "#"
//         }
//       ]
//     },
//     {
//       id: 3,
//       title: "Neckwear",
//       items: [
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/pendant-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/pendant-d.png",
//           title: "Pendants",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/mangalsutra-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/mangalsutra-d.png",
//           title: "Mangalsutras",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/necklace-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/necklace-d.png",
//           title: "Necklaces",
//           link: "#"
//         }
//       ]
//     },
//     {
//       id: 4,
//       title: "Bangles & Bracelets",
//       items: [
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bangle-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bangle-m.png",
//           title: "Bangles",
//           link: "#"
//         },
//         {
//           desktopImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bracelet-d.png",
//           mobileImg: "https://staticimg.tanishq.co.in/microsite/diamond/images/realRare/bracelet-m.png",
//           title: "Bracelets",
//           link: "#"
//         }
//       ]
//     }
//   ];

//   return (
//     <DiamondSliderContainer>
//       <Container maxWidth="xl">
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Typography
//             variant="body2"
//             sx={{
//               color: '#000',
//               letterSpacing: '0.15em',
//               textTransform: 'uppercase',
//               fontSize: { xs: '0.55rem', md: '0.7rem' },
//               mb: '0.5rem'
//             }}
//           >
//             FIND YOUR PERFECT PIECE
//           </Typography>
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 400,
//               textAlign: 'center',
//               fontSize: { xs: '1.1rem', md: '1.6rem' },
//               color: '#000',
//               fontFamily: '"Abhaya Libre", serif'
//             }}
//           >
//             Discover brilliant design across categories
//           </Typography>
//         </Box>

//         {/* Main Slider */}
//         <Box sx={{ position: 'relative', py: '0.8rem' }}>
//           <Swiper
//             ref={mainSwiperRef}
//             modules={[Navigation, EffectCoverflow, Scrollbar]}
//             effect="coverflow"
//             grabCursor={true}
//             centeredSlides={true}
//             slidesPerView={isMobile ? 1 : 3}
//             spaceBetween={isMobile ? 8 : 30}
//             initialSlide={2}
//             coverflowEffect={{
//               rotate: isMobile ? 15 : 30,
//               stretch: 0,
//               depth: isMobile ? 120 : 300,
//               modifier: 1.6,
//               slideShadows: true,
//             }}
//             navigation={{
//               prevEl: navigationPrevRef.current,
//               nextEl: navigationNextRef.current,
//             }}
//             scrollbar={{
//               el: scrollbarRef.current,
//               hide: false,
//               draggable: true,
//             }}
//             breakpoints={{
//               320: { slidesPerView: 1, spaceBetween: 8 },
//               768: { slidesPerView: 2, spaceBetween: 20 },
//               1024: { slidesPerView: 3, spaceBetween: 30 }
//             }}
//             onSlideChange={(swiper) => {
//               setActiveSlide(swiper.realIndex);
//               if (subSwiperRef.current) {
//                 subSwiperRef.current.slideTo(swiper.realIndex);
//               }
//             }}
//             onInit={(swiper) => {
//               mainSwiperRef.current = swiper;
//               swiper.params.navigation.prevEl = navigationPrevRef.current;
//               swiper.params.navigation.nextEl = navigationNextRef.current;
//               swiper.params.scrollbar.el = scrollbarRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//               swiper.scrollbar.init();
//               swiper.scrollbar.updateSize();
//               setActiveSlide(2);
//             }}
//             style={{ width: '100%' }}
//           >
//             {mainSlides.map((slide) => (
//               <SwiperSlide key={slide.id}>
//                 <Box
//                   sx={{
//                     borderRadius: '12px',
//                     overflow: 'hidden',
//                     boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
//                     transition: 'all 0.3s ease',
//                     cursor: 'pointer',
//                     maxWidth: { xs: '220px', md: '280px' },
//                     margin: '0 auto',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: '0 18px 35px rgba(0,0,0,0.2)'
//                     }
//                   }}
//                 >
//                   <Link href={slide.link} underline="none">
//                     <SlideImage
//                       src={isMobile ? slide.mobileImg : slide.desktopImg}
//                       alt={slide.title}
//                       sx={{
//                         borderRadius: 0,
//                         width: '100%',
//                         height: 'auto',
//                         maxHeight: { xs: '150px', md: '190px' }
//                       }}
//                     />
//                   </Link>
//                 </Box>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {!isMobile && (
//             <>
//               <IconButton ref={navigationPrevRef} sx={navButtonStyle('left')}><ChevronLeft /></IconButton>
//               <IconButton ref={navigationNextRef} sx={navButtonStyle('right')}><ChevronRight /></IconButton>
//             </>
//           )}

//           <Box
//             ref={scrollbarRef}
//             sx={{
//               height: '3px',
//               mt: 1.5,
//               mx: 'auto',
//               width: isMobile ? '60%' : '40%',
//               backgroundColor: 'rgba(0,0,0,0.1)',
//               borderRadius: '2px',
//               '& .swiper-scrollbar-drag': {
//                 backgroundColor: '#555',
//                 borderRadius: '2px'
//               }
//             }}
//           />
//         </Box>

//         {/* Sub Slider */}
//         <Box sx={{ mt: '1.5rem' }}>
//           <Swiper
//             ref={subSwiperRef}
//             modules={[EffectCoverflow]}
//             effect="fade"
//             grabCursor={false}
//             allowTouchMove={false}
//             centeredSlides={true}
//             slidesPerView={1}
//             initialSlide={2}
//             autoHeight={true}
//             onInit={(swiper) => {
//               subSwiperRef.current = swiper;
//             }}
//           >
//             {subSlides.map((slide) => (
//               <SwiperSlide key={slide.id}>
//                 <Box sx={{ textAlign: 'center', py: 2 }}>
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       fontWeight: 400,
//                       mb: 3,
//                       fontSize: { xs: '0.95rem', md: '1.2rem' },
//                       color: '#000',
//                       fontFamily: '"Abhaya Libre", serif'
//                     }}
//                   >
//                     {slide.title}
//                   </Typography>

//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       gap: { xs: '1rem', md: '2rem' },
//                       px: { xs: 1, md: 3 }
//                     }}
//                   >
//                     {slide.items.map((item, index) => (
//                       <Box
//                         key={index}
//                         sx={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           cursor: 'pointer',
//                           '&:hover': { transform: 'translateY(-4px)' }
//                         }}
//                       >
//                         <Link href={item.link} underline="none">
//                           <Box
//                             sx={{
//                               width: { xs: '1.8rem', md: '2.5rem' },
//                               height: { xs: '1.8rem', md: '2.5rem' },
//                               borderRadius: '50%',
//                               overflow: 'hidden',
//                               mb: 1,
//                               backgroundColor: 'rgba(0,0,0,0.05)',
//                               '&:hover': { transform: 'scale(1.05)' }
//                             }}
//                           >
//                             <SlideImage
//                               src={isMobile ? item.mobileImg : item.desktopImg}
//                               alt={item.title}
//                               sx={{
//                                 borderRadius: 0,
//                                 width: '100%',
//                                 height: '100%',
//                                 objectFit: 'cover'
//                               }}
//                             />
//                           </Box>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               fontSize: { xs: '0.6rem', md: '0.7rem' },
//                               color: '#000',
//                               textAlign: 'center',
//                               maxWidth: '70px'
//                             }}
//                           >
//                             {item.title}
//                           </Typography>
//                         </Link>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>
//       </Container>
//     </DiamondSliderContainer>
//   );
// };

// const navButtonStyle = (side) => ({
//   position: 'absolute',
//   [side]: 20,
//   top: '50%',
//   transform: 'translateY(-50%)',
//   zIndex: 10,
//   backgroundColor: 'rgba(255,255,255,0.85)',
//   color: 'black',
//   width: 38,
//   height: 38,
//   '&:hover': {
//     backgroundColor: 'rgba(255,255,255,1)',
//     transform: 'translateY(-50%) scale(1.05)',
//   },
//   transition: 'all 0.3s ease'
// });

// export default DiamondSliderTwo;


