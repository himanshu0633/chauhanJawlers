// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../common components/AxiosInstance';
// import {
//     Box,
//     Button,
//     Container,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Paper,
//     Select,
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

// const UploadButton = styled(Button)(({ theme }) => ({
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
// }));

// const CategoryJewel = () => {
//     const [openModal, setOpenModal] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingCategoryId, setEditingCategoryId] = useState(null);
//     const [categoryList, setCategoryList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [newCategory, setNewCategory] = useState({
//         variety: '',
//         name: '',
//         description: '',
//         image: null,
//         assignedRoute: '',
//     });
//     const [imagePreview, setImagePreview] = useState(null);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     // const publicUrl = (p) => `${API_URL}/${String(p || '').replace(/\\/g, '/')}`;

//     // Handlers
//     const handleChangePage = (_, newPage) => setPage(newPage);

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const currentCategoryList = categoryList.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image' && files?.[0]) {
//             const reader = new FileReader();
//             reader.onloadend = () => setImagePreview(reader.result);
//             reader.readAsDataURL(files[0]);
//             setNewCategory((prev) => ({ ...prev, image: files[0] }));
//         } else {
//             setNewCategory((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const resetCategoryForm = () => {
//         setNewCategory({ variety: '', name: '', description: '', image: null, assignedRoute: '' });
//         setImagePreview(null);
//     };

//     const handleOpenModal = () => {
//         setOpenModal(true);
//         setIsEditing(false);
//         setEditingCategoryId(null);
//         resetCategoryForm();
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         resetCategoryForm();
//     };

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get('/user/allcategories');
//             setCategoryList(response.data || []);
//         } catch (err) {
//             console.error('Error fetching categories:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleCreateCategory = async () => {
//         const formData = new FormData();
//         formData.append('variety', newCategory.variety);
//         formData.append('name', newCategory.name);
//         formData.append('description', newCategory.description);
//         formData.append('image', newCategory.image);
//         formData.append('assignedRoute', newCategory.assignedRoute);

//         try {
//             await axiosInstance.post('/user/createCategory', formData);
//             fetchData();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error creating category:', error);
//             alert('Error creating category.');
//         }
//     };

//     const handleUpdateCategory = async () => {
//         const formData = new FormData();
//         formData.append('variety', newCategory.variety);
//         formData.append('name', newCategory.name);
//         formData.append('description', newCategory.description);
//         formData.append('assignedRoute', newCategory.assignedRoute);
//         if (newCategory.image) formData.append('image', newCategory.image);

//         try {
//             await axiosInstance.put(`/user/updateCategory/${editingCategoryId}`, formData);
//             fetchData();
//             handleCloseModal();
//         } catch (error) {
//             console.error('Error updating category:', error.response?.data || error.message);
//             alert(
//                 'Failed to update category: ' +
//                 (error.response?.data?.message || error.message)
//             );
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         isEditing ? handleUpdateCategory() : handleCreateCategory();
//     };

//     const startEditingCategory = (cat) => {
//         setIsEditing(true);
//         setEditingCategoryId(cat._id);
//         setNewCategory({
//             variety: cat.variety || '',
//             name: cat.name || '',
//             description: cat.description || '',
//             image: null,
//             assignedRoute: cat.assignedRoute || '',
//         });
//         // setImagePreview(cat.image ? `${API_URL}/${cat.image}` : null);
//         setImagePreview(cat.image ? publicUrl(cat.image) : null);
//         setOpenModal(true);
//     };


//     const handleDeleteCategory = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this category?')) return;
//         try {
//             await axiosInstance.delete(`/user/deleteCategory/${id}`);
//             fetchData();
//         } catch (error) {
//             console.error('Error deleting category:', error.response?.data || error.message);
//             alert(
//                 'Failed to delete category: ' +
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
//                     Category
//                 </Typography>

//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<Add />}
//                         onClick={handleOpenModal}
//                     >
//                         Add Category
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
//                                     {['Variety', 'Name', 'Description', 'Image', 'AssignedRoute', 'Actions'].map(
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
//                                 {currentCategoryList.map((cat) => (
//                                     <TableRow key={cat._id} hover>
//                                         <TableCell>{cat.variety}</TableCell>
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
//                                         <TableCell>{cat.assignedRoute}</TableCell>
//                                         <TableCell>
//                                             <IconButton
//                                                 color="primary"
//                                                 onClick={() => startEditingCategory(cat)}
//                                                 disabled={!!cat.deleted_at}
//                                                 aria-label="edit category"
//                                             >
//                                                 <Edit />
//                                             </IconButton>
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={() => handleDeleteCategory(cat._id)}
//                                                 disabled={!!cat.deleted_at}
//                                                 aria-label="delete category"
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
//                             count={categoryList.length}
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

