// import React, { useState } from 'react';
// import {
//     Box, Tabs, Tab, Typography, TextField, Button,
//     InputAdornment, Paper, useMediaQuery, Fade
// } from '@mui/material';
// import {
//     Email, Lock, Person, Visibility, VisibilityOff
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../commonComponents/AxiosInstance';
// import { toast, ToastContainer } from 'react-toastify';

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
//         '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: themeColors.tabInactive,
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: brown,
//         },
//         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: brown + " !important",
//             borderWidth: 2,
//         },
//     },
//     labelSx: {
//         '&.Mui-focused': {
//             color: brown + " !important",
//         }
//     }
// };

// export default function LoginPage() {
//     const [mode, setMode] = useState("login"); // toggle between login and signup
//     const matches = useMediaQuery("(max-width:600px)");
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [signupData, setSignupData] = useState({ name: '', email: '', password: '', phone: '' });
//     const [formError, setFormError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [otpSent, setOtpSent] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [otpError, setOtpError] = useState('');
//     const navigate = useNavigate();

//     const togglePasswordVisibility = () => setShowPassword(!showPassword);

//     const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     const validateInputs = () => {
//         const email = mode === "login" ? loginData.email : signupData.email;
//         const password = mode === "login" ? loginData.password : signupData.password;
//         if (!email || !password) return "Please fill in all required fields.";
//         if (!validateEmail(email)) return "Please enter a valid email address.";
//         if (password.length < 5) return "Password must be at least 5 characters.";
//         if (mode === "signup" && !signupData.name) return "Name is required.";
//         return ""; // No errors
//     };

//     const handleTabChange = (_ev, newValue) => {
//         setMode(newValue);
//         setFormError("");
//         setOtpSent(false);
//         setOtp('');
//         setOtpError('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (otpSent && name === 'email' && mode === "signup") return; // prevent email edit during OTP in signup
//         if (mode === "login") {
//             setLoginData({ ...loginData, [name]: value });
//         } else {
//             setSignupData({ ...signupData, [name]: value });
//         }
//         setFormError("");
//         setOtpError('');
//     };

//     // Send OTP (only for signup)
//     const sendOtpForSignup = async () => {
//         if (!validateEmail(signupData.email)) {
//             setFormError("Please enter a valid email address.");
//             return;
//         }
//         setIsLoading(true);
//         setFormError("");
//         try {
//             const res = await axiosInstance.post('/api/send-otp', { email: signupData.email });
//             toast.success(res.data.message || "OTP sent to your email.");
//             setOtpSent(true);
//         } catch (error) {
//             setFormError(error.response?.data?.message || 'Failed to send OTP.');
//             setOtpSent(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Verify OTP (only for signup)
//     const verifyOtpForSignup = async () => {
//         if (otp.length !== 6) {
//             setOtpError("OTP must be 6 digits.");
//             return false;
//         }
//         setIsLoading(true);
//         setOtpError('');
//         try {
//             const res = await axiosInstance.post('/api/verify-otp', { email: signupData.email, otp });
//             toast.success(res.data.message || "OTP verified successfully.");
//             setOtpError('');
//             return true;
//         } catch (error) {
//             setOtpError(error.response?.data?.message || 'OTP verification failed.');
//             return false;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Submit signup after OTP verified
//     const finalizeSignup = async () => {
//         try {
//             const response = await axiosInstance.post('/admin/createAdmin', signupData);
//             if (response.status === 201 || response.status === 200) {
//                 toast.success("Signup successful! Please login.");
//                 setSignupData({ name: '', email: '', password: '' });
//                 setOtpSent(false);
//                 setOtp('');
//                 setMode('login');
//             }
//         } catch (error) {
//             toast.error("Signup failed. Please try again.");
//             setFormError(error.response?.data?.message || 'Signup error.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setFormError("");
//         if (mode === "login") {
//             // Login flow: Direct login without OTP
//             const err = validateInputs();
//             if (err) {
//                 setFormError(err);
//                 return;
//             }
//             setIsLoading(true);
//             try {
//                 const loginResponse = await axiosInstance.post('/admin/login', { email: loginData.email, password: loginData.password });
//                 if (loginResponse.status === 200) {
//                     localStorage.setItem('authToken', loginResponse.data.token);
//                     localStorage.setItem('userData', JSON.stringify(loginResponse.data.data));
//                     toast.success("Login successful!");
//                     navigate('/');
//                 }
//             } catch (error) {
//                 toast.error("Login failed. Please check your credentials.");
//                 setFormError(error.response?.data?.message || 'Login error.');
//             } finally {
//                 setIsLoading(false);
//             }
//         } else {
//             // Signup flow with OTP verification
//             if (!otpSent) {
//                 // Validate input, then send OTP
//                 const err = validateInputs();
//                 if (err) {
//                     setFormError(err);
//                     return;
//                 }
//                 await sendOtpForSignup();
//             } else {
//                 // OTP sent: verify OTP then finalize signup
//                 if (!otp) {
//                     setOtpError("Please enter the OTP sent to your email.");
//                     return;
//                 }
//                 const isVerified = await verifyOtpForSignup();
//                 if (isVerified) {
//                     await finalizeSignup();
//                 }
//             }
//         }
//     };

