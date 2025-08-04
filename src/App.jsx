import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { MobileBottomNav } from './components/MobileBottomNav'
import { Box } from '@mui/material'
import AllJewelleryPage from './dropdownPages/AllJewelleryPage'
function App() {

  return (
    <>
      <Header />
      <Box sx={{ paddingTop: { xs: 13, md: 20, lg: 14.5 } }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allJewellery" element={<AllJewelleryPage />} />
      </Routes>

      <Footer />
      <Box sx={{ paddingTop: { xs: 7, sm: 0 } }} />
      <MobileBottomNav />
    </>
  )
}

export default App
