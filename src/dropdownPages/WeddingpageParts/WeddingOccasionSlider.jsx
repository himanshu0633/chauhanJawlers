import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, ArrowForward } from '@mui/icons-material';
import axiosInstance from '../../common components/AxiosInstance';
import { publicUrl } from '../../common components/PublicUrl';

const WeddingOccasionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(6); // Start with Reception (index 6)
  const [occasion, setOccasion] = useState([]);

  useEffect(() => {
    fetchOccasions();
  })
  const fetchOccasions = async () => {
    try {
      const response = await axiosInstance.get(`/user/allOccasions`);
      setOccasion(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching occasion:", error);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % occasion.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + occasion.length) % occasion.length);
  };

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const totalCards = occasion.length;

    // Normalize the difference to handle circular array
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    let transform = '';
    let zIndex = 0;
    let opacity = 1;

    if (normalizedDiff === 0) {
      // Active card - front center
      transform = 'translate3d(0px, 0px, 0px) rotateZ(0deg) scale(1)';
      zIndex = 7;
    } else if (normalizedDiff === 1) {
      // Next card - right side
      transform = 'translate3d(calc(19.25% - 589px), 0px, -100px) rotateZ(8deg) scale(1)';
      zIndex = 6;
    } else if (normalizedDiff === 2) {
      // Second card - further right
      transform = 'translate3d(calc(37% - 1178px), 0px, -200px) rotateZ(16deg) scale(1)';
      zIndex = 5;
    } else if (normalizedDiff === 3) {
      // Third card - even further right
      transform = 'translate3d(calc(53.25% - 1767px), 0px, -300px) rotateZ(24deg) scale(1)';
      zIndex = 4;
    } else if (normalizedDiff >= 4) {
      // Cards at the back - max rotation
      transform = 'translate3d(calc(68% - 2356px), 0px, -400px) rotateZ(32deg) scale(1)';
      zIndex = Math.max(1, 4 - (normalizedDiff - 4));
    } else if (normalizedDiff === -1) {
      // Previous card - left side (hidden behind)
      transform = 'translate3d(calc(-19.25% + 589px), 0px, -100px) rotateZ(-8deg) scale(1)';
      zIndex = 6;
      opacity = 0.7;
    } else {
      // Other cards - hidden
      transform = 'translate3d(calc(-68% + 2356px), 0px, -400px) rotateZ(-32deg) scale(1)';
      zIndex = 1;
      opacity = 0;
    }

    return {
      transform,
      zIndex,
      opacity,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '80%',
      mx: 'auto',
      py: 4,
      position: 'relative',
      mt: { xs: 4, md: 10 },
      height: { xs: '400px', md: '600px' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Navigation Buttons */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: { xs: 10, md: 40 },
          top: '50%',
          zIndex: 10,
          transform: 'translateY(-50%)',
          bgcolor: '#fff',
          border: '1px solid #ddd',
          width: 50,
          height: 50,
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#f5f5f5',
          }
        }}
      >
        <ArrowBackIos sx={{ color: '#333', fontSize: '18px' }} />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: { xs: 10, md: 40 },
          top: '50%',
          zIndex: 10,
          transform: 'translateY(-50%)',
          bgcolor: '#fff',
          border: '1px solid #ddd',
          width: 50,
          height: 50,
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: '#f5f5f5',
          }
        }}
      >
        <ArrowForwardIos sx={{ color: '#333', fontSize: '18px' }} />
      </IconButton>

      {/* 3D Card Stack Container */}
      <Box sx={{
        position: 'relative',
        width: { xs: '280px', md: '569px' },
        height: { xs: '350px', md: '450px' },
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}>
        {occasion.map((occasion, index) => {
          const cardStyle = getCardStyle(index);
          const isActive = index === activeIndex;

          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transformOrigin: 'center center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                ...cardStyle,
                '&:hover .occasion-button': {
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)'
                }
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={publicUrl(occasion.image)}
                alt={occasion.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Occasion Button - only show on active card */}
              {isActive && (
                <Box
                  className="occasion-button"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(10px)',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    zIndex: 2
                  }}
                >
                  <Button
                    sx={{
                      background: 'linear-gradient(90.18deg, rgba(131, 39, 41, 0.741) 0.17%, rgba(99, 21, 24, 0.752) 99.86%)',
                      color: '#fff',
                      borderRadius: '21px',
                      px: 3,
                      py: 0.5,
                      fontSize: { xs: '10px', md: '16px' },
                      fontWeight: 'normal',
                      textTransform: 'none',
                      fontFamily: 'Nunito, sans-serif',
                      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                      minWidth: 'auto',
                      '&:hover': {
                        background: '#832729',
                        boxShadow: '0 4px 16px rgba(131, 39, 41, 0.3)'
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(occasion.link, '_blank');
                    }}
                  >
                    {occasion.name}
                    <Box sx={{
                      ml: 1,
                      width: 25,
                      height: 25,
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                      '&:hover': {
                        backgroundColor: 'rgba(99,21,24,0.99)'
                      }
                    }}>
                      <ArrowForward sx={{ fontSize: '15px', color: '#fff' }} />
                    </Box>
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeddingOccasionSlider;
