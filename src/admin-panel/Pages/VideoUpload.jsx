// import { Box, Button, TextField, Typography } from '@mui/material';
// import { useState } from 'react';
// import axiosInstance from '../../commonComponents/AxiosInstance';

// export default function VideoUpload() {
//     const [video, setVideo] = useState(null);
//     const [title, setTitle] = useState('');
//     const [desc, setDesc] = useState('');

//     const handleFileChange = (e) => setVideo(e.target.files[0]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!video || !title) return alert("Both title and video required");
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', desc);
//         formData.append('video', video);

//         try {
//             await axiosInstance.post('/videos/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             alert('Video uploaded!');
//             setVideo(null); setTitle(''); setDesc('');
//         } catch (err) {
//             alert('Error uploading video');
//         }
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480, mx: 'auto', my: 6 }}>
//             <Typography variant="h6" gutterBottom>Upload Video</Typography>
//             <TextField
//                 fullWidth label="Title" margin="normal"
//                 value={title} onChange={e => setTitle(e.target.value)}
//                 required
//             />
//             <TextField
//                 fullWidth label="Description" margin="normal"
//                 value={desc} onChange={e => setDesc(e.target.value)}
//                 multiline rows={2}
//             />
//             <Button
//                 variant="contained" component="label" fullWidth sx={{ my: 2 }}
//             >
//                 Select Video
//                 <input type="file" hidden accept="video/*" onChange={handleFileChange} />
//             </Button>
//             {video && <Typography>Selected: {video.name}</Typography>}
//             <Button type="submit" variant="contained" disabled={!video || !title}>
//                 Upload
//             </Button>
//         </Box>
//     );
// }


// // 2:
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../commonComponents/AxiosInstance';
import {
    Box,
    Typography,
    Button,
    Modal,
    Backdrop,
    Fade,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
} from '@mui/material';
import { Add, Delete, Close as CloseIcon } from '@mui/icons-material';
import { publicUrl } from '../../commonComponents/PublicUrl';

export default function VideoUpload() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewVideoUrl, setPreviewVideoUrl] = useState(null);
    const handleVideoClick = (url) => setPreviewVideoUrl(url);
    const handleClosePreview = () => setPreviewVideoUrl(null);


    // Fetch all videos
    const fetchVideos = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/videos');
            setVideos(res.data);
        } catch (error) {
            alert('Error fetching videos');
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // Handle video file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setVideoFile(e.target.files[0]);
        }
    };

    // Handle upload form submit
    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile || !title) {
            alert('Both title and video are required');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('video', videoFile);

        setUploading(true);
        try {
            await axiosInstance.post('/videos/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Video uploaded!');
            setTitle('');
            setDesc('');
            setVideoFile(null);
            setShowUploadModal(false);
            fetchVideos();
        } catch (error) {
            alert('Error uploading video');
            console.error(error);
        }
        setUploading(false);
    };

    // Handle Delete video
    const handleDeleteVideo = async (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                await axiosInstance.delete(`/videos/${id}`);
                alert('Video deleted');
                fetchVideos();
            } catch (error) {
                alert('Error deleting video');
                console.error(error);
            }
        }
    };

    return (
        <Box maxWidth="xl" sx={{ mt: 5, px: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Video Management
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setShowUploadModal(true)}
                >
                    Add New Video
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'primary.main' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'primary.contrastText' }}>
                                    <strong>Title</strong>
                                </TableCell>
                                <TableCell sx={{ color: 'primary.contrastText' }}>
                                    <strong>Description</strong>
                                </TableCell>
                                <TableCell sx={{ color: 'primary.contrastText' }}>
                                    <strong>Video</strong>
                                </TableCell>
                                <TableCell sx={{ color: 'primary.contrastText' }}>
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videos.map((video) => (
                                <TableRow key={video._id}>
                                    <TableCell>{video.title}</TableCell>
                                    <TableCell>{video.description}</TableCell>
                                    <TableCell>
                                        {/* <video
                                            src={video.url}
                                            style={{ maxWidth: 200, borderRadius: 8 }}
                                            controls
                                        /> */}
                                        <video
                                            src={publicUrl(video.url)}
                                            style={{ height: 180, width: 260, borderRadius: 8, cursor: 'pointer', objectFit: 'cover' }}
                                            controls={false}
                                            onClick={() => handleVideoClick(publicUrl(video.url))}
                                        />

                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteVideo(video._id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {videos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No videos uploaded yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Upload Video Modal */}
            <Dialog
                open={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Add New Video
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowUploadModal(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Box
                        component="form"
                        onSubmit={handleUploadSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Stack spacing={2}>
                            <TextField
                                label="Title"
                                fullWidth
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Select Video
                                <input
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {videoFile && (
                                <Typography variant="body2">Selected: {videoFile.name}</Typography>
                            )}
                        </Stack>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={() => setShowUploadModal(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form=""
                        variant="contained"
                        onClick={handleUploadSubmit}
                        disabled={!videoFile || !title || uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* to see video in modal */}
            <Dialog open={Boolean(previewVideoUrl)} onClose={handleClosePreview} maxWidth="md" fullWidth
               >
                <DialogTitle>Watch Video</DialogTitle>
                <DialogContent dividers>
                    <video
                        src={previewVideoUrl}
                        controls
                        autoPlay
                        style={{ width: '100%', borderRadius: 8,height:'400px'
                            // ,objectFit:'cover'
                              }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePreview}>Close</Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}
