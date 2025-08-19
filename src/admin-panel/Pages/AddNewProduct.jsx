// import React, { useEffect, useState, useRef } from 'react';
// import axiosInstance from '../../common components/AxiosInstance';
// import { toast } from 'react-toastify';
// import { useParams, useNavigate } from 'react-router-dom';

// // MUI
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Stack,
//   IconButton,
//   Chip,
//   Divider,
// } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import CloseIcon from '@mui/icons-material/Close';
// import { FormControl, InputLabel, InputAdornment } from '@mui/material';

// const AddNewProduct = () => {
//   const { id } = useParams();
//   const isEditMode = !!id;
//   const navigate = useNavigate();

//   const [categoryList, setCategoryList] = useState([]);
//   const [subCategoryList, setSubCategoryList] = useState([]);
//   const [occasionList, setOccasionList] = useState([]);
//   const [errors, setErrors] = useState({});
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     media: [],
//     mrp: '',
//     discount: '',
//     gst: '',
//     consumer_price: '',
//     stock: 'yes',
//     quantity: [],
//     category: '',
//     occasion: '',
//     productvariety: '',
//     sub_category: '',
//     created_at: new Date().toISOString(),
//     deleted_at: null,
//   });

//   // init: categories + product (if edit)
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const categoriesResponse = await axiosInstance.get('/user/allcategories');
//         setCategoryList(categoriesResponse.data || []);

//         if (isEditMode) {
//           const productResponse = await axiosInstance.get(`/user/product/${id}`);
//           const product = productResponse.data;

//           if (product.category) {
//             const subCategoryResponse = await axiosInstance.get(
//               `/user/allSubcategories?category=${encodeURIComponent(product.category)}`
//             );
//             setSubCategoryList(subCategoryResponse.data || []);
//           }

//           setFormData(prev => ({
//             ...prev,
//             ...product,
//             media: (product.media || []).map(m => ({
//               ...m,
//               url: m.url?.startsWith('http') ? m.url : `${m.url}`,
//               type: m.type?.includes('video') ? 'video' : 'image',
//               file: null,
//               name: m.name || m.url?.split('/').pop() || 'media',
//               size: m.size || 0,
//             })),
//             quantity: Array.isArray(product.quantity)
//               ? product.quantity
//               : (typeof product.quantity === 'string' && product.quantity.length > 0 ? [product.quantity] : []),
//             stock: (() => {
//               const s = (product.stock ?? '').toLowerCase().trim();
//               return s === 'yes' ? 'yes' : s === 'no' ? 'no' : 'yes';
//             })(),
//           }));
//         }
//       } catch (err) {
//         console.error('Error during initialization:', err);
//         toast.error('Failed to load initial data.');
//       }
//     };
//     init();
//   }, [id, isEditMode]);

//   const fetchSubCategories = async (category) => {
//     try {
//       const response = await axiosInstance.get(
//         `/user/allSubcategories?category=${encodeURIComponent(category)}`
//       );
//       setSubCategoryList(response.data || []);
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   // helpers
//   const formatFileSize = (bytes) => {
//     if (!bytes && bytes !== 0) return '';
//     if (bytes < 1024) return bytes + ' bytes';
//     if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
//     return (bytes / 1048576).toFixed(2) + ' MB';
//   };

