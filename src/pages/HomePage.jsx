import HeroSection from '../components/HeroSection'
import ShopByCategories from '../components/ShopByCategories'
import Collection from '../components/Collection'
import Treasure from '../components/Treasure'
import Trending from '../components/Trending'
import MasterDaimondSlider from '../components/MasterDaimondSlider'
import NewCollection from '../components/NewCollection'
import ChauhanWorld from '../components/ChauhanWorld'
import ExchangeOffer from '../components/ExchangeOffer'
import Exclusive from '../components/Exclusive'
import ChauhanExperience from '../components/ChauhanExperience'

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <ShopByCategories />
            <Collection />
            <Treasure />
            <Trending />
            <MasterDaimondSlider />
            <NewCollection />
            <ChauhanWorld />
            <ExchangeOffer />
            <Exclusive />
            <ChauhanExperience />
        </div>
    )
}

export default HomePage
