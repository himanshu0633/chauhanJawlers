import React, { useState } from "react";
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
  Typography,
  Divider,
  Slide,
  Drawer,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  LocalMallOutlined,
  DiamondOutlined,
  Circle,
  Favorite,
  CardGiftcard,
  Star,
  MoreHoriz,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Brown themed AppBar
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#44170D",
  boxShadow: "none",
}));

// Responsive arrangement for toolbar
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

// Search bar
const SearchBarWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  background: "transparent",
  marginTop: 4,
  marginBottom: 4,
  width: "100%",
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

const NavigationBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#44170D",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
}));

const NavButton = styled(Button)(({ theme }) => ({
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

const DrawerPaper = styled(Box)(({ theme }) => ({
  backgroundColor: "#44170D",
  color: "#fff",
  width: "92vw",
  maxWidth: 410,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
}));

const DrawerNavList = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  paddingLeft: 4,
  // Add scroll if content overflows
  overflowY: "auto",
}));

const PopupHead = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 1, 2.5),
  borderBottom: "1px solid rgba(255,255,255,0.06)"
}));

const PopupPromo = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.075)",
  borderRadius: 10,
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(2, 2, 2.5, 2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  fontSize: 17,
  fontWeight: 500,
}));

const Flat500 = styled("span")({
  fontWeight: 600,
  fontSize: 20,
  color: "#FFD700",
  marginRight: 2,
  marginLeft: 2,
});

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

  const menuItems = [
    { icon: <Star sx={{ fontSize: "16px" }} />, label: "All Jewellery" },
    { icon: <Circle sx={{ fontSize: "16px", color: "#FFD700" }} />, label: "Gold" },
    { icon: <DiamondOutlined sx={{ fontSize: "16px" }} />, label: "Diamond" },
    { icon: <Circle sx={{ fontSize: "16px" }} />, label: "Earrings" },
    { icon: <Circle sx={{ fontSize: "16px" }} />, label: "Rings" },
    { icon: <Star sx={{ fontSize: "16px" }} />, label: "Daily Wear" },
    { icon: <LocalMallOutlined sx={{ fontSize: "16px" }} />, label: "Collections" },
    { icon: <Favorite sx={{ fontSize: "16px" }} />, label: "Wedding" },
    { icon: <CardGiftcard sx={{ fontSize: "16px" }} />, label: "Gifting" },
    { icon: <MoreHoriz sx={{ fontSize: "16px" }} />, label: "More" },
  ];

  return (
    <StyledAppBar position="static">
      {/* Topbar */}
      <HeaderToolbar disableGutters>
        {/* Hamburger menu (always left on mobile) */}
        <div className="topbar-left">
          {!isMdUp && (
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              sx={{ color: "#fff", mr: 0.5 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none" }}>
            <img src="/logo.svg" alt="logo" />
          </LogoContainer>
        </div>


        {/* Center (empty flex-grow on mobile, flex to center the search bar on desktop) */}
        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }} />

        {/* Icons row */}
        <IconsRow>
          <TopIconButton size="small">
            <DiamondOutlined sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <LocalMallOutlined sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <FavoriteBorder sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <PersonOutline sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <ShoppingBagOutlined sx={{ fontSize: 20 }} />
          </TopIconButton>
        </IconsRow>
      </HeaderToolbar>

      {/* Search bar:
          - Below toolbar on mobile/tablet
          - Inside nav row (next to menu) on desktop
      */}
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
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          {isMdUp ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {/* Search Bar (desktop only: left, big) */}
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", mx: { xs: 0, sm: 2 } }}>
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
              {/* Nav menu */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {menuItems.map(({ icon, label }) => (
                  <NavButton key={label} startIcon={icon}>
                    {label}
                  </NavButton>
                ))}
              </Box>
            </Box>
          ) : (
            // Mobile/tablet: no nav buttons; use Hamburger/Drawer instead
            null
          )}
        </Container>
      </NavigationBar>

      {/* --- Drawer/popup style menu on mobile/tablet --- */}
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
        {/* Drawer Header */}
        <PopupHead>
          {/* <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 16 }}>
            <span style={{ color: "#FFD700", fontWeight: 700 }}>Flat Rs. 500 off</span>
            <span style={{ color: "#fff", fontWeight: 400 }}>&nbsp;on your first order</span>
          </Typography> */}

          <IconButton
            size="small"
            edge="end"
            onClick={() => setOpen(false)}
            sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
          >
            <CloseIcon />
          </IconButton>
        </PopupHead>
        {/* Log in/Sign up actions */}
        <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
          <DrawerMenuAction onClick={() => { setOpen(false); }}>Log In</DrawerMenuAction>
          <DrawerMenuAction
            onClick={() => { setOpen(false); }}
            sx={{ fontWeight: 500, border: "1px solid #FFD700", color: "#FFD700", background: "rgba(255,222,90,0.09)" }}
          >
            Sign Up
          </DrawerMenuAction>
        </Box>

        {/* Divider */}
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.11)" }} />

        {/* Navigation List */}
        <DrawerNavList>
          {menuItems.map(({ icon, label }, i) => (
            <NavButton
              key={label}
              startIcon={icon}
              fullWidth
              onClick={() => setOpen(false)}
              sx={{
                justifyContent: "flex-start",
                fontWeight: i === 0 ? 700 : 500,
                bgcolor: i === 0 ? "rgba(255,255,255,0.045)" : "transparent",
                borderRadius: 10,
                px: 2.2,
                mb: 0.5,
                color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
              }}
            >
              {label}
            </NavButton>
          ))}
        </DrawerNavList>
      </Drawer>
    </StyledAppBar>
  );
}