//   // field change + price calc
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => {
//       const updated = { ...prev, [name]: value };

//       const mrp = parseFloat(updated.mrp);
//       const discount = parseFloat(updated.discount);
//       const gst = parseFloat(updated.gst);

//       let discountedPrice = 0;
//       if (!isNaN(mrp) && !isNaN(discount)) {
//         discountedPrice = mrp - (mrp * (discount / 100));
//       } else if (!isNaN(mrp) && (isNaN(discount) || discount === 0)) {
//         discountedPrice = mrp;
//       }

//       if (!isNaN(discountedPrice)) {
//         if (!isNaN(gst) && gst > 0) {
//           const finalPrice = discountedPrice + (discountedPrice * (gst / 100));
//           updated.consumer_price = isFinite(finalPrice) && finalPrice > 0 ? finalPrice.toFixed(2) : '';
//         } else {
//           updated.consumer_price = isFinite(discountedPrice) && discountedPrice > 0 ? discountedPrice.toFixed(2) : '';
//         }
//       }

//       if (name === 'category') {
//         updated.sub_category = '';
//         fetchSubCategories(value);
//       }

//       return updated;
//     });
//   };

//   // media
//   const handleMediaChange = (e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const mediaPromises = files.map(file => new Promise(resolve => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve({
//           url: reader.result,
//           type: file.type.startsWith('video') ? 'video' : 'image',
//           name: file.name,
//           size: file.size,
//           file
//         });
//       };
//       reader.readAsDataURL(file);
//     }));

//     Promise.all(mediaPromises).then(newMedia => {
//       setFormData(prev => ({ ...prev, media: [...prev.media, ...newMedia] }));
//     });
//   };

//   const removeMedia = (index) => {
//     setFormData(prev => {
//       const updatedMedia = [...prev.media];
//       updatedMedia.splice(index, 1);
//       return { ...prev, media: updatedMedia };
//     });
//   };

//   // quantity controls
//   const handleQuantityChange = (index, value) => {
//     setFormData(prev => {
//       const list = [...prev.quantity];
//       list[index] = value;
//       return { ...prev, quantity: list };
//     });
//   };

//   const addQuantityField = () => {
//     setFormData(prev => ({ ...prev, quantity: [...prev.quantity, ''] }));
//   };

//   const removeQuantityField = (index) => {
//     setFormData(prev => {
//       const list = [...prev.quantity];
//       list.splice(index, 1);
//       return { ...prev, quantity: list };
//     });
//   };

//   // validation (trimmed to current fields)
//   const validateForm = () => {
//     const newErrors = {};
//     const required = ['name', 'description', 'category', 'productvariety', 'stock'];

//     required.forEach(field => {
//       const v = formData[field];
//       if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
//         newErrors[field] = 'Required';
//       }
//     });

//     const hasAtLeastOneQty = Array.isArray(formData.quantity) && formData.quantity.some(q => (q || '').trim() !== '');
//     if (!hasAtLeastOneQty) newErrors.quantity = 'Add at least one quantity';

//     // consumer_price is derived; ensure it exists if MRP was provided
//     if ((formData.mrp?.toString().length || 0) > 0 && (formData.consumer_price || '').trim() === '') {
//       newErrors.consumer_price = 'Final price could not be calculated';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const payload = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'media') return;
//         if (value !== null && value !== undefined) {
//           if (Array.isArray(value)) {
//             // send quantities as repeated key or a JSON string (adjust to your API)
//             payload.append(key, JSON.stringify(value));
//           } else {
//             payload.append(key, value);
//           }
//         }
//       });

//       formData.media.forEach(item => {
//         if (item?.file) {
//           payload.append('media', item.file);
//         } else if (item?.url) {
//           payload.append('existingMedia', item.url);
//         }
//       });

//       if (isEditMode) {
//         await axiosInstance.put(`/user/updateProduct/${id}`, payload, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         toast.success('Product updated successfully!');
//       } else {
//         await axiosInstance.post('/user/createProduct', payload, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         toast.success('Product added successfully!');
//       }

//       navigate('/AdminPanel/products');
//     } catch (error) {
//       console.error('Submit Error:', error);
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       description: '',
//       media: [],
//       mrp: '',
//       discount: '',
//       gst: '',
//       consumer_price: '',
//       stock: 'yes',
//       quantity: [],
//       category: '',
//       productvariety: '',
//       sub_category: '',
//       created_at: new Date().toISOString(),
//       deleted_at: null,
//     });
//     setErrors({});
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
//         <Typography variant="h5" fontWeight={700}>
//           {isEditMode ? 'Edit Product' : 'Add New Product'}
//         </Typography>
//         <Button variant="outlined" onClick={() => navigate('/AdminPanel/products')}>Cancel</Button>
//       </Stack>

//       {/* Basic Info */}
//       {/* <Box sx={{ mb: 3 }}>
//         <div>
//           <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Product Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 error={!!errors.name}
//                 helperText={errors.name}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Stack spacing={1}>
//                 <Typography variant="subtitle2">Product Media (Images/Videos)</Typography>
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*,video/*"
//                     multiple
//                     onChange={handleMediaChange}
//                     style={{ display: 'none' }}
//                   />
//                   <Button
//                     variant="contained"
//                     startIcon={<AddPhotoAlternateIcon />}
//                     onClick={() => {
//                       if (fileInputRef.current) {
//                         fileInputRef.current.value = null;
//                         fileInputRef.current.click();
//                       }
//                     }}
//                   >
//                     Add Media
//                   </Button>
//                   <Typography variant="body2" color="text.secondary">
//                     Supports JPG, PNG, GIF, MP4 (Max 10MB each)
//                   </Typography>
//                 </Stack>

//                 <Grid container spacing={2}>
//                   {formData.media.length === 0 ? (
//                     <Grid item xs={12}>
//                       <Box
//                         sx={{
//                           border: '1px dashed',
//                           borderColor: 'divider',
//                           p: 3,
//                           textAlign: 'center',
//                           borderRadius: 1,
//                           color: 'text.secondary',
//                         }}
//                       >
//                         No media selected
//                       </Box>
//                     </Grid>
//                   ) : (
//                     formData.media.map((m, idx) => (
//                       <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
//                         <Box
//                           sx={{
//                             position: 'relative',
//                             border: '1px solid',
//                             borderColor: 'divider',
//                             borderRadius: 1,
//                             overflow: 'hidden',
//                             width: '150px'
//                           }}
//                         >
//                           <IconButton
//                             size="small"
//                             onClick={() => removeMedia(idx)}
//                             sx={{
//                               position: 'absolute',
//                               top: 4,
//                               right: 4,
//                               bgcolor: 'background.paper',
//                               '&:hover': { bgcolor: 'background.default' },
//                             }}
//                             aria-label="Remove media"
//                           >
//                             <CloseIcon fontSize="small" />
//                           </IconButton>

//                           {m.type === 'video' ? (
//                             <Box component="video" controls sx={{ width: '100%', height: 180, objectFit: 'cover' }}>
//                               <source src={m.url} />
//                               Your browser does not support the video tag.
//                             </Box>
//                           ) : (
//                             <Box component="img" src={m.url} alt={m.name || `media-${idx}`} sx={{ width: '100%', height: 140, objectFit: 'cover' }} />
//                           )}

//                           <Box sx={{ p: 1 }}>
//                             <Typography variant="body2" noWrap title={m.name}>{m.name}</Typography>
//                             <Typography variant="caption" color="text.secondary">{formatFileSize(m.size)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     ))
//                   )}
//                 </Grid>
//               </Stack>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 minRows={3}
//                 error={!!errors.description}
//                 helperText={errors.description}
//               />
//             </Grid>
//           </Grid>
//         </div>
//       </Box> */}

