import React from 'react';
import { Box, Typography, Button, Card, CardMedia } from '@mui/material';

const ChauhanExchange = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#ffffff', // White background
                color: '#000000', // Dark black text
                p: { xs: '2rem', md: '3rem' }, // Reduced padding
                borderRadius: '20px',
                border: '1px solid #e0e0e0', // Light border
                minHeight: { xs: '20rem', md: '25rem' }, // Smaller height
                width: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
        >
            {/* Left Section */}
            <Box sx={{ flex: 1, pr: { md: '2rem' } }}> {/* Reduced right padding */}
                <Typography variant="h4" gutterBottom sx={{
                    color: '#000000',
                    fontFamily: '"Abhaya Libre", serif',
                    fontWeight: 400,
                    fontSize: { xs: '1.3rem', md: '1.8rem' } // Smaller heading
                }}>
                    Chauhan Jewellers Exchange
                </Typography>
                <Typography variant="body1" sx={{
                    mb: '2rem',
                    lineHeight: 1.6,
                    color: '#000000',
                    fontWeight: 400,
                    fontSize: { xs: '0.8rem', md: '1rem' } // Smaller description
                }}>
                    Every hour over 100 Indians join Chauhan Jewellers' exchange community to upgrade their old gold at a better value!
                </Typography>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#000000',
                        color: '#000000',
                        fontSize: { xs: '0.8rem', md: '0.9rem' }, // Smaller button
                        borderRadius: '25px',
                        padding: { xs: '0.5rem 1.5rem', md: '0.7rem 2rem' },
                        fontWeight: 400,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderColor: '#000000',
                        },
                    }}
                >
                    Learn More
                </Button>
            </Box>

            {/* Right Section */}
            <Card
                sx={{
                    flex: 1,
                    maxWidth: { xs: '100%', md: '20rem' }, // Smaller card
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    mt: { xs: '2rem', md: 0 }, // Reduced margin
                    border: '1px solid #e0e0e0'
                }}
            >
                <CardMedia
                    component="img"
                    height="250" // Reduced height
                    image="https://plus.unsplash.com/premium_photo-1692392182108-e9c8a36a80d9?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxsZXJ5JTJDZ29sZCUyMDUwMHg0MDB8ZW58MHx8MHx8fDA%3D"
                    alt="Jewellery"
                />
            </Card>
        </Box>
    );
};

export default ChauhanExchange;
