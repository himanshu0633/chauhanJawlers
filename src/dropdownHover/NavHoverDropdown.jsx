// // 1:  simple version

// import { useEffect, useMemo, useState } from "react";
// import { Box, Typography, Button, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../common components/AxiosInstance";
// import { publicUrl } from "../common components/PublicUrl";

// const DropdownMenu = styled(Paper)(({ theme }) => ({
//     position: "fixed",
//     top: 108,
//     left: 0,
//     right: 0,
//     background: "#44170D",
//     borderRadius: "0 0 24px 24px",
//     boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
//     padding: 0,
//     zIndex: 1200,
//     maxWidth: "100vw",
//     minHeight: 360,
//     overflowX: "auto",
//     [theme.breakpoints.down("lg")]: { minHeight: 330 },
// }));

// const NavGrid = styled(Box)({
//     display: "flex",
//     alignItems: "flex-start",
//     minHeight: 330,
// });

// const Sidenav = styled(Box)(({ theme }) => ({
//     width: 192,
//     background: "none",
//     padding: "28px 0",
//     borderRight: "1.3px solid #402419",
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//     [theme.breakpoints.down("lg")]: {
//         width: 170,
//         padding: "24px 0",
//     },
// }));

// const SidenavItem = styled(Box, { shouldForwardProp: (p) => p !== "active" })(({ active }) => ({
//     background: active ? "#381209" : "transparent",
//     color: "#fff",
//     fontWeight: 600,
//     fontSize: 16,
//     padding: "12px 24px",
//     borderRadius: 12,
//     cursor: "pointer",
//     margin: "0 18px 5px 0",
//     borderLeft: active ? "4px solid #FFD700" : "4px solid transparent",
//     transition: "all 0.14s",
// }));

// const CategoryGrid = styled(Box)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "row",
//     width: "100%",
//     minWidth: 200,
//     alignItems: "flex-start",
//     paddingTop: 16,
//     paddingBottom: 8,
//     [theme.breakpoints.down("lg")]: { paddingTop: 8 },
// }));

// const CategoryCol = styled(Box)(({ theme }) => ({
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingInline: 8,
//     borderRight: "1px solid #402419",
//     "&:last-of-type": { borderRight: "none" },
// }));

// const CategoryBox = styled(Box)(({ theme }) => ({
//     width: "80%",
//     minWidth: 100,
//     display: "flex",
//     // flexDirection: "column",
//     gap: '10px',
//     alignItems: "center",
//     padding: "10px 0",
//     cursor: "pointer",
//     borderRadius: 18,
//     "&:hover": { background: "rgba(255,255,255,0.06)" },
//     [theme.breakpoints.down("lg")]: { minWidth: 120, padding: "12px 0 10px" },
// }));

// const IconWrap = styled(Box)(({ theme }) => ({
//     width: 52,
//     height: 52,
//     background: "#fff",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 7,
//     overflow: "hidden",
//     "& img": { width: "100%", height: "100%", objectFit: "cover" },
//     [theme.breakpoints.down("lg")]: { width: 46, height: 46 },
// }));

// const BigGrid = styled(Box)(({ theme }) => ({
//     width: "100%",
//     display: "flex",
//     alignItems: "flex-end",
//     justifyContent: "flex-start",
//     gap: 28,
//     flexWrap: "nowrap",
//     marginTop: 24,
//     marginBottom: 12,
//     minHeight: 160,
//     [theme.breakpoints.down("lg")]: { gap: 20, marginTop: 18 },
// }));

// const BigItem = styled(Box)(({ theme }) => ({
//     minWidth: 158,
//     maxWidth: 202,
//     width: "18vw",
//     borderRadius: 16,
//     margin: "0 6px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     cursor: "pointer",
// }));

// const BigImageWrap = styled(Box)(({ theme }) => ({
//     width: 124,
//     height: 124,
//     borderRadius: 16,
//     overflow: "hidden",
//     background: "#f7efe8",
//     marginBottom: 10,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "& img": { width: "100%", height: "100%", objectFit: "cover" },
//     [theme.breakpoints.down("lg")]: { width: 110, height: 110 },
// }));

// const BigLabel = styled(Typography)({
//     color: "#fff",
//     fontWeight: 600,
//     fontSize: 16,
//     marginTop: 5,
//     letterSpacing: 0.1,
// });