//       {/* Basic Info */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 2,
//           }}
//         >
//           {/* Product Name */}
//           <TextField
//             label="Product Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.name}
//             helperText={errors.name}
//             sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' }, minWidth: 0 }}
//           />

//           {/* Product Media */}
//           <Box
//             sx={{
//               flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' },
//               minWidth: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 1,
//             }}
//           >
//             <Typography variant="subtitle2">Product Media (Images/Videos)</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*,video/*"
//                 multiple
//                 onChange={handleMediaChange}
//                 style={{ display: 'none' }}
//               />
//               <Button
//                 variant="contained"
//                 startIcon={<AddPhotoAlternateIcon />}
//                 onClick={() => {
//                   if (fileInputRef.current) {
//                     fileInputRef.current.value = null;
//                     fileInputRef.current.click();
//                   }
//                 }}
//               >
//                 Add Media
//               </Button>
//               <Typography variant="body2" color="text.secondary">
//                 Supports JPG, PNG, GIF, MP4 (Max 10MB each)
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: 2,
//               }}
//             >
//               {formData.media.length === 0 ? (
//                 <Box
//                   sx={{
//                     border: '1px dashed',
//                     borderColor: 'divider',
//                     p: 3,
//                     textAlign: 'center',
//                     borderRadius: 1,
//                     color: 'text.secondary',
//                     flex: '1 1 100%',
//                   }}
//                 >
//                   No media selected
//                 </Box>
//               ) : (
//                 formData.media.map((m, idx) => (
//                   <Box
//                     key={idx}
//                     sx={{
//                       position: 'relative',
//                       border: '1px solid',
//                       borderColor: 'divider',
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       width: 150,
//                     }}
//                   >
//                     <IconButton
//                       size="small"
//                       onClick={() => removeMedia(idx)}
//                       sx={{
//                         position: 'absolute',
//                         top: 4,
//                         right: 4,
//                         bgcolor: 'background.paper',
//                         '&:hover': { bgcolor: 'background.default' },
//                       }}
//                       aria-label="Remove media"
//                     >
//                       <CloseIcon fontSize="small" />
//                     </IconButton>

//                     {m.type === 'video' ? (
//                       <Box
//                         component="video"
//                         controls
//                         sx={{ width: '100%', height: 180, objectFit: 'cover' }}
//                       >
//                         <source src={m.url} />
//                         Your browser does not support the video tag.
//                       </Box>
//                     ) : (
//                       <Box
//                         component="img"
//                         src={m.url}
//                         alt={m.name || `media-${idx}`}
//                         sx={{ width: '100%', height: 140, objectFit: 'cover' }}
//                       />
//                     )}