//                 {/* Add/Edit Category Dialog */}
//                 <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
//                     <DialogTitle sx={{ position: 'relative' }}>
//                         {isEditing ? 'Edit Category' : 'Add New Category'}
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
//                             {/* Row 1: Variety | Category Name */}
//                             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap' }}>
//                                 <FormControl required sx={{ flex: 1 }}>
//                                     <InputLabel id="variety-label">Variety</InputLabel>
//                                     <Select
//                                         labelId="variety-label"
//                                         id="variety"
//                                         name="variety"
//                                         value={newCategory.variety}
//                                         label="Variety"
//                                         onChange={handleInputChange}
//                                     >
//                                         <MenuItem value="selectVariety" disabled>
//                                             Select Variety
//                                         </MenuItem>
//                                         <MenuItem value="diamond">Diamond</MenuItem>
//                                         <MenuItem value="gold">Gold</MenuItem>
//                                         <MenuItem value="silver">Silver</MenuItem>
//                                     </Select>
//                                 </FormControl>

//                                 <TextField
//                                     required
//                                     label="Category Name"
//                                     name="name"
//                                     value={newCategory.name}
//                                     onChange={handleInputChange}
//                                     sx={{ flex: 1 }}
//                                 />
//                             </Box>

//                             {/* Row 2: Description | AssignedRoute | Upload Image */}
//                             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', mt: 2 }}>
//                                 <TextField
//                                     required
//                                     label="Description"
//                                     name="description"
//                                     value={newCategory.description}
//                                     onChange={handleInputChange}
//                                     multiline
//                                     rows={4}
//                                     sx={{ flex: 1 }}
//                                 />
//                                 <FormControl required sx={{ flex: 1 }}>
//                                     <InputLabel id="assigned-route-label">Assigned Route</InputLabel>
//                                     <Select
//                                         labelId="assigned-route-label"
//                                         id="assignedRoute"
//                                         name="assignedRoute"
//                                         value={newCategory.assignedRoute}
//                                         label="Assigned Route"
//                                         onChange={handleInputChange}
//                                     >
//                                         <MenuItem value="selectAssignedRoute" disabled>
//                                             Select Assigned Route
//                                         </MenuItem>
//                                         <MenuItem value="allJewellery">All Jewellery</MenuItem>
//                                         {/* <MenuItem value="diamond">Diamond</MenuItem>
//                                         <MenuItem value="gold">Gold</MenuItem>
//                                         <MenuItem value="silver">Silver</MenuItem> */}

//                                         <MenuItem value="wedding">Wedding</MenuItem>
//                                         <MenuItem value="gifting">Gifting</MenuItem>
//                                         <MenuItem value="collection">Collection</MenuItem>
//                                     </Select>
//                                 </FormControl>

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

// export default CategoryJewel;

// // 2:
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
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
    Alert,
    AlertTitle,
} from '@mui/material';
import { Add, Edit, Delete, Close, CloudUpload, Info } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { publicUrl } from '../../common components/PublicUrl';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
}));

const UploadButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const InfoAlert = styled(Alert)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.info.light,
}));