// const PromoBar = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     background: "#fff",
//     borderRadius: 17,
//     padding: "12px 16px",
//     gap: 14,
//     margin: "26px 0 0 0",
//     boxShadow: "0 1.1px 6px 0 #d3bfbf23",
//     maxWidth: 560,
//     width: "100%",
//     [theme.breakpoints.down("lg")]: { maxWidth: 520, marginTop: 20 },
// }));

// const RightPanel = styled(Box)(({ theme }) => ({
//     flex: 1.2,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     minWidth: 220,
//     background: "none",
//     padding: "20px 18px 0 18px",
//     gap: 18,
//     [theme.breakpoints.down("lg")]: { display: "none" },
// }));

// /* ---------------- data for other tabs ---------------- */
// const sidenavTabs = [
//     { key: "category", label: "Category" },
//     { key: "price", label: "Price" },
//     { key: "occasion", label: "Occasion" },
//     { key: "gender", label: "Gender" },
// ];

// const priceRanges = [
//     { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "Under ₹25K" },
//     { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "₹25K-₹50K" },
//     { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "₹50K-₹1L" },
//     { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "Over ₹1L" },
// ];

// const genders = [
//     { img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=240&fit=crop", name: "Women" },
//     { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&fit=crop", name: "Men" },
//     { img: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=240&fit=crop", name: "Unisex" },
// ];

// const NavHoverDropdown = ({ hoveredFilter, onClose }) => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [tab, setTab] = useState(hoveredFilter || "category");

//     const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

//     // Updated condition: check if hover is possible, regardless of pointer type
//     const canHover = useMediaQuery("(hover: hover)");
//     if (!isMdUp || !canHover) return null;

//     const [subcategoryName, setSubCategoryName] = useState([]);
//     const [isLoadingCats, setIsLoadingCats] = useState(false);
//     const [catsError, setCatsError] = useState(null);
//     const [occasions, setOccasions] = useState([]);


//     useEffect(() => {
//         if (hoveredFilter) {
//             setTab(hoveredFilter);
//         }
//     }, [hoveredFilter]);

//     useEffect(() => {
//         (async () => {
//             try {
//                 setIsLoadingCats(true);
//                 setCatsError(null);
//                 const res = await axiosInstance.get("/user/allSubcategories");
//                 const subcategories =
//                     res?.data?.categories ?? res?.data?.data ?? (Array.isArray(res?.data) ? res.data : []);
//                 setSubCategoryName(Array.isArray(subcategories) ? subcategories : []);
//             } catch (err) {
//                 setCatsError(err?.response?.data?.message || err?.message || "Failed to load categories");
//                 setSubCategoryName([]);
//             } finally {
//                 setIsLoadingCats(false);
//             }
//         })();
//     }, []);

//     // Fetch occasions
//     useEffect(() => {
//         (async () => {
//             try {
//                 setIsLoadingCats(true);
//                 setCatsError(null);
//                 const res = await axiosInstance.get("/user/allOccasions");
//                 const subOccasions =
//                     res?.data?.categories ?? res?.data?.data ?? (Array.isArray(res?.data) ? res.data : []);
//                 setOccasions(Array.isArray(subOccasions) ? subOccasions : []);
//             } catch (err) {
//                 setCatsError(err?.response?.data?.message || err?.message || "Failed to load occasions");
//                 setOccasions([]);
//             } finally {
//                 setIsLoadingCats(false);
//             }
//         })();
//     }, []);

//     const cols = useMediaQuery(theme.breakpoints.up("xl")) ? 4 : useMediaQuery(theme.breakpoints.up("lg")) ? 3 : 2;

//     const categoryCols = useMemo(() => {
//         const out = Array.from({ length: cols }, () => []);
//         subcategoryName.forEach((item, i) => out[i % cols].push(item));
//         return out;
//     }, [subcategoryName, cols]);

//     const centerPanel =
//         tab === "category" ? (
//             <CategoryGrid>
//                 {isLoadingCats && (
//                     <Typography sx={{ color: "#fff", opacity: 0.8, fontSize: 24, px: 2, fontWeight: 700 }}>
//                         Loading categories…
//                     </Typography>
//                 )}
//                 {catsError && (
//                     <Typography sx={{ color: "#ffb4b4", fontSize: 23, px: 2, fontWeight: 700 }}>
//                         {catsError}
//                     </Typography>
//                 )}

