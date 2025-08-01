"use client";

import { useState } from "react";
import { Box, Typography, Button, Paper, styled } from "@mui/material";

// --- Styled Components ---

const DropdownMenu = styled(Paper)({
    position: "fixed",
    top: 108, // matches screenshot offset
    left: 0,
    right: 0,
    background: "#502507",
    borderRadius: "0 0 28px 28px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.30)",
    padding: "0",
    zIndex: 1200,
});

const NavGrid = styled(Box)({
    display: "flex",
    minHeight: 380,
});

const Sidenav = styled(Box)({
    width: 188,
    background: "linear-gradient(180deg, #331205 60%, #502507 100%)",
    padding: "32px 0",
    borderRight: "1px solid rgba(255,255,255,0.11)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
});

const SidenavItem = styled(Box)(({ active }) => ({
    background: active ? "rgba(255,255,255,0.11)" : "transparent",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    padding: "12px 32px",
    cursor: "pointer",
    transition: "all 0.15s",
    borderLeft: active ? "4px solid #FFD700" : "4px solid transparent",
    "&:hover": {
        background: "rgba(255,255,255,0.08)",
        color: "#FFD700",
    },
}));

const MegaPanel = styled(Box)({
    flex: 1,
    padding: "32px 36px 32px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

const CategoryRow = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    gap: 0,
    marginBottom: 24,
});

const CategoryBox = styled(Box)({
    width: "25%",
    minWidth: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "18px 0 10px",
    cursor: "pointer",
    borderRadius: 18,
    transition: "all 0.17s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
        background: "rgba(255,255,255,0.09)",
        color: "#FFDDA0",
    },
});

const IconWrap = styled(Box)({
    width: 54,
    height: 54,
    background: "rgba(255,255,255,0.18)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
});

const Promo = styled(Box)({
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.14)",
    borderRadius: 18,
    padding: "22px 26px",
    gap: 16,
    marginTop: "auto",
});

const PromoImage = styled("img")({
    width: 58,
    height: 58,
    objectFit: "cover",
    borderRadius: 15,
    border: "2px solid #fff4",
});

// --- Data Content ---

const sidenavTabs = [
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "gender", label: "Gender" },
    { key: "occasion", label: "Occasion" },
];

const categories = [
    { img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&fit=crop", name: "All Jewellery" },
    { img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=200&fit=crop", name: "Earrings" },
    { img: "https://images.unsplash.com/photo-1617877461465-d774fc0de898?w=200&fit=crop", name: "Pendants" },
    { img: "https://images.unsplash.com/photo-1603974372038-9b6ff566d7d6?w=200&fit=crop", name: "Finger Rings" },
    { img: "https://images.unsplash.com/photo-1623741400142-b6b9a3c0a005?w=200&fit=crop", name: "Mangalsutra" },
    { img: "https://images.unsplash.com/photo-1591912761520-9a900203be54?w=200&fit=crop", name: "Chains" },
    { img: "https://images.unsplash.com/photo-1620055526323-97d8e87d9df4?w=200&fit=crop", name: "Nose Pin" },
    { img: "https://images.unsplash.com/photo-1611591437281-f581a6f128a8?w=200&fit=crop", name: "Necklaces" },
    { img: "https://images.unsplash.com/photo-1673540124401-e68ce3d1cb9c?w=200&fit=crop", name: "Necklaces Set" },
    { img: "https://images.unsplash.com/photo-1623828380394-6e2501b90879?w=200&fit=crop", name: "Bracelets" },
    { img: "https://images.unsplash.com/photo-1611591437281-f581a6f128a8?w=200&fit=crop", name: "Bangles" },
    { img: "https://images.unsplash.com/photo-1690205624191-58db137eedb4?w=200&fit=crop", name: "Pendants & Earring Set" },
];

const priceRanges = [
    { img: categories[0].img, name: "Below 25K" },
    { img: categories[1].img, name: "25K - 50K" },
    { img: categories[2].img, name: "50K - 1L" },
    { img: categories[3].img, name: "1L & Above" },
];

const genders = [
    { img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&fit=crop", name: "Women" },
    { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&fit=crop", name: "Men" },
    { img: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=200&fit=crop", name: "Kids & Teens" },
];

const occasions = [
    { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&fit=crop", name: "Wedding" },
    { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&fit=crop", name: "Party" },
    { img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=200&fit=crop", name: "Office" },
    { img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=200&fit=crop", name: "Casual" },
];

// --- Main Component ---

const NavHoverDropdown = ({ onClose }) => {
    const [tab, setTab] = useState("category");

    let items = categories;
    if (tab === "price") items = priceRanges;
    else if (tab === "gender") items = genders;
    else if (tab === "occasion") items = occasions;

    return (
        <DropdownMenu onClick={onClose}>
            <NavGrid onClick={e => e.stopPropagation()}>

                {/* Side Nav */}
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

                {/* Mega Panel */}
                <MegaPanel>
                    <Typography variant="subtitle1" sx={{
                        color: "#FFD700", fontWeight: 600, mb: 2, letterSpacing: 0.2, fontSize: 18, ml: 1
                    }}>
                        {sidenavTabs.find(t => t.key === tab)?.label}
                    </Typography>
                    <CategoryRow>
                        {items.map((cat, i) => (
                            <CategoryBox key={cat.name} tabIndex={0}>
                                <IconWrap>
                                    <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%" }} />
                                </IconWrap>
                                <Typography sx={{
                                    mt: 0.5, color: "#fff", fontWeight: 500, fontSize: 14, textAlign: "center", lineHeight: 1.13
                                }}>
                                    {cat.name}
                                </Typography>
                            </CategoryBox>
                        ))}
                    </CategoryRow>

                    {/* Promo Section */}
                    <Promo>
                        <PromoImage src={categories[0].img} alt="Promo" />
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
                                Jewellery for Every Moment - See It All Here!
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                                20,000+ designs to choose from
                            </Typography>
                        </Box>
                        <Button
                            disableElevation
                            variant="contained"
                            sx={{
                                background: "linear-gradient(90deg, #FFD700 0%, #B3761B 100%)",
                                color: "#4A2109",
                                borderRadius: 9,
                                fontWeight: "bold",
                                px: 3, py: 1,
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": { background: "#FFD700", color: "#2e1406" },
                            }}
                        >
                            View All
                        </Button>
                    </Promo>
                </MegaPanel>

            </NavGrid>
        </DropdownMenu>
    );
};

export default NavHoverDropdown;
