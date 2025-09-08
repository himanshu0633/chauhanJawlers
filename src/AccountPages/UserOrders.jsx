// 1: implementation with real API call
import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, CircularProgress, Card, CardContent,
    CardActions, Button, Chip, Collapse, Divider, Grid, Avatar, List, ListItem, ListItemText
} from '@mui/material';
import {
    CheckCircle, Pending, Cancel, LocalShipping, ExpandMore, ExpandLess
} from '@mui/icons-material';
import axiosInstance from '../common components/AxiosInstance';
import { publicUrl } from '../common components/PublicUrl';

// Helper: Status Chip
const getStatusChip = (status) => {
    let icon, color, label;
    switch (status) {
        case 'Delivered':
            icon = <CheckCircle />; color = 'success'; label = 'Delivered'; break;
        case 'Pending':
            icon = <Pending />; color = 'warning'; label = 'Pending'; break;
        case 'Cancelled':
            icon = <Cancel />; color = 'error'; label = 'Cancelled'; break;
        default:
            icon = <LocalShipping />; color = 'info'; label = status;
    }
    return (
        <Chip
            icon={icon}
            label={label}
            color={color}
            sx={{ fontWeight: 600 }}
            size="small"
        />
    );
};

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : null;

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             // const response = await axiosInstance.get('/api/orders/');
    //             const response = await axiosInstance.get(`/api/orders/${userId}`);
    //             setOrders(response.data.orders);
    //         } catch (error) {
    //             setOrders([]);
    //         }
    //         setLoading(false);
    //     };
    //     fetchOrders();
    //     // }, []);
    // }, [userId]);

    
    // option2: Polling every 10 seconds to fetch latest orders and status
    useEffect(() => {
        let intervalId;

        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/api/orders/${userId}`);
                setOrders(response.data.orders);
            } catch (error) {
                setOrders([]);
            }
            setLoading(false);
        };

        fetchOrders();

        intervalId = setInterval(fetchOrders, 10000); // 10 seconds

        return () => clearInterval(intervalId); // cleanup
    }, [userId]);


    const handleExpand = (orderId) => {
        setExpanded(expanded === orderId ? null : orderId);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                My Orders
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : orders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} key={order._id}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6">
                                            Order #{order._id.slice(-6)}
                                        </Typography>
                                        {getStatusChip(order.status)}
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Payment ID: <strong>{order.paymentId || 'N/A'}</strong>
                                    </Typography>
                                    <Button
                                        endIcon={expanded === order._id ? <ExpandLess /> : <ExpandMore />}
                                        onClick={() => handleExpand(order._id)}
                                        sx={{ mt: 1 }}
                                    >
                                        {expanded === order._id ? 'Hide Details' : 'Show Details'}
                                    </Button>
                                    <Collapse in={expanded === order._id}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                                            Items:
                                        </Typography>
                                        <List dense disablePadding>
                                            {order.items.map((item, idx) => (
                                                <ListItem key={item.productId + idx} disableGutters>
                                                    <Avatar
                                                        variant="rounded"
                                                        src={publicUrl(item.image)}
                                                        sx={{ width: 48, height: 48, mr: 2 }}
                                                    >
                                                        {item.name}
                                                    </Avatar>
                                                    <ListItemText
                                                        primary={`${item.name} (x${item.quantity})`}
                                                        secondary={`₹${item.price.toLocaleString()} each`}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2">
                                            <strong>Total:</strong> ₹{order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
                                        </Typography>
                                    </Collapse>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default UserOrders;



// // 2: dummy data and simplified version of UserOrders component
// import React, { useEffect, useState } from 'react';
// import {
//     Box, Container, Typography, CircularProgress, Card, CardContent,
//     CardActions, Button, Chip, Collapse, Divider, Grid, Avatar, List, ListItem, ListItemText
// } from '@mui/material';
// import {
//     CheckCircle, Pending, Cancel, LocalShipping, ExpandMore, ExpandLess
// } from '@mui/icons-material';
// import axiosInstance from '../common components/AxiosInstance';

// // Helper: Status Chip
// const getStatusChip = (status) => {
//     let icon, color, label;
//     switch (status) {
//         case 'Delivered':
//             icon = <CheckCircle />; color = 'success'; label = 'Delivered'; break;
//         case 'Pending':
//             icon = <Pending />; color = 'warning'; label = 'Pending'; break;
//         case 'Cancelled':
//             icon = <Cancel />; color = 'error'; label = 'Cancelled'; break;
//         default:
//             icon = <LocalShipping />; color = 'info'; label = status;
//     }
//     return (
//         <Chip
//             icon={icon}
//             label={label}
//             color={color}
//             sx={{ fontWeight: 600 }}
//             size="small"
//         />
//     );
// };

// const dummyOrders = [
//     {
//         _id: "64efb37281b0a6c6101d1111",
//         userId: "64efaad781c0b6c6101dff21",
//         items: [
//             {
//                 productId: "diamond001",
//                 name: "18k Diamond Ring",
//                 quantity: 1,
//                 price: 19999,
//                 image: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
//             },
//             {
//                 productId: "chain003",
//                 name: "Unisex Gold Chain",
//                 quantity: 2,
//                 price: 8900,
//                 image: "https://images.unsplash.com/photo-1526178617222-4b2b6f6e91d2"
//             }
//         ],
//         address: "123 Park Avenue, New Delhi",
//         phone: "9876543210",
//         totalAmount: 37899,
//         status: "Delivered",
//         paymentId: "pay_01HG0VH7F3N8QYZW",
//         createdAt: "2025-08-30T12:34:56.789Z"
//     },
//     {
//         _id: "64efb37281b0a6c6101d2222",
//         userId: "64efaad781c0b6c6101dff21",
//         items: [
//             {
//                 productId: "earrings011",
//                 name: "Diamond Stud Earrings",
//                 quantity: 1,
//                 price: 6500,
//                 image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
//             }
//         ],
//         address: "123 Park Avenue, New Delhi",
//         phone: "9876543210",
//         totalAmount: 6500,
//         status: "Pending",
//         paymentId: "pay_01HG0VB7F4N8XYYY",
//         createdAt: "2025-09-03T09:23:41.658Z"
//     },
//     {
//         _id: "64efb37281b0a6c6101d3333",
//         userId: "64efaad781c0b6c6101dff21",
//         items: [
//             {
//                 productId: "chain005",
//                 name: "Platinum Chain",
//                 quantity: 1,
//                 price: 15000,
//                 image: "https://images.unsplash.com/photo-1464983953574-0892a716854b"
//             }
//         ],
//         address: "123 Park Avenue, New Delhi",
//         phone: "9876543210",
//         totalAmount: 15000,
//         status: "Cancelled",
//         paymentId: "pay_01HG0VB7FXXXFZZZ",
//         createdAt: "2025-07-25T17:13:00.321Z"
//     }
// ];


// const UserOrders = () => {
//     const [orders, setOrders] = useState(dummyOrders);
//     const [loading, setLoading] = useState(false);
//     const [expanded, setExpanded] = useState(null);
//     const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : null;

//     useEffect(() => {
//         setOrders(dummyOrders);
//         setLoading(false);
//     }, []);


//     const handleExpand = (orderId) => {
//         setExpanded(expanded === orderId ? null : orderId);
//     };

//     return (
//         <Container maxWidth="md" sx={{ py: 4 }}>
//             <Typography variant="h4" fontWeight={700} gutterBottom>
//                 My Orders
//             </Typography>
//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : orders.length === 0 ? (
//                 <Typography>No orders found.</Typography>
//             ) : (
//                 <Grid container spacing={3}>
//                     {orders.map((order) => (
//                         <Grid item xs={12} key={order._id}>
//                             <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
//                                 <CardContent>
//                                     <Box display="flex" alignItems="center" justifyContent="space-between">
//                                         <Typography variant="h6">
//                                             Order #{order._id.slice(-6)}
//                                         </Typography>
//                                         {getStatusChip(order.status)}
//                                     </Box>
//                                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                         Placed on: {new Date(order.createdAt).toLocaleDateString()}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ mb: 1 }}>
//                                         Payment ID: <strong>{order.paymentId || 'N/A'}</strong>
//                                     </Typography>
//                                     <Button
//                                         endIcon={expanded === order._id ? <ExpandLess /> : <ExpandMore />}
//                                         onClick={() => handleExpand(order._id)}
//                                         sx={{ mt: 1 }}
//                                     >
//                                         {expanded === order._id ? 'Hide Details' : 'Show Details'}
//                                     </Button>
//                                     <Collapse in={expanded === order._id}>
//                                         <Divider sx={{ my: 2 }} />
//                                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                                             Items:
//                                         </Typography>
//                                         <List dense disablePadding>
//                                             {order.items.map((item, idx) => (
//                                                 <ListItem key={item.productId + idx} disableGutters>
//                                                     <Avatar
//                                                         variant="rounded"
//                                                         src={item.image || undefined}
//                                                         sx={{ width: 48, height: 48, mr: 2 }}
//                                                     >
//                                                         {item.name}
//                                                     </Avatar>
//                                                     <ListItemText
//                                                         primary={`${item.name} (x${item.quantity})`}
//                                                         secondary={`₹${item.price.toLocaleString()} each`}
//                                                     />
//                                                 </ListItem>
//                                             ))}
//                                         </List>
//                                         <Divider sx={{ my: 1 }} />
//                                         <Typography variant="body2">
//                                             <strong>Total:</strong> ₹{order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
//                                         </Typography>
//                                     </Collapse>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// };

// export default UserOrders;

