import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useTheme, useMediaQuery } from "@mui/material";
import { Home, Category, ShoppingCart, Person } from "@mui/icons-material";

// You may need to swap Category for an icon of your choice if MUI doesn't have "Category"
export const MobileBottomNav = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:500px)");

  // Only show on mobile ≤500px
  if (!isMobile) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: "98vw",
        maxWidth: 430,
        borderRadius: 4,
        bgcolor: "#fff",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
        zIndex: 1500,
        px: 0.5,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          bgcolor: "#fff",
          borderRadius: 4,
          "& .Mui-selected, & .Mui-selected .MuiBottomNavigationAction-label": {
            color: "#e98a36",
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: 12,
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Category" icon={<Category />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
        <BottomNavigationAction label="You" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};
