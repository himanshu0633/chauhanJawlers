import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Grid,
    Container,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    FavoriteBorder,
    Share,
    ExpandMore,
    LocationOn,
    Diamond,
    Settings,
    Description,
    Visibility,
    ShoppingCart,
} from '@mui/icons-material';
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import { useNavigate } from 'react-router-dom';

export default function SingleProductPage() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [weight, setWeight] = React.useState("0.57");
    const [activeTab, setActiveTab] = useState('details');
    const [pincode, setPincode] = useState('');
    const navigate = useNavigate()
    const weightOptions = [
        { value: "0.57", label: "0.57 g" },
        { value: "0.80", label: "0.80 g" },
    ];


    const handleTabChange = (tab) => setActiveTab(tab);

    // Product data based on the real product page reference
    const product = {
        name: 'Brilliant Diamond Nose Ring',
        price: '₹14,955',
        oldPrice: '₹16,955',
        karatage: '18K',
        diamondCarat: '0.06 ct',
        materialColor: 'Yellow',
        grossWeight: '0.57g',
        metal: 'Gold',
        skuId: 'GG2117GFBAAA022BB512A16',
        ratingText: 'Bestsellers',
        frontImage:
            'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw3458e37b/images/hi-res/502117OFBAAA02_1.jpg?sw=640&sh=640',
        sideImage:
            'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw5b94105e/images/hi-res/502117OFBAAA02_2.jpg?sw=640&sh=640',
        description:
            'Studded with diamonds in an ethereal pattern, this nose ring is crafted in 18 Karat Yellow Gold. Stone Clarity SI2. Radiant with the charm and brilliance of diamonds, this nose ring is a delightful addition to your ensemble!',
        diamondDetails: `Diamond Clarity: SI2
Diamond Color: H
No Of Diamonds: Multiple
Diamond Setting: Prong
Diamond Shape: Round`,
        generalDetails: 'Crafted by Experts, Cherished by You. 100% Exchange Value on Precious Stones. The Purity Guarantee. Complete Transparency and Trust. Lifetime Maintenance.',
        priceBreakup: {
            gold: '₹12,000',
            diamond: '₹2,000',
            other: '₹955',
        },
    };

    return (
        <Box bgcolor="#fff" px={{ xs: 1, sm: 3, md: 6 }} py={6}>
            <Container maxWidth="xl" sx={{ maxWidth: 1140 }}>
                {/* View Similar Button */}
                <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                    <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        sx={{
                            bgcolor: '#fff',
                            color: '#44170D',
                            border: '1px solid #ddd',
                            borderRadius: 20,
                            px: 2.5,
                            py: 1,
                            fontSize: 13,
                            fontWeight: 600,
                            textTransform: 'none',
                            minWidth: 150,
                            '&:hover': { bgcolor: '#fafafa', borderColor: '#b8843f' },
                            boxShadow: '0 1px 3px rgba(139, 69, 19,0.15)',
                        }}
                    >
                        View Similar
                    </Button>
                </Box>

                {/* Specs Chips */}
                <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                    <Chip
                        icon={<Diamond sx={{ color: '#E65100' }} />}
                        label={product.karatage}
                        sx={{
                            bgcolor: '#FFF3E0',
                            color: '#E65100',
                            fontSize: 13,
                            fontWeight: 600,
                            mx: 1,
                            height: 32,
                            px: 1.5,
                            boxShadow: '0 1px 3px rgba(230, 120, 30, 0.3)',
                        }}
                    />
                    <Chip
                        label={product.diamondCarat}
                        sx={{
                            bgcolor: '#FFF3E0',
                            color: '#E65100',
                            fontSize: 13,
                            fontWeight: 600,
                            mx: 1,
                            height: 32,
                            px: 1.5,
                            boxShadow: '0 1px 3px rgba(230, 120, 30, 0.3)',
                        }}
                    />
                </Box>

                {/* Title */}
                <Typography
                    component="h1"
                    sx={{
                        fontFamily: 'serif',
                        fontWeight: 400,
                        fontSize: { xs: 24, sm: 34 },
                        color: '#2C2C2C',
                        textAlign: 'center',
                        mb: { xs: 2, sm: 3 },
                        letterSpacing: '0.03em',
                    }}
                >
                    {product.name}
                </Typography>

                {/* Price with old price */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 0.5,
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: 24, sm: 30 },
                            fontWeight: 700,
                            color: '#2C2C2C',
                            fontFamily: 'serif',
                        }}
                    >
                        {product.price}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 18,
                            color: '#A49E9B',
                            textDecoration: 'line-through',
                            fontWeight: 400,
                            fontFamily: 'serif',
                            ml: { xs: 0, sm: 2 },
                        }}
                    >
                        {product.oldPrice}
                    </Typography>
                </Box>

                <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                    sx={{ fontSize: 13, color: '#666', mb: { xs: 2, sm: 3 } }}
                >
                    incl taxes and charges
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: { xs: 4, sm: 6 } }}>
                    <IconButton
                        onClick={() => navigate('/wishlist')}
                        size="large"
                        aria-label="Add to wishlist"
                        sx={{
                            border: '1px solid #ddd',
                            color: '#666',
                            borderRadius: '50%',
                            width: 46,
                            height: 46,
                            transition: 'background-color 0.3s',
                            '&:hover': { bgcolor: '#f3f1ee' },
                        }}
                    >
                        <FavoriteBorder fontSize="medium" />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="Share"
                        sx={{
                            border: '1px solid #ddd',
                            color: '#666',
                            borderRadius: '50%',
                            width: 46,
                            height: 46,
                            transition: 'background-color 0.3s',
                            '&:hover': { bgcolor: '#f3f1ee' },
                        }}
                    >
                        <Share fontSize="medium" />
                    </IconButton>
                </Box>

                {/* Product Images */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: { xs: 3, sm: 6 },
                        bgcolor: '#fafafa',
                        py: { xs: 5, sm: 7 },
                        px: { xs: 1, sm: 6 },
                        borderRadius: 3,
                        position: 'relative',
                        mb: 7,
                    }}
                >
                    <Chip
                        label={product.ratingText}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            bgcolor: '#44170D',
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 600,
                            py: 0.3,
                            px: 1.5,
                            borderRadius: 1,
                            boxShadow: '0 2px 6px rgb(139 69 19 / 0.3)',
                            userSelect: 'none',
                            zIndex: 2,
                        }}
                    />
                    <Box
                        component="img"
                        src={product.frontImage}
                        alt="Front view"
                        sx={{
                            maxHeight: 400,
                            maxWidth: { xs: 150, sm: 250 },
                            objectFit: 'contain',
                            userSelect: 'none',
                            boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)',
                            borderRadius: 2,
                        }}
                        draggable={false}
                    />
                    <Box
                        component="img"
                        src={product.sideImage}
                        alt="Side view"
                        sx={{
                            maxHeight: 400,
                            maxWidth: { xs: 150, sm: 300 },
                            objectFit: 'contain',
                            userSelect: 'none',
                            boxShadow: '0 8px 28px rgb(0 0 0 / 0.08)',
                            borderRadius: 4,
                        }}
                        draggable={false}
                    />
                </Box>

                {/* Delivery Details */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: 2,
                        border: '1px solid #eee',
                        mb: { xs: 6, sm: 8 },
                        maxWidth: 580,
                        mx: 'auto',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C2C2C', mb: 3, fontFamily: 'serif' }}>
                        Delivery Details
                    </Typography>

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {/* Country select hidden on source site, commented out */}
                        {/* 
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationOn sx={{ color: '#4CAF50', fontSize: 20 }} />
                    </InputAdornment>
                  }
                  sx={{ borderRadius: 2 }}
                  variant="outlined"
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </Select>
              </FormControl>
            </Grid> 
            */}
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                placeholder="Enter Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#44170D',
                                    color: '#fff',
                                    borderRadius: 3,
                                    py: 1.8,
                                    fontWeight: 700,
                                    fontSize: 15,
                                    minWidth: 130,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#7A3A0F' },
                                    boxShadow: '0 5px 12px rgb(139 69 19 / 0.4)',
                                }}
                            >
                                CHECK
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Jewellery Details */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        borderRadius: 2,
                        p: { xs: 3, sm: 5 },
                        maxWidth: 920,
                        mx: 'auto',
                        boxShadow: '0 4px 32px rgb(242 227 213 / 0.8)',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'serif',
                            fontWeight: 400,
                            fontSize: { xs: 24, sm: 28 },
                            color: '#2C2C2C',
                            textAlign: 'center',
                            mb: 5,
                            letterSpacing: 0.5,
                        }}
                    >
                        Jewellery Details
                    </Typography>

                    {/* Tabs */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 5,
                            borderBottom: '1px solid #eee',
                            gap: 3,
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { key: 'details', label: 'Product Details' },
                            { key: 'breakup', label: 'Price Breakup' },
                        ].map(({ key, label }) => (
                            <Button
                                key={key}
                                onClick={() => handleTabChange(key)}
                                sx={{
                                    px: 4,
                                    py: 1.4,
                                    borderRadius: 30,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: 16,
                                    minWidth: 160,
                                    bgcolor: activeTab === key ? '#44170D' : 'transparent',
                                    color: activeTab === key ? '#fff' : '#757575',
                                    boxShadow: activeTab === key ? '0 6px 15px rgb(139 69 19 / 0.45)' : 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: activeTab === key ? '#7A3A0F' : '#f5f5f5',
                                        color: activeTab === key ? '#fff' : '#5a5a5a',
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>

                    {/* Tab Content */}
                    {activeTab === 'details' && (
                        <>
                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: '#666',
                                    textAlign: 'right',
                                    mb: 4,
                                    fontFamily: 'monospace',
                                    letterSpacing: 0.3,
                                }}
                            >
                                SKU ID : {product.skuId}
                            </Typography>

                            {/* Replace your Grid container with Box flexbox */}

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 4,
                                    justifyContent: 'center',
                                    maxWidth: '100%',
                                }}
                            >
                                {/* Left section (replacing Grid item xs=12 md=8) */}
                                <Box
                                    sx={{
                                        flex: '1 1 50%',
                                    }}
                                >
                                    {/* Metal Details Accordion */}
                                    <Accordion defaultExpanded sx={{ mb: 3, borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E65100' }} />}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Settings sx={{ color: '#E65100', fontSize: 20 }} />
                                                <Typography fontWeight={700} fontSize={16} color="#2C2C2C" letterSpacing={0.5}>
                                                    METAL DETAILS
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 3,
                                                }}
                                            >
                                                {[
                                                    { label: 'Karatage', value: product.karatage },
                                                    { label: 'Material Colour', value: product.materialColor },
                                                    { label: 'Gross Weight', value: product.grossWeight },
                                                    { label: 'Metal', value: product.metal },
                                                ].map(({ label, value }) => (
                                                    <Box
                                                        key={label}
                                                        sx={{
                                                            flex: '1 1 45%', // roughly half width with gaps
                                                            minWidth: '140px',
                                                        }}
                                                    >
                                                        <Typography fontSize={13} color="#666" fontWeight={500} mb={0.8} letterSpacing={0.3}>
                                                            {label}
                                                        </Typography>
                                                        <Typography fontWeight={600} fontSize={15} color="#2C2C2C" letterSpacing={0.3}>
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* Diamond Details Accordion */}
                                    <Accordion sx={{ mb: 3, borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E65100' }} />}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Diamond sx={{ color: '#E65100', fontSize: 20 }} />
                                                <Typography fontWeight={700} fontSize={16} color="#2C2C2C" letterSpacing={0.5}>
                                                    DIAMOND DETAILS
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {product.diamondDetails.split('\n').map((line, idx) => (
                                                <Typography key={idx} gutterBottom fontSize={14} sx={{ color: '#5a4a45', whiteSpace: 'pre-line' }}>
                                                    {line}
                                                </Typography>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* General Details Accordion */}
                                    <Accordion sx={{ mb: 3, borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E65100' }} />}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Settings sx={{ color: '#E65100', fontSize: 20 }} />
                                                <Typography fontWeight={700} fontSize={16} color="#2C2C2C" letterSpacing={0.5}>
                                                    GENERAL DETAILS
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography sx={{ color: '#5a4a45', fontSize: 14, whiteSpace: 'pre-line' }}>
                                                {product.generalDetails}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* Description Accordion */}
                                    <Accordion sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E65100' }} />}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Description sx={{ color: '#E65100', fontSize: 20 }} />
                                                <Typography fontWeight={700} fontSize={16} color="#2C2C2C" letterSpacing={0.5}>
                                                    DESCRIPTION
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography sx={{ color: '#5a4a45', fontSize: 14, whiteSpace: 'pre-line' }}>
                                                {product.description}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>

                                {/* Right section (replacing Grid item xs=12 md=4) */}
                                <Box
                                    sx={{
                                        flex: '1 1 40%', // approx 4/12 = 33%, a bit less for spacing
                                        minWidth: { xs: '100%', sm: '320px', md: '400px' },
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product.sideImage}
                                        alt="Product side view"
                                        sx={{
                                            maxWidth: { xs: '280px', sm: '300px', md: '400px' },
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: 3,
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                                            userSelect: 'none',
                                            pointerEvents: 'none',
                                        }}
                                        draggable={false}
                                    />
                                </Box>
                            </Box>


                            <Box
                                sx={{
                                    mt: 5,
                                    p: 3,
                                    bgcolor: '#FFF3E0',
                                    borderRadius: 3,
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        bgcolor: '#E65100',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Settings sx={{ color: '#fff', fontSize: 22 }} />
                                </Box>
                                <Typography
                                    sx={{ color: '#E65100', fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}
                                >
                                    Enjoy sparkling jewellery! We provide free jewellery cleaning services!
                                </Typography>
                            </Box>
                        </>
                    )}

                    {activeTab === 'breakup' && (
                        <Box
                            sx={{
                                p: { xs: 3, sm: 5 },
                                textAlign: 'center',
                                color: '#615149',
                                fontSize: 16,
                                fontFamily: 'serif',
                            }}
                        >
                            <Typography sx={{ mb: 2 }}>
                                Price breakup details will be displayed here...
                            </Typography>
                            <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'left' }}>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Gold:</strong> ₹12,000
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Diamond:</strong> ₹2,000
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Other:</strong> ₹955
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: "center",
                        justifyContent: { xs: "stretch", sm: "space-between" },
                        gap: { xs: 2, sm: 2 },
                        bgcolor: "#fff",
                        borderRadius: "14px",
                        boxShadow: "0 2px 14px #ede4dc, 0 0px 2px #f6f1ec",
                        p: { xs: 1, sm: "10px 18px" },
                        mt: { xs: 2, sm: 3 },
                        width: "100%",
                        maxWidth: 420,
                        mx: "auto",
                        minHeight: 45,
                    }}
                >
                    {/* Price */}
                    <Typography
                        sx={{
                            fontFamily: 'serif',
                            fontSize: { xs: "1.18rem", sm: "1.24rem" },
                            fontWeight: 600,
                            color: "#37200e",
                            minWidth: 94,
                            letterSpacing: "0.01em",
                        }}
                    >
                        ₹14,955
                    </Typography>

                    {/* Weight Select */}
                    <Select
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Weight" }}
                        sx={{
                            fontWeight: 500,
                            fontFamily: "serif",
                            fontSize: "15px",
                            color: "#222",
                            bgcolor: "#faf5ee",
                            borderRadius: "24px",
                            px: 2,
                            py: 0.3,
                            minWidth: 92,
                            boxShadow: "0 2px 10px #f1e7dd",
                            "& .MuiSelect-icon": {
                                color: "#82705a",
                                fontSize: "1.2em"
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                <ScaleRoundedIcon sx={{ color: "#8c7154", fontSize: 20 }} />
                            </InputAdornment>
                        }
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    borderRadius: 2
                                }
                            }
                        }}
                    >
                        {weightOptions.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={() => navigate('/cart')}
                        variant="contained"
                        disableElevation
                        sx={{
                            minWidth: 120,
                            bgcolor: "#7e232a",
                            color: "#fff",
                            fontWeight: 600,
                            fontFamily: "inherit",
                            fontSize: "1.03rem",
                            px: 2.5,
                            py: 1,
                            borderRadius: "28px",
                            textTransform: "none",
                            boxShadow: "0 3px 20px #e7cfc8, 0 0px 2px #f6f1ec",
                            whiteSpace: "nowrap",
                            "&:hover": {
                                bgcolor: "#9d2531",
                            },
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}
