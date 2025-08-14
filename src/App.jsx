import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AllJewelleryPage from './dropdownPages/AllJewelleryPage';
import Header from './common components/Header';
import Footer from './common components/Footer';
import { MobileBottomNav } from './common components/MobileBottomNav';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import SingleProductPage from './pages/SingleProductPage';
import CollectionPage from './dropdownPages/CollectionPage';
import AdminLogin from './admin-panel/component/AdminLogin';
import ProtectedRoute from './admin-panel/component/ProtectedRoute';
import AdminLayout from './admin-panel/component/AdminLayout';
import Dashboard from './admin-panel/Pages/Dashboard';
import CategoryJewel from './admin-panel/Pages/CategoryJewel';
import SubCategoryJewel from './admin-panel/Pages/SubCategoryJewel';
import ProductsJewel from './admin-panel/Pages/ProductsJewel';
import AddNewProduct from './admin-panel/Pages/AddNewProduct';
import WeddingPage from './dropdownPages/WeddingPage';
import GiftingPage from './dropdownPages/GiftingPage';
import OrderJewel from './admin-panel/Pages/OrderJewel';
import Banners from './admin-panel/Pages/Banners';
import UsersJewel from './admin-panel/Pages/UsersJewel';
import Occasion from './admin-panel/Pages/Occasion';
import DimandShowCase from './pages/DaimondPageNav/DimandShowCase';

function App() {
  const location = useLocation();

  // Check if the current route is part of the admin panel
  const isAdminRoute = location.pathname.startsWith('/AdminPanel');

  return (
    <>
      {/* Render Header, Footer, and MobileBottomNav only on non-admin routes */}
      {!isAdminRoute && (
        <>
          <Header />
          <Box sx={{ paddingTop: { xs: 13, md: 20, lg: 14.5 } }} />
        </>
      )}


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allJewellery" element={<AllJewelleryPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/gifting" element={<GiftingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/singleProduct" element={<SingleProductPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/diamond" element={<DimandShowCase />} />

        {/* admin panel  */}
        <Route>
          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route
            path="/AdminPanel"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="category" element={<CategoryJewel />} />
            <Route path="subcategory" element={<SubCategoryJewel />} />
            <Route path="products" element={<ProductsJewel />} />
            <Route path="occasion" element={<Occasion />} />
            <Route path="addNewProduct" element={<AddNewProduct />} />
            <Route path="addNewProduct/:id" element={<AddNewProduct />} />
            <Route path="orders" element={<OrderJewel />} />
            <Route path="banners" element={<Banners />} />
            <Route path="user" element={<UsersJewel />} />
          </Route>
        </Route>
      </Routes>

      {/* Render Footer and MobileBottomNav only on non-admin routes */}
      {!isAdminRoute && <>
        <Footer />
        <Box sx={{ paddingTop: { xs: 7, sm: 0 } }} />
        <MobileBottomNav />
      </>}
    </>
  );
}

export default App;

