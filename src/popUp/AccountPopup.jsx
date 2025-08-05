import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'; // For infinity symbol

export default function AccountPopup({ name = 'Ankita', onClose }) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: '18px',
        width: 290,
        px: 0,
        py: 1,
        background: '#fff',
        position: 'fixed',
        top: 56,
        right: 18,
        zIndex: 1300,
        minHeight: 400
      }}
    >
      {/* Profile header */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #bd527c 10%, #d46a60 85%)',
          borderRadius: '16px',
          mt: 1.5,
          mx: 1,
          color: 'white',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          boxShadow: '0 2px 10px rgba(220,120,135,0.10)',
          position: 'relative'
        }}
      >
        {/* Sparkle in top right */}
        <Box sx={{
          position: 'absolute',
          top: 10,
          right: 12
        }}>
          <svg width="27" height="17" viewBox="0 0 27 17"><text x="3" y="14" fontSize="16" fill="#fff" fontFamily="serif" style={{ opacity: 0.9 }}>✨</text></svg>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonOutlineIcon sx={{ fontSize: 28, mr: 1 }} />
          <Typography sx={{ fontWeight: 500, fontSize: 19, letterSpacing: 0.1 }}>
            {name}
          </Typography>
        </Box>
 
      </Box>

      {/* Menu List */}
      <List sx={{ mt: 2, px: 1.5 }}>
        <ListItem button sx={{ borderRadius: 2, mb: 0.8 }}>
          <ListItemIcon>
            <HistoryOutlinedIcon sx={{ color: '#6a2322' }} />
          </ListItemIcon>
          <ListItemText primary="Order History"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500, color: '#211415', fontFamily:'serif' }}
          />
        </ListItem>
        <ListItem button sx={{ borderRadius: 2, mb: 0.8 }}>
          <ListItemIcon>
            <CardGiftcardOutlinedIcon sx={{ color: '#6a2322' }} />
          </ListItemIcon>
          <ListItemText primary="Gift Card Balance"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500, color: '#211415', fontFamily:'serif' }}
          />
        </ListItem>
        <ListItem button sx={{ borderRadius: 2, mb: 0.8 }}>
          <ListItemIcon>
            <LocalShippingOutlinedIcon sx={{ color: '#6a2322' }} />
          </ListItemIcon>
          <ListItemText primary="Track Order"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500, color: '#211415', fontFamily:'serif' }}
          />
        </ListItem>
        <ListItem button sx={{ borderRadius: 2, mb: 0.8 }}>
          <ListItemIcon>
            <ChatBubbleOutlineOutlinedIcon sx={{ color: '#6a2322' }} />
          </ListItemIcon>
          <ListItemText primary="Contact Us"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500, color: '#211415', fontFamily:'serif' }}
          />
        </ListItem>
        <Divider sx={{ my: 1.7 }} />
        <ListItem button sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <LogoutOutlinedIcon sx={{ color: '#6a2322' }} />
          </ListItemIcon>
          <ListItemText primary="Log Out"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500, color: '#661e1b', fontFamily:'serif' }}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
