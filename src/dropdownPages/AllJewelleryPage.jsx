// import {
//     Box,
//     Typography,
//     Grid,
//     IconButton,
//     Container,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
// } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { useEffect, useMemo, useState } from 'react';
// import SlickSlider from '../common components/SlickSlider';
// import axiosInstance from '../common components/AxiosInstance';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { publicUrl } from '../common components/PublicUrl';

// const jewelleryData = [
//     {
//         img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw53b65f59/plp/18-kt-jewellery.jpg',
//         label: '14 Kt',
//     },
//     {
//         img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3bc42dcf/plp/14-kt-jewellery.jpg',
//         label: '18 Kt',
//     },
//     {
//         img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwbc8afd33/plp/22-kt-jewellery.jpg',
//         label: '22 Kt',
//     },
// ];

// const assuranceData = [
//     {
//         img: 'https://i.imgur.com/XZiQnRx.png',
//         label: 'Exchange Offers',
//     },
//     {
//         img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweee090e8/assurance/assurance-bis-logo.png',
//         label: 'Purity Guarantee',
//     },
//     {
//         img: 'https://i.imgur.com/3JJd6Ux.png',
//         label: 'Easy Replacements',
//     },
// ];


// function JewelleryHeader() {
//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 pt: 4,
//                 pb: 4,
//                 background: '#fff',
//                 // minHeight: '60vh',
//             }}
//         >
//             <Typography
//                 variant="h4"
//                 align="center"
//                 sx={{ fontWeight: 700, my: 4, fontFamily: 'serif' }}
//             >
//                 All Jewellery
//             </Typography>
//             <Grid container spacing={4} justifyContent="center">
//                 {jewelleryData.map((item, idx) => (
//                     <Grid
//                         key={idx}
//                         item
//                         xs={12}
//                         sm={6}
//                         md={4}
//                         sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//                     >
//                         <Box
//                             sx={{
//                                 width: { xs: 180, sm: 210 },
//                                 height: { xs: 180, sm: 210 },
//                                 mb: 1,
//                                 overflow: 'hidden',
//                                 borderRadius: 1,
//                                 backgroundColor: '#fff',
//                                 boxShadow: 1,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img
//                                 src={item.img}
//                                 alt={item.label}
//                                 style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
//                             />
//                         </Box>
//                         <Typography
//                             variant="subtitle1"
//                             align="center"
//                             sx={{ fontWeight: 400, mt: 0.5, letterSpacing: '0.5px' }}
//                         >
//                             {item.label}
//                         </Typography>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

// function JewelleryCard({ product }) {
//     const [liked, setLiked] = useState(false);

//     // Ensure the image URL is correct, using the public URL helper if necessary
//     const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";

//     let finalPrice = "Not Available";
//     try {
//         const quantityData = JSON.parse(product.quantity?.[0] || '[]');
//         finalPrice = quantityData.length > 0 ? quantityData[0]?.finalPrice : "Not Available";
//     } catch (e) {
//         console.error("Error parsing quantity data:", e);
//     }

//     return (
//         <Box sx={{ pb: 1 }}>
//             <Box
//                 sx={{
//                     position: 'relative',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                     overflow: 'hidden',
//                     mb: 1,
//                     width: { xs: 170, sm: 200 },
//                     height: { xs: 200},
//                     mx: 'auto',
//                     bgcolor: 'transparent',
//                     boxShadow: 'none'
//                 }}
//             >
//                 <img
//                     src={imgUrl}
//                     alt={product.name}
//                     style={{
//                         // display: 'block',
//                         margin: 'auto',
//                         objectFit: 'cover',
//                         width: '100%',
//                         height: '100%',
//                     }}
//                 />
//                 <IconButton
//                     onClick={() => setLiked(!liked)}
//                     aria-label="like"
//                     sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 12,
//                         background: '#fff',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//                         '&:hover': { background: '#f7f7f7' },
//                         p: '5px',
//                     }}
//                     size="small"
//                 >
//                     {liked ? (
//                         <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
//                     ) : (
//                         <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
//                     )}
//                 </IconButton>
//             </Box>

//             <Typography
//                 variant="subtitle1"
//                 sx={{
//                     fontSize: 17,
//                     fontWeight: 400,
//                     fontFamily: 'serif',
//                     color: '#222',
//                     mb: 0.2,
//                     textAlign: 'left',
//                 }}
//             >
//                 {product.name} {/* Display the product name */}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
//                     ₹{product.finalPrice} {/* Show consumer price */}
//                 </Typography>
//                 {product.mrp && (
//                     <Typography
//                         variant="body2"
//                         sx={{ color: '#bdbdbd', textDecoration: 'line-through', fontWeight: 400, fontSize: 14 }}
//                     >
//                         ₹{product.mrp} {/* Show MRP if available */}
//                     </Typography>
//                 )}
//             </Box>
//             {product.special && (
//                 <Typography sx={{ fontSize: 13.5, color: '#be1222', fontWeight: 500 }}>
//                     {product.special} {/* Display special offer or stock info */}
//                 </Typography>
//             )}
//         </Box>
//     );
// }

