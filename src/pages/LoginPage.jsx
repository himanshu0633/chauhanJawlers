// import React, { useState } from 'react';
// import {
//     Box, Tabs, Tab, Typography, TextField, Button,
//     InputAdornment, Paper, useMediaQuery, Fade
// } from '@mui/material';
// import {
//     Email, Lock, Person, Visibility, VisibilityOff
// } from '@mui/icons-material';

// const themeColors = {
//     background: "#fff",
//     accent: "#3F1C0A",
//     glass: "rgba(255,255,255,0.7)",
//     input: "rgba(255,255,255,0.7)",
//     lightTint: "#fceee6",
//     tabInactive: "#c1ad99",
// };
// const brown = "#44170D";

// const fieldStyles = {
//     inputSx: {
//         background: themeColors.input,
//         color: "#000",
//         borderRadius: 2,
//         boxShadow: "0 1px 8px 0 #99725328",
//         '& input': { color: "#000" },
//         // Border default + hover
//         '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: themeColors.tabInactive,
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: brown,
//         },
//         // Focused border override:
//         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: brown + " !important",  // Important to ensure override
//             borderWidth: 2,
//         },
//     },
//     labelSx: {
//         // Focused label color override:
//         '&.Mui-focused': {
//             color: brown + " !important",
//         }
//     }
// };

// export default function LoginPage() {
//     const [mode, setMode] = useState("login");
//     const matches = useMediaQuery("(max-width:600px)");
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
//     const [formError, setFormError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleTabChange = (_ev, newValue) => {
//         setMode(newValue);
//         setFormError("");
//     };

//     const toggleShowPassword = () => setShowPassword(p => !p);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (mode === "login") setLoginData({ ...loginData, [name]: value });
//         else setSignupData({ ...signupData, [name]: value });
//         setFormError("");
//     };

//     function validateInputs() {
//         const email = mode === "login" ? loginData.email : signupData.email;
//         const password = mode === "login" ? loginData.password : signupData.password;
//         if (!email || !password) return "Please fill in all required fields.";
//         if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Please enter a valid email address.";
//         if (password.length < 5) return "Password must be at least 5 characters.";
//         if (mode === "signup" && !signupData.name) return "Name is required.";
//         return "";
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const err = validateInputs();
//         setFormError(err);
//         if (err) return;
//         alert(
//             mode === 'login'
//                 ? `Logging in with\nEmail: ${loginData.email}\nPassword: ${loginData.password}`
//                 : `Signing up\nName: ${signupData.name}\nEmail: ${signupData.email}\nPassword: ${signupData.password}`
//         );
//     };

//     return (
//         <Box
//             sx={{
//                 // minHeight: '100vh',
//                 background: `linear-gradient(135deg, #e6d3bf 0%, #ffffff 100%)`,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontFamily: '"Montserrat", "Roboto", sans-serif',
//                 overflow: "auto",
//                 py:5
//             }}
//         >
//             <Paper
//                 elevation={10}
//                 sx={{
//                     borderRadius: 6,
//                     minWidth: matches ? '80vw' : '400px',
//                     // maxWidth: 410,
//                     px: matches ? 1.2 : 5,
//                     py: matches ? 2.5 : 4.5,
//                     background: themeColors.glass,
//                     boxShadow: '0 10px 40px 0 #a98a7424, 0 1.5px 7px 0 rgba(63,28,10,0.10)',
//                     backdropFilter: 'blur(8px)',
//                     transition: 'box-shadow 0.3s',
//                 }}
//             >
//                 <Typography
//                     variant="h4"
//                     align="center"
//                     sx={{
//                         fontWeight: 800,
//                         fontFamily: `"Poppins", "Montserrat", sans-serif`,
//                         color: themeColors.accent,
//                         mb: 2,
//                         letterSpacing: 1,
//                         textShadow: "0 2px 10px #3f1c0a18"
//                     }}>
//                     {mode === "login" ? "Sign In" : "Create Account"}
//                 </Typography>
//                 <Tabs
//                     value={mode}
//                     onChange={handleTabChange}
//                     centered
//                     TabIndicatorProps={{
//                         style: { background: "#44170D", borderRadius: 5, height: 4 }
//                     }}
//                     sx={{
//                         mx: "auto",
//                         width: "95%",
//                         mb: 3,
//                         '& .MuiTab-root': {
//                             fontWeight: 600,
//                             color: themeColors.tabInactive,
//                             fontSize: 17,
//                             // Remove default ripple/focus
//                             '&.Mui-selected': {
//                                 color: "#44170D !important",
//                             },
//                             '&:focus': {
//                                 color: "#44170D !important",
//                                 outline: "none"
//                             }
//                         },
//                         '& .Mui-selected': {
//                             color: "#44170D !important",
//                             fontWeight: 900,
//                         },
//                     }}
//                 >
//                     <Tab
//                         disableRipple
//                         label="Login"
//                         value="login"
//                         sx={{
//                             '&.Mui-selected': {
//                                 color: '#44170D !important',
//                             },
//                             '&.Mui-focusVisible': {
//                                 color: '#44170D !important',
//                                 background: 'none'
//                             },
//                         }}
//                     />
//                     <Tab
//                         disableRipple
//                         label="Sign Up"
//                         value="signup"
//                         sx={{
//                             '&.Mui-selected': {
//                                 color: '#44170D !important',
//                             },
//                             '&.Mui-focusVisible': {
//                                 color: '#44170D !important',
//                                 background: 'none'
//                             },
//                         }}
//                     />
//                 </Tabs>


