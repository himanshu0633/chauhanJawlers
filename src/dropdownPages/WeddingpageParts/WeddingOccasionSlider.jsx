import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axiosInstance from '../../commonComponents/AxiosInstance';
import { publicUrl } from '../../commonComponents/PublicUrl';
import { useNavigate } from "react-router-dom";   // ✅ ADDED

const WeddingOccasionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(6);
  const [occasion, setOccasion] = useState([]);
  const navigate = useNavigate();   // ✅ ADDED

  useEffect(() => {
    fetchOccasions();
  }, []);

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

    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    let transform = '';
    let zIndex = 0;
    let opacity = 1;

    if (normalizedDiff === 0) {
      transform = 'translate3d(0px, 0px, 0px) rotateZ(0deg) scale(1)';
      zIndex = 7;
    } else if (normalizedDiff === 1) {
      transform = 'translate3d(calc(19.25% - 589px), 0px, -100px) rotateZ(8deg) scale(1)';
      zIndex = 6;
    } else if (normalizedDiff === 2) {
      transform = 'translate3d(calc(37% - 1178px), 0px, -200px) rotateZ(16deg) scale(1)';
      zIndex = 5;
    } else if (normalizedDiff === 3) {
      transform = 'translate3d(calc(53.25% - 1767px), 0px, -300px) rotateZ(24deg) scale(1)';
      zIndex = 4;
    } else if (normalizedDiff >= 4) {
      transform = 'translate3d(calc(68% - 2356px), 0px, -400px) rotateZ(32deg) scale(1)';
      zIndex = Math.max(1, 4 - (normalizedDiff - 4));
    } else if (normalizedDiff === -1) {
      transform = 'translate3d(calc(-19.25% + 589px), 0px, -100px) rotateZ(-8deg) scale(1)';
      zIndex = 6;
      opacity = 0.7;
    } else {
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
    <Box
      sx={{
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
      }}
    >
      {/* Prev Button */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: { xs: -45, md: 40 },
          top: '50%',
          zIndex: 10,
          transform: 'translateY(-50%)',
          bgcolor: '#fff',
          border: '1px solid #ddd',
          width: { xs: 30, md: 50 },
          height: { xs: 30, md: 50 },
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <ArrowBackIos sx={{ color: '#333', fontSize: { xs: '14px', md: '18px' } }} />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: { xs: -45, md: 40 },
          top: '50%',
          zIndex: 10,
          transform: 'translateY(-50%)',
          bgcolor: '#fff',
          border: '1px solid #ddd',
          width: { xs: 30, md: 50 },
          height: { xs: 30, md: 50 },
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <ArrowForwardIos sx={{ color: '#333', fontSize: { xs: '14px', md: '18px' } }} />
      </IconButton>

      {/* Cards */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '280px', md: '569px' },
          height: { xs: '350px', md: '450px' },
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
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
                backgroundColor: '#fff',
                transformOrigin: 'center center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                ...cardStyle,
                '&:hover .occasion-button': {
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translateX(-50%) translateY(0)'
                    : 'translateX(-50%) translateY(10px)'
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

              {/* Only active card shows button */}
              {isActive && (
               <Box
  className="occasion-button"
  sx={{
    position: "absolute",
    bottom: 8,
    left: "50%",
    transform: "translateX(-50%) translateY(10px)",
    opacity: 0,
    transition: "all 0.3s ease",
    zIndex: 9999,          // 👈 SUPER IMPORTANT
    pointerEvents: "auto", // 👈 FIX
  }}
>
  {/* <Button
    onClick={() => navigate(`/wedding?occasion=${occasion.name.toLowerCase()}`)}
    sx={{
      background:
        "linear-gradient(90deg, rgba(131,39,41,0.74), rgba(99,21,24,0.75))",
      color: "#fff",
      borderRadius: "21px",
      px: 3,
      py: 0.5,
      fontSize: { xs: "10px", md: "16px" },
      textTransform: "none",
    }}
  >
    {occasion.name}
  </Button> */}
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
