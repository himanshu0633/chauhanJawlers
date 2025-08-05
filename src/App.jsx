import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import AllJewelleryPage from './dropdownPages/AllJewelleryPage'
import Header from './common components/Header'
import Footer from './common components/Footer'
import { MobileBottomNav } from './common components/MobileBottomNav'
import LoginPage from './common components/LoginPage'
import WishlistPage from './common components/WishlistPage'
import AccountPopup from './popUp/AccountPopup'
function App() {

  return (
    <>
      <Header />
      <Box sx={{ paddingTop: { xs: 13, md: 20, lg: 14.5 } }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allJewellery" element={<AllJewelleryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AccountPopup />} />
      </Routes>

      <Footer />
      <Box sx={{ paddingTop: { xs: 7, sm: 0 } }} />
      <MobileBottomNav />
    </>
  )
}

export default App
