import React, { useState } from "react"
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
} from "@mui/material"
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
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"

// Custom styled components (same as before)
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#44170D",
  boxShadow: "none",
  // borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}))

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha("#000", 0.15),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  minWidth: "600px",
  [theme.breakpoints.down("lg")]: {
    minWidth: "300px",
    // maxWidth: '600px',
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    transition: theme.transitions.create("width"),
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 1,
    },
  },
}))

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
})

const NavigationBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#44170D",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
}))

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
  },
}))

const TopIconButton = styled(IconButton)({
  color: "#fff",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

const MenuButton = styled(IconButton)({
  color: "#fff",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

const Header = () => {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen((prev) => !prev)

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
  ]

  return (
    <StyledAppBar position="static">
      {/* Top Header */}
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, sm: 3 },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Logo */}
        <LogoContainer>
          <img src="/logo.svg" alt="logo" />
        </LogoContainer>

        {/* Search Bar */}
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

        {/* Right Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TopIconButton size="small">
            <DiamondOutlined sx={{ fontSize: "20px" }} />
          </TopIconButton>
          <TopIconButton size="small">
            <LocalMallOutlined sx={{ fontSize: "20px" }} />
          </TopIconButton>
          <TopIconButton size="small">
            <FavoriteBorder sx={{ fontSize: "20px" }} />
          </TopIconButton>
          <TopIconButton size="small">
            <PersonOutline sx={{ fontSize: "20px" }} />
          </TopIconButton>
          <TopIconButton size="small">
            <ShoppingBagOutlined sx={{ fontSize: "20px" }} />
          </TopIconButton>
        </Box>
      </Toolbar>

      {/* Navigation Bar */}
      <NavigationBar>
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          {isMdUp ? (
            // Display horizontal menu for md and up
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
          ) : (
            // Hamburger menu for below md
            <Box sx={{ position: "relative" }}>
              {/* Hamburger Icon */}
              <MenuButton
                aria-label="toggle navigation menu"
                onClick={toggleMenu}
                size="large"
              >
                <MenuIcon />
              </MenuButton>

              {/* Dropdown menu */}
              {open && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "44px", // adjust to appear below the hamburger button
                    left: 0,
                    width: "100%",
                    bgcolor: "#44170D",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: 1,
                    zIndex: 20,
                  }}
                >
                  {menuItems.map(({ icon, label }) => (
                    <NavButton
                      key={label}
                      startIcon={icon}
                      fullWidth
                      onClick={() => setOpen(false)} // close menu on click
                    >
                      {label}
                    </NavButton>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Container>
      </NavigationBar>
    </StyledAppBar>
  )
}

export default Header
