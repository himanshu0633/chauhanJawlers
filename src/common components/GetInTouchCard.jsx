import React from "react";
import {
    Box,
    TextField,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond"; 

export default function GetInTouchCard() {

    return (
        <Box
            py={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: { sm: "400px" },
                    width: "95%",
                    borderRadius: "18px",
                    p: { xs: 2.5, sm: 4 },
                    boxShadow: "0 2px 20px #e5e5e5",
                    textAlign: "center",
                    background: "#fff"
                }}
            >
                {/* Icon */}
                <Box display="flex" justifyContent="center" mb={2.5}>
                    <DiamondIcon
                        sx={{
                            fontSize: 44,
                            color: "#f3cdbb",
                            transform: "rotate(-17deg)",
                            textShadow: "0 1px 6px #f0e6db"
                        }}
                    />
                </Box>

                {/* Title */}
                <Typography
                    component="h2"
                    variant="h5"
                    sx={{
                        fontFamily: "serif",
                        fontWeight: 600,
                        mb: 0.2,
                        color: "#722a14",
                        fontSize: "1.6rem",
                        letterSpacing: "0.005em"
                    }}
                >
                    Searching for All<br />Jewellery?
                </Typography>

                {/* Subtitle */}
                <Typography
                    sx={{
                        fontSize: "1.03rem",
                        color: "#4f342a",
                        mt: 1,
                        mb: 2.5,
                        fontWeight: 400,
                        lineHeight: 1.38,
                        letterSpacing: "0em"
                    }}
                >
                    Our Specialists are here to help you&nbsp;
                    <Box component="span" fontWeight={500}>
                        select the perfect piece!
                    </Box>
                </Typography>

                {/* Form fields */}
                <Box component="form" noValidate autoComplete="off" mb={2.2}>
                    <TextField
                        variant="outlined"
                        placeholder="Enter your name"
                        fullWidth
                        InputProps={{
                            sx: {
                                borderRadius: "10px",
                                fontSize: "1rem"
                            }
                        }}
                        sx={{
                            mb: 1.5,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Your Email Address"
                        fullWidth
                        InputProps={{
                            sx: {
                                borderRadius: "10px",
                                fontSize: "1rem"
                            },
                            inputMode: "tel",
                        }}
                        sx={{}}
                    />
                </Box>

                {/* CTA Button */}
                <Button
                    variant="contained"
                    // disableElevation
                    sx={{
                        width: "100%",
                        background: "#44170D",
                        color: "#fff",
                        fontWeight: 600,
                        borderRadius: "22px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        py: 1.1,
                        // boxShadow: "0 2px 18px 0 #efe3d8",
                        transition: "background 0.2s, box-shadow 0.2s",
                        "&:hover": {
                            background: "#44170db9",
                            // boxShadow: "0 4px 28px #e4cac2"
                        }
                    }}
                >
                    Get in touch
                </Button>
            </Paper>
        </Box>
    );
}