//                     <Box sx={{ p: 1 }}>
//                       <Typography variant="body2" noWrap title={m.name}>
//                         {m.name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {formatFileSize(m.size)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))
//               )}
//             </Box>
//           </Box>
//         </Box>

//         {/* Description full width */}
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           fullWidth
//           multiline
//           minRows={3}
//           error={!!errors.description}
//           helperText={errors.description}
//           sx={{ mt: 2 }}
//         />
//       </Box>


//       {/* Pricing */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>Pricing</Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 2,
//           }}
//         >
//           <TextField
//             type="number"
//             label="MRP"
//             name="mrp"
//             value={formData.mrp}
//             onChange={handleChange}
//             fullWidth
//             inputProps={{ min: 0, step: 0.01 }}
//             sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
//           />

//           <TextField
//             type="number"
//             label="Discount (%)"
//             name="discount"
//             value={formData.discount}
//             onChange={handleChange}
//             fullWidth
//             inputProps={{ min: 0, max: 100, step: 0.01 }}
//             sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
//           />

//           <TextField
//             type="number"
//             label="GST (%)"
//             name="gst"
//             value={formData.gst}
//             onChange={handleChange}
//             fullWidth
//             inputProps={{ min: 0, step: 0.01 }}
//             sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
//           />

//           <TextField
//             type="number"
//             label="Final Consumer Price"
//             name="consumer_price"
//             value={formData.consumer_price}
//             fullWidth
//             InputProps={{ readOnly: true }}
//             error={!!errors.consumer_price}
//             helperText={errors.consumer_price}
//             sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(50% - 10px)' }, minWidth: 0 }}
//           />

//           <FormControl
//             fullWidth
//             sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(50% - 10px)' }, minWidth: 0 }}
//           >
//             <InputLabel id="stock-label">Stock</InputLabel>
//             <Select
//               labelId="stock-label"
//               label="Stock"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//             >
//               <MenuItem value="yes">Yes</MenuItem>
//               <MenuItem value="no">No</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>


//       {/* Category */}
//       <Box sx={{ mb: 3 }}>
//         <div>
//           <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>

//           <Box
//             sx={{
//               display: 'flex',
//               gap: 2,
//               flexWrap: 'wrap',
//             }}
//           >
//             {/* Variety */}
//             <FormControl
//               fullWidth
//               error={!!errors.productvariety}
//               sx={{ flex: '1 1 300px', minWidth: 0 }}
//             >
//               <InputLabel id="variety-label">Variety</InputLabel>
//               <Select
//                 labelId="variety-label"
//                 label="Variety"
//                 name="productvariety"
//                 value={formData.productvariety}
//                 onChange={(e) => {
//                   const selectedVariety = e.target.value;
//                   setFormData(prev => ({
//                     ...prev,
//                     productvariety: selectedVariety,
//                     category: '',
//                     sub_category: ''
//                   }));
//                 }}
//               >
//                 <MenuItem value=""><em>Select Variety</em></MenuItem>
//                 {/* your real options here */}
//                 <MenuItem value="gold">Gold</MenuItem>
//                 <MenuItem value="diamond">Diamond</MenuItem>
//                 <MenuItem value="silver">Silver</MenuItem>
//               </Select>
//               {errors.productvariety && (
//                 <Typography variant="caption" color="error" sx={{ mt: .5 }}>
//                   {errors.productvariety}
//                 </Typography>
//               )}
//             </FormControl>

//             {/* Category */}
//             <FormControl
//               fullWidth
//               error={!!errors.category}
//               sx={{ flex: '1 1 300px', minWidth: 0 }}
//             >
//               <InputLabel id="category-label">Category</InputLabel>
//               <Select
//                 labelId="category-label"
//                 label="Category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//               >
//                 <MenuItem value=""><em>Select Category</em></MenuItem>
//                 {categoryList
//                   .filter(cat => cat.variety === formData.productvariety)
//                   .map((cat, i) => (
//                     <MenuItem key={i} value={cat.name}>{cat.name}</MenuItem>
//                   ))}
//               </Select>
//               {errors.category && (
//                 <Typography variant="caption" color="error" sx={{ mt: .5 }}>
//                   {errors.category}
//                 </Typography>
//               )}
//             </FormControl>

