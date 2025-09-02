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
import axiosInstance from '../common components/AxiosInstance';
import { Link, useLocation, useParams } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';

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

// function JewelleryCard({ product }) {
//     const [liked, setLiked] = useState(false);
//     const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";
//     const best = product.bestVariant || {};

//     return (
//         <Box sx={{ pb: 1 }}>
//             <Box
//                 sx={{
//                     position: 'relative',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                     overflow: 'hidden',
//                     // mb: 1,
//                     width: { xs: 170, sm: 200 },
//                     height: { xs: 200 },
//                     mx: 'auto',
//                     bgcolor: 'transparent',
//                     boxShadow: 'none'
//                 }}
//             >
//                 {best.discount > 0 && (
//                     <Box sx={{
//                         position: 'absolute',
//                         top: 4,
//                         left: 4,
//                         background: '#44170D',
//                         color: '#fff',
//                         p: '2px',
//                         fontSize: '12px',
//                         fontWeight: 600
//                     }}>
//                         {best.discount}% OFF
//                     </Box>
//                 )}
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
//                     fontSize: 18,
//                     fontWeight: 600,
//                     fontFamily: 'serif',
//                     color: '#222',
//                     textAlign: 'left',
//                     textTransform: 'capitalize',
//                 }}
//             >
//                 {product.name}
//             </Typography>

//             <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
//                 ₹{best.finalPrice}
//             </Typography>

//             {/* <Button variant="contained" sx={{ mt: 1 }}
//                 onClick={() => handleAddToCart(product)}
//                 disabled={product.stock === 'no'}
//             >Add to Cart</Button> */}

//         </Box>
//     );
// }

import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/Action';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createSelector } from '@reduxjs/toolkit';

// export const selectWishlist = createSelector(
//     [state => Array.isArray(state.app?.wishlist) ? state.app.wishlist : []],
//     wishlist => wishlist
// );

export const selectWishlist = createSelector(
    [state => Array.isArray(state?.app?.wishlist) ? state.app.wishlist : []],
    wishlist => wishlist.filter(item => item.in_stock)  // example transformation
);