// export function JewelleryGrid() {
//     const [allProducts, setAllProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [shownCount, setShownCount] = useState(10);
//     const [filters, setFilters] = useState({
//         query: '',
//         priceRange: 'all',
//     });
//     const [sortOption, setSortOption] = useState('relevance');

//       const loadMoreProducts = () => {
//         const newCount = shownCount + 10;
//         setShownCount(newCount); // Increment the shown count
//     };

//     // Price buckets for filtering
//     const priceBuckets = [
//         { label: 'Under ₹25k', min: 0, max: 25000 },
//         { label: '₹25k – ₹50k', min: 25000, max: 50000 },
//         { label: '₹50k – ₹1L', min: 50000, max: 100000 },
//         { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
//     ];

//     const fetchAllProducts = async () => {
//         setLoading(true);
//         try {
//             const response = await axiosInstance.get('/user/allproducts');
//             setAllProducts(response.data);
//         } catch (error) {
//             setError('Could not load products. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredProducts = allProducts.filter(product => {
//         const isInPriceRange = filters.priceRange === 'all' ||
//             (product.consumer_price >= priceBuckets.find(b => b.label === filters.priceRange)?.min &&
//                 product.consumer_price <= priceBuckets.find(b => b.label === filters.priceRange)?.max);

//         const isMatchingQuery = product.name.toLowerCase().includes(filters.query.toLowerCase());

//         return isInPriceRange && isMatchingQuery;
//     });

//     const sortedProducts = filteredProducts.sort((a, b) => {
//         switch (sortOption) {
//             case 'price-asc':
//                 return a.consumer_price - b.consumer_price;
//             case 'price-desc':
//                 return b.consumer_price - a.consumer_price;
//             case 'newest':
//                 return new Date(b.createdAt) - new Date(a.createdAt);
//             default:
//                 return 0;
//         }
//     });

//     useEffect(() => {
//         fetchAllProducts();
//     }, []);


//      const productsToDisplay = sortedProducts.slice(0, shownCount);

//     return (
//         <Box>
//             <JewelleryHeader />

//             <Box sx={{ pt: 5 }}>

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 3, gap: 1 }}>
//                     <TextField
//                         label="Search"
//                         value={filters.query}
//                         onChange={(e) => setFilters({ ...filters, query: e.target.value })}
//                         sx={{ width: { xs: '48%', sm: '30%' } }}
//                     />
//                     <Select
//                         value={filters.priceRange}
//                         onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
//                         // sx={{ width: '30%' }}
//                         sx={{ width: { xs: '48%', sm: '30%' } }}
//                     >
//                         <MenuItem value="all">All Prices</MenuItem>
//                         {priceBuckets.map(bucket => (
//                             <MenuItem key={bucket.label} value={bucket.label}>
//                                 {bucket.label}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     <Select
//                         value={sortOption}
//                         onChange={(e) => setSortOption(e.target.value)}
//                         // sx={{ width: '30%'}}
//                         sx={{ width: { xs: '48%', sm: '30%' } }}
//                     >
//                         <MenuItem value="relevance">Sort by: Relevance</MenuItem>
//                         <MenuItem value="price-asc">Price: Low to High</MenuItem>
//                         <MenuItem value="price-desc">Price: High to Low</MenuItem>
//                         <MenuItem value="newest">Newest First</MenuItem>
//                     </Select>
//                 </Box>


//             </Box>

//             {/* Product List */}
//             {loading ? (
//                 <Typography align="center">Loading products...</Typography>
//             ) : error ? (
//                 <Typography align="center" color="error">{error}</Typography>
//             ) : (
//                 <Grid container spacing={2} justifyContent="center">
//                     {productsToDisplay.map((product) => (
//                         // console.log(product._id, "product id"),
//                         <Link to={`/singleProduct/${product._id}`} key={product._id}>
//                             <Grid item xs={12} sm={6} md={4}>
//                                 <JewelleryCard product={product} />
//                             </Grid>
//                         </Link>
//                     ))}
//                 </Grid>
//             )}
//              {shownCount < sortedProducts.length && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                     <Button variant="outlined" onClick={loadMoreProducts}>View More</Button>
//                 </Box>
//             )}
//         </Box>
//     );
// }


