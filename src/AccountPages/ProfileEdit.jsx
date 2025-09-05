// import React, { useEffect, useState } from "react";
// import {
//     Container,
//     Box,
//     Typography,
//     Avatar,
//     IconButton,
//     TextField,
//     Button,
//     Paper
// } from "@mui/material";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../common components/AxiosInstance";
// import { toast } from "react-toastify";
// import { publicUrl } from "../common components/PublicUrl";


// export default function ProfileEdit() {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         address: ''
//     });

//     useEffect(() => {
//         const userData = localStorage.getItem('userData');
//         // console.log("User data:", userData);
//         if (userData) {
//             const parsedData = JSON.parse(userData);
//             setIsAuthenticated(true);

//             // Store the userId separately if needed
//             setUserId(parsedData._id);

//             setFormData({
//                 name: parsedData.name || '',
//                 email: parsedData.email || '',
//                 mobile: parsedData.mobile || '',
//                 address: parsedData.address || ''
//             });

//             if (parsedData.selectedImage) {
//                 setFormData(parsedData.selectedImage);
//             }
//         } else {
//             navigate('/login')
//         }
//     }, []);


//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSelectedImage(URL.createObjectURL(file));
//             setFormData({ ...formData, image: file });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         const userData = localStorage.getItem('userData');
//         if (!userData) {
//             toast.error("You must be logged in.");
//             navigate('/login');
//             return;
//         }
//         const parsed = JSON.parse(userData);
//         const userId = parsed._id;

//         try {
//             const updatedData = {
//                 ...formData,
//                 selectedImage,
//             };

//             const response = await axiosInstance.put(`/admin/updateAdmin/${userId}`, updatedData);

//             if (response.status === 200 || response.status === 201) {
//                 // console.log("Profile updated:", response.data);

//                 localStorage.setItem('userData', JSON.stringify(response.data.updatedUser || updatedData));
//                 toast.success('Profile updated successfully!');
//             } else {
//                 throw new Error("Failed to update profile");
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             toast.error("Error updating profile. Please try again.");
//         }
//     };

//     if (isAuthenticated === null) return null;

//     return (
//         <Container maxWidth="sm" sx={{ py: 5 }}>
//             <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//                 <Typography variant="h5" fontWeight={600} mb={3}>
//                     Edit Profile
//                 </Typography>
//                 <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
//                     <Avatar
//                         alt={formData.name}
//                         src={publicUrl(selectedImage)}
//                         sx={{ width: 96, height: 96, mb: 2 }}
//                     />
//                     <input
//                         accept="image/*"
//                         id="profile-image"
//                         type="file"
//                         style={{ display: "none" }}
//                         onChange={handleImageChange}
//                     />
//                     <label htmlFor="profile-image">
//                         <IconButton color="primary" aria-label="upload picture" component="span">
//                             <PhotoCamera />
//                         </IconButton>
//                     </label>
//                 </Box>
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 2,
//                         width: '100%',
//                     }}
//                 >
//                     <TextField
//                         label="Name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         variant="outlined"
//                     />
//                     <TextField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         variant="outlined"
//                     />
//                     {/* <TextField
//                         label="Phone Number"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         variant="outlined"
//                     /> */}
//                     <TextField
//                         label="Address"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         multiline
//                         minRows={2}
//                         variant="outlined"
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         disabled={!userId}
//                     >
//                         Save Changes
//                     </Button>

//                 </Box>
//             </Paper>
//         </Container>
//     );
// }

// // 2:
import React, { useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Button,
    Paper
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../common components/AxiosInstance";
import { toast } from "react-toastify";
import { publicUrl } from "../common components/PublicUrl";

export default function ProfileEdit() {
    
    const [formData, setFormData] = useState({
        _id: "",       
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userDataStr = localStorage.getItem("userData");
        if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            if (!userData._id) {
                // if id missing, force login or fetch full user data
                navigate("/login");
                return;
            }
            setIsAuthenticated(true);
            setFormData({
                _id: userData._id,
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || userData.mobile || "",
                address: userData.address || ""
            });
            // if (userData.image) {
            //     setImagePreview(publicUrl(userData.image));
            // }
            if (userData.image) {
                setImagePreview(publicUrl(`uploads/${userData.image}`));
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData._id) {
            toast.error("User not authenticated properly.");
            return;
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("address", formData.address);
            if (selectedImageFile) {
                data.append("image", selectedImageFile);
            }

            const response = await axiosInstance.put(
                `/admin/updateAdmin/${formData._id}`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            if (response.status === 200 || response.status === 201) {
                const updatedUser = response.data.admin || formData;
                setFormData((prev) => ({ ...prev, ...updatedUser }));
                localStorage.setItem("userData", JSON.stringify(updatedUser));
                toast.success("Profile updated successfully!");
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile. Please try again.");
        }
    };

    if (isAuthenticated === null) return null;

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} mb={3} textTransform={"capitalize"}>
                    Edit Profile
                    {/* {formData.name}'s Profile */}
                </Typography>
                <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
                    <Avatar
                        alt={formData.name}
                        src={imagePreview}
                        sx={{ width: 96, height: 96, mb: 2 }}
                    />
                    <input
                        accept="image/*"
                        id="profile-image"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="profile-image">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
                >
                    <TextField
                        id="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        id="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        minRows={2}
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

