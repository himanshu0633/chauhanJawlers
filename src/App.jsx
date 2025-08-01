import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { MobileBottomNav } from './components/MobileBottomNav'
function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
      <MobileBottomNav />

    </>
  )
}

export default App