//     return (
//         <Box sx={{ background: `linear-gradient(135deg, #e6d3bf 0%, #ffffff 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Montserrat", "Roboto", sans-serif', py: 5 }}>
//             <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
//             <Paper elevation={10} sx={{ borderRadius: 6, minWidth: matches ? '80vw' : '400px', px: matches ? 1.2 : 5, py: matches ? 2.5 : 4.5, background: themeColors.glass, boxShadow: '0 10px 40px 0 #a98a7424, 0 1.5px 7px 0 rgba(63,28,10,0.10)', backdropFilter: 'blur(8px)', transition: 'box-shadow 0.3s' }}>
//                 <Typography variant="h4" align="center" sx={{ fontWeight: 800, fontFamily: `"Poppins", "Montserrat", sans-serif`, color: themeColors.accent, mb: 2, letterSpacing: 1, textShadow: "0 2px 10px #3f1c0a18" }}>
//                     {mode === "login" ? "Sign In" : "Create Account"}
//                 </Typography>

//                 <Tabs value={mode} onChange={handleTabChange} centered TabIndicatorProps={{ style: { background: "#44170D", borderRadius: 5, height: 4 } }} sx={{ mx: "auto", width: "95%", mb: 3 }}>
//                     <Tab label="Login" value="login" />
//                     <Tab label="Sign Up" value="signup" />
//                 </Tabs>

//                 <Fade in={Boolean(formError)}>
//                     <Typography color="error" sx={{ fontSize: 15, textAlign: "center", mb: 1 }}>{formError}</Typography>
//                 </Fade>

//                 <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1.5 }}>
//                     {mode === "signup" && !otpSent && (
//                         <>
//                             <TextField
//                                 label="Name"
//                                 name="name"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 value={signupData.name}
//                                 onChange={handleChange}
//                                 InputProps={{ startAdornment: <InputAdornment position="start"><Person style={{ color: "#AB6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }}
//                                 InputLabelProps={{ sx: fieldStyles.labelSx }}
//                             />
//                             <TextField
//                                 label="Phone Number"
//                                 fullWidth
//                                 size="small"
//                                 value={signupData.phone}
//                                 onChange={(e) => {
//                                     // Allow only digits and limit length to 10
//                                     const val = e.target.value.replace(/\D/g, '').slice(0, 10);
//                                     setSignupData((p) => ({ ...p, phone: val }));
//                                 }}
//                                 inputProps={{ maxLength: 10 }}
//                                 InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment>, sx: fieldStyles.inputSx }}
//                                 InputLabelProps={{ sx: fieldStyles.labelSx }}
//                             />
//                         </>
//                     )}

//                     <TextField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         variant="outlined"
//                         required
//                         fullWidth
//                         value={mode === "login" ? loginData.email : signupData.email}
//                         onChange={handleChange}
//                         disabled={otpSent && mode === "signup"}
//                         InputProps={{ startAdornment: <InputAdornment position="start"><Email style={{ color: "#ab6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }}
//                         InputLabelProps={{ sx: fieldStyles.labelSx }}
//                     />

//                     {!otpSent && (
//                         <TextField
//                             label="Password"
//                             name="password"
//                             type={showPassword ? 'text' : 'password'}
//                             variant="outlined"
//                             required
//                             fullWidth
//                             value={mode === "login" ? loginData.password : signupData.password}
//                             onChange={handleChange}
//                             InputProps={{ startAdornment: <InputAdornment position="start"><Lock style={{ color: "#ab6941" }} /></InputAdornment>, endAdornment: <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>{showPassword ? <VisibilityOff sx={{ color: '#ab6941' }} /> : <Visibility sx={{ color: '#ab6941' }} />}</InputAdornment>, sx: fieldStyles.inputSx }}
//                             InputLabelProps={{ sx: fieldStyles.labelSx }}
//                         />
//                     )}

