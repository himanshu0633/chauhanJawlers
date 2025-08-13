import HeroSection from '../HomePageComponents/HeroSection'
import ShopByCategories from '../HomePageComponents/ShopByCategories'
import Collection from '../HomePageComponents/Collection'
import Treasure from '../HomePageComponents/Treasure'
import Trending from '../HomePageComponents/Trending'
import MasterDaimondSlider from '../HomePageComponents/MasterDaimondSlider'
import NewCollection from '../HomePageComponents/NewCollection'
import ChauhanWorld from '../HomePageComponents/ChauhanWorld'
import ExchangeOffer from '../HomePageComponents/ExchangeOffer'
import Exclusive from '../HomePageComponents/Exclusive'
import ChauhanExperience from '../HomePageComponents/ChauhanExperience'
import VideoCardSlider from '../common components/VideoCardSlider'

const HomePage = () => {

    return (
        <div>
            {/* <VideoCardSlider /> */}
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
