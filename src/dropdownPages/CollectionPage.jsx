import React from 'react';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
} from '@mui/material';

const products = [
    {
        id: 1,
        name: 'Rosy Glam Stud Earrings',
        price: '₹102',
        count: '1 PRODUCT',
        image:
            'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw23924cf8/microsite/joy-of-dressing/50D2FFSQGAGA02.jpg',
    },
    {
        id: 2,
        name: 'Sparkling Treasures Pendant',
        price: '₹102',
        count: '1 PRODUCT',
        image:
            'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw23924cf8/microsite/joy-of-dressing/50D2FFSQGAGA02.jpg',
    },
    {
        id: 3,
        name: 'Elite Glamorous Ring',
        price: '₹102',
        count: '1 PRODUCT',
        image:
            'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw23924cf8/microsite/joy-of-dressing/50D2FFSQGAGA02.jpg',
    },
];

export default function CollectionPage() {
    const handleProductClick = (productName) => {
        console.log(`${productName} clicked`);
    };

    return (
        <Box sx={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Box
                    component="img"
                    src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe0f92ec0/microsite/joy-of-dressing/sparklingavenuesdesktop.jpg"
                    alt="Tanishq Sparkling Avenues - The joy of dressing"
                    sx={{
                        width: '100%',
                        // maxWidth: 1200,
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Box>

            {/* Products Section */}
            <Box
                sx={{
                    backgroundColor: '#fff',
                    py: '60px',
                }}
            >
                <Container maxWidth="xl" >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: { xs: 2, lg: 3, },
                        }}
                    >
                        {[...products, {
                            id: 'info',
                            isInfo: true
                        }].map((item, idx) =>
                            item.isInfo ? (
                                <Card
                                    key="info-card"
                                    sx={{
                                        borderRadius: 0,
                                        boxShadow: 'none',
                                        border: '1px solid #eee',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fafafa',
                                        textAlign: 'center',
                                        // height: { xs: 230, sm: 250, md: 290 },
                                        flexBasis: {
                                            // xs: '90%',
                                            xs: '45%',
                                            md: '30%',
                                            lg: '23%',
                                        },
                                        maxWidth: {
                                            // xs: '90%',
                                            xs: '45%',
                                            md: '30%',
                                            lg: '23%',
                                        },
                                        minWidth: 0, // allow shrink
                                        padding: { xs: '24px 10px', sm: '30px 16px', md: '34px 14px' },
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'cursive',
                                            fontSize: { xs: 24, md: 28 },
                                            fontWeight: 300,
                                            color: '#2C2C2C',
                                            fontStyle: 'italic',
                                            marginBottom: { xs: 1.5, md: 2.5 },
                                        }}
                                    >
                                        Sparkling Avenues
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: 11, md: 12 },
                                            color: '#666',
                                            lineHeight: 1.6,
                                            maxWidth: 200,
                                            margin: '0 auto',
                                        }}
                                    >
                                        Be a classic in an era of fleeting trends with the designs from our Sparkling Avenues collection!
                                    </Typography>
                                </Card>
                            ) : (
                                <Card
                                    key={item.id}
                                    onClick={() => handleProductClick(item.name)}
                                    sx={{
                                        borderRadius: 0,
                                        boxShadow: 'none',
                                        border: '1px solid #eee',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexBasis: {
                                            // xs: '90%',
                                            xs: '45%',
                                            md: '30%',
                                            lg: '23%',
                                        },
                                        maxWidth: {
                                            // xs: '90%',
                                            xs: '45%',
                                            md: '30%',
                                            lg: '23%',
                                        },
                                        minWidth: 0,
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                        },
                                        // height: { xs: 230, sm: 250, md: 290 },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            // height: { xs: 100, sm: 120, md: 130 },
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.name}
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                            }}
                                            onError={(e) => {
                                                e.target.src = '/placeholder.svg?height=150&width=150&text=Image+Not+Found';
                                            }}
                                        />
                                    </Box>

                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                            padding: { xs: '10px 4px', md: '16px 8px !important' },
                                            borderTop: '1px solid #eee',
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12, md: 14 },
                                                fontWeight: 500,
                                                color: '#2C2C2C',
                                                marginBottom: 1,
                                                lineHeight: 1.3,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 15, md: 16 },
                                                fontWeight: 600,
                                                color: '#2C2C2C',
                                                marginBottom: 0.5,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.price}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 10,
                                                color: '#666',
                                                letterSpacing: '0.5px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.count}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