//                     {/* OTP input for signup */}
//                     {mode === "signup" && otpSent && (
//                         <>
//                             <TextField
//                                 label="Enter OTP"
//                                 name="otp"
//                                 type="text"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 value={otp}
//                                 onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
//                                 error={Boolean(otpError)}
//                                 helperText={otpError}
//                                 InputProps={{ sx: fieldStyles.inputSx }}
//                                 InputLabelProps={{ sx: fieldStyles.labelSx }}
//                                 inputProps={{ maxLength: 6 }}
//                             />
//                             <Button type="submit" disabled={otp.length !== 6 || isLoading} variant="contained" sx={{ background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700 }}>
//                                 {isLoading ? "Verifying OTP..." : "Verify OTP"}
//                             </Button>
//                             <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, cursor: 'pointer' }} onClick={() => {
//                                 setOtpSent(false);
//                                 setOtp('');
//                                 setFormError('');
//                                 setOtpError('');
//                             }}>
//                                 Resend OTP
//                             </Typography>
//                         </>
//                     )}

//                     {/* Submit button for login or signup when OTP not sent */}
//                     {!otpSent && (
//                         <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.8, background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700, fontSize: 19, borderRadius: 2, minHeight: 44, boxShadow: '0 2px 12px 0 #3f1c0a16' }}>
//                             {mode === "login" ? "Log In" : "Sign Up"}
//                         </Button>
//                     )}
//                 </Box>

//                 {mode === "login" && (
//                     <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, letterSpacing: 0.5 }}>
//                         Don't have an account? Sign up now.
//                     </Typography>
//                 )}

//                 {mode === "signup" && !otpSent && (
//                     <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, letterSpacing: 0.5 }}>
//                         Already have an account? Log in!
//                     </Typography>
//                 )}
//             </Paper>
//         </Box>
//     );
// }


