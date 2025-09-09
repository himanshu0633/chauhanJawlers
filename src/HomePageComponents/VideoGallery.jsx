// import { useEffect, useState } from 'react';
// import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
// import axiosInstance from '../common components/AxiosInstance';
// import { publicUrl } from '../common components/PublicUrl';

// export default function VideoGallery() {
//     const [videos, setVideos] = useState([]);

//     useEffect(() => {
//         axiosInstance.get('/videos')
//             .then(res => setVideos(res.data));
//     }, []);

//     return (
//         <Box sx={{ py: 5, px: { xs: 1, sm: 2 }, background: '#faf7f8' }}>
//             <Typography
//                 variant="h4"
//                 align="center"
//                 fontWeight={700}
//                 sx={{ mb: 4, fontFamily: 'serif', color: '#511a1a' }}
//             >
//                 Latest Videos
//             </Typography>

//             <Grid container spacing={4} justifyContent="center">
//                 {videos.map((video) => (
//                     <Grid
//                         item
//                         key={video._id}
//                         xs={12}
//                         sm={6}
//                         md={3}
//                         sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
//                     >
//                         <Card
//                             elevation={3}
//                             sx={{
//                                 width: 240,
//                                 background: '#fff',
//                                 borderRadius: 3,
//                                 overflow: 'hidden',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 mb: 1,
//                                 transition: 'box-shadow .25s',
//                                 ':hover': { boxShadow: 8 },
//                             }}
//                         >
//                             <CardMedia
//                                 component="video"
//                                 src={publicUrl(video.url)}
//                                 controls
//                                 sx={{ width: '100%', height: 260, objectFit: 'cover', background: '#000' }}
//                             />

//                             <Typography
//                                 gutterBottom
//                                 align="center"
//                                 sx={{
//                                     fontWeight: 500,
//                                     fontFamily: 'serif',
//                                     color: '#442f2f',
//                                     fontSize: '1rem',
//                                     py: 1,
//                                 }}
//                             >
//                                 {video.title}
//                             </Typography>

//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

// //2:
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axiosInstance from '../common components/AxiosInstance';
import { publicUrl } from '../common components/PublicUrl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axiosInstance.get('/videos')
            .then(res => setVideos(res.data));
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(videos.length, 4),
        slidesToScroll: 2,
        autoplay: true,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 960,
                settings: { slidesToShow: Math.min(videos.length, 2) }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    if (videos.length > 4) {
        // Show slick slider
        return (
            <Box sx={{ py: 5, px: { xs: 1, sm: 2 }, background: '#faf7f8' }}>
                <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 4, fontFamily: 'serif', color: '#511a1a' }}>
                    Latest Videos
                </Typography>
                <Slider {...sliderSettings}>
                    {videos.map(video => (
                        <Box key={video._id} sx={{ px: 1 }}>
                            {/* Keep your card layout or simplified layout inside slider */}
                            <Card
                                elevation={3} sx={{ width: 240, mx: 'auto', background: '#fff', borderRadius: 3, overflow: 'hidden' }}
                            >
                                <CardMedia
                                    component="video" src={publicUrl(video.url)} controls sx={{ height: 260, objectFit: 'cover', background: '#000' }}
                                />
                                <Typography align="center" sx={{ p: 1, fontFamily: 'serif', fontWeight: 500, color: '#442f2f' }}>{video.title}</Typography>
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>
        );
    }

    // Default grid (your existing code)
    return (
        <Box sx={{ py: 5, px: { xs: 1, sm: 2 }, background: '#faf7f8' }}>
            <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 4, fontFamily: 'serif', color: '#511a1a' }}>
                Latest Videos
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {videos.map(video => (
                    <Grid
                        item
                        key={video._id}
                        xs={12}
                        sm={6}
                        md={3}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Card elevation={3} sx={{ width: 240, background: '#fff', borderRadius: 3, overflow: 'hidden' }}>
                            <CardMedia component="video" src={publicUrl(video.url)} controls sx={{ height: 260, objectFit: 'cover', background: '#000' }} />
                            <Typography
                                gutterBottom
                                align="center"
                                sx={{ fontWeight: 500, fontFamily: 'serif', color: '#442f2f', fontSize: '1rem', py: 1 }}
                            >
                                {video.title}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}



