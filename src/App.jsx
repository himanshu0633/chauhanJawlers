import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import {  Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Header />
    
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
 
      <Footer />

    </>
  )
}

export default App
