import React from 'react'
import { Box } from '@mui/material'
import DiamondSliderThree from './DiamondSliderThree'
import DiamondSliderTwo from './DiamondSliderTwo'
import DiamondSlider from './DiamondSlider'
import DiamondSliderOne from './DiamondSliderOne'
import BridesDiamondStories from './BridesDiamondStories'
import PerfectSparkleSection from './PerfectSparkleSection'
import ChauhanExchange from './ChauhanExchange'


const DimandShowCase = () => {
    return (
        <Box sx={{
            overflowX: 'hidden',
            backgroundColor: '#ffffff', // White background
            minHeight: '100vh',
            margin: 0,
            padding: 0
        }}>

            <DiamondSliderThree />
            <DiamondSliderTwo />
            <DiamondSlider />
            <DiamondSliderOne />
            <BridesDiamondStories />
            <PerfectSparkleSection />
            <ChauhanExchange />

        </Box>
    )
}

export default DimandShowCase