// export function JewelAssurance() {
//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 background: '#fff',
//                 border: "1px solid '#e8e4e2'",
//                 borderRadius: '28px',
//                 py: { xs: 4, sm: 6 },
//                 mx: 'auto',
//                 my: 5,
//                 boxShadow: '0 2px 8px rgba(190,165,140,0.04)',
//                 position: 'relative',
//             }}
//         >
//             <Typography
//                 variant="h5"
//                 align="center"
//                 sx={{
//                     fontFamily: 'serif',
//                     fontWeight: 600,
//                     color: '#3d1822',
//                     mb: 0.5,
//                 }}
//             >
//                 The Chauhan Sons Assurance
//             </Typography>
//             <Typography
//                 variant="subtitle1"
//                 align="center"
//                 sx={{
//                     color: '#8f8f8f',
//                     mb: { xs: 3, sm: 6 },
//                     fontWeight: 400,
//                     fontSize: 18,
//                 }}
//             >
//                 Crafted by experts, cherished by you.
//             </Typography>
//             <Grid container spacing={1} justifyContent="center" gap={{ xs: 2, sm: 5 }}>
//                 {assuranceData.map((item) => (
//                     <Grid
//                         key={item.label}
//                         item
//                         xs={12}
//                         sm={4}
//                         sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, sm: 0 } }}
//                     >
//                         <Box
//                             sx={{
//                                 width: 90,
//                                 height: 80,
//                                 mb: 1,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img src={item.img} alt={item.label} style={{ maxWidth: '90%', maxHeight: '90%' }} />
//                         </Box>
//                         <Typography
//                             variant="subtitle1"
//                             align="center"
//                             sx={{
//                                 fontFamily: 'serif',
//                                 color: '#3d1822',
//                                 fontWeight: 500,
//                                 mt: 0.5,
//                                 fontSize: 17,
//                                 lineHeight: 1.25,
//                             }}
//                         >
//                             {item.label}
//                         </Typography>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

// export default function AllJewelleryPage() {
//     return (
//         <Box sx={{ backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
//             <Container maxWidth="xl">
//                 <JewelleryGrid />
//                 <JewelAssurance />
//                 <SlickSlider />
//             </Container>
//         </Box>
//     );
// }


// //2:

import {
    Box,
    Typography,
    Grid,
    IconButton,
    Container,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import SlickSlider from '../common components/SlickSlider';
import axiosInstance from '../common components/AxiosInstance';
import { Link } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';
import { useDispatch, useSelector } from "react-redux";


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

const assuranceData = [
    {
        img: 'https://i.imgur.com/XZiQnRx.png',
        label: 'Exchange Offers',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweee090e8/assurance/assurance-bis-logo.png',
        label: 'Purity Guarantee',
    },
    {
        img: 'https://i.imgur.com/3JJd6Ux.png',
        label: 'Easy Replacements',
    },
];


function JewelleryHeader() {
    return (
        <Box
            sx={{
                width: '100%',
                pt: 4,
                pb: 4,
                background: '#fff',
                // minHeight: '60vh',
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, my: 4, fontFamily: 'serif' }}
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

function JewelleryCard({ product }) {
    const [liked, setLiked] = useState(false);
    const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";
    const best = product.bestVariant || {};

    try {
        const quantityData = JSON.parse(product.quantity?.[0] || '[]');
        finalPrice = quantityData.length > 0 ? quantityData[0]?.finalPrice : "Not Available";
    } catch (e) {
        console.error("Error parsing quantity data:", e);
    }

    return (
        <Box sx={{ pb: 1 }}>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 2,
                    boxShadow: 1,
                    overflow: 'hidden',
                    // mb: 1,
                    width: { xs: 170, sm: 200 },
                    height: { xs: 200 },
                    mx: 'auto',
                    bgcolor: 'transparent',
                    boxShadow: 'none'
                }}
            >
                {best.discount > 0 && (
                    <Box sx={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        background: '#44170D',
                        color: '#fff',
                        p: '2px',
                        fontSize: '12px',
                        fontWeight: 600
                    }}>
                        {best.discount}% OFF
                    </Box>
                )}
                <img
                    src={imgUrl}
                    alt={product.name}
                    style={{
                        // display: 'block',
                        margin: 'auto',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
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
                </IconButton>
            </Box>

            <Typography
                variant="subtitle1"
                sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: 'serif',
                    color: '#222',
                    textAlign: 'left',
                    textTransform: 'capitalize',
                }}
            >
                {product.name} 
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
                ₹{best.finalPrice}
            </Typography>

            {/* <Button variant="contained" sx={{ mt: 1 }}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 'no'}
            >Add to Cart</Button> */}

        </Box>
    );
}

