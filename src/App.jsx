import './App.css'
import Collection from './components/Collection'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
// import MasterDaimondSlider from './components/MasterDaimondSlider'
import ShopByCategories from './components/ShopByCategories'
import Treasure from './components/Treasure'
import Trending from './components/Trending'
import MasterDaimondSlider from './components/MasterDaimondSlider'
import Footer from './components/Footer'
function App() {

  return (
    <>
      <Header />
      <HeroSection />
      <ShopByCategories />
      <Collection />
      <Treasure />
      <Trending />
      {/* <MasterDaimondSlider /> */}
      <MasterDaimondSlider />
      <Footer />

    </>
  )
}

export default App