const CategoryJewel = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({
        variety: '',
        name: '',
        description: '',
        image: null,
        assignedRoute: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        setNewCategory({ variety: '', name: '', description: '', image: null, assignedRoute: '' });
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
            const response = await axiosInstance.get('/user/allcategories');
            setCategoryList(response.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateCategory = async () => {
        const formData = new FormData();
        formData.append('variety', newCategory.variety);
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        formData.append('image', newCategory.image);
        formData.append('assignedRoute', newCategory.assignedRoute);

        try {
            await axiosInstance.post('/user/createCategory', formData);
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Error creating category.');
        }
    };

    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append('variety', newCategory.variety);
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        formData.append('assignedRoute', newCategory.assignedRoute);
        if (newCategory.image) formData.append('image', newCategory.image);

        try {
            await axiosInstance.put(`/user/updateCategory/${editingCategoryId}`, formData);
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
            variety: cat.variety || '',
            name: cat.name || '',
            description: cat.description || '',
            image: null,
            assignedRoute: cat.assignedRoute || '',
        });
        setImagePreview(cat.image ? publicUrl(cat.image) : null);
        setOpenModal(true);
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await axiosInstance.delete(`/user/deleteCategory/${id}`);
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
                    Category Management
                </Typography>

                {/* Information Alert */}
                <InfoAlert icon={<Info />}>
                    <AlertTitle>Category Filtering Information</AlertTitle>
                    <Typography variant="body2">
                        • <strong>"All Jewellery"</strong> category will show all products from all categories and varieties automatically.
                        <br />
                        • For specific categories (Gold, Silver, Diamond), filtering is based on the <strong>category name</strong>, not just the variety.
                        <br />
                        • Special routes (Wedding, Gifting, Collection) use their assigned routes for navigation.
                        <br />
                        • Category names are used as the primary filter parameter in the frontend.
                    </Typography>
                </InfoAlert>

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
                                    {['Variety', 'Name', 'Description', 'Image', 'Assigned Route', 'Status', 'Actions'].map(
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
                                        <TableCell>
                                            <Chip 
                                                label={cat.variety} 
                                                color={cat.variety === 'diamond' ? 'primary' : cat.variety === 'gold' ? 'warning' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" fontWeight={600}>
                                                {cat.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    maxWidth: 200, 
                                                    overflow: 'hidden', 
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap' 
                                                }}
                                                title={cat.description}
                                            >
                                                {cat.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Avatar
                                                src={publicUrl(cat.image)}
                                                alt={cat.name}
                                                sx={{ width: 56, height: 56 }}
                                                variant="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={cat.assignedRoute} 
                                                color="secondary"
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={cat.deleted_at ? 'Deleted' : 'Active'} 
                                                color={cat.deleted_at ? 'error' : 'success'}
                                                size="small"
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
                <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
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
                            {/* Row 1: Variety and Category Name */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', mb: 2 }}>
                                <FormControl required sx={{ flex: 1 }}>
                                    <InputLabel id="variety-label">Variety</InputLabel>
                                    <Select
                                        labelId="variety-label"
                                        id="variety"
                                        name="variety"
                                        value={newCategory.variety}
                                        label="Variety"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="selectVariety" disabled>
                                            Select Variety
                                        </MenuItem>
                                        <MenuItem value="diamond">Diamond</MenuItem>
                                        <MenuItem value="gold">Gold</MenuItem>
                                        <MenuItem value="silver">Silver</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    required
                                    label="Category Name"
                                    name="name"
                                    value={newCategory.name}
                                    onChange={handleInputChange}
                                    sx={{ flex: 1 }}
                                    helperText="This name will be used for filtering products"
                                />
                            </Box>

                            {/* Row 2: Description and Assigned Route */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'nowrap', mb: 2 }}>
                                <TextField
                                    required
                                    label="Description"
                                    name="description"
                                    value={newCategory.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    sx={{ flex: 1.5 }}
                                />

                                <FormControl required sx={{ flex: 1 }}>
                                    <InputLabel id="assigned-route-label">Assigned Route</InputLabel>
                                    <Select
                                        labelId="assigned-route-label"
                                        id="assignedRoute"
                                        name="assignedRoute"
                                        value={newCategory.assignedRoute}
                                        label="Assigned Route"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="selectAssignedRoute" disabled>
                                            Select Assigned Route
                                        </MenuItem>
                                        <MenuItem value="allJewellery">All Jewellery</MenuItem>
                                        <MenuItem value="wedding">Wedding</MenuItem>
                                        <MenuItem value="gifting">Gifting</MenuItem>
                                        <MenuItem value="collection">Collection</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Row 3: Image Upload */}
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ flex: 1 }}>
                                    <UploadButton
                                        component="label"
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<CloudUpload />}
                                        sx={{ width: '100%' }}
                                    >
                                        {newCategory.image ? 'Change Image' : 'Upload Image'}
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleInputChange}
                                            hidden
                                        />
                                    </UploadButton>
                                </Box>

                                {imagePreview && (
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                        <Avatar
                                            src={imagePreview}
                                            alt="Preview"
                                            sx={{ width: 120, height: 120 }}
                                            variant="rounded"
                                        />
                                    </Box>
                                )}
                            </Box>

                            <DialogActions sx={{ mt: 2, px: 0 }}>
                                <Button onClick={handleCloseModal} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    {isEditing ? 'Update Category' : 'Create Category'}
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
        </Container>
    );
};

export default CategoryJewel;

