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
    FavoriteBorder,
    Share,
    ExpandMore,
    Settings,
    Diamond,
} from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../common components/AxiosInstance';
import { publicUrl } from '../common components/PublicUrl';
import LocationSelector from '../common components/LocationSelector';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../store/Action';
import { toast, ToastContainer } from 'react-toastify';

const normalizeNumber = val => {
    const n = parseFloat(val);
    return Number.isNaN(n) ? null : n;
};

const parseVariants = (raw) => {
    try {
        let arr = raw;
        if (typeof raw === 'string') arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];

        // if inner entries are strings, parse them
        arr = arr.map((x) => (typeof x === 'string' ? JSON.parse(x) : x));

        const num = (x) => (x === '' || x == null ? null : Number(x));

        return arr.map((v, i) => {
            // flatten weird shape: move v["0"] fields to top
            const core = (v && typeof v === 'object' && v['0'] && typeof v['0'] === 'object')
                ? { ...v, ...v['0'] }
                : v;

            return {
                ...core,
                _key: core._key || `v-${i}`,
                label: core.label || '',
                mrp: num(core.mrp),
                discount: num(core.discount),
                gst: num(core.gst),
                retail_price: num(core.retail_price),
                final_price: num(core.final_price ?? core.finalPrice),
                in_stock: core.in_stock ? String(core.in_stock).toLowerCase() === 'yes' : false,
            };
        });
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

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart?.items || []);
    const [units, setUnits] = useState(1);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const handleTabChange = (tab) => setActiveTab(tab);

    // Fetch product data from the API
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

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const selectedVariant = product.quantity[selectedVariantIndex];
    const finalPrice = selectedVariant?.["0"]?.finalPrice;
    const gst = selectedVariant?.["0"]?.gst;
    const makingPrice = selectedVariant?.["0"]?.makingPrice;
    const weight = selectedVariant?.["0"]?.weight;
    const pricePerGram = selectedVariant?.["0"]?.pricePerGram;
    const totalWeight = selectedVariant?.["0"]?.totalWeight;
    const discount = selectedVariant?.["0"]?.discount;
    // console.log('Final Price:', finalPrice);

    // const unitPrice = finalPrice ?? 0;
    const unitPrice = Number(
        selectedVariant?.final_price ?? selectedVariant?.finalPrice ?? 0
    );

    // // 1:
    // const handleAddToCart = () => {
    //     console.log('Adding to cart:', product);
    //     if (!product) return;

    //     const variant = product.quantity[selectedVariantIndex];
    //     if (!variant) return;

    //     const cartItem = {
    //         ...product,
    //         selectedVariant: {
    //             label: variant.label,
    //             mrp: variant.mrp,
    //             discount: variant.discount,
    //             gst: variant.gst,
    //             retail_price: variant.retail_price,
    //             final_price: variant.final_price,
    //             in_stock: variant.in_stock,
    //         },
    //         quantity: units,  // User selected quantity
    //         unitPrice: variant.final_price,  // Price per unit
    //         totalPrice: variant.final_price != null ? variant.final_price * units : null,  // Total price based on quantity
    //     };

    //     toast.success('Item added to cart!', {
    //         position: 'top-right',
    //         autoClose: 2000,
    //     });

    //     dispatch(addData(cartItem));
    // };

    // //2:
    const handleAddToCart = () => {
        if (!product) return;
        const variant = product.quantity[selectedVariantIndex];
        if (!variant) return;

        const unit = Number(variant.final_price ?? variant.finalPrice ?? 0);

        const cartItem = {
            ...product,                   // keeps quantity = [flat variants]
            selectedVariant: { ...variant },
            cartQty: units,               // cart line count
            unitPrice: unit,              // per-unit price
            totalPrice: unit * units,     // line total
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


    return (
        <Box bgcolor="#fff" py={6}>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
            <Container maxWidth="xl" sx={{ maxWidth: 1140 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} gap={{ xs: 5, md: 0 }} mb={4}>
                    <Box sx={{ width: { sm: "38%" } }}>
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

                        {/* Price with old price */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                            {/* <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700, color: '#2C2C2C' }}>
                                ₹{finalPrice || 'Price not available'}
                            </Typography> */}

                            <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#2C2C2C' }}>
                                {/* Total: ₹{unitPrice * units} */}
                                {/* {Math.round(unitPrice * units)} */}
                                {Number(unitPrice * units).toFixed(2)}
                            </Typography>

                        </Box>

                        <Typography variant="caption" display="block" textAlign="center" sx={{ fontSize: 13, color: '#666', mb: 1 }}>
                            incl taxes and charges
                        </Typography>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
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
                                <Button variant="contained" onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                            </Box>
                        </Box>


                    </Box>

                    {/* Product Images */}
                    <Box sx={{ width: { sm: "58%" } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                borderRadius: 3,
                                position: 'relative',
                            }}
                        >
                            <Box>
                                <Box component="img" src={product?.frontImage} alt="Front view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)', borderRadius: 2 }} draggable={false} />
                            </Box>
                            <Box>
                                {product?.sideImage && (
                                    <Box component="img" src={product?.sideImage} alt="Side view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 8px 28px rgb(0 0 0 / 0.08)', borderRadius: 4 }} draggable={false} />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Delivery Details */}
                <Box sx={{ bgcolor: '#fff', py: 2, borderRadius: 2, border: '1px solid #eee', mb: { xs: 6, sm: 8 }, maxWidth: 580, mx: 'auto', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C2C2C', mb: 3, fontFamily: 'serif' }}>
                        Delivery Details
                    </Typography>

                    {/* location pincode */}
                    <LocationSelector />
                </Box>

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
                    )}

                    {/* {activeTab === 'breakup' && (
                        <Box>
                            <Typography variant="body1">Price Per Gram - ₹{pricePerGram}/g</Typography>
                            <Typography variant="body1">Total Weight - {totalWeight}</Typography>
                            <Typography variant="body1">Total Price - ₹{pricePerGram * totalWeight}</Typography>
                            <Typography variant="body1">Discount: {discount}%</Typography>
                            <Typography variant="body1">GST: {gst}%</Typography>
                            <Typography variant="body1">Making Charges: {makingPrice}</Typography>
                            <Typography variant="body1">Final Price - ₹{Math.round(finalPrice)}</Typography>
                        </Box>
                    )} */}

                    {activeTab === 'breakup' && (
                        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 'none', border: '1px solid #eee', mt: 2 }}>
                            <Table>
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
                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>  {product?.productvariety}</Typography>
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
            </Container>
        </Box>
    );
}
// import React, { useEffect, useState } from 'react';
// import {
//     Box,
//     Typography,
//     Button,
//     IconButton,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Chip,
//     Container,
//     Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper
// } from '@mui/material';
// import {
//     FavoriteBorder,
//     Share,
//     ExpandMore,
//     Settings,
//     Diamond,
// } from '@mui/icons-material';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import { useNavigate, useParams } from 'react-router-dom';
// import axiosInstance from '../common components/AxiosInstance';
// import { publicUrl } from '../common components/PublicUrl';
// import LocationSelector from '../common components/LocationSelector';
// import { useDispatch, useSelector } from 'react-redux';
// import { addData } from '../store/Action';
// import { toast, ToastContainer } from 'react-toastify';

// const normalizeNumber = val => {
//     const n = parseFloat(val);
//     return Number.isNaN(n) ? null : n;
// };

// const parseVariants = (raw) => {
//     try {
//         let arr = raw;

//         // Check if raw data is a string and parse the array first
//         if (typeof raw === 'string') {
//             // Parse the stringified array (this will handle the outer array)
//             arr = JSON.parse(raw);
//         }

//         // Now parse each item in the array (which is a stringified object)
//         arr = arr.map((item) => {
//             if (typeof item === 'string') {
//                 return JSON.parse(item); // Parse the inner stringified JSON object
//             }
//             return item; // If it's already an object, return it as is
//         });

//         if (!Array.isArray(arr)) return [];  // Ensure it's an array

//         // Return the mapped variants with proper handling for missing/incorrect fields
//         return arr.map((v, i) => ({
//             _key: v._key || `v-${i}`,
//             label: v.label || '',
//             mrp: normalizeNumber(v.mrp),
//             discount: normalizeNumber(v.discount),
//             gst: normalizeNumber(v.gst),
//             retail_price: normalizeNumber(v.retail_price),
//             final_price: normalizeNumber(v.finalPrice || v.final_price),  // Use correct property name
//             in_stock: v.in_stock ? v.in_stock.toString().toLowerCase() === 'yes' : false,
//             ...v,
//         }));
//     } catch (error) {
//         console.error("Error parsing variants:", error);
//         return [];
//     }
// };

// export default function SingleProductPage() {
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [activeTab, setActiveTab] = useState('details');
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const best = product?.bestVariant ?? {};

//     const dispatch = useDispatch();
//     const cartItems = useSelector(state => state.cart?.items || []);
//     const [units, setUnits] = useState(1);
//     const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

//     const handleTabChange = (tab) => setActiveTab(tab);

//     // Fetch product data from the API
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await axiosInstance.get(`/user/product/${id}`);
//             const p = response.data;
//             const variants = parseVariants(p.quantity);

//             // Extract relevant data from the response and set it in state
//             const fetchedProduct = {
//                 ...p,
//                 price: parseFloat(p.consumer_price),
//                 originalPrice: parseFloat(p.mrp),
//                 frontImage: publicUrl(p?.media[0]?.url) || '',
//                 sideImage: p?.media[1] ? publicUrl(p?.media[1]?.url) : '',
//                 quantity: variants,
//                 bestVariant: variants.find(v => v.in_stock) || variants[0],
//             };
//             setProduct(fetchedProduct);
//             setSelectedVariantIndex(fetchedProduct.bestVariant ? variants.indexOf(fetchedProduct.bestVariant) : 0);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (!id) {
//             console.warn('Product ID is undefined!');
//             return;
//         }
//         fetchData();
//     }, [id]);

//     if (loading) return <div>Loading...</div>;
//     if (!product) return <div>Product not found</div>;

//     const selectedVariant = product.quantity[selectedVariantIndex];
//     const finalPrice = selectedVariant?.["0"]?.finalPrice;
//     const gst = selectedVariant?.["0"]?.gst;
//     const makingPrice = selectedVariant?.["0"]?.makingPrice;
//     const weight = selectedVariant?.["0"]?.weight;
//     const pricePerGram = selectedVariant?.["0"]?.pricePerGram;
//     const totalWeight = selectedVariant?.["0"]?.totalWeight;
//     const discount = selectedVariant?.["0"]?.discount;
//     // console.log('Final Price:', finalPrice);

//     const unitPrice = finalPrice ?? 0;

//     const orderTotal = unitPrice * units;

//     // // 1:
//     // const handleAddToCart = () => {
//     //     console.log('Adding to cart:', product);
//     //     if (!product) return;
//     //     const variant = product.quantity[selectedVariantIndex];
//     //     if (!variant) return;

//     //     const cartItem = {
//     //         ...product,
//     //         selectedVariant: {
//     //             label: variant.label,
//     //             mrp: variant.mrp,
//     //             discount: variant.discount,
//     //             gst: variant.gst,
//     //             retail_price: variant.retail_price,
//     //             final_price: variant.final_price,
//     //             in_stock: variant.in_stock,
//     //         },
//     //         quantity: units,
//     //         unitPrice: variant.final_price,
//     //         totalPrice: variant.final_price != null ? variant.final_price * units : null,
//     //     };
//     //     toast.success('Item added to cart!', {
//     //         position: 'top-right',
//     //         autoClose: 2000,
//     //     });

//     //     dispatch(addData(cartItem));
//     // };

//     // // 2:
//     const handleAddToCart = () => {
//         console.log('Adding to cart:', product);
//         if (!product) return;

//         const variant = product.quantity[selectedVariantIndex];
//         if (!variant) return;

//         const cartItem = {
//             ...product,
//             selectedVariant: {
//                 label: variant.label,
//                 mrp: variant.mrp,
//                 discount: variant.discount,
//                 gst: variant.gst,
//                 retail_price: variant.retail_price,
//                 final_price: variant.final_price,
//                 in_stock: variant.in_stock,
//             },
//             quantity: units,  // User selected quantity
//             unitPrice: variant.final_price,  // Price per unit
//             totalPrice: variant.final_price != null ? variant.final_price * units : null,  // Total price based on quantity
//         };

//         toast.success('Item added to cart!', {
//             position: 'top-right',
//             autoClose: 2000,
//         });

//         dispatch(addData(cartItem));
//     };

//     // Handle increase/decrease in units, while ensuring the total price is updated correctly
//     const increaseUnits = () => {
//         setUnits((prev) => {
//             const updatedUnits = prev + 1;
//             // Update the total price whenever the unit changes
//             const updatedTotal = unitPrice * updatedUnits;
//             return updatedUnits;
//         });
//     };

//     const decreaseUnits = () => {
//         setUnits((prev) => {
//             const updatedUnits = prev > 1 ? prev - 1 : 1;
//             // Update the total price whenever the unit changes
//             const updatedTotal = unitPrice * updatedUnits;
//             return updatedUnits;
//         });
//     };

//     const subTotal = Number(pricePerGram) * Number(totalWeight) + Number(makingPrice);

//     const discountAmount = discount ? subTotal * (Number(discount) / 100) : 0;

//     const discountedValue = subTotal - discountAmount;


//     return (
//         <Box bgcolor="#fff" py={6}>
//             <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
//             <Container maxWidth="xl" sx={{ maxWidth: 1140 }}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} gap={{ xs: 5, md: 0 }} mb={4}>
//                     <Box sx={{ width: { sm: "38%" } }}>
//                         {/* Product Specs Chips */}
//                         <Box sx={{ display: 'flex', justifyContent: "center", textAlign: 'center', mb: 1 }}>
//                             <Chip
//                                 icon={<Diamond sx={{ color: '#fff' }} />}
//                                 label={product?.productvariety}
//                                 sx={{
//                                     bgcolor: '#44170D',
//                                     color: '#fff',
//                                     fontSize: 13,
//                                     fontWeight: 600,
//                                     mx: 1,
//                                     height: 32,
//                                     px: 1.5,
//                                     boxShadow: '0 1px 3px rgba(230, 120, 30, 0.3)',
//                                 }}
//                             />
//                             <Chip
//                                 label={`Stock: ${product?.stock === 'yes' ? 'In Stock' : 'Out of Stock'}`}
//                                 sx={{
//                                     bgcolor: '#44170D',
//                                     color: '#fff',
//                                     fontSize: 13,
//                                     fontWeight: 600,
//                                     mx: 1,
//                                     height: 32,
//                                     px: 1.5,
//                                     boxShadow: '0 1px 3px rgba(230, 120, 30, 0.3)',
//                                 }}
//                             />
//                         </Box>

//                         {/* Title */}
//                         <Typography
//                             component="h1"
//                             sx={{
//                                 fontFamily: 'serif',
//                                 fontWeight: 400,
//                                 fontSize: { xs: 24, md: 34 },
//                                 color: '#2C2C2C',
//                                 textAlign: 'center',
//                                 mb: 1,
//                                 letterSpacing: '0.03em',
//                                 textTransform: 'capitalize',
//                             }}
//                         >
//                             {product?.name}
//                         </Typography>

//                         {/* Price with old price */}
//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
//                             {/* <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700, color: '#2C2C2C' }}>
//                                 ₹{finalPrice || 'Price not available'}
//                             </Typography> */}

//                             <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#2C2C2C' }}>
//                                 {/* Total: ₹{unitPrice * units} */}
//                                 {/* {Math.round(unitPrice * units)} */}
//                                 {Number(unitPrice * units).toFixed(2)}
//                             </Typography>

//                         </Box>

//                         <Typography variant="caption" display="block" textAlign="center" sx={{ fontSize: 13, color: '#666', mb: 1 }}>
//                             incl taxes and charges
//                         </Typography>

//                         {/* Action Buttons */}
//                         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
//                             <IconButton
//                                 onClick={() => navigate('/wishlist')}
//                                 size="large"
//                                 aria-label="Add to wishlist"
//                                 sx={{
//                                     border: '1px solid #ddd',
//                                     color: '#666',
//                                     borderRadius: '50%',
//                                     width: 46,
//                                     height: 46,
//                                     transition: 'background-color 0.3s',
//                                     '&:hover': { bgcolor: '#f3f1ee' },
//                                 }}
//                             >
//                                 <FavoriteBorder fontSize="medium" />
//                             </IconButton>
//                             <IconButton
//                                 size="large"
//                                 aria-label="Share"
//                                 sx={{
//                                     border: '1px solid #ddd',
//                                     color: '#666',
//                                     borderRadius: '50%',
//                                     width: 46,
//                                     height: 46,
//                                     transition: 'background-color 0.3s',
//                                     '&:hover': { bgcolor: '#f3f1ee' },
//                                 }}
//                             >
//                                 <Share fontSize="medium" />
//                             </IconButton>
//                         </Box>

//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }} >
//                             <div className="input-group" style={{ maxWidth: '160px' }}>
//                                 <button
//                                     className="btn btn-outline-secondary"
//                                     type="button"
//                                     onClick={decreaseUnits}
//                                     aria-label="Decrease quantity"
//                                 >
//                                     -
//                                 </button>
//                                 <input
//                                     type="text"
//                                     className="form-control text-center"
//                                     value={units}
//                                     readOnly
//                                     aria-label="Current quantity"
//                                 />
//                                 <button
//                                     className="btn btn-outline-secondary"
//                                     type="button"
//                                     onClick={increaseUnits}
//                                     aria-label="Increase quantity"
//                                 >
//                                     +
//                                 </button>
//                             </div>


//                             <Box sx={{ textAlign: 'center' }}>
//                                 <Button variant="contained" onClick={handleAddToCart}>
//                                     Add to Cart
//                                 </Button>
//                             </Box>
//                         </Box>


//                     </Box>

//                     {/* Product Images */}
//                     <Box sx={{ width: { sm: "58%" } }}>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 gap: 2,
//                                 borderRadius: 3,
//                                 position: 'relative',
//                             }}
//                         >
//                             <Box>
//                                 <Box component="img" src={product?.frontImage} alt="Front view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 6px 20px rgb(0 0 0 / 0.10)', borderRadius: 2 }} draggable={false} />
//                             </Box>
//                             <Box>
//                                 {product?.sideImage && (
//                                     <Box component="img" src={product?.sideImage} alt="Side view" sx={{ height: 300, width: '100%', objectFit: 'cover', userSelect: 'none', boxShadow: '0 8px 28px rgb(0 0 0 / 0.08)', borderRadius: 4 }} draggable={false} />
//                                 )}
//                             </Box>
//                         </Box>
//                     </Box>
//                 </Box>

//                 {/* Delivery Details */}
//                 <Box sx={{ bgcolor: '#fff', py: 2, borderRadius: 2, border: '1px solid #eee', mb: { xs: 6, sm: 8 }, maxWidth: 580, mx: 'auto', textAlign: 'center' }}>
//                     <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C2C2C', mb: 3, fontFamily: 'serif' }}>
//                         Delivery Details
//                     </Typography>

//                     {/* location pincode */}
//                     <LocationSelector />
//                 </Box>

//                 {/* Jewellery Details */}
//                 <Box sx={{ bgcolor: '#fff', borderRadius: 2, p: { xs: 3, sm: 5 }, maxWidth: 920, mx: 'auto', boxShadow: '0 4px 32px rgb(242 227 213 / 0.8)' }}>
//                     <Typography sx={{ fontFamily: 'serif', fontWeight: 400, fontSize: { xs: 24, sm: 28 }, color: '#2C2C2C', textAlign: 'center', mb: 5, letterSpacing: 0.5 }}>
//                         Jewellery Details
//                     </Typography>

//                     {/* Tabs */}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, borderBottom: '1px solid #eee', gap: 3, flexWrap: 'wrap' }}>
//                         {[{ key: 'details', label: 'Product Details' }, { key: 'breakup', label: 'Price Breakup' }].map(({ key, label }) => (
//                             <Button key={key} onClick={() => handleTabChange(key)} sx={{ px: 4, py: 1.4, borderRadius: 30, fontWeight: 600, textTransform: 'none', fontSize: 16, minWidth: 160, bgcolor: activeTab === key ? '#44170D' : 'transparent', color: activeTab === key ? '#fff' : '#757575', boxShadow: activeTab === key ? '0 6px 15px rgb(139 69 19 / 0.45)' : 'none', transition: 'all 0.3s ease', '&:hover': { bgcolor: activeTab === key ? '#7A3A0F' : '#f5f5f5', color: activeTab === key ? '#fff' : '#5a5a5a' } }}>
//                                 {label}
//                             </Button>
//                         ))}
//                     </Box>

//                     {/* Tab Content */}
//                     {activeTab === 'details' && (
//                         <Accordion defaultExpanded sx={{ mb: 3, borderRadius: 3, boxShadow: 'none', border: '1px solid #eee' }}>
//                             <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#E65100' }} />}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <Settings sx={{ color: '#E65100', fontSize: 20 }} />
//                                     <Typography fontWeight={700} fontSize={16} color="#2C2C2C" letterSpacing={0.5}>
//                                         METAL DETAILS
//                                     </Typography>
//                                 </Box>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
//                                     {[{ label: 'Material', value: product?.productvariety }, { label: 'Description', value: product?.description }].map(({ label, value }) => (
//                                         <Box key={label} sx={{ flex: '1 1 45%', minWidth: '140px' }}>
//                                             <Typography fontSize={13} color="#666" fontWeight={500} mb={0.8} letterSpacing={0.3}>
//                                                 {label}
//                                             </Typography>
//                                             <Typography fontWeight={600} fontSize={15} color="#2C2C2C" letterSpacing={0.3}>
//                                                 {value}
//                                             </Typography>
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             </AccordionDetails>
//                         </Accordion>
//                     )}

//                     {/* {activeTab === 'breakup' && (
//                         <Box>
//                             <Typography variant="body1">Price Per Gram - ₹{pricePerGram}/g</Typography>
//                             <Typography variant="body1">Total Weight - {totalWeight}</Typography>
//                             <Typography variant="body1">Total Price - ₹{pricePerGram * totalWeight}</Typography>
//                             <Typography variant="body1">Discount: {discount}%</Typography>
//                             <Typography variant="body1">GST: {gst}%</Typography>
//                             <Typography variant="body1">Making Charges: {makingPrice}</Typography>
//                             <Typography variant="body1">Final Price - ₹{Math.round(finalPrice)}</Typography>
//                         </Box>
//                     )} */}

//                     {activeTab === 'breakup' && (
//                         <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 'none', border: '1px solid #eee', mt: 2 }}>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>PRODUCT DETAILS</TableCell>
//                                         <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>RATE</TableCell>
//                                         <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>WEIGHT</TableCell>
//                                         <TableCell sx={{ fontWeight: 700, fontSize: 13 }}>VALUE</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {/* variety Row */}
//                                     <TableRow>
//                                         <TableCell>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: 15, fontWeight: 600 }}>  {product?.productvariety}</Typography>
//                                                 {/* <Typography sx={{ fontSize: 11, color: '#888', mt: -0.4 }}>18KT</Typography> */}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell>₹ {pricePerGram}/g</TableCell>
//                                         <TableCell>{totalWeight}g</TableCell>
//                                         <TableCell>₹ {Number(pricePerGram * totalWeight).toFixed(2)}</TableCell>

//                                     </TableRow>
//                                     {/* Making Charges Row */}
//                                     <TableRow>
//                                         <TableCell>Making Charges</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell>₹ {makingPrice}</TableCell>
//                                     </TableRow>

//                                     {/* Discount Row */}
//                                     <TableRow>
//                                         <TableCell>Discount</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell> {discount ? <> ₹ {discountAmount.toFixed(2)}</> : <>-</>}</TableCell>
//                                         {/* <TableCell>{discount}%</TableCell> */}
//                                     </TableRow>

//                                     {/* GST Row */}
//                                     <TableRow>
//                                         <TableCell>GST</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell>-</TableCell>
//                                         <TableCell>{gst ? <>₹ {(Number(discountedValue) * (Number(gst) / 100)).toFixed(2)}</> : <>-</>}</TableCell>
//                                         {/* <TableCell>{gst}%</TableCell> */}
//                                     </TableRow>

//                                 </TableBody>
//                             </Table>
//                             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 3, py: 2 }}>
//                                 <Typography sx={{ fontWeight: 700, fontFamily: 'serif', fontSize: 19, letterSpacing: 0.5, mr: 2 }}>
//                                     Grand Total :
//                                 </Typography>
//                                 <Typography sx={{ fontWeight: 700, fontFamily: 'serif', fontSize: 22 }}>
//                                     {/* ₹ {Math.round(finalPrice)} */}
//                                     {Number(finalPrice).toFixed(2)}
//                                 </Typography>
//                             </Box>
//                         </TableContainer>
//                     )}
//                 </Box>
//             </Container>
//         </Box>
//     );
// }
