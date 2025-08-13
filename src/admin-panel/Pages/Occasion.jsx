// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../common components/AxiosInstance';
// import API_URL from '../../../config';
// import {
//     Box,
//     Button,
//     Container,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Paper,
//     TextField,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     Chip,
//     CircularProgress,
//     Avatar,
//     TablePagination,
// } from '@mui/material';
// import { Add, Edit, Delete, Close, CloudUpload } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { publicUrl } from '../../common components/PublicUrl';

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//     marginTop: theme.spacing(3),
//     boxShadow: theme.shadows[3],
//     borderRadius: theme.shape.borderRadius,
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//     fontWeight: 600,
//     backgroundColor:
//         status === 'active' ? theme.palette.success.light : theme.palette.error.light,
//     color: status === 'active' ? theme.palette.success.dark : theme.palette.error.dark,
//     pointerEvents: 'none', // disable clicking
// }));

// const UploadButton = styled(Button)(({ theme }) => ({
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
// }));

// const Occasion = () => {
//     const [openModal, setOpenModal] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingOccasionId, setEditingOccasionId] = useState(null);
//     const [OccasionList, setOccasionList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [newOccasion, setNewOccasion] = useState({
//         name: '',
//         description: '',
//         image: null,
//     });
//     const [imagePreview, setImagePreview] = useState(null);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Handlers
//     const handleChangePage = (_, newPage) => setPage(newPage);

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const currentOccasionList = OccasionList.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image' && files?.[0]) {
//             const reader = new FileReader();
//             reader.onloadend = () => setImagePreview(reader.result);
//             reader.readAsDataURL(files[0]);
//             setNewOccasion((prev) => ({ ...prev, image: files[0] }));
//         } else {
//             setNewOccasion((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleOpenModal = () => {
//         setOpenModal(true);
//         setIsEditing(false);
//         setEditingOccasionId(null);
//         resetOccasionForm();
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         resetOccasionForm();
//     };

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get('/user/allcategories');
//             setOccasionList(response.data || []);
//         } catch (err) {
//             console.error('Error fetching categories:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleCreateOccasion = async () => {
//         const formData = new FormData();
//         formData.append('name', newOccasion.name);
//         formData.append('description', newOccasion.description);
//         formData.append('image', newOccasion.image);

//         try {
//             await axiosInstance.post('/user/createOccasion', formData);
//             fetchData();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error creating Occasion:', error);
//             alert('Error creating Occasion.');
//         }
//     };

//     const handleUpdateOccasion = async () => {
//         const formData = new FormData();
//         formData.append('name', newOccasion.name);
//         formData.append('description', newOccasion.description);
//         if (newOccasion.image) formData.append('image', newOccasion.image);

//         try {
//             await axiosInstance.put(`/user/updateOccasion/${editingOccasionId}`, formData);
//             fetchData();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error updating Occasion:', error.response?.data || error.message);
//             alert(
//                 'Failed to update Occasion: ' +
//                 (error.response?.data?.message || error.message)
//             );
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         isEditing ? handleUpdateOccasion() : handleCreateOccasion();
//     };

//     const startEditingOccasion = (cat) => {
//         setIsEditing(true);
//         setEditingOccasionId(cat._id);
//         setNewOccasion({
//             name: cat.name || '',
//             description: cat.description || '',
//             image: null,
//         });
//         // setImagePreview(cat.image ? `${API_URL}/${cat.image}` : null);
//         setImagePreview(cat.image ? publicUrl(cat.image) : null);
//         setOpenModal(true);
//     };

//     const handleDeleteOccasion = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this Occasion?')) return;
//         try {
//             await axiosInstance.delete(`/user/deleteOccasion/${id}`);
//             fetchData();
//         } catch (error) {
//             console.error('Error deleting Occasion:', error.response?.data || error.message);
//             alert(
//                 'Failed to delete Occasion: ' +
//                 (error.response?.data?.message || error.message)
//             );
//         }
//     };

//     return (
//         <Container maxWidth="xl">
//             <Box sx={{ my: 4 }}>
//                 <Typography
//                     variant="h4"
//                     gutterBottom
//                     sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
//                 >
//                     Occasion
//                 </Typography>

