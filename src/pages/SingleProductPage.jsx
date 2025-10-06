import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Container,
    Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper
} from '@mui/material';
import {
    Share,
    ExpandMore,
    Settings,
    Diamond,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';
import { publicUrl } from '../commonComponents/PublicUrl';
import LocationSelector from '../commonComponents/LocationSelector';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addToWishlist, removeFromWishlist } from '../store/Action';
import { toast, ToastContainer } from 'react-toastify';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createSelector } from '@reduxjs/toolkit';
import ProductReviewsSection from '../Reviews/ProductReviewsSection';

export const selectWishlist = createSelector(
    [state => Array.isArray(state.app?.wishlist) ? state.app.wishlist : []],
    wishlist => [...wishlist]  // creates a new array to avoid identity reuse warning
);

const parseVariants = (raw) => {
    try {
        let arr = raw;
        // CASE 1: Single string (the whole array as a string): JSON.parse it first
        if (typeof arr === 'string') arr = JSON.parse(arr);

        // CASE 2: Array with a single string element (the array is [string])
        if (Array.isArray(arr) && arr.length === 1 && typeof arr[0] === 'string') {
            arr = JSON.parse(arr[0]);
        }

        if (!Array.isArray(arr)) return [];

        return arr.map((v, i) => ({
            ...v,
            _key: v._key || `v-${i}`,
            label: v.label || '',
            mrp: v.mrp ? Number(v.mrp) : null,
            discount: v.discount ? Number(v.discount) : null,
            gst: v.gst ? Number(v.gst) : null,
            retail_price: v.retail_price ? Number(v.retail_price) : null,
            final_price: v.final_price ? Number(v.final_price) : (v.finalPrice ? Number(v.finalPrice) : null),
            in_stock: v.in_stock ? String(v.in_stock).toLowerCase() === 'yes' : false,
        }));
    } catch (e) {
        console.error('Error parsing variants:', e);
        return [];
    }
};


