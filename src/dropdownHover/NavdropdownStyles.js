import { Box, Paper, styled } from "@mui/material";

// Theme colors for consistency
export const COLORS = {
    primary: "#44170D",
    primaryDark: "#381209",
    accent: "#FFD700",
    border: "#402419",
    text: "#fff",
    hover: "rgba(255,255,255,0.06)",
    shadow: "rgba(0,0,0,0.18)"
};

// Main dropdown container
export const DropdownContainer = styled(Paper)(({ theme }) => ({
    position: "fixed",
    top: 108,
    left: 0,
    right: 0,
    background: COLORS.primary,
    borderRadius: "0 0 24px 24px",
    boxShadow: `0 8px 32px ${COLORS.shadow}`,
    padding: 0,
    zIndex: 1200,
    maxWidth: "100vw",
    minHeight: 360,
    overflowX: "auto",
    [theme.breakpoints.down("lg")]: {
        minHeight: 330
    },
}));

// Navigation grid container
export const NavigationGrid = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    minHeight: 330,
    width: "100%"
});

// Side navigation panel
export const SideNavigation = styled(Box)(({ theme }) => ({
    width: 190,
    background: "transparent",
    padding: "24px 0",
    borderRight: `1.5px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    [theme.breakpoints.down("lg")]: {
        width: 170,
        padding: "20px 0",
    },
}));

// Individual side nav items
export const SideNavItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== "active"
})(({ active, theme }) => ({
    background: active ? COLORS.primaryDark : "transparent",
    color: COLORS.text,
    fontWeight: 600,
    fontSize: 15,
    padding: "14px 20px",
    borderRadius: 10,
    cursor: "pointer",
    margin: "0 16px 6px 0",
    borderLeft: active ? `4px solid ${COLORS.accent}` : "4px solid transparent",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        background: active ? COLORS.primaryDark : COLORS.hover,
    },
    [theme.breakpoints.down("lg")]: {
        fontSize: 14,
        padding: "12px 18px",
    }
}));

// Main content area
export const ContentArea = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "16px 20px",
    //   minWidth: 400,  //uncomment if want to use rightPanel
    //   maxWidth: 800,   //uncomment if want to use rightPanel
    [theme.breakpoints.down("lg")]: {
        padding: "12px 16px",
        // minWidth: 350    //uncomment if want to use rightPanel
    }
}));

// Right promotional panel
export const RightPanel = styled(Box)(({ theme }) => ({
    width: 240,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    padding: "20px 16px",
    [theme.breakpoints.down("lg")]: {
        display: "none"
    },
}));

// Category grid layout
export const CategoryGrid = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    gap: 12,
    paddingTop: 8,
    paddingBottom: 8,
}));

// Category column
export const CategoryColumn = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // gap: 8,
    gap: 2,
    // paddingInline: 6,
    borderRight: `1px solid ${COLORS.border}`,
    "&:last-of-type": {
        borderRight: "none"
    },
});

// Individual category item
export const CategoryItem = styled(Box)(({ theme }) => ({
    // width: "90%",
    minWidth: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 8px",
    cursor: "pointer",
    borderRadius: 16,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        background: COLORS.hover,
        transform: "translateY(-2px)"
    },
    [theme.breakpoints.down("lg")]: {
        // minWidth: 90,
        padding: "10px 6px"
    },
}));

// Category icon wrapper
export const CategoryIcon = styled(Box)(({ theme }) => ({
    width: 48,
    height: 48,
    background: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    [theme.breakpoints.down("lg")]: {
        width: 42,
        height: 42
    },
}));

// Big grid for price/gender/occasion items
export const BigGrid = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 12,
    minHeight: 180,
    [theme.breakpoints.down("lg")]: {
        gap: 18,
        marginTop: 12
    },
}));

// Individual big grid item
export const BigItem = styled(Box)(({ theme }) => ({
    // minWidth: 140,
    // maxWidth: 180,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 12,
    padding: "12px 8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        background: COLORS.hover,
        transform: "translateY(-3px)"
    },
    [theme.breakpoints.down("lg")]: {
        // minWidth: 120,
        // maxWidth: 160
    }
}));

// Big item image wrapper
export const BigImageWrapper = styled(Box)(({ theme }) => ({
    width: 110,
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    background: "#f8f4f0",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    [theme.breakpoints.down("lg")]: {
        width: 95,
        height: 95
    },
}));

// Promotional banner styling
export const PromotionalBanner = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    borderRadius: 16,
    padding: "16px 12px",
});
