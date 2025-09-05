import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    useMediaQuery
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';

const menu = [
    { icon: <HistoryOutlinedIcon sx={{ color: '#6a2322' }} />, label: "Order History", navigateTo: "/userOrder" },
    // { icon: <CardGiftcardOutlinedIcon sx={{ color: '#6a2322' }} />, label: "Gift Card Balance" },
    // { icon: <LocalShippingOutlinedIcon sx={{ color: '#6a2322' }} />, label: "Track Order" },
    { icon: <ChatBubbleOutlineOutlinedIcon sx={{ color: '#6a2322' }} />, label: "Contact Us", navigateTo: "/getintouch" }
];

export default function AccountPopup({ onClose }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const storedUser = localStorage.getItem('userData');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (onClose) {
            onClose();
        }
        setTimeout(() => {
            localStorage.removeItem('userData');
            localStorage.removeItem('authToken');
            navigate('/login');
        }, 100);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Close popup first
        if (onClose) {
            onClose();
        }
        // Small delay to ensure popup closes, then navigate
        setTimeout(() => {
            navigate('/login');
        }, 100);
    };

    // Responsive typography and spacing
    const fontSize = isMobile ? 14 : 16;
    const itemPaddingY = isMobile ? 0.4 : .6;
    const itemPaddingX = isMobile ? 1 : 1.6;
    const iconSize = isMobile ? 22 : 28;
    const iconMinWidth = isMobile ? 32 : 40;
    const headerFont = isMobile ? 16.2 : 19;
    const headerPaddingY = isMobile ? 0.9 : 1.4;
    const paperWidth = isMobile ? 220 : 290;
    const paperTop = isMobile ? 54 : 56;
    const paperRight = isMobile ? 5 : 18;

    return (
        <Paper
            elevation={4}
            ref={popupRef}
            sx={{
                borderRadius: '15px',
                width: paperWidth,
                px: 0,
                py: 2,
                background: '#fff',
                position: 'fixed',
                top: paperTop,
                right: paperRight,
                zIndex: 13000,
            }}
        >
            {!userData ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontSize: 16, fontWeight: 500, color: '#6a2322', cursor: 'pointer' }}
                        onClick={handleLogin}
                    >
                        Please login to view your account
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Profile header */}
                    <Box
                        sx={{
                            background: 'linear-gradient(90deg, #bd527c 10%, #d46a60 85%)',
                            borderRadius: isMobile ? '12px' : '15px',
                            mt: isMobile ? 1 : 1.2,
                            mx: isMobile ? 0.7 : 1,
                            color: 'white',
                            py: headerPaddingY,
                            px: isMobile ? 1.2 : 2,
                            gap: 0.5,
                            boxShadow: '0 2px 10px rgba(220,120,135,0.10)',
                            position: 'relative'
                        }}
                    >
                        {/* Sparkle in top right */}
                        <Box sx={{
                            position: 'absolute',
                            top: isMobile ? 4 : 8,
                            right: isMobile ? 5 : 12
                        }}>
                            <svg width={isMobile ? 15 : 23} height={isMobile ? 11 : 15} viewBox="0 0 27 17">
                                <text x={isMobile ? 1 : 3} y={isMobile ? 10 : 14} fontSize={isMobile ? "10" : "16"} fill="#fff" fontFamily="serif" style={{ opacity: 0.9 }}>✨</text>
                            </svg>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonOutlineIcon sx={{ fontSize: iconSize, mr: 1 }} />
                            <Typography sx={{ fontWeight: 500, fontSize: headerFont, letterSpacing: 0.1, textTransform: 'capitalize', cursor: 'pointer' }}>
                                {userData.name}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Menu List */}
                    <List sx={{ mt: isMobile ? 0.3 : 0.7, px: 0.7 }}>
                        {menu.map(item => (
                            <ListItem
                                key={item.label}
                                button
                                sx={{
                                    borderRadius: 2,
                                    mb: isMobile ? 0.2 : 0.5,
                                    py: itemPaddingY,
                                    px: itemPaddingX,
                                    minHeight: '28px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    if (item.navigateTo) {
                                        navigate(item.navigateTo);
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: iconMinWidth }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize,
                                        fontWeight: 500,
                                        color: '#211415',
                                        fontFamily: 'serif'
                                    }}
                                />
                            </ListItem>
                        ))}

                        <Divider sx={{ my: isMobile ? 1 : 1.3 }} />

                        <ListItem
                            button
                            sx={{
                                borderRadius: 2,
                                py: itemPaddingY,
                                px: itemPaddingX,
                                minHeight: '28px',
                                cursor: 'pointer !important'
                            }}
                            onClick={handleLogout}
                        >
                            <ListItemIcon sx={{ minWidth: iconMinWidth }}>
                                <LogoutOutlinedIcon sx={{ color: '#6a2322' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Log Out"
                                primaryTypographyProps={{
                                    fontSize,
                                    fontWeight: 500,
                                    color: '#661e1b',
                                    fontFamily: 'serif',

                                }}
                            />
                        </ListItem>
                    </List>
                </>
            )}

        </Paper>
    );
}
