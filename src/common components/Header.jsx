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

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#44170D",
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
  color: "#fff",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
const SearchBarWrap = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: "transparent",
  marginTop: 4,
  marginBottom: 4,
  [theme.breakpoints.down("md")]: {
    marginTop: 6,
    marginBottom: 5,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha("#000", 0.15),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  width: "100%",
  minWidth: "600px",
  maxWidth: "800px",
  [theme.breakpoints.down("lg")]: {
    minWidth: "300px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
    maxWidth: "100%",
    borderRadius: "18px",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 1,
    },
  },
}));
const NavigationBar = styled(Box)(() => ({
  backgroundColor: "#44170D",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
  "@media (max-width: 600px)": {
    padding: "0px",
  },
}));
const NavButton = styled(Button)(() => ({
  color: "#fff",
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
}));
const PopupHead = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 1, 2.5),
  borderBottom: "1px solid rgba(255,255,255,0.06)"
}));
const DrawerMenuAction = styled(Button)({
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.17)",
  background: "#fff",
  color: "#44170D",
  fontWeight: 700,
  fontSize: 14,
  marginTop: 7,
  padding: "6px 22px",
  textTransform: "none",
  "&:hover": {
    background: "#fff",
    opacity: 0.8,
  }
});

export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
    // setShowAccountPopup(!showAccountPopup)
  };



  // Dropdown IDs for hover menu
  const hasDropdown = ["category", "price", "gender", "occasion"];

  const assignedRouteToPath = {
    allJewellery: '/allJewellery',
    diamond: '/allJewellery',
    gold: '/allJewellery',
    silver: '/allJewellery',
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
        // id: dropdownCategoryMap[cat._id] || null,
        apiId: cat._id,
        label: cat.name,
        icon: publicUrl(cat.image)
          ? <img src={publicUrl(cat.image)} alt={cat.name} style={{ width: 20, height: 20, borderRadius: "50%" }} />
          : null,
        assignedRoute: cat.assignedRoute // <-- retain this from backend
      }));


      setCategories(mapped);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
          <Box sx={{ flex: 1, px: 2, display: "flex", justifyContent: "center" }}>
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: "20px" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
                inputProps={{ "aria-label": "search" }}
              />
            </SearchContainer>
          </Box>
        )}

        <IconsRow>
          <TopIconButton size="small">
            <DiamondOutlined onClick={() => navigate("/diamond")} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <FavoriteBorder onClick={() => navigate("/wishlist")} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small" >
            <PersonOutline onClick={() => setShowAccountPopup(!showAccountPopup)} sx={{ fontSize: 20 }} />
            {/* <PersonOutline onClick={toggleDropdown} sx={{ fontSize: 20 }} /> */}
          </TopIconButton>
          <TopIconButton size="small">
            <ShoppingBagOutlined onClick={() => navigate("/cart")} sx={{ fontSize: 20 }} />
          </TopIconButton>
        </IconsRow>
      </HeaderToolbar>

      {showAccountPopup && <AccountPopup />}

      {!isMdUp && (
        <SearchBarWrap>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: "20px" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>
        </SearchBarWrap>
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

              {/* {categories.filter(cat => cat._id === cat._id).map(item => ( */}
              {categories.slice(0, 8).filter(cat => cat._id === cat._id).map(item => (
                <NavButton
                  key={item.apiId}
                  startIcon={item.icon}
                  onClick={() => {
                    const route = assignedRouteToPath[item.assignedRoute];
                    if (route) {
                      navigate(route);
                    } else {
                      navigate(`/category/${item.apiId}`);
                    }
                  }}

                  onMouseEnter={() => {
                    setHoveredMenu('category');  // Trigger the 'category' dropdown
                    setDropdownOpen(true);
                  }}
                >
                  {item.label}
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
            background: "#44170D",
            color: "#fff",
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
            sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
          >
            <CloseIcon />
          </IconButton>
        </PopupHead>
        <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
          <DrawerMenuAction onClick={() => setOpen(false)}>Log In</DrawerMenuAction>
          <DrawerMenuAction
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: 500,
              border: "1px solid #FFD700",
              color: "#FFD700",
              background: "rgba(255,222,90,0.09)",
            }}
          >
            Sign Up
          </DrawerMenuAction>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.11)" }} />
        <DrawerNavList>
          {categories.map(item => (
            <NavButton
              key={item.apiId}
              startIcon={item.icon}
              fullWidth
              onClick={() => {
                const route = assignedRouteToPath[item.assignedRoute];
                if (route) {
                  navigate(route);
                } else {
                  navigate(`/category/${item.apiId}`);
                }
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


