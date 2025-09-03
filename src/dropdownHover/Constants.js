export const SIDENAV_TABS = [
  { key: "category", label: "Category" },
  { key: "price", label: "Price Range" },
  { key: "occasion", label: "Occasion" },
  { key: "gender", label: "Gender" },
];

export const PRICE_RANGES = [
  { 
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", 
    name: "Under ₹25K" 
  },
  { 
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", 
    name: "₹25K-₹50K" 
  },
  { 
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", 
    name: "₹50K-₹1L" 
  },
  { 
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", 
    name: "Over ₹1L" 
  },
];

export const GENDERS = [
  { 
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=240&fit=crop", 
    name: "Women" 
  },
  { 
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&fit=crop", 
    name: "Men" 
  },
  { 
    img: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=240&fit=crop", 
    name: "Unisex" 
  },
];

// API endpoints
export const API_ENDPOINTS = {
  SUBCATEGORIES: "/user/allSubcategories",
  OCCASIONS: "/user/allOccasions"
};

// Responsive breakpoints for grid columns
export const GRID_BREAKPOINTS = {
  XL: 6,
  LG: 5,
  DEFAULT: 4
};