//                 <Fade in={Boolean(formError)}>
//                     <Typography
//                         color="error"
//                         sx={{ fontSize: 15, textAlign: "center", mb: 1 }}>
//                         {formError}
//                     </Typography>
//                 </Fade>

//                 <Box
//                     component="form"
//                     autoComplete="off"
//                     onSubmit={handleSubmit}
//                     sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}
//                 >
//                     {mode === "signup" && (
//                         <TextField
//                             label="Name"
//                             name="name"
//                             variant="outlined"
//                             required
//                             autoFocus
//                             fullWidth
//                             value={signupData.name}
//                             onChange={handleChange}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Person style={{ color: "#AB6941" }} />
//                                     </InputAdornment>
//                                 ),
//                                 sx: fieldStyles.inputSx
//                             }}
//                             InputLabelProps={{ sx: fieldStyles.labelSx }}
//                         />
//                     )}

//                     <TextField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         variant="outlined"
//                         required
//                         autoFocus={mode === 'login'}
//                         fullWidth
//                         value={mode === "login" ? loginData.email : signupData.email}
//                         onChange={handleChange}
//                         autoComplete="username"
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Email style={{ color: "#ab6941" }} />
//                                 </InputAdornment>
//                             ),
//                             sx: fieldStyles.inputSx
//                         }}
//                         InputLabelProps={{ sx: fieldStyles.labelSx }}
//                     />

//                     <TextField
//                         label="Password"
//                         name="password"
//                         type={showPassword ? 'text' : 'password'}
//                         variant="outlined"
//                         required
//                         autoComplete={mode === 'login' ? "current-password" : "new-password"}
//                         fullWidth
//                         value={mode === "login" ? loginData.password : signupData.password}
//                         onChange={handleChange}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <Lock style={{ color: "#ab6941" }} />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: (
//                                 <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={toggleShowPassword}>
//                                     {showPassword ? <VisibilityOff sx={{ color: '#ab6941' }} /> : <Visibility sx={{ color: '#ab6941' }} />}
//                                 </InputAdornment>
//                             ),
//                             sx: fieldStyles.inputSx
//                         }}
//                         InputLabelProps={{ sx: fieldStyles.labelSx }}
//                     />

//                     <Button
//                         type="submit"
//                         variant="contained"
//                         fullWidth
//                         sx={{
//                             mt: 1.8,
//                             background: "linear-gradient(90deg, #AB6941, #3F1C0A)",
//                             color: "#fff",
//                             fontWeight: 700,
//                             letterSpacing: "1px",
//                             fontSize: 19,
//                             borderRadius: 2,
//                             minHeight: 44,
//                             boxShadow: '0 2px 12px 0 #3f1c0a16',
//                             transition: "all 0.12s cubic-bezier(.27,1.3,.65,1)",
//                             '&:active': { transform: 'scale(.98)' },
//                             '&:hover': {
//                                 background: "linear-gradient(90deg,#9b5024 20%, #431D13 90%)",
//                                 boxShadow: "0 4px 18px #3f1c0a1a",
//                             }
//                         }}
//                         disableElevation
//                     >
//                         {mode === "login" ? "Log In" : "Sign Up"}
//                     </Button>
//                     <Typography
//                         sx={{
//                             textAlign: "center",
//                             color: themeColors.accent,
//                             opacity: 0.31,
//                             fontSize: 13,
//                             mt: 2,
//                             letterSpacing: 0.5
//                         }}
//                     >
//                         {mode === "login"
//                             ? "Don't have an account? Sign up now."
//                             : "Already have an account? Log in!"}
//                     </Typography>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// }


import React, { useState } from 'react';
import {
    Box, Tabs, Tab, Typography, TextField, Button,
    InputAdornment, Paper, useMediaQuery, Fade
} from '@mui/material';
import {
    Email, Lock, Person, Visibility, VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../common components/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const themeColors = {
    background: "#fff",
    accent: "#3F1C0A",
    glass: "rgba(255,255,255,0.7)",
    input: "rgba(255,255,255,0.7)",
    lightTint: "#fceee6",
    tabInactive: "#c1ad99",
};
const brown = "#44170D";

const fieldStyles = {
    inputSx: {
        background: themeColors.input,
        color: "#000",
        borderRadius: 2,
        boxShadow: "0 1px 8px 0 #99725328",
        '& input': { color: "#000" },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeColors.tabInactive,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: brown,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brown + " !important",
            borderWidth: 2,
        },
    },
    labelSx: {
        '&.Mui-focused': {
            color: brown + " !important",
        }
    }
};

