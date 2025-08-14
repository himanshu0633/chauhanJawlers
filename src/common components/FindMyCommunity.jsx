import React from "react";
import {
    Container,
    Typography,
    Box,
    IconButton,
    TextField,
    InputAdornment,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { Search } from "@mui/icons-material";

const FindMyCommunity = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const communityBrides = [
        "Bihari Bride", "Tamil Bride", "Telugu Bride", "Kannadiga Bride",
        "Gujarati Bride", "Marathi Bride", "Bengali Bride", "Punjabi Bride",
        "UP Bride", "Marwari Bride", "Odia Bride", "Muslim Bride"
    ];

    // Responsive styles
    const sectionTitleStyle = {
        textAlign: "center",
        mb: { xs: 4, sm: 5, md: 6 },
        fontWeight: 500,
        color: "#8B1538",
        fontFamily: '"Playfair Display", serif',
        fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" }
    };

    const subtitleStyle = {
        textAlign: "center",
        mb: { xs: 4, sm: 5, md: 6 },
        fontWeight: 500,
        color: "#000",
        fontSize: { xs: "1.25rem", sm: "1.5rem" }
    };

    const tagStyle = {
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1.2 },
        border: "2px solid #8B1538",
        borderRadius: 999,
        color: "#8B1538",
        fontWeight: 600,
        fontSize: { xs: "0.9rem", sm: "1.1rem" },
        background: "linear-gradient(135deg, #fff 0%, #fafafa 100%)",
        boxShadow: "0 4px 12px rgba(139,21,56,0.08)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "100%"
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
            <Typography variant="h2" component="h2" sx={sectionTitleStyle}>
                For a sparkling new beginning
            </Typography>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 3, sm: 4, md: 4 },
                px: { xs: 1, sm: 2 }
            }}>
                <TextField
                    placeholder="Find my community"
                    variant="outlined"
                    sx={{
                        width: { xs: "100%", sm: "400px" },
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            borderRadius: "25px",
                            height: { xs: "44px", sm: "50px" },
                            fontSize: { xs: "14px", sm: "16px" },
                            fontFamily: '"Playfair Display", serif',
                            color: "#666",
                            border: "2px solid #8B1538",
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                            padding: { xs: "10px 14px", sm: "12px 16px" },
                            fontSize: { xs: "14px", sm: "16px" },
                            fontFamily: '"Playfair Display", serif',
                            color: "#666",
                            "&::placeholder": { color: "#999", opacity: 1, fontStyle: "italic" },
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton sx={{
                                    backgroundColor: "#8B1538",
                                    color: "#fff",
                                    width: { xs: "36px", sm: "40px" },
                                    height: { xs: "36px", sm: "40px" },
                                    mr: 0.5,
                                    "& svg": {
                                        fontSize: { xs: "1rem", sm: "1.25rem" }
                                    }
                                }}>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Typography variant="h3" component="h3" sx={subtitleStyle}>
                Find my community
            </Typography>

            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: { xs: 2, sm: 3 },
                mb: { xs: 4, sm: 6 },
                px: { xs: 1, sm: 0 }
            }}>
                {communityBrides.map((bride, index) => (
                    <Box
                        key={index}
                        sx={tagStyle}
                    >
                        {bride}
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default FindMyCommunity;