//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<Add />}
//                         onClick={handleOpenModal}
//                     >
//                         Add Occasion
//                     </Button>
//                 </Box>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <StyledTableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
//                                     {['Name', 'Description', 'Image', 'Status', 'Actions'].map(
//                                         (headCell) => (
//                                             <TableCell
//                                                 key={headCell}
//                                                 sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
//                                             >
//                                                 {headCell}
//                                             </TableCell>
//                                         )
//                                     )}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {currentOccasionList.map((cat) => (
//                                     <TableRow key={cat._id} hover>
//                                         <TableCell>{cat.name}</TableCell>
//                                         <TableCell>{cat.description}</TableCell>
//                                         <TableCell>
//                                             <Avatar
//                                                 // src={`${API_URL}/${cat.image}`}
//                                                 src={publicUrl(cat.image)}
//                                                 alt={cat.name}
//                                                 sx={{ width: 56, height: 56 }}
//                                                 variant="rounded"
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <StatusChip
//                                                 label={cat.deleted_at ? 'Deleted' : 'Active'}
//                                                 status={cat.deleted_at ? 'inactive' : 'active'}
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <IconButton
//                                                 color="primary"
//                                                 onClick={() => startEditingOccasion(cat)}
//                                                 disabled={!!cat.deleted_at}
//                                                 aria-label="edit Occasion"
//                                             >
//                                                 <Edit />
//                                             </IconButton>
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDeleteOccasion(cat._id)}
//                                                 disabled={!!cat.deleted_at}
//                                                 aria-label="delete Occasion"
//                                             >
//                                                 <Delete />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                         <TablePagination
//                             rowsPerPageOptions={[10, 20, 30]}
//                             component="div"
//                             count={OccasionList.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             sx={{
//                                 backgroundColor: (theme) => theme.palette.action.hover,
//                                 borderBottomLeftRadius: 1,
//                                 borderBottomRightRadius: 1,
//                             }}
//                         />
//                     </StyledTableContainer>
//                 )}

//                 {/* Add/Edit Occasion Dialog */}
//                 <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
//                     <DialogTitle sx={{ position: 'relative' }}>
//                         {isEditing ? 'Edit Occasion' : 'Add New Occasion'}
//                         <IconButton
//                             aria-label="close"
//                             onClick={handleCloseModal}
//                             sx={{
//                                 position: 'absolute',
//                                 right: 8,
//                                 top: 8,
//                                 color: 'grey.500',
//                             }}
//                         >
//                             <Close />
//                         </IconButton>
//                     </DialogTitle>

//                     <DialogContent dividers>
//                         <form onSubmit={handleSubmit}>
//                             {/* Row 1: Occasion Name */}
//                             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap' }}>
//                                 <TextField
//                                     required
//                                     label="Occasion Name"
//                                     name="name"
//                                     value={newOccasion.name}
//                                     onChange={handleInputChange}
//                                     sx={{ flex: 1 }}
//                                 />
//                             </Box>

//                             {/* Row 2: Description | Upload Image */}
//                             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', mt: 2 }}>
//                                 <TextField
//                                     required
//                                     label="Description"
//                                     name="description"
//                                     value={newOccasion.description}
//                                     onChange={handleInputChange}
//                                     multiline
//                                     rows={4}
//                                     sx={{ flex: 1 }}
//                                 />

//                                 <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                                     <UploadButton
//                                         component="label"
//                                         variant="outlined"
//                                         color="primary"
//                                         startIcon={<CloudUpload />}
//                                         sx={{ alignSelf: 'stretch' }}
//                                     >
//                                         Upload Image
//                                         <input
//                                             type="file"
//                                             name="image"
//                                             accept="image/*"
//                                             onChange={handleInputChange}
//                                             hidden
//                                         />
//                                     </UploadButton>

//                                     {imagePreview && (
//                                         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//                                             <Avatar
//                                                 src={imagePreview}
//                                                 alt="Preview"
//                                                 sx={{ width: 100, height: 100 }}
//                                                 variant="rounded"
//                                             />
//                                         </Box>
//                                     )}
//                                 </Box>
//                             </Box>

//                             <DialogActions sx={{ mt: 1 }}>
//                                 <Button onClick={handleCloseModal} color="secondary">
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     color="primary"
//                                     variant="contained"
//                                 >
//                                     {isEditing ? 'Update' : 'Save'}
//                                 </Button>
//                             </DialogActions>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </Box>
//         </Container>
//     );
// };

// export default Occasion;


import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import API_URL from '../../../config';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    CircularProgress,
    Avatar,
    TablePagination,
} from '@mui/material';
import { Add, Edit, Delete, Close, CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { publicUrl } from '../../common components/PublicUrl';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
    fontWeight: 600,
    backgroundColor:
        status === 'active' ? theme.palette.success.light : theme.palette.error.light,
    color: status === 'active' ? theme.palette.success.dark : theme.palette.error.dark,
    pointerEvents: 'none', // disable clicking
}));

const UploadButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const Occassion = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ 
        name: '',
        description: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const publicUrl = (p) => `${API_URL}/${String(p || '').replace(/\\/g, '/')}`;

    // Handlers
    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentCategoryList = categoryList.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(files[0]);
            setNewCategory((prev) => ({ ...prev, image: files[0] }));
        } else {
            setNewCategory((prev) => ({ ...prev, [name]: value }));
        }
    };

    const resetCategoryForm = () => {
        setNewCategory({  name: '', description: '', image: null });
        setImagePreview(null);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        setIsEditing(false);
        setEditingCategoryId(null);
        resetCategoryForm();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        resetCategoryForm();
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/user/allOccasions');
            setCategoryList(response.data || []);
        } catch (err) {
            console.error('Error fetching occasions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateCategory = async () => {
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        formData.append('image', newCategory.image);

        try {
            await axiosInstance.post('/user/createOccasion', formData);
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category.');
        }
    };

    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        if (newCategory.image) formData.append('image', newCategory.image);

        try {
            await axiosInstance.put(`/user/updateOccasion/${editingCategoryId}`, formData);
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating category:', error.response?.data || error.message);
            alert(
                'Failed to update category: ' +
                (error.response?.data?.message || error.message)
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isEditing ? handleUpdateCategory() : handleCreateCategory();
    };

    const startEditingCategory = (cat) => {
        setIsEditing(true);
        setEditingCategoryId(cat._id);
        setNewCategory({
            name: cat.name || '',
            description: cat.description || '',
            image: null,
        });
        // setImagePreview(cat.image ? `${API_URL}/${cat.image}` : null);
        setImagePreview(cat.image ? publicUrl(cat.image) : null);
        setOpenModal(true);
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await axiosInstance.delete(`/user/deleteOccasion/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting category:', error.response?.data || error.message);
            alert(
                'Failed to delete category: ' +
                (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
                >
                    Category
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleOpenModal}
                    >
                        Add Category
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <StyledTableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                                    {['Name', 'Description', 'Image', 'Status', 'Actions'].map(
                                        (headCell) => (
                                            <TableCell
                                                key={headCell}
                                                sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                                            >
                                                {headCell}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentCategoryList.map((cat) => (
                                    <TableRow key={cat._id} hover>
                                        <TableCell>{cat.name}</TableCell>
                                        <TableCell>{cat.description}</TableCell>
                                        <TableCell>
                                            <Avatar
                                                src={publicUrl(cat.image)}
                                                alt={cat.name}
                                                sx={{ width: 56, height: 56 }}
                                                variant="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <StatusChip
                                                label={cat.deleted_at ? 'Deleted' : 'Active'}
                                                status={cat.deleted_at ? 'inactive' : 'active'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => startEditingCategory(cat)}
                                                disabled={!!cat.deleted_at}
                                                aria-label="edit category"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteCategory(cat._id)}
                                                disabled={!!cat.deleted_at}
                                                aria-label="delete category"
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
                            count={categoryList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                backgroundColor: (theme) => theme.palette.action.hover,
                                borderBottomLeftRadius: 1,
                                borderBottomRightRadius: 1,
                            }}
                        />
                    </StyledTableContainer>
                )}

                {/* Add/Edit Category Dialog */}
                <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ position: 'relative' }}>
                        {isEditing ? 'Edit Category' : 'Add New Category'}
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'grey.500',
                            }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers>
                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Category Name */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap' }}> 
                                <TextField
                                    required
                                    label="Category Name"
                                    name="name"
                                    value={newCategory.name}
                                    onChange={handleInputChange}
                                    sx={{ flex: 1 }}
                                />
                            </Box>

                            {/* Row 2: Description | Upload Image */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', mt: 2 }}>
                                <TextField
                                    required
                                    label="Description"
                                    name="description"
                                    value={newCategory.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ flex: 1 }}
                                />

                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <UploadButton
                                        component="label"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<CloudUpload />}
                                        sx={{ alignSelf: 'stretch' }}
                                    >
                                        Upload Image
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            hidden
                                        />
                                    </UploadButton>

                                    {imagePreview && (
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                            <Avatar
                                                src={imagePreview}
                                                alt="Preview"
                                                sx={{ width: 100, height: 100 }}
                                                variant="rounded"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <DialogActions sx={{ mt: 1 }}>
                                <Button onClick={handleCloseModal} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    {isEditing ? 'Update' : 'Save'}
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Occassion;

