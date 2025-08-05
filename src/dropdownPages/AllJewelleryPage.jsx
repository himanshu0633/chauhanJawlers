import { Box, Typography, Grid, Button, Chip, IconButton, Container } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useState } from 'react';

const jewelleryData = [
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw53b65f59/plp/18-kt-jewellery.jpg',
        label: '14 Kt',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3bc42dcf/plp/14-kt-jewellery.jpg',
        label: '18 Kt',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwbc8afd33/plp/22-kt-jewellery.jpg',
        label: '22 Kt',
    },
];

const products = [
    {
        img: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d8c0a6b/images/hi-res/50D3I3SZTABA09_1.jpg?sw=480&sh=480',
        title: 'Dazzling Grace Drop Earrings',
        price: '₹ 58,484',
        liked: false,
    },
    {
        img: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d8c0a6b/images/hi-res/50D3I3SZTABA09_1.jpg?sw=480&sh=480',
        title: 'Captivating Grace Drop Earrings',
        price: '₹ 56,605',
        special: 'Only 1 left!',
        liked: false,
    },
    {
        img: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d8c0a6b/images/hi-res/50D3I3SZTABA09_1.jpg?sw=480&sh=480',
        title: 'Everyday Charm Diamond Stud Earrings',
        price: '₹ 36,903',
        oldPrice: '₹ 39,845',
        liked: false,
    },
    {
        img: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d8c0a6b/images/hi-res/50D3I3SZTABA09_1.jpg?sw=480&sh=480',
        title: 'Everyday Charm Diamond Stud Earrings',
        price: '₹ 36,903',
        oldPrice: '₹ 39,845',
        liked: false,
    },
    {
        img: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw8d8c0a6b/images/hi-res/50D3I3SZTABA09_1.jpg?sw=480&sh=480',
        title: 'Everyday Charm Diamond Stud Earrings',
        price: '₹ 36,903',
        oldPrice: '₹ 39,845',
        liked: false,
    },
];
const assuranceData = [
    {
        img: 'https://i.imgur.com/XZiQnRx.png',
        label: 'Exchange Offers'
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweee090e8/assurance/assurance-bis-logo.png',
        label: 'Purity Guarantee'
    },
    {
        img: 'https://i.imgur.com/3JJd6Ux.png',
        label: 'Easy Replacements'
    },
]
function JewelleryHeader() {
    return (
        <Box
            sx={{
                width: '100%',
                pt: 4,
                pb: 4,
                background: '#fff',
                minHeight: '60vh',
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, mb: 4, fontFamily: 'serif' }}
            >
                All Jewellery
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {jewelleryData.map((item, idx) => (
                    <Grid
                        key={idx}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Box
                            sx={{
                                width: { xs: 180, sm: 210 },
                                height: { xs: 180, sm: 210 },
                                mb: 1,
                                overflow: 'hidden',
                                borderRadius: 1,
                                backgroundColor: '#fff',
                                boxShadow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.label}
                                style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                            />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ fontWeight: 400, mt: 0.5, letterSpacing: '0.5px' }}
                        >
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function FiltersAndSort() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
                px: { xs: 2, sm: 6 },
                mb: 4,
            }}
        >
            <Button
                startIcon={<FilterListIcon />}
                variant="outlined"
                size="small"
                sx={{
                    borderRadius: 6,
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 400,
                    color: 'text.primary',
                    borderColor: '#ddd',
                    backgroundColor: '#fff',
                }}
            >
                Filter
            </Button>
            <Chip
                label="₹25,000 - ₹50,000"
                size="small"
                clickable
                sx={{ fontWeight: 400, backgroundColor: '#fafbfc' }}
                onDelete={() => { }}
            />
            <Chip
                label="Gifts For Him"
                size="small"
                clickable
                sx={{ fontWeight: 400, backgroundColor: '#fafbfc' }}
                onDelete={() => { }}
            />
            <Chip
                label="Women"
                size="small"
                clickable
                sx={{ fontWeight: 400, backgroundColor: '#fafbfc' }}
                onDelete={() => { }}
            />
            <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: '#ae1046', ml: 1, cursor: 'pointer' }}
            >
                + Show More
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button
                endIcon={<KeyboardArrowDownRoundedIcon />}
                sx={{
                    borderRadius: 8,
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: 15,
                    backgroundColor: '#fafbfc',
                    /*************  ✨ Windsurf Command 🌟  *************/
                    color: 'text.primary',
                    borderColor: '#ddd',
                    boxShadow: '0 .5px 0 #eee',
                }}
                variant="outlined"
                size="small"
            >
                Sort By: <span style={{ fontWeight: 700, marginLeft: 4 }}>Best Matches</span>
            </Button>
        </Box>
    );
}