// // 2: check if email already exists:
import React, { useState } from 'react';
import {
    Box, Tabs, Tab, Typography, TextField, Button,
    InputAdornment, Paper, useMediaQuery, Fade
} from '@mui/material';
import {
    Email, Lock, Person, Visibility, VisibilityOff
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';
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
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', phone: '' });
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateInputs = () => {
        const email = mode === "login" ? loginData.email : signupData.email;
        const password = mode === "login" ? loginData.password : signupData.password;
        if (!email || !password) return "Please fill in all required fields.";
        if (!validateEmail(email)) return "Please enter a valid email address.";
        if (password.length < 5) return "Password must be at least 5 characters.";
        if (mode === "signup" && !signupData.name) return "Name is required.";
        return ""; // No errors
    };

    const handleTabChange = (_ev, newValue) => {
        setMode(newValue);
        setFormError("");
        setOtpSent(false);
        setOtp('');
        setOtpError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (otpSent && name === 'email' && mode === "signup") return; // prevent email edit during OTP in signup
        if (mode === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setSignupData({ ...signupData, [name]: value });
        }
        setFormError("");
        setOtpError('');
    };

    // Check if email exists before sending OTP for signup
    const checkEmailExists = async (email) => {
        try {
            const res = await axiosInstance.get('/admin/exists', { params: { email } });
            return res.data.exists;
        } catch {
            // On error assume email does not exist to avoid false block
            return false;
        }
    };

    // Send OTP (only for signup)
    const sendOtpForSignup = async () => {
        if (!validateEmail(signupData.email)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        const alreadyExists = await checkEmailExists(signupData.email);
        if (alreadyExists) {
            setFormError("Email is already registered. Please login.");
            return;
        }

        setIsLoading(true);
        setFormError("");
        try {
            const res = await axiosInstance.post('/api/send-otp', { email: signupData.email });
            toast.success(res.data.message || "OTP sent to your email.");
            setOtpSent(true);
        } catch (error) {
            setFormError(error.response?.data?.message || 'Failed to send OTP.');
            setOtpSent(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP (only for signup)
    const verifyOtpForSignup = async () => {
        if (otp.length !== 6) {
            setOtpError("OTP must be 6 digits.");
            return false;
        }
        setIsLoading(true);
        setOtpError('');
        try {
            const res = await axiosInstance.post('/api/verify-otp', { email: signupData.email, otp });
            toast.success(res.data.message || "OTP verified successfully.");
            setOtpError('');
            return true;
        } catch (error) {
            setOtpError(error.response?.data?.message || 'OTP verification failed.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Submit signup after OTP verified
    const finalizeSignup = async () => {
        try {
            const response = await axiosInstance.post('/admin/createAdmin', signupData);
            if (response.status === 201 || response.status === 200) {
                toast.success("Signup successful! Please login.");
                setSignupData({ name: '', email: '', password: '' });
                setOtpSent(false);
                setOtp('');
                setMode('login');
            }
        } catch (error) {
            // toast.error("Signup failed. Please try again.");
            setFormError(error.response?.data?.message || 'Signup error.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (mode === "login") {
            // Login flow: Direct login without OTP
            const err = validateInputs();
            if (err) {
                setFormError(err);
                return;
            }
            setIsLoading(true);
            try {
                const loginResponse = await axiosInstance.post('/admin/login', { email: loginData.email, password: loginData.password });
                if (loginResponse.status === 200) {
                    localStorage.setItem('authToken', loginResponse.data.token);
                    localStorage.setItem('userData', JSON.stringify(loginResponse.data.data));
                    toast.success("Login successful!");
                    navigate('/');
                }
            } catch (error) {
                toast.error("Login failed. Please check your credentials.");
                setFormError(error.response?.data?.message || 'Login error.');
            } finally {
                setIsLoading(false);
            }
        } else {
            // Signup flow with OTP verification
            if (!otpSent) {
                // Validate input, then send OTP with email exists check
                const err = validateInputs();
                if (err) {
                    setFormError(err);
                    return;
                }
                await sendOtpForSignup();
            } else {
                // OTP sent: verify OTP then finalize signup
                if (!otp) {
                    setOtpError("Please enter the OTP sent to your email.");
                    return;
                }
                const isVerified = await verifyOtpForSignup();
                if (isVerified) {
                    await finalizeSignup();
                }
            }
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
                    {mode === "signup" && !otpSent && (
                        <>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                value={signupData.name}
                                onChange={handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start"><Person style={{ color: "#AB6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }}
                                InputLabelProps={{ sx: fieldStyles.labelSx }}
                            />
                            <TextField
                                label="Phone Number"
                                fullWidth
                                size="small"
                                value={signupData.phone}
                                onChange={(e) => {
                                    // Allow only digits and limit length to 10
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setSignupData((p) => ({ ...p, phone: val }));
                                }}
                                inputProps={{ maxLength: 10 }}
                                InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment>, sx: fieldStyles.inputSx }}
                                InputLabelProps={{ sx: fieldStyles.labelSx }}
                            />
                        </>
                    )}

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        required
                        fullWidth
                        value={mode === "login" ? loginData.email : signupData.email}
                        onChange={handleChange}
                        disabled={otpSent && mode === "signup"}
                        InputProps={{ startAdornment: <InputAdornment position="start"><Email style={{ color: "#ab6941" }} /></InputAdornment>, sx: fieldStyles.inputSx }}
                        InputLabelProps={{ sx: fieldStyles.labelSx }}
                    />

                    {!otpSent && (
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            required
                            fullWidth
                            value={mode === "login" ? loginData.password : signupData.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Lock style={{ color: "#ab6941" }} /></InputAdornment>,
                                endAdornment: <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff sx={{ color: '#ab6941' }} /> : <Visibility sx={{ color: '#ab6941' }} />}
                                </InputAdornment>,
                                sx: fieldStyles.inputSx
                            }}
                            InputLabelProps={{ sx: fieldStyles.labelSx }}
                        />
                    )}

                    {/* OTP input for signup */}
                    {mode === "signup" && otpSent && (
                        <>
                            <TextField
                                label="Enter OTP"
                                name="otp"
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                value={otp}
                                onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
                                error={Boolean(otpError)}
                                helperText={otpError}
                                InputProps={{ sx: fieldStyles.inputSx }}
                                InputLabelProps={{ sx: fieldStyles.labelSx }}
                                inputProps={{ maxLength: 6 }}
                            />
                            <Button type="submit" disabled={otp.length !== 6 || isLoading} variant="contained" sx={{ background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700 }}>
                                {isLoading ? "Verifying OTP..." : "Verify OTP"}
                            </Button>
                            <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, cursor: 'pointer' }} onClick={() => {
                                setOtpSent(false);
                                setOtp('');
                                setFormError('');
                                setOtpError('');
                            }}>
                                Resend OTP
                            </Typography>
                        </>
                    )}

                    {/* Submit button for login or signup when OTP not sent */}
                    {!otpSent && (
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.8, background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700, fontSize: 19, borderRadius: 2, minHeight: 44, boxShadow: '0 2px 12px 0 #3f1c0a16' }}>
                            {mode === "login" ? "Log In" : "Sign Up"}
                        </Button>
                    )}
                </Box>

                {mode === "login" && (
                    <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, letterSpacing: 0.5 }}>
                        Don't have an account? Sign up now.
                    </Typography>
                )}

                {mode === "signup" && !otpSent && (
                    <Typography sx={{ textAlign: "center", color: themeColors.accent, opacity: 0.31, fontSize: 13, mt: 2, letterSpacing: 0.5 }}>
                        Already have an account? Log in!
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}
