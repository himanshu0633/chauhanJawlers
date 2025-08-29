// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     Button,
//     styled,
//     useTheme,
//     useMediaQuery
// } from '@mui/material';
// import {
//     ArrowBackIos,
//     ArrowForwardIos,
//     Fullscreen,
//     FullscreenExit
// } from '@mui/icons-material';

// import reel1 from '/video/homeVideo.mp4';
// import reel2 from '/video/homeVideo.mp4';
// import reel3 from '/video/homeVideo.mp4';
// import reel4 from '/video/homeVideo.mp4';

// // Styled components with white background and dark text
// const SliderContainer = styled(Box)(({ theme }) => ({
//     // minHeight: '100vh',
//     background: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(2),
//     overflowX: 'hidden',
// }));

// const SliderWrapper = styled(Box)({
//     position: 'relative',
//     width: '100%',
//     maxWidth: '1200px',
//     height: '400px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     perspective: '1200px',
//     overflowX: 'hidden',
// });

// const SliderTrack = styled(Box)({
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflowX: 'hidden',
// });

// const VideoCard = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     width: '195px',
//     height: '330px',
//     borderRadius: theme.spacing(1),
//     overflow: 'hidden',
//     backgroundColor: '#000',
//     cursor: 'pointer',
//     transformStyle: 'preserve-3d',
//     boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
//     '@media (max-width: 600px)': {
//         width: '160px',
//         height: '270px',
//     },
//     '&:hover': {
//         '& .video-overlay': {
//             opacity: 1,
//         },
//         '& .content-overlay': {
//             transform: 'translateY(0)',
//         },
//         '& .shimmer': {
//             transform: 'translateX(100%) skewX(-12deg)',
//         },
//         '& .fullscreen-button': {
//             opacity: 1,
//         },

//     },
// }));

// const VideoElement = styled('video')({
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
// });

// const VideoOverlay = styled(Box)({
//     position: 'absolute',
//     inset: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%, transparent 100%)',
//     opacity: 0,
//     transition: 'opacity 0.3s ease',
// });

// const ContentOverlay = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: theme.spacing(2),
//     color: 'white',
//     transform: 'translateY(100%)',
//     transition: 'transform 0.3s ease',
// }));

// const ShimmerEffect = styled(Box)({
//     position: 'absolute',
//     inset: 0,
//     background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
//     transform: 'translateX(-100%) skewX(-12deg)',
//     transition: 'transform 1s ease',
// });

// const FullscreenButton = styled(IconButton)(({ theme }) => ({
//     position: 'absolute',
//     top: theme.spacing(1),
//     right: theme.spacing(1),
//     color: 'white',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     opacity: 0,
//     transition: 'opacity 0.3s ease',
//     zIndex: 10,
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     },
// }));

// const NavButton = styled(IconButton)(({ theme }) => ({
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     zIndex: 50,
//     width: '48px',
//     height: '48px',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(0, 0, 0, 0.1)',
//     color: '#000',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.05)',
//         transform: 'translateY(-50%) scale(1.1)',
//     },
//     '&.left': {
//         left: theme.spacing(4),
//     },
//     '&.right': {
//         right: theme.spacing(4),
//     },
// }));

// const DotsContainer = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     gap: theme.spacing(1.5),
//     marginTop: theme.spacing(4),
// }));

// const DotButton = styled(Box)(({ active }) => ({
//     width: '10px',
//     height: '10px',
//     borderRadius: '50%',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     ...(active
//         ? {
//             backgroundColor: '#000',
//             transform: 'scale(1.25)',
//         }
//         : {
//             backgroundColor: 'rgba(0, 0, 0, 0.2)',
//             '&:hover': {
//                 backgroundColor: 'rgba(0, 0, 0, 0.4)',
//             },
//         }),
// }));

// const FullscreenVideo = styled(Box)({
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'black',
//     zIndex: 2000,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// });

// const FullscreenVideoElement = styled('video')({
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
// });

// const CloseButton = styled(IconButton)(({ theme }) => ({
//     position: 'absolute',
//     top: theme.spacing(2),
//     right: theme.spacing(2),
//     color: 'white',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 10,
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     },
// }));


// const VideoCardSlider = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const [currentSlide, setCurrentSlide] = useState(2);
//     const [userInteracted, setUserInteracted] = useState(false);
//     const [fullscreenVideo, setFullscreenVideo] = useState(null);
//     const videoRefs = useRef([]);
//     const fullscreenRef = useRef(null);

//     const videos = [
//         {
//             id: 1,
//             title: "Diamond Collection 1",
//             src: reel1,
//             description: "Glamour Hub Diamond Bangle"
//         },
//         {
//             id: 2,
//             title: "Diamond Collection 2",
//             src: reel2,
//             description: "Aray Diamond Finger Ring"
//         },
//         {
//             id: 3,
//             title: "Diamond Collection 3",
//             src: reel3,
//             description: "Premium Diamond Necklace"
//         },
//         {
//             id: 4,
//             title: "Diamond Collection 4",
//             src: reel4,
//             description: "Luxury Diamond Earrings"
//         },
//         {
//             id: 5,
//             title: "Diamond Collection 5",
//             src: reel1,
//             description: "Elegant Diamond Bracelet"
//         }
//     ];

//     // Initialize video refs
//     useEffect(() => {
//         videoRefs.current = videoRefs.current.slice(0, videos.length);
//     }, [videos]);

//     // Handle video playback when slide changes
//     useEffect(() => {
//         if (!userInteracted) return;

//         // Play current video
//         const currentVideo = videoRefs.current[currentSlide];
//         if (currentVideo) {
//             const playPromise = currentVideo.play();
//             if (playPromise !== undefined) {
//                 playPromise.catch(error => {
//                     console.log("Video play failed:", error);
//                 });
//             }
//         }