function JewelleryCard({ product }) {
    const dispatch = useDispatch();
    const wishlist = useSelector(selectWishlist);

    const isWishlisted = wishlist.some(item => item._id === product._id);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";
    const best = product.bestVariant || {};

    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Prevent parent click event
        e.preventDefault();  // Prevent any link navigation
        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
            setSnackbarMsg('Removed from Wishlist');
        } else {
            dispatch(addToWishlist(product));
            setSnackbarMsg('Added to Wishlist');
        }
        setSnackbarOpen(true);
    }

    return (
        <Box sx={{ pb: 1, position: 'relative' }}>
            <Box sx={{ position: 'relative', borderRadius: 2 }}>
                <Link to={`/singleProduct/${product._id}`} style={{ textDecoration: 'none' }}>
                    <img
                        src={imgUrl}
                        alt={product.name}
                        style={{
                            margin: 'auto', objectFit: 'cover',
                            width: '100%',
                            height: 200,
                            borderRadius: '8px'
                        }}
                    />
                </Link>
                <IconButton
                    onClick={handleWishlistClick}
                    aria-label="wish"
                    sx={{
                        position: 'absolute', top: 8, right: 12, background: '#fff',
                        zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', p: '5px'
                    }}
                    size="small"
                >
                    {isWishlisted ? (
                        <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
                    )}
                </IconButton>
            </Box>

            <Link to={`/singleProduct/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="subtitle1" sx={{ fontSize: 18, fontWeight: 600, fontFamily: 'serif', color: '#222', textAlign: 'left', textTransform: 'capitalize' }}>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
                    ₹{best.finalPrice}
                </Typography>
            </Link>

            {/* Snackbar for toast */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMsg}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}


export function JewelleryGrid() {
    const [allProducts, setAllProducts] = useState([]);
    const [subcategoryName, setSubCategoryName] = useState([]);
    const [occasion, setOccasion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shownCount, setShownCount] = useState(12);
    const { variety: param } = useParams();
    const variety = ['diamond', 'gold', 'silver'].includes((param || 'all').toLowerCase())
        ? param.toLowerCase()
        : 'all';
    const [filters, setFilters] = useState({
        query: '',
        priceRange: 'all',
    });
    const [sortOption, setSortOption] = useState('relevance');


    // --- helpers: slugify and get category names from product ---
    const slugify = (str) =>
        String(str || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-');

    //  // use of query for filtering
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const varietyParam = (variety || 'all').toLowerCase();
    // const varietyParam = query.get('variety')?.toLowerCase() || 'all';
    const selectedCategory = slugify(query.get('category') || '');
    const selectedSubcategoryId = query.get('subcategory');
    const selectedSubcategory = selectedSubcategoryId
        ? subcategoryName.find(item => item._id === selectedSubcategoryId)
        : null;
    const selectedOccasionId = query.get('occasion');
    const selectedOccasion = selectedOccasionId
        ? occasion.find(item => item._id === selectedOccasionId)
        : null;
    const priceQuery = query.get("price") || "all";
    const genderQuery = query.get("gender") || "all";
    const occasionQuery = query.get("occasion") || "all";


    const norm = (s) =>
        (s || '')
            .toUpperCase()
            .replace(/\s+/g, '')   // remove ALL spaces
            .replace(/-/g, '–')    // hyphen -> en-dash
            .trim();


    const loadMoreProducts = () => {
        const newCount = shownCount + 12;
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
        { label: 'Under ₹25K', min: 0, max: 25000 },
        { label: '₹25K – ₹50K', min: 25000, max: 50000 },
        { label: '₹50K – ₹1L', min: 50000, max: 100000 },
        { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
    ];

    const priceBucketFromQuery = priceBuckets.find(
        b => norm(b.label) === norm(priceQuery)
    );
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/user/allproducts');
            // console.log(response.data, "ooo");
            const processedProducts = preprocessProducts(response.data);
            setAllProducts(processedProducts);
        } catch (error) {
            setError('Could not load products. Please try again.');
            // console.error(error, "eee");
        } finally {
            setLoading(false);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get(`/user/allSubcategories`);
            setSubCategoryName(response?.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const fetchOccasions = async () => {
        try {
            const response = await axiosInstance.get(`/user/allOccasions`);
            setOccasion(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching occasion:", error);
        } finally {
            setLoading(false)
        }
    };

    const filteredProducts = allProducts.filter(product => {
        const isInPriceRange = filters.priceRange === 'all' ||
            (product.price >= priceBuckets.find(b => b.label === filters.priceRange)?.min &&
                product.price <= priceBuckets.find(b => b.label === filters.priceRange)?.max);

        const isMatchingQuery = product.name.toLowerCase().includes(filters.query.toLowerCase());

        // Assuming product.category holds product category name, normalize case for comparison
        const matchesCategory = selectedCategory ? product.category?.toLowerCase() === selectedCategory : true;

        // subcategory filter
        const matchesSubcategory = selectedSubcategory
            ? product.sub_category === selectedSubcategory.name
            : true;

        // occasion filter
        const matchesOccasion = selectedOccasion
            ? product.occasion === selectedOccasion.name
            : true;
        // variety filter
        const matchesVariety = varietyParam === 'all' || (product.productvariety?.toLowerCase() === varietyParam);

        const matchesPriceTab =
            priceQuery === "all" ||
            (priceBucketFromQuery &&
                product.price >= priceBucketFromQuery.min &&
                product.price <= priceBucketFromQuery.max);

        const matchesGenderTab =
            genderQuery === "all" ||
            (product.genderVariety && product.genderVariety.toLowerCase() === genderQuery.toLowerCase());
        const matchesOccasionTab =
            occasionQuery === "all" ||
            (product.occasion && product.occasion.toLowerCase() === occasionQuery.toLowerCase());

        return isInPriceRange && isMatchingQuery && matchesCategory && matchesSubcategory && matchesOccasion && matchesVariety && matchesPriceTab && matchesGenderTab && matchesOccasionTab;
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
        fetchSubCategories();
        fetchOccasions();
    }, []);

    const productsToDisplay = sortedProducts.slice(0, shownCount);

    return (
        <Box>
            {/* <JewelleryHeader /> */}

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
                        // <Link to={`/singleProduct/${product._id}`} key={product._id}>
                        //     <Grid item xs={12} sm={6} md={4}>
                        //         <JewelleryCard product={product} />
                        //     </Grid>
                        // </Link>
                        <Grid key={product._id}  xs={12} sm={6} md={4}>
                            <JewelleryCard product={product} />
                        </Grid>
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
                {/* <SlickSlider /> */}
            </Container>
        </Box>
    );
}