export default function LoginPage() {
    const [mode, setMode] = useState("login"); // toggle between login and signup
    const matches = useMediaQuery("(max-width:600px)");
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 5;

    const handleTabChange = (_ev, newValue) => {
        setMode(newValue);
        setFormError(""); // Clear errors when switching tabs
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (mode === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setSignupData({ ...signupData, [name]: value });
        }
        setFormError(""); // Reset form errors on any input change
    };

    const validateInputs = () => {
        const email = mode === "login" ? loginData.email : signupData.email;
        const password = mode === "login" ? loginData.password : signupData.password;
        if (!email || !password) return "Please fill in all required fields.";
        if (!validateEmail(email)) return "Please enter a valid email address.";
        if (password.length < 5) return "Password must be at least 5 characters.";
        if (mode === "signup" && !signupData.name) return "Name is required.";
        return ""; // No errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validateInputs();
        setFormError(err);
        if (err) return; // Stop if there's an error

        setIsLoading(true);
        try {
            const response = mode === "login" ?
                await axiosInstance.post('/admin/login', { email: loginData.email, password: loginData.password }) :
                await axiosInstance.post('/admin/createAdmin', signupData);

            if (response.status === 200 || response.status === 201) {
                console.log("saving data to localstorage")
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.data));

                // Toast success messages
                if (mode === "login") {
                    toast.success("Login successful!");
                    navigate('/');
                } else {
                    toast.success("Signup successful! Please login.");
                    setSignupData({
                        name: '', email: '', password: ''
                    })
                }
            }
        } catch (error) {
            // Show an error toast if something goes wrong
            if (mode === "login") {
                toast.error('Login failed. Please check your credentials.');
            } else {
                toast.error("Signup failed. Please try again.");
            }

            setLoginError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ background: `linear-gradient(135deg, #e6d3bf 0%, #ffffff 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Montserrat", "Roboto", sans-serif', py: 5 }}>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
            <Paper elevation={10} sx={{ borderRadius: 6, minWidth: matches ? '80vw' : '400px', px: matches ? 1.2 : 5, py: matches ? 2.5 : 4.5, background: themeColors.glass, boxShadow: '0 10px 40px 0 #a98a7424, 0 1.5px 7px 0 rgba(63,28,10,0.10)', backdropFilter: 'blur(8px)', transition: 'box-shadow 0.3s' }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 800, fontFamily: `"Poppins", "Montserrat", sans-serif`, color: themeColors.accent, mb: 2, letterSpacing: 1, textShadow: "0 2px 10px #3f1c0a18" }}>
                    {mode === "login" ? "Sign In" : "Create Account"}
                </Typography>

                <Tabs value={mode} onChange={handleTabChange} centered TabIndicatorProps={{ style: { background: "#44170D", borderRadius: 5, height: 4 } }} sx={{ mx: "auto", width: "95%", mb: 3 }}>
                    <Tab label="Login" value="login" />
                    <Tab label="Sign Up" value="signup" />
                </Tabs>

                <Fade in={Boolean(formError)}>
                    <Typography color="error" sx={{ fontSize: 15, textAlign: "center", mb: 1 }}>{formError}</Typography>
                </Fade>

                <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}>
                    {mode === "signup" && (
                        <TextField label="Name" name="name" variant="outlined" required fullWidth value={signupData.name} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Person style={{ color: "#AB6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }} InputLabelProps={{ sx: fieldStyles.labelSx }} />
                    )}
                    <TextField label="Email" name="email" type="email" variant="outlined" required fullWidth value={mode === "login" ? loginData.email : signupData.email} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Email style={{ color: "#ab6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }} InputLabelProps={{ sx: fieldStyles.labelSx }} />
                    <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'} variant="outlined" required fullWidth value={mode === "login" ? loginData.password : signupData.password} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Lock style={{ color: "#ab6941" }} /></InputAdornment>, endAdornment: <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>{showPassword ? <VisibilityOff sx={{ color: '#ab6941' }} /> : <Visibility sx={{ color: '#ab6941' }} />}</InputAdornment>, sx: fieldStyles.inputSx }} InputLabelProps={{ sx: fieldStyles.labelSx }} />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.8, background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700, fontSize: 19, borderRadius: 2, minHeight: 44, boxShadow: '0 2px 12px 0 #3f1c0a16' }}>
                        {mode === "login" ? "Log In" : "Sign Up"}
                    </Button>

                    <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, letterSpacing: 0.5 }}>
                        {mode === "login" ? "Don't have an account? Sign up now." : "Already have an account? Log in!"}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
