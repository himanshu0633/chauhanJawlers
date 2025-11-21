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
import VideoGallery from '../HomePageComponents/VideoGallery'
// import AnimatedSection from '../commonComponents/AnimatedSection'
// import VideoCardSlider from '../commonComponents/VideoCardSlider'
import { Box } from "@mui/material";
const HomePage = () => {

    return (
        <div>
          
         <Box
  sx={{
    m: "10px",       // har side se 10px margin
  }}
>
  <HeroSection />
</Box>


            {/* <AnimatedSection delay={200}> */}
                <ShopByCategories />
            {/* </AnimatedSection> */}
            <Collection />
            <Treasure />
            {/* <Trending /> */}
            {/* <MasterDaimondSlider /> */}
            {/* <VideoCardSlider /> */}
            <VideoGallery />
            <NewCollection />
            <ChauhanWorld />
            <ExchangeOffer />
            <Exclusive />
            {/* <ChauhanExperience /> */}
        </div>
    )
}

export default HomePage