export function JewelleryGrid() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shownCount, setShownCount] = useState(10);
    const [filters, setFilters] = useState({
        query: '',
        priceRange: 'all',
    });
    const [sortOption, setSortOption] = useState('relevance');

    const loadMoreProducts = () => {
        const newCount = shownCount + 10;
        setShownCount(newCount); // Increment the shown count
    };

    const parseQuantityArray = (q) => {
        if (!q) return [];
        let arr = q;
        if (typeof q === "string") {
            try { arr = JSON.parse(q); } catch { return []; }
        }
        return Array.isArray(arr) ? arr : [];
    };

    const pickBestVariation = (arr) => {
        if (!arr.length) return null;
        // Lowest finalPrice variant
        return arr.reduce((best, cur) =>
            parseFloat(cur.finalPrice) < parseFloat(best.finalPrice) ? cur : best, arr[0]);
    };

    const preprocessProducts = (productsRaw) => productsRaw.map((p) => {
        const quantityArr = parseQuantityArray(p.quantity?.[0]);
        const bestVariation = pickBestVariation(quantityArr);
        return {
            ...p,
            price: bestVariation ? parseFloat(bestVariation.finalPrice) : 0,
            gst: bestVariation ? parseFloat(bestVariation.gst) : null,
            discount: bestVariation ? parseFloat(bestVariation.discount) : 0,
            weight: bestVariation ? parseFloat(bestVariation.weight) : null,
            makingPrice: bestVariation ? parseFloat(bestVariation.makingPrice) : null,
            quantityVariants: quantityArr,
            bestVariant: bestVariation,
        };
    });


    // Price buckets for filtering
    const priceBuckets = [
        { label: 'Under ₹25k', min: 0, max: 25000 },
        { label: '₹25k – ₹50k', min: 25000, max: 50000 },
        { label: '₹50k – ₹1L', min: 50000, max: 100000 },
        { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
    ];

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/user/allproducts');
            // setAllProducts(response.data);
            const processedProducts = preprocessProducts(response.data);
            setAllProducts(processedProducts);
        } catch (error) {
            setError('Could not load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = allProducts.filter(product => {
        const isInPriceRange = filters.priceRange === 'all' ||
            (product.price >= priceBuckets.find(b => b.label === filters.priceRange)?.min &&
                product.price <= priceBuckets.find(b => b.label === filters.priceRange)?.max);

        const isMatchingQuery = product.name.toLowerCase().includes(filters.query.toLowerCase());
        return isInPriceRange && isMatchingQuery;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
            default: return 0;
        }
    });


    useEffect(() => {
        fetchAllProducts();
    }, []);


    const productsToDisplay = sortedProducts.slice(0, shownCount);

    return (
        <Box>
            <JewelleryHeader />

            <Box sx={{ pt: 5 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 3, gap: 1 }}>
                    <TextField
                        label="Search"
                        value={filters.query}
                        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    />
                    <Select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        // sx={{ width: '30%' }}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    >
                        <MenuItem value="all">All Prices</MenuItem>
                        {priceBuckets.map(bucket => (
                            <MenuItem key={bucket.label} value={bucket.label}>
                                {bucket.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        // sx={{ width: '30%'}}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    >
                        <MenuItem value="relevance">Sort by: Relevance</MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                        <MenuItem value="newest">Newest First</MenuItem>
                    </Select>
                </Box>
            </Box>

            {/* Product List */}
            {loading ? (
                <Typography align="center">Loading products...</Typography>
            ) : error ? (
                <Typography align="center" color="error">{error}</Typography>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {productsToDisplay.map((product) => (
                        // console.log(product._id, "product id"),
                        <Link to={`/singleProduct/${product._id}`} key={product._id}>
                            <Grid item xs={12} sm={6} md={4}>
                                <JewelleryCard product={product} />
                            </Grid>
                        </Link>
                    ))}
                </Grid>
            )}
            {shownCount < sortedProducts.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button variant="outlined" onClick={loadMoreProducts}>View More</Button>
                </Box>
            )}
        </Box>
    );
}


export function JewelAssurance() {
    return (
        <Box
            sx={{
                width: '100%',
                background: '#fff',
                border: "1px solid '#e8e4e2'",
                borderRadius: '28px',
                py: { xs: 4, sm: 6 },
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
                {assuranceData.map((item) => (
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
                                justifyContent: 'center',
                            }}
                        >
                            <img src={item.img} alt={item.label} style={{ maxWidth: '90%', maxHeight: '90%' }} />
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
                                lineHeight: 1.25,
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
        <Box sx={{ backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
            <Container maxWidth="xl">
                <JewelleryGrid />
                <JewelAssurance />
                <SlickSlider />
            </Container>
        </Box>
    );
}