function JewelleryCard({ product }) {
    const [liked, setLiked] = useState(false);
    return (
        <Box sx={{ pb: 2 }}>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 2,
                    boxShadow: 1,
                    // background: '#fff',
                    overflow: 'hidden',
                    mb: 2,
                    width: { xs: 220, sm: 260 },
                    height: { xs: 220, sm: 260 },
                    mx: 'auto',
                }}
            >
                <img
                    src={product.img}
                    alt={product.title}
                    style={{
                        display: 'block',
                        margin: 'auto',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                    }}
                />
                <IconButton
                    onClick={() => setLiked(!liked)}
                    aria-label="like"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 12,
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        '&:hover': { background: '#f7f7f7' },
                        p: '5px',
                    }}
                    size="small"
                >
                    {liked ? (
                        <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
                    )}
                    {/* <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} /> */}
                </IconButton>
            </Box>
            <Typography
                variant="subtitle1"
                sx={{
                    fontSize: 17,
                    fontWeight: 400,
                    fontFamily: 'serif',
                    color: '#222',
                    mb: 0.2,
                    textAlign: 'left',
                }}
            >
                {product.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
                    {product.price}
                </Typography>
                {product.oldPrice && (
                    <Typography
                        variant="body2"
                        sx={{ color: '#bdbdbd', textDecoration: 'line-through', fontWeight: 400, fontSize: 14 }}
                    >
                        {product.oldPrice}
                    </Typography>
                )}
            </Box>
            {product.special && (
                <Typography sx={{ fontSize: 13.5, color: '#be1222', fontWeight: 500 }}>{product.special}</Typography>
            )}
        </Box>
    );
}

export function JewelleryGrid() {
    return (
        <>
            <JewelleryHeader />
            <Box sx={{ py: 2, px: { xs: 2, sm: 6 } }}>
                <Typography
                    variant="h5"
                    sx={{ fontFamily: 'serif', fontWeight: 500, mb: 0.5, display: 'inline-block' }}
                >
                    All Jewellery
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, display: 'inline' }}>
                    (19607 results)
                </Typography>
            </Box>
            <FiltersAndSort />
            <Grid
                container
                spacing={2}
                sx={{ px: { xs: 2, sm: 6 }, justifyContent: { xs: 'center', sm: 'flex-start' } }}
            >
                {products.map((product, idx) => (
                    <Grid
                        key={idx}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <JewelleryCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export function JewelAssurance() {
    return (
        <Box
            sx={{
                width: '100%',
                background: '#fff',
                border: '1px solid #e8e4e2',
                borderRadius: '28px',
                py: { xs: 4, sm: 6 },
                // px: { xs: 2, sm: 6 },
                // maxWidth: '1000px',
                mx: 'auto',
                my: 5,
                boxShadow: '0 2px 8px rgba(190,165,140,0.04)',
                position: 'relative',
            }}
        >
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontFamily: 'serif',
                    fontWeight: 600,
                    color: '#3d1822',
                    mb: 0.5,
                }}
            >
                The Chauhan Sons Assurance
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                sx={{
                    color: '#8f8f8f',
                    mb: { xs: 3, sm: 6 },
                    fontWeight: 400,
                    fontSize: 18,
                }}
            >
                Crafted by experts, cherished by you.
            </Typography>
            <Grid container spacing={1} justifyContent="center" gap={{ xs: 2, sm: 5 }}>
                {assuranceData.map((item, idx) => (
                    <Grid
                        key={item.label}
                        item
                        xs={12}
                        sm={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, sm: 0 } }}
                    >
                        <Box
                            sx={{
                                width: 90,
                                height: 80,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.label}
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{
                                fontFamily: 'serif',
                                color: '#3d1822',
                                fontWeight: 500,
                                mt: 0.5,
                                fontSize: 17,
                                lineHeight: 1.25
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}


export default function AllJewelleryPage() {
    return (
        <Box sx={{ backgroundColor: '#f9f9f9' }}>
            <Container maxWidth="xl">
                <JewelleryGrid />
                <JewelAssurance />
            </Container>
        </Box>
    );
}