//                 {subcategoryName.length > 0 ? (
//                     categoryCols.map((col, idx) => (
//                         <CategoryCol key={idx}>
//                             {col.map((item) => {
//                                 const id = item._id || item.id;
//                                 const name = item.name || "Category";
//                                 const img = publicUrl(item.image);
//                                 return (
//                                     <CategoryBox
//                                         key={id || name}
//                                         onClick={() => { navigate(`/allJewellery?subcategory=${item._id}`) }}
//                                     >
//                                         <IconWrap>
//                                             <img src={img} alt={name} />
//                                         </IconWrap>
//                                         <Typography
//                                             sx={{
//                                                 // mt: 0.8,
//                                                 color: "#fff",
//                                                 fontWeight: 500,
//                                                 fontSize: { xs: 13, lg: 14.5 },
//                                                 textAlign: "center",
//                                                 // width: "100%",
//                                             }}
//                                         >
//                                             {name}
//                                         </Typography>
//                                     </CategoryBox>
//                                 );
//                             })}
//                         </CategoryCol>
//                     ))
//                 ) : (
//                     !isLoadingCats &&
//                     !catsError && (
//                         <Typography sx={{ color: "#fff", opacity: 0.7, fontSize: 13, px: 2 }}>
//                             No categories found.
//                         </Typography>
//                     )
//                 )}
//             </CategoryGrid>
//         ) : (
//             <BigGrid>
//                 {(tab === "price" ? priceRanges : tab === "gender" ? genders : occasions).map((item) => (
//                     <BigItem
//                         key={item.name}
//                         sx={{ cursor: "pointer" }}
//                         onClick={() => {
//                             // Determine query params based on tab
//                             let params = new URLSearchParams();

//                             if (tab === "price") {
//                                 params.set("price", item.name);

//                             } else if (tab === "gender") {
//                                 params.set("gender", item.name.toLowerCase());
//                             } else if (tab === "occasion") {
//                                 // If handling occasions similarly, add here, for example:
//                                 params.set("occasion", item.name.toLowerCase());
//                             }

//                             // Navigate to allJewellery with query params
//                             navigate(`/allJewellery?${params.toString()}`);

//                             // Close the dropdown after selection
//                             onClose && onClose();
//                         }}
//                     >
//                         <BigImageWrap>
//                             <img src={item.image ? publicUrl(item.image) : item.img} alt={item.name} />
//                         </BigImageWrap>
//                         <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 16, mt: 0.5 }}>
//                             {item.name}
//                         </Typography>
//                     </BigItem>
//                 ))
//                 }
//             </BigGrid >

//         );

//     return (
//         <DropdownMenu onClick={onClose}>
//             <NavGrid onClick={(e) => e.stopPropagation()}>
//                 <Sidenav>
//                     {sidenavTabs.map(({ key, label }) => (
//                         <SidenavItem
//                             key={key}
//                             active={tab === key ? 1 : 0}
//                             onMouseEnter={() => setTab(key)}
//                         >
//                             {label}
//                         </SidenavItem>
//                     ))}
//                 </Sidenav>

//                 <Box
//                     sx={{
//                         flex: 3.5,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         pl: { md: 2, lg: 3 },
//                         pr: 0,
//                         pt: { md: 2, lg: 3 },
//                         minWidth: 440,
//                         maxWidth: 900,
//                         margin: "0 auto",
//                     }}
//                 >
//                     {centerPanel}
//                 </Box>

//                 {/* Right panel (hidden below lg) */}
//                 <RightPanel>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             width: "100%",
//                             background: "transparent",
//                             borderRadius: 2,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}
//                     >
//                         <img
//                             src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=370"
//                             alt="Profile"
//                             style={{ width: 200, height: 300, objectFit: "cover", borderRadius: 16 }}
//                         />
//                         <Typography sx={{ color: "#fff", fontWeight: 600, mt: 0, mb: 1, fontSize: 18, textAlign: "center" }}>
//                             Elan - My World. My Story.
//                         </Typography>
//                         <Typography sx={{ mb: 0.8, mt: 1 }}>
//                             <a
//                                 href="#"
//                                 style={{
//                                     color: "#FFD700",
//                                     fontWeight: "bold",
//                                     textDecoration: "underline",
//                                     fontSize: 16,
//                                 }}
//                             >
//                                 Explore Now ↗
//                             </a>
//                         </Typography>
//                     </Paper>
//                 </RightPanel>
//             </NavGrid>
//         </DropdownMenu>
//     );
// };

