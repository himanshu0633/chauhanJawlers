import { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";

const DropdownMenu = styled(Paper)(({ theme }) => ({
    position: "fixed",
    top: 108,
    left: 0,
    right: 0,
    background: "#44170D",
    borderRadius: "0 0 24px 24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    padding: 0,
    zIndex: 1200,
    maxWidth: "100vw",
    minHeight: 360,
    overflowX: "auto",
    [theme.breakpoints.down("lg")]: { minHeight: 330 },
}));

const NavGrid = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    minHeight: 330,
});

const Sidenav = styled(Box)(({ theme }) => ({
    width: 192,
    background: "none",
    padding: "28px 0",
    borderRight: "1.3px solid #402419",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    [theme.breakpoints.down("lg")]: {
        width: 170,
        padding: "24px 0",
    },
}));

const SidenavItem = styled(Box, { shouldForwardProp: (p) => p !== "active" })(({ active }) => ({
    background: active ? "#381209" : "transparent",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    padding: "12px 24px",
    borderRadius: 12,
    cursor: "pointer",
    margin: "0 18px 5px 0",
    borderLeft: active ? "4px solid #FFD700" : "4px solid transparent",
    transition: "all 0.14s",
}));

const CategoryGrid = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minWidth: 200,
    alignItems: "flex-start",
    paddingTop: 16,
    paddingBottom: 8,
    [theme.breakpoints.down("lg")]: { paddingTop: 8 },
}));

const CategoryCol = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingInline: 8,
    borderRight: "1px solid #402419",
    "&:last-of-type": { borderRight: "none" },
}));

const CategoryBox = styled(Box)(({ theme }) => ({
    width: "80%",
    minWidth: 100,
    display: "flex",
    // flexDirection: "column",
    gap: '10px',
    alignItems: "center",
    padding: "10px 0",
    cursor: "pointer",
    borderRadius: 18,
    "&:hover": { background: "rgba(255,255,255,0.06)" },
    [theme.breakpoints.down("lg")]: { minWidth: 120, padding: "12px 0 10px" },
}));

const IconWrap = styled(Box)(({ theme }) => ({
    width: 52,
    height: 52,
    background: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    overflow: "hidden",
    "& img": { width: "100%", height: "100%", objectFit: "cover" },
    [theme.breakpoints.down("lg")]: { width: 46, height: 46 },
}));

const BigGrid = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 28,
    flexWrap: "nowrap",
    marginTop: 24,
    marginBottom: 12,
    minHeight: 160,
    [theme.breakpoints.down("lg")]: { gap: 20, marginTop: 18 },
}));

const BigItem = styled(Box)(({ theme }) => ({
    minWidth: 158,
    maxWidth: 202,
    width: "18vw",
    borderRadius: 16,
    margin: "0 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
}));

const BigImageWrap = styled(Box)(({ theme }) => ({
    width: 124,
    height: 124,
    borderRadius: 16,
    overflow: "hidden",
    background: "#f7efe8",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": { width: "100%", height: "100%", objectFit: "cover" },
    [theme.breakpoints.down("lg")]: { width: 110, height: 110 },
}));

const BigLabel = styled(Typography)({
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    marginTop: 5,
    letterSpacing: 0.1,
});

const PromoBar = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: 17,
    padding: "12px 16px",
    gap: 14,
    margin: "26px 0 0 0",
    boxShadow: "0 1.1px 6px 0 #d3bfbf23",
    maxWidth: 560,
    width: "100%",
    [theme.breakpoints.down("lg")]: { maxWidth: 520, marginTop: 20 },
}));

const RightPanel = styled(Box)(({ theme }) => ({
    flex: 1.2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 220,
    background: "none",
    padding: "20px 18px 0 18px",
    gap: 18,
    [theme.breakpoints.down("lg")]: { display: "none" },
}));

/* ---------------- data for other tabs ---------------- */
const sidenavTabs = [
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "occasion", label: "Occasion" },
    { key: "gender", label: "Gender" },
];

const priceRanges = [
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "<25K" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "25K-50K" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "50K-1L" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "1L & Above" },
];