export default function SingleProductPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const navigate = useNavigate();
    const { id } = useParams();
    const best = product?.bestVariant ?? {};
    const wishlist = useSelector(selectWishlist);
    const dispatch = useDispatch();
    const [units, setUnits] = useState(1);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const handleTabChange = (tab) => setActiveTab(tab);
    // Track current main image index
    const [mainImage, setMainImage] = useState(product?.media[0]?.url || '');
    // For zoom effect
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);


    // // 1:
    // const isWishlisted = !!product && wishlist.some(item => item._id === product._id);

    // //2:
    const variant = product?.quantity?.[selectedVariantIndex];
    const combinedId = `${product?._id}-${variant?.weight ?? 'undef'}-${variant?.carat ?? 'undef'}`;
    const isWishlisted = wishlist.some(item => item._id === combinedId);

    const canAddToCart = Boolean(product?.stock === 'yes');
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out this product: ${product.name}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => toast.success('Link copied to clipboard!'))
                .catch(() => toast.error('Failed to copy link.'));
        }
    };

    // const handleWishlistClick = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     if (isWishlisted) {
    //         dispatch(removeFromWishlist(product._id));
    //         toast.info('Removed from Wishlist');
    //     } else {
    //         // Find the currently selected variant!
    //         const variant = product.quantity[selectedVariantIndex];
    //         delete variant.weight;
    //         const wishlistItem = {
    //             ...product,
    //             selectedVariant: variant,
    //             price: variant.final_price ?? variant.finalPrice ?? 0, // Store price on top level for Wishlist UI
    //         };
    //         dispatch(addToWishlist(wishlistItem));
    //         toast.info('Added to Wishlist');
    //     }
    // };


    // Fetch product data from the API

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const variant = product.quantity[selectedVariantIndex];
        // Create a unique key for each variant, so multiple can be added
        const combinedId = `${product._id}-${variant.weight ?? "undef"}-${variant.carat ?? "undef"}`;

        // Build a clean wishlist object
        const wishlistItem = {
            ...product,
            _id: combinedId, // uniqueness per variant!
            selectedVariant: { ...variant }, // always copy!
            price: variant.final_price ?? variant.finalPrice ?? 0,
        };

        // Update your isWishlisted to check for this combinedId!
        if (wishlist.some(item => item._id === combinedId)) {
            dispatch(removeFromWishlist(combinedId));
            toast.info('Removed from Wishlist');
        } else {
            dispatch(addToWishlist(wishlistItem));
            toast.info('Added to Wishlist');
        }
    };


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/user/product/${id}`);
            const p = response.data;
            const variants = parseVariants(p.quantity);

            // Extract relevant data from the response and set it in state
            const fetchedProduct = {
                ...p,
                price: parseFloat(p.consumer_price),
                originalPrice: parseFloat(p.mrp),
                frontImage: publicUrl(p?.media[0]?.url) || '',
                sideImage: p?.media[1] ? publicUrl(p?.media[1]?.url) : '',
                quantity: variants,
                bestVariant: variants.find(v => v.in_stock) || variants[0],
            };
            setProduct(fetchedProduct);

            // Set the first image in media array as the main image
            if (fetchedProduct?.media?.length > 0) {
                setMainImage(publicUrl(fetchedProduct.media[0]?.url));
            }


            setSelectedVariantIndex(fetchedProduct.bestVariant ? variants.indexOf(fetchedProduct.bestVariant) : 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) {
            console.warn('Product ID is undefined!');
            return;
        }
        fetchData();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '20px', fontSize: '3rem', minHeight: "50vh" }}>Loading...</div>;

    // if (!product) return <div style={{
    //     minHeight: "50vh",
    //     display: "flex",
    //     flexDirection: "column"
    // }}>
    //     <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.5rem', flexGrow: 1 }}>Product not found</div>
    // </div >;

    if (!product) return <div style={{ textAlign: 'center', padding: '20px', fontSize: '3rem', minHeight: "50vh" }}>Product not found</div>;

    const selectedVariant = product.quantity[selectedVariantIndex];

    const finalPrice = selectedVariant.final_price ?? selectedVariant.finalPrice;
    const gst = selectedVariant.gst;
    const makingPrice = selectedVariant.makingPrice;
    const weight = selectedVariant.weight;
    const pricePerGram = selectedVariant.pricePerGram;
    const totalWeight = selectedVariant.totalWeight;
    const discount = selectedVariant.discount;


    // const unitPrice = finalPrice ?? 0;
    const unitPrice = Number(
        selectedVariant?.final_price ?? selectedVariant?.finalPrice ?? 0
    );

    // //2:
    const handleAddToCart = () => {
        if (!product) return;
        const variant = product.quantity[selectedVariantIndex];
        if (!variant) return;

        const cartItem = {
            ...product,
            selectedVariant: variant,
            cartQty: 1,  // initial quantity
            unitPrice: Number(variant.final_price ?? variant.finalPrice ?? 0),
        };

        toast.success('Item added to cart!', { position: 'top-right', autoClose: 2000 });
        dispatch(addData(cartItem));
    };

    // Handle increase/decrease in units, while ensuring the total price is updated correctly
    const increaseUnits = () => {
        setUnits((prev) => {
            const updatedUnits = prev + 1;
            // Update the total price whenever the unit changes
            const updatedTotal = unitPrice * updatedUnits;
            return updatedUnits;
        });
    };

    const decreaseUnits = () => {
        setUnits((prev) => {
            const updatedUnits = prev > 1 ? prev - 1 : 1;
            // Update the total price whenever the unit changes
            const updatedTotal = unitPrice * updatedUnits;
            return updatedUnits;
        });
    };

    const subTotal = Number(pricePerGram) * Number(totalWeight) + Number(makingPrice);
    const discountAmount = discount ? subTotal * (Number(discount) / 100) : 0;
    const discountedValue = subTotal - discountAmount;

    const handleThumbnailClick = (imageUrl) => {
        // Update the main image when a thumbnail is clicked
        setMainImage(imageUrl);
    };

    return (
        <Box bgcolor="#fff" py={6}>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
            <Container maxWidth="xl" sx={{ maxWidth: 1140 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ xs: "column-reverse", sm: "row" }} gap={{ xs: 3, md: 0 }} mb={4}>
                    <Box sx={{ width: { sm: "56%" } }}>
                        {/* Product Specs Chips */}
                        <Box sx={{ display: 'flex', justifyContent: "center", textAlign: 'center', mb: 1 }}>
                            <Chip
                                icon={<Diamond sx={{ color: '#fff' }} />}
                                label={product?.productvariety}
                                sx={{
                                    bgcolor: '#44170D',
                                    color: '#fff',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    mx: 1,
                                    height: 32,
                                    px: 1.5,
                                    boxShadow: '0 1px 3px rgba(230, 120, 30, 0.3)',
                                    textTransform: 'capitalize',
                                }}
                            />
                            <Chip
                                label={`Stock: ${product?.stock === 'yes' ? 'In Stock' : 'Out of Stock'}`}
                                sx={{
                                    bgcolor: '#44170D',
                                    color: '#fff',
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
                                fontSize: { xs: 24, md: 34 },
                                color: '#2C2C2C',
                                textAlign: 'center',
                                mb: 1,
                                letterSpacing: '0.03em',
                                textTransform: 'capitalize',
                            }}
                        >
                            {product?.name}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 1 }}>
                            {product.quantity.map((variant, idx) => (
                                <Chip
                                    key={variant._key || idx}
                                    label={`${variant.weight}g / ${variant.carat}kt`}
                                    color={selectedVariantIndex === idx ? 'primary' : 'default'}
                                    onClick={() => setSelectedVariantIndex(idx)}
                                    sx={{
                                        border: selectedVariantIndex === idx ? '2px solid #68171b' : '1px solid #ddd',
                                        fontWeight: 600,
                                        fontSize: 15,
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>


                        {/* Price with old price */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                            <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#2C2C2C' }}>
                                {Number(unitPrice * units).toFixed(2)}
                            </Typography>

                        </Box>

                        <Typography variant="caption" display="block" textAlign="center" sx={{ fontSize: 13, color: '#666', mb: 1 }}>
                            incl taxes and charges
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                            <IconButton
                                // onClick={() => navigate('/wishlist')}
                                onClick={handleWishlistClick}
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
                                {/* <FavoriteBorder fontSize="medium" /> */}
                                {isWishlisted ? (
                                    <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
                                ) : (
                                    <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
                                )}
                            </IconButton>
                            <IconButton
                                onClick={handleShare}
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

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }} >
                            <div className="input-group" style={{ maxWidth: '160px' }}>
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={decreaseUnits}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    value={units}
                                    readOnly
                                    aria-label="Current quantity"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={increaseUnits}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <Box sx={{ textAlign: 'center' }}>
                                <Button variant="contained" onClick={handleAddToCart} disabled={!canAddToCart} title={!canAddToCart ? 'Selected variant is out of stock' : 'Add to Cart'}>
                                    Add to Cart
                                </Button>
                            </Box>
                        </Box>


                    </Box>

                    {/* Product Images */}
                    <Box sx={{ width: { sm: "45%" } }}>
                        {/* <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { md: 2 },
                                borderRadius: 3,
                                position: 'relative',
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                    <Box component="img" src={product?.frontImage} alt="Front view" sx={{ height: 300, width: '100%', objectFit: 'contain', userSelect: 'none', boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)', borderRadius: 2 }} draggable={false} />
                            </Box>  
                            <Box>
                                {product?.sideImage && (
                                    <Box component="img" src={product?.sideImage} alt="Side view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 8px 28px rgb(0 0 0 / 0.08)', borderRadius: 4 }} draggable={false} />
                                )}
                            </Box>
                        </Box> */}

                        {/* 2: zoom view */}
                        {/* <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { md: 2 },
                                borderRadius: 3,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ width: '100%', height: 300, borderRadius: 2 }}>
                                    <Box
                                        component="img"
                                        src={product?.frontImage}
                                        alt="Front view"
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'contain',
                                            userSelect: 'none',
                                            boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)',
                                            borderRadius: 2,
                                            transition: 'filter 0.3s',
                                            filter: isZoomed ? 'brightness(80%)' : 'none',
                                            cursor: 'zoom-in',
                                            display: 'block'
                                        }}
                                        draggable={false}
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                    {isZoomed && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                pointerEvents: 'none',
                                                borderRadius: 3,
                                                zIndex: 10,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={product?.frontImage}
                                                alt="Zoom view"
                                                sx={{
                                                    position: 'absolute',
                                                    top: `${-zoomPos.y * 2}%`,
                                                    left: `${-zoomPos.x * 2}%`,
                                                    width: '300%',
                                                    height: '300%',
                                                    objectFit: 'cover',
                                                    borderRadius: 4,
                                                    boxShadow: '0 0 20px #2226',
                                                    pointerEvents: 'none',
                                                    transition: 'top 0.05s, left 0.05s',
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                            </Box>
                            <Box>
                                {product?.sideImage && (
                                    <Box component="img" src={product?.sideImage} alt="Side view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 8px 28px rgb(0 0 0 / 0.08)', borderRadius: 4 }} draggable={false} />
                                )}
                            </Box>
                        </Box> */}

                        {/* 3: */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: { md: 2 },
                                borderRadius: 3,
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid #ccc'
                            }}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ width: '100%', height: 300, borderRadius: 2 }}>
                                    <Box
                                        component="img"
                                        src={mainImage}
                                        alt="Main view"
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'contain',
                                            userSelect: 'none',
                                            boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)',
                                            borderRadius: 2,
                                        }}
                                        draggable={false}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Thumbnails Below Main Image */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                            {product?.media?.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: mainImage === publicUrl(image?.url) ? '2px solid #68171b' : '1px solid #ddd',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={publicUrl(image?.url)}  // Adjust the publicUrl if needed
                                        alt={`Thumbnail ${index}`}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            border: mainImage === image?.url ? '2px solid #68171b' : 'none',
                                        }}
                                        onClick={() => handleThumbnailClick((publicUrl(image?.url)))}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Delivery Details */}
                <Box sx={{ bgcolor: '#fff', py: 2, borderRadius: 2, border: '1px solid #eee', mb: { xs: 6, sm: 8 }, mx: 'auto', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C2C2C', mb: 3, fontFamily: 'serif' }}>
                        Delivery Details
                    </Typography>

                    {/* location pincode */}
                    <LocationSelector />
                </Box>


                {/* reviews section */}
                {
                    product && <ProductReviewsSection
                        product={product}
                        onRefreshProduct={fetchData}
                    />
                }

                {/* Jewellery Details */}
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: { xs: 3, sm: 5 }, maxWidth: 920, mx: 'auto', boxShadow: '0 4px 32px rgb(242 227 213 / 0.8)' }}>
                    <Typography sx={{ fontFamily: 'serif', fontWeight: 400, fontSize: { xs: 24, sm: 28 }, color: '#2C2C2C', textAlign: 'center', mb: 5, letterSpacing: 0.5 }}>
                        Jewellery Details
                    </Typography>

                    {/* Tabs */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, borderBottom: '1px solid #eee', gap: 3, flexWrap: 'wrap' }}>
                        {[{ key: 'details', label: 'Product Details' }, { key: 'breakup', label: 'Price Breakup' }].map(({ key, label }) => (
                            <Button key={key} onClick={() => handleTabChange(key)} sx={{ px: 4, py: 1.4, borderRadius: 30, fontWeight: 600, textTransform: 'none', fontSize: 16, minWidth: 160, bgcolor: activeTab === key ? '#44170D' : 'transparent', color: activeTab === key ? '#fff' : '#757575', boxShadow: activeTab === key ? '0 6px 15px rgb(139 69 19 / 0.45)' : 'none', transition: 'all 0.3s ease', '&:hover': { bgcolor: activeTab === key ? '#7A3A0F' : '#f5f5f5', color: activeTab === key ? '#fff' : '#5a5a5a' } }}>
                                {label}
                            </Button>
                        ))}
                    </Box>

                    {/* Tab Content */}
                    {activeTab === 'details' && (
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
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                    {[{ label: 'Material', value: product?.productvariety }, { label: 'Description', value: product?.description }].map(({ label, value }) => (
                                        <Box key={label} sx={{ flex: '1 1 45%', minWidth: '140px' }}>
                                            <Typography fontSize={13} color="#666" fontWeight={500} mb={0.8} letterSpacing={0.3} textTransform={'capitalize'}>
                                                {label}
                                            </Typography>
                                            <Typography fontWeight={600} fontSize={15} color="#2C2C2C" letterSpacing={0.3} textTransform={'capitalize'} sx={{ wordBreak: 'break-all' }} >
                                                {value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    )}

                    {activeTab === 'breakup' && (
                        <TableContainer component={Paper} sx={{
                            borderRadius: 2, overflowX: 'auto', boxShadow: 'none', border: '1px solid #eee', mt: 2, '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                        }}>
                            <Table sx={{ minWidth: 550 }} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>PRODUCT DETAILS</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>RATE</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>WEIGHT</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>VALUE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* variety Row */}
                                    <TableRow>
                                        <TableCell>
                                            <Box>
                                                <Typography sx={{ fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }}>  {product?.productvariety}</Typography>
                                                {/* <Typography sx={{ fontSize: 11, color: '#888', mt: -0.4 }}>18KT</Typography> */}
                                            </Box>
                                        </TableCell>
                                        <TableCell>₹ {pricePerGram}/g</TableCell>
                                        <TableCell>{totalWeight}g</TableCell>
                                        <TableCell>₹ {Number(pricePerGram * totalWeight).toFixed(2)}</TableCell>

                                    </TableRow>
                                    {/* Making Charges Row */}
                                    <TableRow>
                                        <TableCell>Making Charges</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>₹ {makingPrice}</TableCell>
                                    </TableRow>

                                    {/* Discount Row */}
                                    <TableRow>
                                        <TableCell>Discount</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell> {discount ? <> ₹ {discountAmount.toFixed(2)}</> : <>-</>}</TableCell>
                                        {/* <TableCell>{discount}%</TableCell> */}
                                    </TableRow>

                                    {/* GST Row */}
                                    <TableRow>
                                        <TableCell>GST</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>{gst ? <>₹ {(Number(discountedValue) * (Number(gst) / 100)).toFixed(2)}</> : <>-</>}</TableCell>
                                        {/* <TableCell>{gst}%</TableCell> */}
                                    </TableRow>

                                </TableBody>
                            </Table>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 3, py: 2 }}>
                                <Typography sx={{ fontWeight: 700, fontFamily: 'serif', fontSize: 19, letterSpacing: 0.5, mr: 2 }}>
                                    Grand Total :
                                </Typography>
                                <Typography sx={{ fontWeight: 700, fontFamily: 'serif', fontSize: 22 }}>
                                    {/* ₹ {Math.round(finalPrice)} */}
                                    {Number(finalPrice).toFixed(2)}
                                </Typography>
                            </Box>
                        </TableContainer>
                    )}
                </Box>
            </Container >
        </Box >
    );
}


