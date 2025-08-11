import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    Image,
    Settings,
    X,
} from 'lucide-react';
import {
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    IconButton,
} from '@mui/material';

const SidebarJewel = ({ onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:760px)');

    const navItems = [
        { to: '/AdminPanel', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/AdminPanel/Category', label: 'Category', icon: Users },
        { to: '/AdminPanel/subCategory', label: 'Sub Category', icon: Users },
        { to: '/AdminPanel/products', label: 'Products', icon: Package },
        { to: '/AdminPanel/orders', label: 'Orders', icon: Package },
        { to: '/AdminPanel/banner', label: 'Banner', icon: Image },
        { to: '/AdminPanel/user', label: 'User', icon: Users },
        // { to: '/AdminPanel/wholesale', label: 'Wholesale User', icon: Users },
        // { to: '/AdminPanel/prescriptions', label: 'Prescriptions', icon: Users },
        // { to: '/AdminPanel/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <Box
            component="nav"
            sx={{
                width: 260,
                height: '100vh',
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
                overflowY: 'auto',
            }}
        >
            {/* Admin Panel Title */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.25 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    <Box component="span" sx={{ color: theme.palette.primary.contrastText }}>
                        Admin
                    </Box>{' '}
                    Panel
                </Typography>

                {/* Show the close button only on mobile screens */}
                {isMobile && (
                    <IconButton
                        onClick={onClose}
                        aria-label="close sidebar"
                        size="small"
                        sx={{
                            color: theme.palette.primary.contrastText,
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                )}
            </Box>

            {/* Navigation Menu */}
            <List sx={{ flexGrow: 1, p: 0 }}>
                {navItems.map(({ to, label, icon: IconComponent }) => (
                    <ListItemButton
                        key={to}
                        component={NavLink}
                        to={to}
                        onClick={onClose}
                        sx={{
                            color: theme.palette.primary.contrastText,
                            '&.active': {
                                bgcolor: theme.palette.primary.dark || theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                '& svg': {
                                    color: theme.palette.primary.contrastText,
                                },
                            },
                            '&:hover': {
                                bgcolor: theme.palette.action.hover,
                                color: theme.palette.text.primary,
                                '& svg': {
                                    color: theme.palette.text.primary,
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                            <IconComponent size={20} />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default SidebarJewel;
