import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axiosInstance from "../common components/AxiosInstance";
import { toast, ToastContainer } from "react-toastify";

const Contactus = () => {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const handleSubmit = async (formData) => {
        try {
            const { data } = await axiosInstance.post('/send-contact-form', formData);
            toast.success(data.message || 'Form submitted successfully!');
            return true;
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || 'Error submitting form';
            toast.error(msg);
            return true;
        }
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = {
            name: form.name.value,
            email: form.email.value,
            mobile: form.mobile.value,
            location: form.location.value,
            message: form.message.value,
        };

        // handleSubmit(formData);
        const ok = await handleSubmit(formData);
        if (ok) {
            form.reset();              
        }
    };


    return (
        <Box
            component="section"
            sx={{
                backgroundColor: "#fff", // Main background
                color: theme.palette.primary.main,
                // minHeight: "100vh",
                py: 5,
                px: { xs: 2, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <ToastContainer position="top-right" autoClose={2000} />
            {/* Heading */}
            <Box textAlign="center" mb={6} maxWidth={600} mx="auto">
                <Typography
                    variant="h3"
                    fontWeight="700"
                    fontFamily="serif"
                    gutterBottom
                    color={theme.palette.primary.main}
                >
                    Contact Us
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ lineHeight: 1.5, color: theme.palette.primary.main }}
                >
                    Write to us or call us, get a quick response powered by our advanced customer support team.
                </Typography>
            </Box>

            {/* Flex wrapper for contact info and form */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMdUp ? "row" : "column",
                    gap: 6,
                    width: "100%",
                    maxWidth: theme.breakpoints.values.lg,
                }}
            >
                {/* Contact Info Card */}
                <Paper
                    elevation={6}
                    sx={{
                        flex: 1,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 3,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="700"
                        color="#FFD700"
                        fontFamily="serif"
                        gutterBottom
                    >
                        Contact Information
                    </Typography>
                    <Typography color="#fff" mb={2}>
                        Write to us or call us, get quick response powered by our advanced customer support team.
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" justifyContent={"space-between"} mb={1}>
                        <Box component="span" sx={{ fontSize: 20, color: "#FFD700" }}>
                            📍
                        </Box>
                        <Typography variant="body2" width={"90%"} color="#fff">
                            Chauhan sons jewellers ,
                            S.C.F 74 PHASE 5  SECTOR 59 , Sahibzada Ajit Singh Nagar, PUNJAB 160059,INDIA
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Box component="span" sx={{ fontSize: 20, color: "#FFD700" }}>
                            📞
                        </Box>
                        <Link
                            href="tel:+919876535881"
                            color="#FFD700"
                            underline="hover"
                            sx={{ fontWeight: 600, fontSize: 16 }}
                        >
                            +91 9876535881
                        </Link>
                    </Box>
                    <Typography
                        variant="h6"
                        fontWeight="700"
                        color="#FFD700"
                        fontFamily="serif"
                        my={1}
                    >
                        Get in Touch
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Box component="span" sx={{ fontSize: 22, color: "#FFD700" }}>
                            ✉️
                        </Box>
                        <Link
                            href="mailto:chauhansons69@yahoo.com"
                            color="#FFD700"
                            underline="hover"
                            sx={{ fontWeight: 600, fontSize: 16 }}
                        >
                            chauhansons69@yahoo.com
                        </Link>
                    </Box>
                    <Box display="flex" gap={2}>
                        <IconButton
                            aria-label="Facebook"
                            component="a"
                            //   href="https://www.facebook.com/people/Dr-BSKs/61576600531948/"
                            target="_blank"
                            sx={{ color: "#FFD700" }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Instagram"
                            component="a"
                            //   href="https://www.instagram.com/drbsk_humanhealth"
                            target="_blank"
                            sx={{ color: "#FFD700" }}
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            aria-label="YouTube"
                            component="a"
                            //   href="https://www.youtube.com/@Dr.BSKsURUMEED-w4o"
                            target="_blank"
                            sx={{ color: "#FFD700" }}
                        >
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton
                            aria-label="LinkedIn"
                            component="a"
                            //   href="https://www.linkedin.com/company/dr-bsk-s/"
                            target="_blank"
                            sx={{ color: "#FFD700" }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Paper>

                {/* Contact Form Card */}
                <Paper
                    elevation={6}
                    sx={{
                        flex: 1,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 3,
                        p: 4,
                        color: "#fff",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="700"
                        mb={4}
                        fontFamily="serif"
                        color="#FFD700"
                    >
                        We want to hear from you!
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"

                        onSubmit={onFormSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: isMdUp ? "row" : "column",
                                gap: 2,
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                variant="filled"
                                InputLabelProps={{ style: { color: "#FFD700" } }}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.17)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.22)" },
                                    },
                                    flex: 1,
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email ID"
                                variant="filled"
                                type="email"
                                InputLabelProps={{ style: { color: "#FFD700" } }}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.17)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.22)" },
                                    },
                                    flex: 1,
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: isMdUp ? "row" : "column",
                                gap: 2,
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                id="mobile"
                                name="mobile"
                                label="Phone No"
                                variant="filled"
                                type="tel"
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{ style: { color: "#FFD700" } }}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.17)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.22)" },
                                    },
                                    flex: 1,
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                id="location"
                                name="location"
                                label="Location"
                                variant="filled"
                                InputLabelProps={{ style: { color: "#FFD700" } }}
                                InputProps={{ style: { color: "#fff" } }}
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.17)" },
                                        "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.22)" },
                                    },
                                    flex: 1,
                                }}
                            />
                        </Box>
                        <TextField
                            required
                            fullWidth
                            id="message"
                            name="message"
                            label="Comments Here"
                            multiline
                            rows={4}
                            variant="filled"
                            InputLabelProps={{ style: { color: "#FFD700" } }}
                            InputProps={{ style: { color: "#fff" } }}
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.07)",
                                    color: "#fff",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,0.17)" },
                                    "&.Mui-focused": { backgroundColor: "rgba(255,255,255,0.22)" },
                                },
                            }}
                        />

                        <Box textAlign="center">
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: "#FFD700",
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 3,
                                    "&:hover": {
                                        backgroundColor: "#FFC107",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Contactus;
