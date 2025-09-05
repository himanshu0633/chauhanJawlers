import React from "react";
import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    useTheme,
    useMediaQuery,
    Badge
} from "@mui/material";
import {
    Home,
    Category,
    ShoppingCart,
    PersonOutline,
    Star
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const MobileBottomNav = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()
    const isMobile = useMediaQuery("(max-width:600px)");
    const cartCount = useSelector(state => state.app?.data?.length || 0);

    if (!isMobile) return null;

    return (
        <Paper
            elevation={12}
            sx={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                maxWidth: 600,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                bgcolor: "#44170D !important",
                boxShadow: "0 0 16px 0 rgba(0,0,0,0.12), 0 0.5px 1.5px rgba(0,0,0,0.08)",
                zIndex: 1500,
                px: 0,
                py: 0.5,
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => setValue(newValue)}
                sx={{
                    bgcolor: "#44170D",
                    borderRadius: 2,
                    "& .MuiSvgIcon-root": {
                        color: "#fff", // All icons white by default
                    },
                    "& .MuiBottomNavigationAction-label": {
                        color: "#fff", // All labels white by default
                        fontSize: 11,
                        letterSpacing: 0.1,
                        fontWeight: 500,
                        mt: "1px"
                    },
                    "& .Mui-selected, & .Mui-selected .MuiBottomNavigationAction-label": {
                        color: "#FFD700", // Selected color (gold) - change as needed
                    },
                    "& .MuiBottomNavigationAction-root": {
                        minWidth: 0,
                        maxWidth: "100px",
                        flex: 1
                    }
                }}
            >
                <BottomNavigationAction onClick={() => navigate("/")} label="Home" icon={<Home />} />
                <BottomNavigationAction onClick={() => navigate("/allJewellery")} label="Products" icon={<Category />} />
                {/* <BottomNavigationAction onClick={() => navigate("/wishlist")} label="Wishlist" icon={<Star />} /> */}
                <BottomNavigationAction
                    onClick={() => navigate("/cart")}
                    label="Cart"
                    icon={
                        <Badge badgeContent={cartCount} color="error" overlap="circular"
                            sx={{ "& .MuiBadge-badge": { fontWeight: 600, fontSize: 12, right: -7, top: 3, minWidth: 18, height: 18 } }}>
                            <ShoppingCart />
                        </Badge>
                    }
                />
                <BottomNavigationAction onClick={() => navigate("/profileEdit")} label="You" icon={<PersonOutline />} />
            </BottomNavigation>
        </Paper>
    );
};



