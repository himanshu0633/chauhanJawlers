import './App.css'
import Collection from './components/Collection'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ShopByCategories from './components/ShopByCategories'
import Treasure from './components/Treasure'
import Trending from './components/Trending'
import MasterDaimondSlider from './components/MasterDaimondSlider'
import Footer from './components/Footer'
import NewCollection from './components/NewCollection'
import ChauhanWorld from './components/ChauhanWorld'
import ExchangeOffer from './components/ExchangeOffer'
function App() {

  return (
    <>
      <Header />
      <HeroSection />
      <ShopByCategories />
      <Collection />
      <Treasure />
      <Trending />
      <MasterDaimondSlider />
      <NewCollection />
      <ChauhanWorld />
      <ExchangeOffer/>
      <Footer />

    </>
  )
}

export default App