//             {/* Sub Category */}
//             <FormControl
//               fullWidth
//               sx={{ flex: '1 1 300px', minWidth: 0 }}
//             >
//               <InputLabel id="subcategory-label">Sub Category</InputLabel>
//               <Select
//                 labelId="subcategory-label"
//                 label="Sub Category"
//                 name="sub_category"
//                 value={formData.sub_category}
//                 onChange={handleChange}
//               >
//                 <MenuItem value=""><em>Select subcategory</em></MenuItem>
//                 {subCategoryList.map((sub, i) => (
//                   <MenuItem key={i} value={sub.name}>{sub.name}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* occasion */}
//               <FormControl
//               fullWidth
//               sx={{ flex: '1 1 300px', minWidth: 0 }}
//             >
//               <InputLabel id="occasion-label">Occasion</InputLabel>
//               <Select
//                 labelId="occasion-label"
//                 label="Occasion"
//                 name="occasion"
//                 value={formData.occasion}
//                 onChange={handleChange}
//               >
//                 <MenuItem value=""><em>Select occasion</em></MenuItem>
//                 {occasionList.map((occasion, i) => (
//                   <MenuItem key={i} value={occasion.name}>{occasion.name}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//           </Box>
//         </div>
//       </Box>


//       {/* Quantities */}
//       <Box sx={{ mb: 3 }}>
//         <div>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
//             <Typography variant="h6">Quantities</Typography>
//             <Button variant="contained" onClick={addQuantityField}>Add Quantity</Button>
//           </Stack>

//           {(!formData.quantity || formData.quantity.length === 0) && (
//             <Chip label="No quantities added yet" variant="outlined" sx={{ mb: 2 }} />
//           )}

//           {/* equal width items in rows */}
//           <Grid container spacing={2}>
//             {formData.quantity?.map((qty, index) => (
//               <Grid key={index} item xs={12} sm={6} md={4}>
//                 <TextField
//                   fullWidth
//                   label={`Quantity #${index + 1}`}
//                   value={qty}
//                   onChange={(e) => handleQuantityChange(index, e.target.value)}
//                   placeholder="e.g., 100ml, 50g"
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           color="error"
//                           onClick={() => removeQuantityField(index)}
//                           aria-label="Remove quantity"
//                           edge="end"
//                         >
//                           <CloseIcon />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//             ))}
//           </Grid>

//           {errors.quantity && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="caption" color="error">{errors.quantity}</Typography>
//             </>
//           )}
//         </div>
//       </Box>


//       {/* Actions */}
//       <Stack direction="row" spacing={2} justifyContent="flex-end">
//         <Button variant="outlined" onClick={handleReset}>Reset</Button>
//         <Button type="submit" variant="contained">
//           {isEditMode ? 'Update Product' : 'Submit Product'}
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default AddNewProduct;



// // 2::

import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

// MUI
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, InputAdornment } from '@mui/material';