// export default NavHoverDropdown;

// // 2: Import necessary libraries and components
import { useEffect, useMemo, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";
import { 
  DropdownContainer, 
  NavigationGrid, 
  SideNavigation, 
  SideNavItem, 
  ContentArea, 
  RightPanel,
  CategoryGrid,
  CategoryColumn,
  CategoryItem,
  CategoryIcon,
  BigGrid,
  BigItem,
  BigImageWrapper,
  PromotionalBanner
} from './NavdropdownStyles';
import { 
  SIDENAV_TABS, 
  PRICE_RANGES, 
  GENDERS, 
  API_ENDPOINTS,
  GRID_BREAKPOINTS 
} from './Constants';

/**
 * NavHoverDropdown - A responsive navigation dropdown with categories, pricing, and filters
 * @param {string} hoveredFilter - The initially active filter tab
 * @param {Function} onClose - Callback function to close the dropdown
 */
const NavHoverDropdown = ({ hoveredFilter, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Responsive breakpoints
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const canHover = useMediaQuery("(hover: hover)");
  
  // State management
  const [activeTab, setActiveTab] = useState(hoveredFilter || "category");
  const [subcategories, setSubcategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Early return for non-desktop devices or non-hover capable devices
  if (!isMdUp || !canHover) return null;

  // Sync active tab with hovered filter
  useEffect(() => {
    if (hoveredFilter) {
      setActiveTab(hoveredFilter);
    }
  }, [hoveredFilter]);

  // Fetch subcategories data
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get(API_ENDPOINTS.SUBCATEGORIES);
        const data = response?.data?.categories ?? 
                    response?.data?.data ?? 
                    (Array.isArray(response?.data) ? response.data : []);
        
        setSubcategories(Array.isArray(data) ? data : []);
      } catch (err) {
        const errorMessage = err?.response?.data?.message || 
                           err?.message || 
                           "Failed to load categories";
        setError(errorMessage);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  // Fetch occasions data
  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get(API_ENDPOINTS.OCCASIONS);
        const data = response?.data?.categories ?? 
                    response?.data?.data ?? 
                    (Array.isArray(response?.data) ? response.data : []);
        
        setOccasions(Array.isArray(data) ? data : []);
      } catch (err) {
        const errorMessage = err?.response?.data?.message || 
                           err?.message || 
                           "Failed to load occasions";
        setError(errorMessage);
        setOccasions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOccasions();
  }, []);

  // Calculate responsive grid columns
  const gridColumns = useMediaQuery(theme.breakpoints.up("xl")) ? GRID_BREAKPOINTS.XL : 
                     useMediaQuery(theme.breakpoints.up("lg")) ? GRID_BREAKPOINTS.LG : 
                     GRID_BREAKPOINTS.DEFAULT;

  // Organize categories into balanced columns
  const categoryColumns = useMemo(() => {
    const columns = Array.from({ length: gridColumns }, () => []);
    subcategories.forEach((item, index) => 
      columns[index % gridColumns].push(item)
    );
    return columns;
  }, [subcategories, gridColumns]);

  // Handle navigation with proper URL parameters
  const handleNavigation = (type, item) => {
    const params = new URLSearchParams();
    
    switch (type) {
      case 'subcategory':
        navigate(`/allJewellery?subcategory=${item._id}`);
        break;
      case 'price':
        params.set("price", item.name);
        navigate(`/allJewellery?${params.toString()}`);
        break;
      case 'gender':
        params.set("gender", item.name.toLowerCase());
        navigate(`/allJewellery?${params.toString()}`);
        break;
      case 'occasion':
        params.set("occasion", item.name.toLowerCase());
        navigate(`/allJewellery?${params.toString()}`);
        break;
      default:
        console.warn(`Unknown navigation type: ${type}`);
    }
    
    // Close dropdown after navigation
    onClose?.();
  };

  // Render loading state
  const renderLoadingState = () => (
    <Typography sx={{ 
      color: "#fff", 
      fontSize: 16, 
      px: 2, 
      py: 4,
      fontWeight: 500,
      textAlign: "center"
    }}>
      Loading...
    </Typography>
  );

  // Render error state
  const renderErrorState = () => (
    <Typography sx={{ 
      color: "#ffb4b4", 
      fontSize: 14, 
      px: 2, 
      py: 4,
      fontWeight: 500,
      textAlign: "center"
    }}>
      {error}
    </Typography>
  );

  // Render empty state
  const renderEmptyState = (message) => (
    <Typography sx={{ 
      color: "#fff", 
      opacity: 0.7, 
      fontSize: 14, 
      px: 2, 
      py: 4,
      textAlign: "center"
    }}>
      {message}
    </Typography>
  );

  // Render category grid content
  const renderCategoryContent = () => (
    <CategoryGrid>
      {loading && renderLoadingState()}
      {error && renderErrorState()}

      {subcategories.length > 0 ? (
        categoryColumns.map((column, columnIndex) => (
          <CategoryColumn key={columnIndex}>
            {column.map((item) => (
              <CategoryItem
                key={item._id || item.name}
                onClick={() => handleNavigation('subcategory', item)}
              >
                <CategoryIcon>
                  <img 
                    src={publicUrl(item.image)} 
                    alt={item.name}
                    loading="lazy"
                  />
                </CategoryIcon>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: { xs: 12, lg: 13 },
                    textAlign: "center",
                    lineHeight: 1.3,
                    mt: 0.5
                  }}
                >
                  {item.name}
                </Typography>
              </CategoryItem>
            ))}
          </CategoryColumn>
        ))
      ) : (
        !loading && !error && renderEmptyState("No categories available")
      )}
    </CategoryGrid>
  );

  // Render big grid content for price, gender, and occasion tabs
  const renderBigGridContent = () => {
    const data = activeTab === "price" ? PRICE_RANGES : 
                 activeTab === "gender" ? GENDERS : 
                 occasions;

    if (data.length === 0 && activeTab === "occasion") {
      return renderEmptyState("No occasions available");
    }

    return (
      <BigGrid>
        {data.map((item) => (
          <BigItem
            key={item.name}
            onClick={() => handleNavigation(activeTab, item)}
          >
            <BigImageWrapper>
              <img 
                src={item.image ? publicUrl(item.image) : item.img} 
                alt={item.name}
                loading="lazy"
              />
            </BigImageWrapper>
            <Typography sx={{ 
              color: "#fff", 
              fontWeight: 600, 
              fontSize: 15, 
              mt: 1,
              textAlign: "center",
              lineHeight: 1.2
            }}>
              {item.name}
            </Typography>
          </BigItem>
        ))}
      </BigGrid>
    );
  };

  return (
    <DropdownContainer onClick={onClose}>
      <NavigationGrid onClick={(e) => e.stopPropagation()}>
        {/* Side Navigation */}
        <SideNavigation>
          {SIDENAV_TABS.map(({ key, label }) => (
            <SideNavItem
              key={key}
              active={activeTab === key}
              onMouseEnter={() => setActiveTab(key)}
              role="button"
              tabIndex={0}
            >
              {label}
            </SideNavItem>
          ))}
        </SideNavigation>

        {/* Main Content Area */}
        <ContentArea>
          {activeTab === "category" ? renderCategoryContent() : renderBigGridContent()}
        </ContentArea>

        {/* Right Panel - Promotional Content */}
        {/* <RightPanel>
          <PromotionalBanner>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=370"
              alt="Promotional Banner"
              loading="lazy"
              style={{ 
                width: "100%", 
                height: 260, 
                objectFit: "cover", 
                borderRadius: 12,
                marginBottom: 16
              }}
            />
            <Typography sx={{ 
              color: "#fff", 
              fontWeight: 600, 
              fontSize: 17, 
              textAlign: "center",
              mb: 1.5,
              lineHeight: 1.3
            }}>
              Elan - My World. My Story.
            </Typography>
            <Typography 
              component="a" 
              href="#" 
              sx={{
                color: "#FFD700",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
                border: "1px solid #FFD700",
                padding: "8px 16px",
                borderRadius: 20,
                transition: "all 0.2s ease-in-out",
                "&:hover": { 
                  backgroundColor: "#FFD700",
                  color: "#44170D"
                }
              }}
            >
              Explore Now ↗
            </Typography>
          </PromotionalBanner>
        </RightPanel> */}
      </NavigationGrid>
    </DropdownContainer>
  );
};

export default NavHoverDropdown;

