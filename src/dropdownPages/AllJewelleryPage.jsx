import {
    Box,
    Typography,
    Grid,
    Chip,
    IconButton,
    Container,
    Select,
    MenuItem,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useMemo, useState } from 'react';
import SlickSlider from '../common components/SlickSlider';
import axiosInstance from '../common components/AxiosInstance';
import { useLocation, useParams } from 'react-router-dom';
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

function FiltersAndSort({
    sortOption,
    setSortOption,
    filters,
    setFilters,
    priceBuckets,
    subcategories,
}) {
    const handlePriceClick = (bucket) => {
        setFilters((f) => ({
            ...f,
            priceRange:
                f.priceRange && f.priceRange.label === bucket.label ? null : bucket,
        }));
    };

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
            {/* Search */}
            <TextField
                size="small"
                placeholder="Search products"
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                sx={{ minWidth: 220, background: '#fff' }}
            />

            {/* Subcategory */}
            <Select
                size="small"
                value={filters.subCategory}
                onChange={(e) =>
                    setFilters((f) => ({ ...f, subCategory: e.target.value }))
                }
                sx={{ minWidth: 200, background: '#fff' }}
            >
                <MenuItem value="all">All subcategories</MenuItem>
                {subcategories.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </Select>

            {/* Price buckets */}
            {priceBuckets.map((b) => {
                const active = filters.priceRange?.label === b.label;
                return (
                    <Chip
                        key={b.label}
                        label={b.label}
                        clickable
                        color={active ? 'primary' : 'default'}
                        variant={active ? 'filled' : 'outlined'}
                        onClick={() => handlePriceClick(b)}
                    />
                );
            })}

            <FormControlLabel
                sx={{ ml: 1 }}
                control={
                    <Checkbox
                        checked={filters.inStockOnly}
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
                        }
                    />
                }
                label="In stock only"
            />

            <Box sx={{ flex: 1 }} />

            {/* Sort */}
            <Select
                size="small"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{ minWidth: 220, background: '#fff' }}
            >
                <MenuItem value="relevance">Sort by: Best Matches</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="discount-desc">Discount: High to Low</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
            </Select>
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
                    overflow: 'hidden',
                    mb: 2,
                    width: { xs: 220, sm: 260 },
                    height: { xs: 220, sm: 260 },
                    mx: 'auto',
                }}
            >
                <img
                    src={publicUrl(product.img)}
                    alt={product.title}
                    style={{
                        display: 'block',
                        margin: 'auto',
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
    const location = useLocation();
    const { subCategoryName } = useParams();
    const categoryId = location.state?.categoryId || null;

    const [allProducts, setAllProducts] = useState([]);
    const [categorySubNames, setCategorySubNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sorting + filters
    const [sortOption, setSortOption] = useState('relevance');
    const [filters, setFilters] = useState({
        priceRange: null,        // {min, max, label} or null
        subCategory: 'all',      // subcategory name (lowercase) or 'all'
        inStockOnly: false,
        query: '',
    });

    // Static buckets (tweak as needed)
    const priceBuckets = [
        { label: 'Under ₹25k', min: 0, max: 25000 },
        { label: '₹25k – ₹50k', min: 25000, max: 50000 },
        { label: '₹50k – ₹1L', min: 50000, max: 100000 },
        { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
    ];

    const parseNum = (v) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    };

    const formatINR = (n) =>
        n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    // Adapt API product -> shape JewelleryCard expects
    const adaptProduct = (p) => {
        const consumer = parseNum(p?.consumer_price ?? p?.mrp);
        const retail = parseNum(p?.retail_price ?? p?.list_price);
        const discount = Math.max(0, retail - consumer);

        const img = p?.media?.[0]?.url || p?.imageUrl || p?.img || '';
        const title = p?.name || p?.title || 'Untitled';
        const oldPrice = retail > consumer ? formatINR(retail) : null;

        let special;
        const stockStr = String(p?.stock || '').toLowerCase();
        if (stockStr === 'no') special = 'Out of stock';
        else if (parseNum(p?.quantity) === 1) special = 'Only 1 left!';

        const subCategoryId =
            p?.sub_category?._id || p?.sub_category || null;

        const subCategoryNameNorm =
            (p?.sub_category?.name || p?.sub_categoryName || '')
                .toString()
                .toLowerCase();

        return {
            id: p?._id,
            img,
            title,
            price: formatINR(consumer),
            oldPrice,
            special,

            // raw fields for filtering/sorting
            rawPrice: consumer,
            rawDiscount: discount,
            inStock: stockStr !== 'no',
            createdAt: p?.createdAt ? new Date(p.createdAt).getTime() : 0,

            // subcategory (name + id)
            subCategoryId,
            subCategoryName: subCategoryNameNorm,
        };
    };

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const [prodRes, subsRes] = await Promise.all([
                axiosInstance.get('/user/allproducts'),
                axiosInstance.get('/user/allSubcategories'),
            ]);

            const rawProducts = prodRes?.data || [];
            const subs = subsRes?.data || [];

            // Build id->name map for subcategories
            const subIdToName = new Map(
                subs.map((s) => [String(s?._id), (s?.name || '').toLowerCase()])
            );

            // Adapt products, then fill missing subCategoryName via map
            const adapted = rawProducts.map(adaptProduct).map((p) => ({
                ...p,
                subCategoryName:
                    p.subCategoryName ||
                    (p.subCategoryId && subIdToName.get(String(p.subCategoryId))) ||
                    '',
            }));

            setAllProducts(adapted);

            // Compute subcategory list for filter (prioritize by category if provided)
            let subcats = [];
            if (categoryId) {
                subcats = subs
                    .filter((sub) => String(sub?.category_id?._id) === String(categoryId))
                    .map((sub) => (sub?.name || '').toLowerCase());
            } else {
                // union from products & all subs
                const fromProducts = adapted.map((p) => p.subCategoryName).filter(Boolean);
                const fromApi = subs.map((s) => (s?.name || '').toLowerCase());
                subcats = Array.from(new Set([...fromProducts, ...fromApi]));
            }
            subcats = subcats.filter(Boolean).sort();
            setCategorySubNames(subcats);
        } catch (e) {
            console.error(e);
            setError('Could not load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    const displayedProducts = useMemo(() => {
        let list = allProducts;

        // 1) Subcategory via route param (/:subCategoryName)
        if (subCategoryName) {
            const target = subCategoryName.toLowerCase();
            list = list.filter((p) => p.subCategoryName === target);
        }

        // 2) Subcategory via dropdown
        if (filters.subCategory !== 'all') {
            list = list.filter((p) => p.subCategoryName === filters.subCategory);
        }

        // 3) Price bucket
        if (filters.priceRange) {
            const { min, max } = filters.priceRange;
            list = list.filter((p) => p.rawPrice >= min && p.rawPrice <= max);
        }

        // 4) In-stock
        if (filters.inStockOnly) {
            list = list.filter((p) => p.inStock);
        }

        // 5) Text query
        if (filters.query.trim()) {
            const q = filters.query.trim().toLowerCase();
            list = list.filter((p) => p.title.toLowerCase().includes(q));
        }

        // 6) If on a category page, restrict to its subcategories (if any)
        if (categoryId && categorySubNames.length) {
            list = list.filter((p) => categorySubNames.includes(p.subCategoryName));
        }

        // Sorting
        switch (sortOption) {
            case 'price-asc':
                return [...list].sort((a, b) => a.rawPrice - b.rawPrice);
            case 'price-desc':
                return [...list].sort((a, b) => b.rawPrice - a.rawPrice);
            case 'discount-desc':
                return [...list].sort((a, b) => b.rawDiscount - a.rawDiscount);
            case 'newest':
                return [...list].sort((a, b) => b.createdAt - a.createdAt);
            case 'relevance':
            default:
                return list;
        }
    }, [
        allProducts,
        filters,
        sortOption,
        subCategoryName,
        categoryId,
        categorySubNames,
    ]);

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
                    ({displayedProducts.length} results)
                </Typography>
            </Box>

            <FiltersAndSort
                sortOption={sortOption}
                setSortOption={setSortOption}
                filters={filters}
                setFilters={setFilters}
                priceBuckets={priceBuckets}
                subcategories={categorySubNames}
            />

            <Grid
                container
                spacing={2}
                sx={{ px: { xs: 2, sm: 6 }, justifyContent: { xs: 'center', sm: 'flex-start' } }}
            >
                {loading && (
                    <Grid item xs={12}>
                        <Typography align="center">Loading products…</Typography>
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12}>
                        <Typography align="center" color="error">
                            {error}
                        </Typography>
                    </Grid>
                )}

                {!loading &&
                    !error &&
                    displayedProducts.map((product) => (
                        <Grid
                            key={product.id || `${product.title}-${product.img}`}
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
        <Box sx={{ backgroundColor: '#f9f9f9' }}>
            <Container maxWidth="xl">
                <JewelleryGrid />
                <JewelAssurance />
                <SlickSlider />
            </Container>
        </Box>
    );
}
