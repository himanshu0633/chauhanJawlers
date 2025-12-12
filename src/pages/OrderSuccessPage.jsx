import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Grow, Zoom, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { clearProducts } from "../store/Action";
import { connect } from "react-redux";

const OrderSuccessPage = ({ clearProducts }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // 2 सेकंड के लिए loader दिखाएं
        const timer = setTimeout(() => {
            setLoading(false);
            // Loading के बाद success message दिखाएं
            setTimeout(() => setShowSuccess(true), 100);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowSuccess(false);
        setTimeout(() => {
            navigate("/userOrder");
            clearProducts();
        }, 500);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0, 0, 0, 0.95)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            {/* Loading State */}
            {loading && (
                <Box sx={{ textAlign: "center", color: "white" }}>
                    <CircularProgress 
                        size={80} 
                        thickness={4}
                        sx={{ 
                            color: "success.main",
                            mb: 3 
                        }} 
                    />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Processing Your Order...
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        Please wait while we confirm your payment
                    </Typography>
                </Box>
            )}

            {/* Success State */}
            <Fade in={showSuccess} timeout={800}>
                <Box sx={{ textAlign: "center", color: "white" }}>
                    <Zoom in={showSuccess} timeout={500}>
                        <CheckCircleOutlineIcon
                            sx={{
                                fontSize: 120,
                                color: "success.main",
                                mb: 4,
                            }}
                        />
                    </Zoom>
                    <Grow in={showSuccess} timeout={700}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Order Placed Successfully!
                        </Typography>
                    </Grow>
                    <Grow in={showSuccess} timeout={900}>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Thank you for your purchase. Your order has been confirmed.
                        </Typography>
                    </Grow>
                    <Grow in={showSuccess} timeout={1100}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleClose}
                            sx={{
                                mt: 2,
                                fontSize: "1.2rem",
                                padding: "12px 32px",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    transition: "transform 0.2s",
                                },
                                borderRadius: 2,
                            }}
                        >
                            Check Orders
                        </Button>
                    </Grow>
                </Box>
            </Fade>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
    clearProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessPage);