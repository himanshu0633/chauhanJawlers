import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { MobileBottomNav } from './components/MobileBottomNav'
import { Box } from '@mui/material'
function App() {

  return (
    <>
      <Header />
      <Box sx={{ paddingTop: { xs: 15.2, md: 25, lg: 20 } }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
      <Box sx={{ paddingTop: { xs: 7} }} />
      <MobileBottomNav />
    </>
  )
}

export default App