//         // Pause all other videos
//         videoRefs.current.forEach((video, index) => {
//             if (video && index !== currentSlide) {
//                 video.pause();
//             }
//         });
//     }, [currentSlide, userInteracted]);

//     // Handle fullscreen exit with ESC key
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'Escape' && fullscreenVideo !== null) {
//                 setFullscreenVideo(null);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [fullscreenVideo]);

//     const nextSlide = () => {
//         setUserInteracted(true);
//         setCurrentSlide((prev) => (prev + 1) % videos.length);
//     };

//     const prevSlide = () => {
//         setUserInteracted(true);
//         setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
//     };

//     const goToSlide = (index) => {
//         setUserInteracted(true);
//         setCurrentSlide(index);
//     };

//     const handleVideoHover = (index) => {
//         if (index !== currentSlide) {
//             const video = videoRefs.current[index];
//             if (video) {
//                 video.play().catch(error => {
//                     console.log("Hover play failed:", error);
//                 });
//             }
//         }
//     };

//     const handleVideoLeave = (index) => {
//         if (index !== currentSlide) {
//             const video = videoRefs.current[index];
//             if (video) {
//                 video.pause();
//                 video.currentTime = 0;
//             }
//         }
//     };

//     const openFullscreen = (index) => {
//         setFullscreenVideo(videos[index]);
//     };

//     const closeFullscreen = () => {
//         setFullscreenVideo(null);
//     };

//     const getSlideStyle = (index) => {
//         const position = index - currentSlide;
//         const absPosition = Math.abs(position);

//         let transform = '';
//         let zIndex = videos.length - absPosition;
//         let opacity = 1;
//         let scale = 1;

//         if (position === 0) {
//             // Center slide
//             transform = 'translateX(0px) translateZ(0px) rotateY(0deg)';
//             scale = 1.1;
//             zIndex = 100;
//         } else if (position > 0) {
//             // Right slides
//             const offset = Math.min(position, 3) * 130;
//             const rotation = Math.min(position * 25, 75);
//             transform = `translateX(${offset}px) translateZ(-${absPosition * 100}px) rotateY(-${rotation}deg)`;
//             scale = Math.max(0.7, 1 - absPosition * 0.15);
//             opacity = Math.max(0.3, 1 - absPosition * 0.3);
//         } else {
//             // Left slides  
//             const offset = Math.max(position, -3) * 130;
//             const rotation = Math.max(position * 25, -75);
//             transform = `translateX(${offset}px) translateZ(-${absPosition * 100}px) rotateY(${Math.abs(rotation)}deg)`;
//             scale = Math.max(0.7, 1 - absPosition * 0.15);
//             opacity = Math.max(0.3, 1 - absPosition * 0.3);
//         }

//         return {
//             transform: `${transform} scale(${scale})`,
//             zIndex,
//             opacity,
//             transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
//         };
//     };

//     return (
//         <SliderContainer>
//             {/* Fullscreen Video Overlay */}
//             {fullscreenVideo && (
//                 <FullscreenVideo>
//                     <FullscreenVideoElement
//                         ref={fullscreenRef}
//                         autoPlay
//                         muted={false}
//                         loop
//                         controls
//                         playsInline
//                     >
//                         <source src={fullscreenVideo.src} type="video/mp4" />
//                     </FullscreenVideoElement>
//                     <CloseButton onClick={closeFullscreen}>
//                         <FullscreenExit />
//                     </CloseButton>
//                 </FullscreenVideo>
//             )}

//             {/* Slider Container */}
//             <SliderWrapper>
//                 <SliderTrack>
//                     {videos.map((video, index) => (
//                         <VideoCard
//                             key={video.id}
//                             style={getSlideStyle(index)}
//                             onClick={() => openFullscreen(index)}
//                             onMouseEnter={() => handleVideoHover(index)}
//                             onMouseLeave={() => handleVideoLeave(index)}
//                         >
//                             {/* Video Element */}
//                             <VideoElement
//                                 ref={el => videoRefs.current[index] = el}
//                                 muted
//                                 loop
//                                 playsInline
//                             >
//                                 <source src={video.src} type="video/mp4" />
//                             </VideoElement>

//                             {/* Overlay */}
//                             <VideoOverlay className="video-overlay" />

//                             {/* Content Overlay */}
//                             <ContentOverlay className="content-overlay">
//                                 <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
//                                     {video.title}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
//                                     {video.description}
//                                 </Typography>
//                             </ContentOverlay>

//                             {/* Shimmer Effect */}
//                             <ShimmerEffect className="shimmer" />

//                             {/* Fullscreen Button */}
//                             <FullscreenButton
//                                 className="fullscreen-button"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     openFullscreen(index);
//                                 }}
//                             >
//                                 <Fullscreen />
//                             </FullscreenButton>
//                         </VideoCard>
//                     ))}
//                 </SliderTrack>

//                 {/* Navigation Arrows - Conditionally render based on screen size */}
//                 {!isMobile && (
//                     <>
//                         <NavButton className="left" onClick={prevSlide}>
//                             <ArrowBackIos />
//                         </NavButton>
//                         <NavButton className="right" onClick={nextSlide}>
//                             <ArrowForwardIos />
//                         </NavButton>
//                     </>
//                 )}
//             </SliderWrapper>

//             {/* Dots Indicator */}
//             <DotsContainer>
//                 {videos.map((_, index) => (
//                     <DotButton
//                         key={index}
//                         active={index === currentSlide}
//                         onClick={() => goToSlide(index)}
//                     />
//                 ))}
//             </DotsContainer>
//         </SliderContainer>
//     );
// };

// export default VideoCardSlider;