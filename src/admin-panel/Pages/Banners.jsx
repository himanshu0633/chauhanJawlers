import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import API_URL from '../../../config';
import { toast } from 'react-toastify';

import {
  Box,
  Typography,
  CircularProgress,
  Container,
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
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Add, Delete } from '@mui/icons-material';

const Banners = () => {
  const [formData, setFormData] = useState({ image: '', banner_type: '' });
  const [showModal, setShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const bannerList = [
    { id: 1, title: 'HomePageSlider' },
    { id: 2, title: 'MiddleSlider' },
    { id: 3, title: 'EndSlider' },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();

    const selectedType = bannerList.find(
      (b) => b.id === parseInt(formData.banner_type)
    )?.title;

    if (!selectedType || !formData.image) {
      toast.error('Please select a banner type and upload an image.');
      return;
    }

    const data = new FormData();
    data.append('type', selectedType);
    data.append('slider_image', formData.image);

    try {
      await axiosInstance.post('/user/createBanner', data);
      toast.success('Banner uploaded successfully!');
      setFormData({ image: '', banner_type: '' });
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error('There was an error submitting the banner. Please try again.');
      console.error('Error submitting banner:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/user/allBanners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (url) => setSelectedImage(url);
  const handleCloseModal = () => setSelectedImage(null);

  const handleDeleteBanner = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await axiosInstance.delete(`/user/deleteBanner/${id}`);
        fetchData();
        toast.success('Banner deleted successfully');
      } catch (error) {
        console.error('Error deleting Banner:', error);
        toast.error('Failed to delete Banner. Please try again.');
      }
    }
  };

  // Pagination handlers
  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentBanners = banners.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
      >
        Banner Management
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setShowModal(true)}
        >
          Add Banner
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'primary.contrastText' }}>
                    <strong>Banner Type</strong>
                  </TableCell>
                  <TableCell sx={{ color: 'primary.contrastText' }}>
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell sx={{ color: 'primary.contrastText' }}>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentBanners.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <img
                        src={`${API_URL}/${item.slider_image}`}
                        alt={`Banner ${i + 1}`}
                        style={{
                          width: 200,
                          height: 130,
                          cursor: 'pointer',
                          borderRadius: 8,
                          objectFit: 'cover',
                        }}
                        onClick={() =>
                          handleImageClick(`${API_URL}/${item.slider_image}`)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteBanner(item._id)}
                        disabled={!!item.deleted_at}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={banners.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                bgcolor: 'background.paper',
                borderBottomLeftRadius: 1,
                borderBottomRightRadius: 1,
              }}
            />
          </TableContainer>
        </Box>
      )}

      {/* Add Banner Dialog */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'text.primary' }}>
          Add New Banner
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="form"
            id="banner-form"
            onSubmit={handleBannerSubmit}
            noValidate
          >
            <Stack spacing={2}>
              <FormControl fullWidth required>
                <InputLabel id="banner-type-label">Banner Type</InputLabel>
                <Select
                  labelId="banner-type-label"
                  label="Banner Type"
                  name="banner_type"
                  value={formData.banner_type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>Select Banner Type</em>
                  </MenuItem>
                  {bannerList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  component="label"
                  sx={{ height: 56, whiteSpace: 'nowrap' }}
                >
                  Upload Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={handleInputChange}
                  />
                </Button>

                <TextField
                  value={formData.image ? formData.image.name : ''}
                  placeholder="No file selected"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Stack>

              {formData.image && (
                <Box
                  component="img"
                  alt="preview"
                  src={URL.createObjectURL(formData.image)}
                  sx={{
                    maxHeight: 180,
                    width: '100%',
                    borderRadius: 1,
                    boxShadow: 1,
                    objectFit: 'cover',
                  }}
                />
              )}
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setShowModal(false)} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            form="banner-form"
            variant="contained"
            disabled={!formData.banner_type || !formData.image}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Modal */}
      <Modal
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={Boolean(selectedImage)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              outline: 'none',
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: -40,
                right: -40,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#fff',
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedImage}
              alt="Full Preview"
              style={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                borderRadius: 12,
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Banners;
