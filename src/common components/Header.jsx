import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Container,
  styled,
  alpha,
  useMediaQuery,
  useTheme,
  Divider,
  Drawer,
  Typography,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  DiamondOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import NavHoverDropdown from "../dropdownHover/NavHoverDropdown";
import { useNavigate } from "react-router-dom";
import AccountPopup from "../popUp/AccountPopup";
import { publicUrl } from "./PublicUrl";
import axiosInstance from "./AxiosInstance";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Theme from "../../Theme";

const StyledAppBar = styled(AppBar)(() => ({
  // backgroundColor: "#44170D",
  backgroundColor: Theme.palette.primary.main,
  boxShadow: "none",
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    minHeight: 56,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: "space-between",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "7px",
  "& img": {
    height: 39,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: { height: 32 },
  },
}));

const IconsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const TopIconButton = styled(IconButton)({
  color: Theme.palette.primary.contrastText,
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const NavigationBar = styled(Box)(() => ({
  backgroundColor: Theme.palette.primary.main,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
  "@media (max-width: 600px)": {
    padding: "0px",
  },
}));

const NavButton = styled(Button)(() => ({
  color: Theme.palette.primary.contrastText,
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 400,
  padding: "6px 12px",
  minWidth: "auto",
  gap: "6px",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#FFD700",
  },
}));

const DrawerNavList = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  paddingLeft: 4,
  overflowY: "auto",
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  paddingBottom: 100
}));

const PopupHead = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 1, 2.5),
  borderBottom: "1px solid rgba(255,255,255,0.06)"
}));

export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const cartCount = useSelector(state => state.app?.data?.length || 0);

  const assignedRouteToPath = {
    allJewellery: '/allJewellery',
    wedding: '/wedding',
    gifting: '/gifting',
    collection: '/collection',
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/allcategories`);
      const data = response?.data || [];
      const mapped = data.map(cat => ({
        apiId: cat._id,
        label: cat.name,
        variety: cat.variety,
        icon: publicUrl(cat.image)
          ? <img src={publicUrl(cat.image)} alt={cat.name} style={{ width: 20, height: 20, borderRadius: "50%" }} />
          : null,
        assignedRoute: cat.assignedRoute
      }));

      setCategories(mapped);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Navigation handler based on category names
  const handleCategoryNavigation = (item) => {
    try {
      const route = assignedRouteToPath[item.assignedRoute] || '/allJewellery';

      // Special handling for "All Jewellery" - show all products without any filter
      if (item.label && item.label.toLowerCase() === "all jewellery") {
        navigate(route); // No filter parameters - shows all products
        return;
      }

      // For specific category routes (wedding, gifting, collection)
      if (item.assignedRoute && item.assignedRoute !== 'allJewellery') {
        navigate(route);
        return;
      }

      // For variety-based categories (Gold, Silver, Diamond) - filter by category name
      if (item.label && item.label.trim()) {
        navigate(`/allJewellery?category=${item.label.toLowerCase()}`);
        return;
      }

      // Final fallback
      navigate('/allJewellery');

    } catch (error) {
      console.error("Navigation error:", error);
      navigate('/allJewellery');
    }
  };

  return (
    <StyledAppBar sx={{ position: "fixed", padding: "4px" }}>
      {/* Top Toolbar */}
      <HeaderToolbar disableGutters>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isMdUp && (
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              sx={{ color: "#fff", mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none", cursor: "pointer" }}>
            <img onClick={() => navigate("/")} src="/logo.svg" alt="logo" />
          </LogoContainer>
        </div>

        {isMdUp && (
          <>
            <SearchBar />
          </>
        )}

        <IconsRow>
          <TopIconButton size="small">
            <DiamondOutlined onClick={() => navigate("/diamond")} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <FavoriteBorder onClick={() => navigate("/wishlist")} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small" onClick={() => setShowAccountPopup(!showAccountPopup)}>
            <PersonOutline sx={{ fontSize: 20 }} />
          </TopIconButton>

          {showAccountPopup && (
            <AccountPopup onClose={() => setShowAccountPopup(false)} />
          )}

          <TopIconButton size="small" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error" overlap="circular" sx={{ "& .MuiBadge-badge": { fontWeight: 600, fontSize: 13, right: 0, top: 3 } }}>
              <ShoppingBagOutlined sx={{ fontSize: 20 }} />
            </Badge>
          </TopIconButton>
        </IconsRow>
      </HeaderToolbar>

      {!isMdUp && (
        <SearchBar />
      )}

      {/* Navigation Bar */}
      <NavigationBar>
        <Container maxWidth="xl">
          {isMdUp && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
              }}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setHoveredMenu(null);
              }}
            >
              {categories.slice(0, 6).map(item => (
                <NavButton
                  key={item.apiId}
                  startIcon={item.icon}
                  onClick={() => handleCategoryNavigation(item)}
                  onMouseEnter={() => {
                    setHoveredMenu(item.apiId);
                    setDropdownOpen(true);
                  }}
                >
                  <Typography sx={{ textTransform: 'capitalize' }}>{item.label}</Typography>
                </NavButton>
              ))}
              {dropdownOpen && hoveredMenu && (
                <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 1200 }}>
                  <NavHoverDropdown
                    hoveredFilter={hoveredMenu}
                    onClose={() => {
                      setDropdownOpen(false);
                      setHoveredMenu(null);
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Container>
      </NavigationBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            p: 0,
            // background: "#44170D",
            // color: "#fff",
            background: Theme.palette.primary.main,
            color: Theme.palette.primary.contrastText,
            width: "92vw",
            maxWidth: 410,
            [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
          },
        }}
      >
        <PopupHead>
          <IconButton
            size="small"
            edge="end"
            onClick={() => setOpen(false)}
            // sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
            sx={{ color: Theme.palette.primary.contrastText, bgcolor: "rgba(255,255,255,0.06)" }}
          >
            <CloseIcon />
          </IconButton>
        </PopupHead>
        <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
        <DrawerNavList>
          {categories.map(item => (
            <NavButton
              key={item.apiId}
              startIcon={item.icon}
              fullWidth
              onClick={() => {
                setOpen(false);
                handleCategoryNavigation(item);
              }}
              sx={{
                justifyContent: "flex-start",
                fontWeight: 500,
                bgcolor: "transparent",
                borderRadius: 10,
                px: 2.2,
                mb: 0.5,
                "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
              }}
            >
              {item.label}
            </NavButton>
          ))}
        </DrawerNavList>
      </Drawer>
    </StyledAppBar>
  );
}