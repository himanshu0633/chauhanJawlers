import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PerfectSparkleSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        mobile: false,
        email: false
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setStep(1);
        setFormData({ name: '', mobile: '', email: '' });
        setErrors({ name: false, mobile: false, email: false });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Basic validation
        if (name === 'mobile') {
            setErrors(prev => ({ ...prev, mobile: !/^\d{10}$/.test(value) }));
        } else if (name === 'email' && value) {
            setErrors(prev => ({ ...prev, email: !/^\S+@\S+\.\S+$/.test(value) }));
        } else if (name === 'name') {
            setErrors(prev => ({ ...prev, name: value.trim() === '' }));
        }
    };

    const handleSubmitStep1 = () => {
        if (formData.name.trim() === '' || formData.mobile.trim() === '' || !/^\d{10}$/.test(formData.mobile)) {
            setErrors({
                name: formData.name.trim() === '',
                mobile: formData.mobile.trim() === '' || !/^\d{10}$/.test(formData.mobile),
                email: false
            });
            return;
        }
        setStep(2);
    };

    const handleSubmitStep2 = () => {
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: true }));
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setStep(3);
    };

    const isStep1Valid = formData.name.trim() !== '' && formData.mobile.trim() !== '' && /^\d{10}$/.test(formData.mobile);
    const isStep2Valid = formData.email === '' || /^\S+@\S+\.\S+$/.test(formData.email);

    return (
        <Box
            sx={{
                mt: { xs: 4, md: 5 },
                mx: { xs: 2, md: 'auto' },
                width: { md: '100%' },
                position: 'relative',
                borderRadius: '1px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff'
            }}
            id="evgDaimondContainer"
        >
            {/* Main Image Banner */}
            <Box sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src="https://staticimg.tanishq.co.in/microsite/diamond/images/spotlight/spotlight-d.jpg"
                    alt="Diamond collection"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        width: '100%',
                        height: 'auto',
                        maxHeight: { md: '500px' },
                        objectFit: 'cover'
                    }}
                />
                <Box
                    component="img"
                    src="https://staticimg.tanishq.co.in/microsite/diamond/images/spotlight/spotlight-m.jpg"
                    alt="Diamond collection"
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        width: '100%',
                        height: 'auto',
                        maxHeight: { xs: '300px' },
                        objectFit: 'cover'
                    }}
                />

                {/* Text Overlay */}
                <Box sx={{
                    position: 'absolute',
                    left: '5%',
                    top: { xs: '15%', md: '25%' },
                    color: 'white'
                }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 500,
                            fontFamily: '"Abhaya Libre", serif',
                            fontSize: { xs: '22px', sm: '24px', md: '35px', xl: '44px' },
                            lineHeight: { md: '1' },
                            textAlign: 'left'
                        }}
                    >
                        LOOKING FOR THE
                        <br />
                        PERFECT SPARKLE?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            fontSize: { md: '12px', xl: '16px' },
                            width: '55%',
                            fontWeight: 400,
                            mt: 2,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontFamily: '"Inter", sans-serif'
                        }}
                    >
                        OUR DIAMOND EXPERTS ARE HERE TO GUIDE YOU THROUGH EXQUISITE COLLECTIONS
                    </Typography>
                </Box>

                {/* Button Overlay */}
                <Box sx={{
                    position: 'absolute',
                    left: '5%',
                    bottom: { xs: '15%', md: '20%' }
                }}>
                    <Button
                        variant="outlined"
                        onClick={handleOpen}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            fontWeight: 400,
                            fontFamily: '"Inter", sans-serif',
                            px: { xs: 2, sm: 3, md: 5 },
                            py: { xs: 0.8, md: 1.5 },
                            gap: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                borderColor: 'white'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        GET IN TOUCH
                    </Button>
                </Box>
            </Box>

            {/* Contact Form Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        borderRadius: isMobile ? 0 : '8px',
                        backgroundColor: '#f8f8f8',
                        m: isMobile ? 0 : 2,
                        width: isMobile ? '100%' : 'auto',
                        maxWidth: isMobile ? '100%' : '500px',
                        maxHeight: isMobile ? '100%' : '90vh'
                    }
                }}
            >
                {step !== 3 && (
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 1,
                        position: isMobile ? 'sticky' : 'static',
                        top: 0,
                        backgroundColor: '#f8f8f8',
                        zIndex: 1
                    }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                )}

                <DialogContent sx={{ 
                    p: isMobile ? 3 : 4,
                    overflowY: 'auto'
                }}>
                    {step === 1 && (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ 
                                fontWeight: 500, 
                                mb: 2,
                                fontSize: isMobile ? '1.25rem' : '1.5rem'
                            }}>
                                You are one step away from getting your favorite Diamond jewellery
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                mb: 3,
                                fontSize: isMobile ? '0.875rem' : '1rem'
                            }}>
                                10,000+ customers found their perfect match with our experts. Get in touch now!
                            </Typography>

                            <TextField
                                fullWidth
                                label="Enter Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                helperText={errors.name && "Please enter a valid Name"}
                                sx={{ mb: 2 }}
                                size={isMobile ? 'small' : 'medium'}
                            />

                            <TextField
                                fullWidth
                                label="Enter Your Phone Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                error={errors.mobile}
                                helperText={errors.mobile && "Please enter a valid 10-digit Mobile Number"}
                                inputProps={{ maxLength: 10 }}
                                size={isMobile ? 'small' : 'medium'}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ 
                                fontWeight: 500, 
                                mb: 2,
                                fontSize: isMobile ? '1.25rem' : '1.5rem'
                            }}>
                                Yay! Thank you for your interest
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                mb: 3,
                                fontSize: isMobile ? '0.875rem' : '1rem'
                            }}>
                                Please provide your email below to receive our latest updates directly in your inbox.
                            </Typography>

                            <TextField
                                fullWidth
                                label="Email (Optional)"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                helperText={errors.email && "Please enter valid email address"}
                                size={isMobile ? 'small' : 'medium'}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <Box sx={{ 
                            textAlign: 'center', 
                            py: isMobile ? 2 : 4,
                            px: isMobile ? 1 : 0
                        }}>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 500, 
                                mb: 2,
                                fontSize: isMobile ? '1.5rem' : '2rem'
                            }}>
                                Thank you!
                            </Typography>
                            <Typography variant="h6" sx={{
                                fontSize: isMobile ? '1.1rem' : '1.25rem'
                            }}>
                                Our experts will get in touch with you.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{
                    justifyContent: 'center',
                    pb: isMobile ? 3 : 4,
                    px: isMobile ? 3 : 4,
                    pt: isMobile ? 0 : 'auto',
                    display: step === 3 ? 'none' : 'flex',
                    position: isMobile ? 'sticky' : 'static',
                    bottom: 0,
                    backgroundColor: '#f8f8f8'
                }}>
                    <Button
                        variant="contained"
                        onClick={step === 1 ? handleSubmitStep1 : handleSubmitStep2}
                        disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                        sx={{
                            px: 4,
                            py: isMobile ? 1 : 1.5,
                            borderRadius: '50px',
                            textTransform: 'none',
                            fontSize: isMobile ? '14px' : '16px',
                            fontWeight: 500,
                            width: isMobile ? '100%' : 'auto',
                            '&:disabled': {
                                backgroundColor: 'grey.300'
                            }
                        }}
                        endIcon={
                            !isMobile && (
                                <Box sx={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <CloseIcon sx={{ transform: 'rotate(90deg)', fontSize: '16px' }} />
                                </Box>
                            )
                        }
                    >
                        {step === 1 ? 'Get in Touch' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PerfectSparkleSection;