const AddNewProduct = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [occasionList, setOccasionList] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    media: [],
    mrp: '',
    discount: '',
    gst: '',
    consumer_price: '',
    stock: 'yes',
    // quantity: [],
    quantity: [
      {
        weight: '', // weight of the product
        pricePerGram: '', // price per gram
        discount: '', // discount percentage
        gst: '', // GST percentage
        makingPrice: '', // making price
        totalWeight: '', // total weight
        finalPrice: '' // final price calculation
      }
    ],
    category: '',
    occasion: '',
    productvariety: '',
    sub_category: '',
    created_at: new Date().toISOString(),
    deleted_at: null,
  });

  // init: categories + product (if edit)
  useEffect(() => {
    const init = async () => {
      try {
        const categoriesResponse = await axiosInstance.get('/user/allcategories');
        setCategoryList(categoriesResponse.data || []);

        if (isEditMode) {
          const productResponse = await axiosInstance.get(`/user/product/${id}`);
          const product = productResponse.data;

          if (product.category) {
            const subCategoryResponse = await axiosInstance.get(
              `/user/allSubcategories?category=${encodeURIComponent(product.category)}`
            );
            setSubCategoryList(subCategoryResponse.data || []);
          }

          setFormData(prev => ({
            ...prev,
            ...product,
            media: (product.media || []).map(m => ({
              ...m,
              url: m.url?.startsWith('http') ? m.url : `${m.url}`,
              type: m.type?.includes('video') ? 'video' : 'image',
              file: null,
              name: m.name || m.url?.split('/').pop() || 'media',
              size: m.size || 0,
            })),
            quantity: Array.isArray(product.quantity)
              ? product.quantity
              : (typeof product.quantity === 'string' && product.quantity.length > 0 ? [product.quantity] : []),
            stock: (() => {
              const s = (product.stock ?? '').toLowerCase().trim();
              return s === 'yes' ? 'yes' : s === 'no' ? 'no' : 'yes';
            })(),
          }));
        }
      } catch (err) {
        console.error('Error during initialization:', err);
        toast.error('Failed to load initial data.');
      }
    };
    init();
  }, [id, isEditMode]);

  const fetchSubCategories = async (category) => {
    try {
      const response = await axiosInstance.get(
        `/user/allSubcategories?category=${encodeURIComponent(category)}`
      );
      setSubCategoryList(response.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // helpers
  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  // field change + price calc
  // const handleChange = (e, index) => {
  //   const { name, value } = e.target;

  //   setFormData(prev => {
  //     const updated = { ...prev };
  //     const qtyList = Array.isArray(updated.quantity) ? [...updated.quantity] : [];
  //     // Initialize if index doesn't exist
  //     if (!qtyList[index]) {
  //       qtyList[index] = {
  //         weight: '',
  //         pricePerGram: '',
  //         discount: '',
  //         gst: '',
  //         makingPrice: '',
  //         totalWeight: '',
  //         finalPrice: ''
  //       };
  //     }
  //     qtyList[index][name] = value;
  //     updated.quantity = qtyList;


  //     // Calculating price per gram, total weight, and final price
  //     const weight = parseFloat(qtyList[index].weight);
  //     const pricePerGram = parseFloat(qtyList[index].pricePerGram);
  //     const discount = parseFloat(qtyList[index].discount);
  //     const gst = parseFloat(qtyList[index].gst);
  //     const makingPrice = parseFloat(qtyList[index].makingPrice);
  //     let totalPrice = 0;
  //     // Calculation logic
  //     if (!isNaN(pricePerGram) && !isNaN(weight)) {
  //       const totalPriceBeforeDiscountAndGST = pricePerGram * weight + makingPrice;
  //       const discountedPrice = totalPriceBeforeDiscountAndGST - (totalPriceBeforeDiscountAndGST * discount) / 100;
  //       totalPrice = discountedPrice + (discountedPrice * gst) / 100;
  //     }
  //     qtyList[index].totalWeight = weight;
  //     qtyList[index].finalPrice = isNaN(totalPrice) ? '' : totalPrice.toFixed(2);
  //     updated.quantity = qtyList;

  //     if (name === 'category') {
  //       updated.sub_category = '';
  //       fetchSubCategories(value);
  //     }

  //     return updated;
  //   });
  // };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev };
      if (typeof index === 'number') {
        const qtyList = Array.isArray(updated.quantity) ? [...updated.quantity] : [];
        if (!qtyList[index]) {
          qtyList[index] = {
            weight: '',
            pricePerGram: '',
            discount: '',
            gst: '',
            makingPrice: '',
            totalWeight: '',
            finalPrice: ''
          };
        }
        qtyList[index][name] = value;
        // Calculations
        const weight = parseFloat(qtyList[index].weight);
        const pricePerGram = parseFloat(qtyList[index].pricePerGram);
        const discount = parseFloat(qtyList[index].discount);
        const gst = parseFloat(qtyList[index].gst);
        const makingPrice = parseFloat(qtyList[index].makingPrice);
        let totalPrice = 0;
        if (!isNaN(pricePerGram) && !isNaN(weight)) {
          const totalPriceBeforeDiscountAndGST = pricePerGram * weight + makingPrice;
          const discountedPrice = totalPriceBeforeDiscountAndGST - (totalPriceBeforeDiscountAndGST * discount) / 100;
          totalPrice = discountedPrice + (discountedPrice * gst) / 100;
        }
        qtyList[index].totalWeight = weight;
        qtyList[index].finalPrice = isNaN(totalPrice) ? '' : totalPrice.toFixed(2);
        updated.quantity = qtyList;
      } else {
        updated[name] = value;
        if (name === 'category') {
          updated.sub_category = '';
          fetchSubCategories(value);
        }
      }
      return updated;
    });
  };


  // media
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const mediaPromises = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          type: file.type.startsWith('video') ? 'video' : 'image',
          name: file.name,
          size: file.size,
          file
        });
      };
      reader.readAsDataURL(file);
    }));

    Promise.all(mediaPromises).then(newMedia => {
      setFormData(prev => ({ ...prev, media: [...prev.media, ...newMedia] }));
    });
  };

  const removeMedia = (index) => {
    setFormData(prev => {
      const updatedMedia = [...prev.media];
      updatedMedia.splice(index, 1);
      return { ...prev, media: updatedMedia };
    });
  };

  // quantity controls
  const handleQuantityChange = (index, value) => {
    setFormData(prev => {
      const list = [...prev.quantity];
      list[index] = value;
      return { ...prev, quantity: list };
    });
  };

  const addQuantityField = () => {
    setFormData(prev => ({
      ...prev,
      quantity: [
        ...prev.quantity,
        { weight: '', pricePerGram: '', discount: '', gst: '', makingPrice: '', totalWeight: '', finalPrice: '' }
      ]
    }));
  };

  const removeQuantityField = (index) => {
    setFormData(prev => {
      const list = [...prev.quantity];
      list.splice(index, 1);
      return { ...prev, quantity: list };
    });
  };

  // validation (trimmed to current fields)
  const validateForm = () => {
    const newErrors = {};
    const required = ['name', 'description', 'category', 'productvariety', 'stock'];

    required.forEach(field => {
      const v = formData[field];
      if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
        newErrors[field] = 'Required';
      }
    });

    const hasAtLeastOneQty = Array.isArray(formData.quantity) &&
      formData.quantity.some(q => !!(q && q.weight && q.weight !== ''));


    // consumer_price is derived; ensure it exists if MRP was provided
    if ((formData.mrp?.toString().length || 0) > 0 && (formData.consumer_price || '').trim() === '') {
      newErrors.consumer_price = 'Final price could not be calculated';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'media') return;
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            // send quantities as repeated key or a JSON string (adjust to your API)
            payload.append(key, JSON.stringify(value));
          } else {
            payload.append(key, value);
          }
        }
      });

      formData.media.forEach(item => {
        if (item?.file) {
          payload.append('media', item.file);
        } else if (item?.url) {
          payload.append('existingMedia', item.url);
        }
      });

      if (isEditMode) {
        await axiosInstance.put(`/user/updateProduct/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully!');
      } else {
        await axiosInstance.post('/user/createProduct', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added successfully!');
      }

      navigate('/AdminPanel/products');
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      media: [],
      mrp: '',
      discount: '',
      gst: '',
      consumer_price: '',
      stock: 'yes',
      quantity: [],
      category: '',
      productvariety: '',
      sub_category: '',
      created_at: new Date().toISOString(),
      deleted_at: null,
    });
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/AdminPanel/products')}>Cancel</Button>
      </Stack>

      {/* Basic Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Product Name */}
          <TextField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' }, minWidth: 0 }}
          />

          {/* Product Media */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">Product Media (Images/Videos)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                style={{ display: 'none' }}
              />
              <Button
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                    fileInputRef.current.click();
                  }
                }}
              >
                Add Media
              </Button>
              <Typography variant="body2" color="text.secondary">
                Supports JPG, PNG, GIF, MP4 (Max 10MB each)
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {formData.media.length === 0 ? (
                <Box
                  sx={{
                    border: '1px dashed',
                    borderColor: 'divider',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                    color: 'text.secondary',
                    flex: '1 1 100%',
                  }}
                >
                  No media selected
                </Box>
              ) : (
                formData.media.map((m, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      overflow: 'hidden',
                      width: 150,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeMedia(idx)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.default' },
                      }}
                      aria-label="Remove media"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    {m.type === 'video' ? (
                      <Box
                        component="video"
                        controls
                        sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                      >
                        <source src={m.url} />
                        Your browser does not support the video tag.
                      </Box>
                    ) : (
                      <Box
                        component="img"
                        src={m.url}
                        alt={m.name || `media-${idx}`}
                        sx={{ width: '100%', height: 140, objectFit: 'cover' }}
                      />
                    )}

                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" noWrap title={m.name}>
                        {m.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(m.size)}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Description full width */}
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={3}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ mt: 2 }}
        />
      </Box>


      {/* Pricing */}
      {/* <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pricing</Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <TextField
            type="number"
            label="MRP"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
          />

          <TextField
            type="number"
            label="Discount (%)"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 0, max: 100, step: 0.01 }}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
          />

          <TextField
            type="number"
            label="GST (%)"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)' }, minWidth: 0 }}
          />

          <TextField
            type="number"
            label="Final Consumer Price"
            name="consumer_price"
            value={formData.consumer_price}
            fullWidth
            InputProps={{ readOnly: true }}
            error={!!errors.consumer_price}
            helperText={errors.consumer_price}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(50% - 10px)' }, minWidth: 0 }}
          />

          <FormControl
            fullWidth
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(50% - 10px)' }, minWidth: 0 }}
          >
            <InputLabel id="stock-label">Stock</InputLabel>
            <Select
              labelId="stock-label"
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box> */}


      {/* Category */}
      <Box sx={{ mb: 3 }}>
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* Variety */}
            <FormControl
              fullWidth
              error={!!errors.productvariety}
              sx={{ flex: '1 1 300px', minWidth: 0 }}
            >
              <InputLabel id="variety-label">Variety</InputLabel>
              <Select
                labelId="variety-label"
                label="Variety"
                name="productvariety"
                value={formData.productvariety}
                onChange={(e) => {
                  const selectedVariety = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    productvariety: selectedVariety,
                    category: '',
                    sub_category: ''
                  }));
                }}
              >
                <MenuItem value=""><em>Select Variety</em></MenuItem>
                {/* your real options here */}
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
              </Select>
              {errors.productvariety && (
                <Typography variant="caption" color="error" sx={{ mt: .5 }}>
                  {errors.productvariety}
                </Typography>
              )}
            </FormControl>

            {/* Category */}
            <FormControl
              fullWidth
              error={!!errors.category}
              sx={{ flex: '1 1 300px', minWidth: 0 }}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Select Category</em></MenuItem>
                {categoryList
                  .filter(cat => cat.variety === formData.productvariety)
                  .map((cat, i) => (
                    <MenuItem key={i} value={cat.name}>{cat.name}</MenuItem>
                  ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: .5 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            {/* Sub Category */}
            <FormControl
              fullWidth
              sx={{ flex: '1 1 300px', minWidth: 0 }}
            >
              <InputLabel id="subcategory-label">Sub Category</InputLabel>
              <Select
                labelId="subcategory-label"
                label="Sub Category"
                name="sub_category"
                value={formData.sub_category}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Select subcategory</em></MenuItem>
                {subCategoryList.map((sub, i) => (
                  <MenuItem key={i} value={sub.name}>{sub.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* occasion */}
            <FormControl
              fullWidth
              sx={{ flex: '1 1 300px', minWidth: 0 }}
            >
              <InputLabel id="occasion-label">Occasion</InputLabel>
              <Select
                labelId="occasion-label"
                label="Occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Select occasion</em></MenuItem>
                {occasionList.map((occasion, i) => (
                  <MenuItem key={i} value={occasion.name}>{occasion.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
        </div>
      </Box>


      {/* Quantities */}
      <Box sx={{ mb: 3 }}>
        {/* Form layout with dynamic quantity fields */}
        {formData.quantity.map((qty, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6">Quantity #{index + 1}</Typography>
            <Grid container spacing={2}>
              {/* Weight */}
              <Grid item xs={6}>
                <TextField
                  label="Weight (gm)"
                  name="weight"
                  value={qty.weight}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {/* Price per gram */}
              <Grid item xs={6}>
                <TextField
                  label="Price per gram (₹)"
                  name="pricePerGram"
                  value={qty.pricePerGram}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {/* Discount */}
              <Grid item xs={6}>
                <TextField
                  label="Discount (%)"
                  name="discount"
                  value={qty.discount}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                />
              </Grid>

              {/* GST */}
              <Grid item xs={6}>
                <TextField
                  label="GST (%)"
                  name="gst"
                  value={qty.gst}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {/* Making Price */}
              <Grid item xs={6}>
                <TextField
                  label="Making Price (₹)"
                  name="makingPrice"
                  value={qty.makingPrice}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {/* Total Weight */}
              <Grid item xs={6}>
                <TextField
                  label="Total Weight (gm)"
                  value={qty.totalWeight}
                  fullWidth
                  disabled
                />
              </Grid>

              {/* Final Price */}
              <Grid item xs={6}>
                <TextField
                  label="Final Price (₹)"
                  value={qty.finalPrice}
                  fullWidth
                  disabled
                />
              </Grid>

              <Box sx={{ width: '200px' }}>
                <InputLabel id="stock-label">Stock</InputLabel>
                <Select
                  labelId="stock-label"
                  label="Stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </Box>

              <Grid item xs={12}>
                <Button variant="outlined" color="error" onClick={() => removeQuantityField(index)}>
                  Remove Quantity
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button variant="contained" onClick={addQuantityField}>Add Quantity</Button>
      </Box>


      {/* Actions */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button type="submit" variant="contained">
          {isEditMode ? 'Update Product' : 'Submit Product'}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddNewProduct;

