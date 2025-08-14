import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const BridesDiamondStories = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
                py: { xs: '2rem', md: '3rem' }, // Reduced padding
                px: { xs: '1rem', md: '2rem' }
            }}
        >
            {/* Header */}
            <Box sx={{ mb: '2rem' }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: { xs: '0.7rem', md: '0.8rem' }, // Smaller font
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#000000',
                        mb: '0.5rem'
                    }}
                >
                    GLITTERING STORIES FROM TANISHQ
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: '1.5rem', md: '2rem' }, // Reduced size
                        fontWeight: 400,
                        fontFamily: '"Abhaya Libre", serif',
                        lineHeight: 1.3
                    }}
                >
                    Brides who Sparkle with our Diamonds
                </Typography>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: { xs: '2rem', md: '3rem' }, // Reduced gap
                    maxWidth: '1200px',
                    mx: 'auto'
                }}
            >
                {/* Left Side - Circular Image */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '12rem', md: '16rem' }, // Smaller image
                            height: { xs: '12rem', md: '16rem' },
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Box
                            component="img"
                            src="https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Brides/tt-rivaah-bride.jpg"
                            alt="Bride with diamond jewelry"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>

                    {/* Testimonial Text Below Image */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '-3rem', md: '-4rem' }, // Adjusted position
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            width: '90%'
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.7rem', md: '0.8rem' }, // Smaller text
                                fontStyle: 'italic',
                                color: '#000000',
                                lineHeight: 1.4
                            }}
                        >
                            If you are looking to wear multiple pieces instead of one, all we would recommend is layering them!
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side - Product Showcase */}
                <Box sx={{ flex: 1 }}>
                    {/* Product Image */}
                    <Box
                        sx={{
                            mb: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: '12rem', md: '15rem' }, // Smaller product image
                                height: { xs: '10rem', md: '12rem' },
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '2px solid #444'
                            }}
                        >
                            <Box
                                component="img"
                                src="https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Brides/tt-rivaah-prod.jpg"
                                alt="Diamond necklace set"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Product Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '0.9rem', md: '1.1rem' }, // Smaller title
                            fontWeight: 400,
                            mb: '1.5rem',
                            textAlign: 'center',
                            color: '#000000'
                        }}
                    >
                        Alluring Floral Gold and Diamond Necklace Set
                    </Typography>

                    {/* Tanishq Logo */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '1.5rem' }, // Smaller logo
                                fontFamily: '"Abhaya Libre", serif',
                                fontWeight: 300,
                                color: '#d4af37'
                            }}
                        >
                            T
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.7rem', md: '0.8rem' }, // Smaller description
                            textAlign: 'center',
                            color: '#000000',
                            lineHeight: 1.5,
                            mb: '2rem'
                        }}
                    >
                        Diamonds are forever! Investing in diamond jewelry is an absolute no-brainer. Not only does it look stunning, but it also complements every kind of look.
                    </Typography>

                    {/* CTA Button */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#000000', // Dark black text
                                borderColor: '#000000',
                                fontSize: { xs: '0.7rem', md: '0.8rem' }, // Smaller button text
                                fontWeight: 400,
                                px: '2rem',
                                py: '0.5rem', // Smaller button padding
                                borderRadius: '25px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                '&:hover': {
                                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                                    borderColor: '#2c3e50'
                                }
                            }}
                        >
                            VIEW ALL BRIDAL SETS
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BridesDiamondStories;