const genders = [
    { img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=240&fit=crop", name: "Women" },
    { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&fit=crop", name: "Men" },
    { img: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=240&fit=crop", name: "Kids & Teens" },
];

const NavHoverDropdown = ({ hoveredFilter, onClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [tab, setTab] = useState(hoveredFilter || "category");

    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    // Updated condition: check if hover is possible, regardless of pointer type
    const canHover = useMediaQuery("(hover: hover)");
    if (!isMdUp || !canHover) return null;

    const [categoryName, setCategoryName] = useState([]);
    const [isLoadingCats, setIsLoadingCats] = useState(false);
    const [catsError, setCatsError] = useState(null);
    const [occasions, setOccasions] = useState([]);


    useEffect(() => {
        if (hoveredFilter) {
            setTab(hoveredFilter);
        }
    }, [hoveredFilter]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCats(true);
                setCatsError(null);
                const res = await axiosInstance.get("/user/allSubcategories");
                const subcategories =
                    res?.data?.categories ?? res?.data?.data ?? (Array.isArray(res?.data) ? res.data : []);
                setCategoryName(Array.isArray(subcategories) ? subcategories : []);
            } catch (err) {
                setCatsError(err?.response?.data?.message || err?.message || "Failed to load categories");
                setCategoryName([]);
            } finally {
                setIsLoadingCats(false);
            }
        })();
    }, []);

    // Fetch occasions
    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCats(true);
                setCatsError(null);
                const res = await axiosInstance.get("/user/allOccasions");
                const subOccasions =
                    res?.data?.categories ?? res?.data?.data ?? (Array.isArray(res?.data) ? res.data : []);
                setOccasions(Array.isArray(subOccasions) ? subOccasions : []);
            } catch (err) {
                setCatsError(err?.response?.data?.message || err?.message || "Failed to load occasions");
                setOccasions([]);
            } finally {
                setIsLoadingCats(false);
            }
        })();
    }, []);

    const cols = useMediaQuery(theme.breakpoints.up("xl")) ? 4 : useMediaQuery(theme.breakpoints.up("lg")) ? 3 : 2;

    const categoryCols = useMemo(() => {
        const out = Array.from({ length: cols }, () => []);
        categoryName.forEach((item, i) => out[i % cols].push(item));
        return out;
    }, [categoryName, cols]);

    const centerPanel =
        tab === "category" ? (
            <CategoryGrid>
                {isLoadingCats && (
                    <Typography sx={{ color: "#fff", opacity: 0.8, fontSize: 24, px: 2, fontWeight: 700 }}>
                        Loading categories…
                    </Typography>
                )}
                {catsError && (
                    <Typography sx={{ color: "#ffb4b4", fontSize: 23, px: 2, fontWeight: 700 }}>
                        {catsError}
                    </Typography>
                )}

                {categoryName.length > 0 ? (
                    categoryCols.map((col, idx) => (
                        <CategoryCol key={idx}>
                            {col.map((item) => {
                                const id = item._id || item.id;
                                const name = item.name || "Category";
                                const img = publicUrl(item.image);
                                return (
                                    <CategoryBox
                                        key={id || name}
                                        onClick={() => {
                                            if (id) {
                                                navigate(`/category/${id}`);
                                                onClose && onClose();
                                            }
                                        }}
                                    >
                                        <IconWrap>
                                            <img src={img} alt={name} />
                                        </IconWrap>
                                        <Typography
                                            sx={{
                                                // mt: 0.8,
                                                color: "#fff",
                                                fontWeight: 500,
                                                fontSize: { xs: 13, lg: 14.5 },
                                                textAlign: "center",
                                                // width: "100%",
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </CategoryBox>
                                );
                            })}
                        </CategoryCol>
                    ))
                ) : (
                    !isLoadingCats &&
                    !catsError && (
                        <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 13, px: 2 }}>
                            No categories found.
                        </Typography>
                    )
                )}
            </CategoryGrid>
        ) : (
            <BigGrid>
                {(tab === "price" ? priceRanges : tab === "gender" ? genders : occasions).map((item) => (
                    <BigItem key={item._id}>
                        <BigImageWrap>
                            <img src={item.image ? publicUrl(item.image) : item.img} alt={item.name} />
                        </BigImageWrap>
                        <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16, mt: 0.5 }}>
                            {item.name}
                        </Typography>
                    </BigItem>
                ))}
            </BigGrid>
        );

    return (
        <DropdownMenu onClick={onClose}>
            <NavGrid onClick={(e) => e.stopPropagation()}>
                <Sidenav>
                    {sidenavTabs.map(({ key, label }) => (
                        <SidenavItem
                            key={key}
                            active={tab === key ? 1 : 0}
                            onMouseEnter={() => setTab(key)}
                        >
                            {label}
                        </SidenavItem>
                    ))}
                </Sidenav>

                <Box
                    sx={{
                        flex: 3.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        pl: { md: 2, lg: 3 },
                        pr: 0,
                        pt: { md: 2, lg: 3 },
                        minWidth: 440,
                        maxWidth: 900,
                        margin: "0 auto",
                    }}
                >
                    {centerPanel}
                </Box>

                {/* Right panel (hidden below lg) */}
                <RightPanel>
                    <Paper
                        elevation={0}
                        sx={{
                            width: "100%",
                            background: "transparent",
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=370"
                            alt="Profile"
                            style={{ width: 200, height: 300, objectFit: "cover", borderRadius: 16 }}
                        />
                        <Typography sx={{ color: "#fff", fontWeight: 600, mt: 0, mb: 1, fontSize: 18, textAlign: "center" }}>
                            Elan - My World. My Story.
                        </Typography>
                        <Typography sx={{ mb: 0.8, mt: 1 }}>
                            <a
                                href="#"
                                style={{
                                    color: "#FFD700",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                    fontSize: 16,
                                }}
                            >
                                Explore Now ↗
                            </a>
                        </Typography>
                    </Paper>
                </RightPanel>

            </NavGrid>
        </DropdownMenu>
    );
};


export default NavHoverDropdown;

