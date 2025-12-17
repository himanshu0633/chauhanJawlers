import React, { useState } from 'react';
import {
    Box, Tabs, Tab, Typography, TextField, Button,
    InputAdornment, Paper, useMediaQuery, Fade, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
    Email, Lock, Person, Visibility, VisibilityOff, Password, Email as EmailIcon
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
    const [loginMethod, setLoginMethod] = useState("password"); // "password" or "otp"
    const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordOtp, setForgotPasswordOtp] = useState("");
    const [forgotPasswordNewPassword, setForgotPasswordNewPassword] = useState("");
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: OTP, 3: new password
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateInputs = () => {
        const email = mode === "login" ? loginData.email : signupData.email;
        const password = mode === "login" ? loginData.password : signupData.password;
        
        if (!email) return "Please enter your email address.";
        
        if (!validateEmail(email)) return "Please enter a valid email address.";
        
        if (mode === "login" && loginMethod === "password" && !password) {
            return "Please enter your password.";
        }
        
        if (password && password.length < 5) return "Password must be at least 5 characters.";
        
        if (mode === "signup" && !signupData.name) return "Name is required.";
        
        return ""; // No errors
    };

    const handleTabChange = (_ev, newValue) => {
        setMode(newValue);
        setFormError("");
        setOtpSent(false);
        setOtp('');
        setOtpError('');
        setLoginMethod("password");
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

    // Check if email exists
    const checkEmailExists = async (email) => {
        try {
            const res = await axiosInstance.get('/admin/exists', { params: { email } });
            return res.data.exists;
        } catch {
            return false;
        }
    };

    // Send OTP for signup (using separate API endpoint)
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
            // You might need to create a separate endpoint for signup OTP or use the same
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

    // Send OTP for login
    const sendOtpForLogin = async () => {
        if (!validateEmail(loginData.email)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        const alreadyExists = await checkEmailExists(loginData.email);
        if (!alreadyExists) {
            setFormError("Email is not registered. Please sign up.");
            return;
        }

        setIsLoading(true);
        setFormError("");
        try {
            const res = await axiosInstance.post('/admin/send-login-otp', { email: loginData.email });
            toast.success(res.data.message || "OTP sent to your email.");
            setLoginMethod("otp");
            setOtpSent(true);
        } catch (error) {
            setFormError(error.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP for login
    const verifyOtpForLogin = async () => {
        if (otp.length !== 6) {
            setOtpError("OTP must be 6 digits.");
            return false;
        }
        setIsLoading(true);
        setOtpError('');
        try {
            const res = await axiosInstance.post('/admin/login-with-otp', { 
                email: loginData.email, 
                otp 
            });
            
            if (res.status === 200) {
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('userData', JSON.stringify(res.data.data));
                toast.success("Login successful!");
                navigate('/');
                return true;
            }
        } catch (error) {
            setOtpError(error.response?.data?.message || 'Invalid OTP. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP for signup
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
                setSignupData({ name: '', email: '', password: '', phone: '' });
                setOtpSent(false);
                setOtp('');
                setMode('login');
            }
        } catch (error) {
            setFormError(error.response?.data?.message || 'Signup error.');
        }
    };

    // Handle login with password
    const handlePasswordLogin = async () => {
        const err = validateInputs();
        if (err) {
            setFormError(err);
            return;
        }
        
        setIsLoading(true);
        try {
            const loginResponse = await axiosInstance.post('/admin/login', { 
                email: loginData.email, 
                password: loginData.password 
            });
            
            if (loginResponse.status === 200) {
                localStorage.setItem('authToken', loginResponse.data.token);
                localStorage.setItem('userData', JSON.stringify(loginResponse.data.data));
                toast.success("Login successful!");
                navigate('/');
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            setFormError(error.response?.data?.message || 'Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle login with OTP
    const handleOtpLogin = async () => {
        if (!otpSent) {
            // Send OTP first
            await sendOtpForLogin();
        } else {
            // Verify OTP and login
            await verifyOtpForLogin();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        
        if (mode === "login") {
            if (loginMethod === "password") {
                await handlePasswordLogin();
            } else {
                await handleOtpLogin();
            }
        } else {
            // Signup flow with OTP verification
            if (!otpSent) {
                const err = validateInputs();
                if (err) {
                    setFormError(err);
                    return;
                }
                await sendOtpForSignup();
            } else {
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

    // Forgot password handlers
    const handleForgotPassword = async () => {
        if (forgotPasswordStep === 1) {
            if (!validateEmail(forgotPasswordEmail)) {
                toast.error("Please enter a valid email address.");
                return;
            }
            
            const exists = await checkEmailExists(forgotPasswordEmail);
            if (!exists) {
                toast.error("Email is not registered.");
                return;
            }
            
            try {
                const res = await axiosInstance.post('/admin/send-reset-otp', { 
                    email: forgotPasswordEmail 
                });
                toast.success(res.data.message || "OTP sent to your email.");
                setForgotPasswordStep(2);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to send OTP.');
            }
        } else if (forgotPasswordStep === 2) {
            try {
                const res = await axiosInstance.post('/admin/verify-reset-otp', {
                    email: forgotPasswordEmail,
                    otp: forgotPasswordOtp
                });
                toast.success(res.data.message || "OTP verified.");
                setForgotPasswordStep(3);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Invalid OTP.');
            }
        } else if (forgotPasswordStep === 3) {
            if (forgotPasswordNewPassword.length < 5) {
                toast.error("Password must be at least 5 characters.");
                return;
            }
            
            try {
                const res = await axiosInstance.post('/admin/reset-password', {
                    email: forgotPasswordEmail,
                    otp: forgotPasswordOtp,
                    newPassword: forgotPasswordNewPassword
                });
                toast.success(res.data.message || "Password reset successful!");
                setForgotPasswordDialog(false);
                setForgotPasswordStep(1);
                setForgotPasswordEmail("");
                setForgotPasswordOtp("");
                setForgotPasswordNewPassword("");
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to reset password.');
            }
        }
    };

    return (
        <>
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

                    {mode === "login" && loginMethod === "password" && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => setLoginMethod("otp")}
                                startIcon={<EmailIcon />}
                                sx={{ 
                                    borderColor: themeColors.accent, 
                                    color: themeColors.accent,
                                    '&:hover': {
                                        borderColor: themeColors.accent,
                                        backgroundColor: `${themeColors.accent}10`
                                    }
                                }}
                            >
                                Login with OTP
                            </Button>
                        </Box>
                    )}

                    {mode === "login" && loginMethod === "otp" && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => setLoginMethod("password")}
                                startIcon={<Password />}
                                sx={{ 
                                    borderColor: themeColors.accent, 
                                    color: themeColors.accent,
                                    '&:hover': {
                                        borderColor: themeColors.accent,
                                        backgroundColor: `${themeColors.accent}10`
                                    }
                                }}
                            >
                                Login with Password
                            </Button>
                        </Box>
                    )}

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

                        {mode === "login" && loginMethod === "password" && !otpSent && (
                            <>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={loginData.password}
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
                                
                                <Typography 
                                    sx={{ 
                                        textAlign: "right", 
                                        color: themeColors.accent, 
                                        fontSize: 13, 
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                    onClick={() => setForgotPasswordDialog(true)}
                                >
                                    Forgot Password?
                                </Typography>
                            </>
                        )}

                        {mode === "signup" && !otpSent && (
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                required
                                fullWidth
                                value={signupData.password}
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

                        {/* OTP input for login or signup */}
                        {(mode === "login" && loginMethod === "otp" && otpSent) || (mode === "signup" && otpSent) ? (
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
                                <Button 
                                    type="submit" 
                                    disabled={otp.length !== 6 || isLoading} 
                                    variant="contained" 
                                    sx={{ background: "linear-gradient(90deg, #AB6941, #3F1C0A)", color: "#fff", fontWeight: 700 }}
                                >
                                    {isLoading ? "Verifying..." : "Verify OTP"}
                                </Button>
                                <Typography 
                                    sx={{ 
                                        textAlign: "center", 
                                        color: themeColors.accent, 
                                        opacity: 0.7, 
                                        fontSize: 13, 
                                        mt: 1, 
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' }
                                    }} 
                                    onClick={() => {
                                        if (mode === "login") {
                                            sendOtpForLogin();
                                        } else {
                                            // Resend for signup
                                            sendOtpForSignup();
                                        }
                                    }}
                                >
                                    Resend OTP
                                </Typography>
                            </>
                        ) : null}

                        {/* Submit button for login or signup when OTP not sent */}
                        {!otpSent && (
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth 
                                sx={{ 
                                    mt: 1.8, 
                                    background: "linear-gradient(90deg, #AB6941, #3F1C0A)", 
                                    color: "#fff", 
                                    fontWeight: 700, 
                                    fontSize: 19, 
                                    borderRadius: 2, 
                                    minHeight: 44, 
                                    boxShadow: '0 2px 12px 0 #3f1c0a16' 
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : (
                                    mode === "login" ? (
                                        loginMethod === "password" ? "Log In" : "Send OTP"
                                    ) : "Sign Up"
                                )}
                            </Button>
                        )}
                    </Box>

                    {mode === "login" && loginMethod === "password" && (
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

            {/* Forgot Password Dialog */}
            <Dialog open={forgotPasswordDialog} onClose={() => setForgotPasswordDialog(false)}>
                <DialogTitle sx={{ color: themeColors.accent, fontWeight: 600 }}>
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    {forgotPasswordStep === 1 && (
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                    )}
                    {forgotPasswordStep === 2 && (
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Enter OTP"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={forgotPasswordOtp}
                            onChange={(e) => setForgotPasswordOtp(e.target.value)}
                            inputProps={{ maxLength: 6 }}
                            sx={{ mt: 2 }}
                        />
                    )}
                    {forgotPasswordStep === 3 && (
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={forgotPasswordNewPassword}
                            onChange={(e) => setForgotPasswordNewPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setForgotPasswordDialog(false);
                        setForgotPasswordStep(1);
                        setForgotPasswordEmail("");
                        setForgotPasswordOtp("");
                        setForgotPasswordNewPassword("");
                    }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleForgotPassword}
                        sx={{ color: themeColors.accent }}
                    >
                        {forgotPasswordStep === 1 ? "Send OTP" : 
                         forgotPasswordStep === 2 ? "Verify OTP" : 
                         "Reset Password"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}