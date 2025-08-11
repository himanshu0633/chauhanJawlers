import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import CustomLoader from '../../common components/CustomLoader';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Stack,
    Divider
} from '@mui/material';

import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState({ totalAdmins: 0, createdDates: [] });
    const [totalOrders, setTotalOrders] = useState({ totalOrders: 0 });
    const [totalProducts, setTotalProducts] = useState({ total: 0 });
    const [loading, setLoading] = useState(true);

    const groupUsersByDate = (createdDates) => {
        const dateMap = {};
        createdDates.forEach(({ createdAt }) => {
            const date = new Date(createdAt).toISOString().split('T')[0];
            dateMap[date] = (dateMap[date] || 0) + 1;
        });
        const sortedDates = Object.keys(dateMap).sort();
        return {
            labels: sortedDates,
            counts: sortedDates.map(date => dateMap[date])
        };
    };

    const fetchTotalUsers = async () => {
        try {
            const response = await axiosInstance.get('/admin/count');
            setTotalUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchTotalOrders = async () => {
        try {
            const response = await axiosInstance.get('/api/totalOrdercount');
            setTotalOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchTotalProducts = async () => {
        try {
            const response = await axiosInstance.get('/user/totalProductcount');
            setTotalProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchTotalUsers();
            await fetchTotalOrders();
            await fetchTotalProducts();
            setLoading(false);
        };
        fetchData();
    }, []);

    const { labels: lineLabels, counts: lineCounts } = groupUsersByDate(totalUsers.createdDates || []);

    const lineChartData = {
        labels: lineLabels,
        datasets: [{
            label: 'Users Signed Up',
            data: lineCounts,
            fill: false,
            borderColor: '#1976d2',
            backgroundColor: '#1976d2',
            tension: 0.3
        }]
    };

    const barChartData = {
        labels: ['Users', 'Orders', 'Products'],
        datasets: [{
            label: 'Totals',
            data: [totalUsers.totalAdmins, totalOrders.totalOrders, totalProducts.total],
            backgroundColor: ['#42a5f5', '#ef5350', '#66bb6a']
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // This is important to prevent overflow
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: { autoSkip: true, maxTicksLimit: 10 },
            },
            y: {
                beginAtZero: true,
            },
        },
    };


    const StatCard = ({ icon, title, value, color }) => (
        <Paper elevation={4} sx={{ display: 'flex', alignItems: 'center', p: 2, borderLeft: `6px solid ${color}`, height: '100%' }}>
            <Box mr={2}>{icon}</Box>
            <Box>
                <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
                <Typography variant="h5" fontWeight="bold">{value}</Typography>
            </Box>
        </Paper>
    );

    return (
        <>
            {loading ? (
                <CustomLoader />
            ) : (
                <Container maxWidth="xl" sx={{ p: { xs: 0, lg: 3 } }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
                    >
                        Admin Dashboard
                    </Typography>

                    {/* Stat Cards */}
                    <Grid container spacing={3} sx={{ mb: 5 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={<GroupIcon fontSize="large" color="primary" />}
                                title="Total Users"
                                value={totalUsers.totalAdmins}
                                color="#1976d2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={<InventoryIcon fontSize="large" sx={{ color: '#388e3c' }} />}
                                title="Total Products"
                                value={totalProducts.total}
                                color="#66bb6a"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                icon={<ShoppingCartIcon fontSize="large" sx={{ color: '#d32f2f' }} />}
                                title="Total Orders"
                                value={totalOrders.totalOrders}
                                color="#ef5350"
                            />
                        </Grid>
                    </Grid>


                    {/* Charts */}
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ width: { xs: '100%', lg: '48%', }, height: { sm: '250px', md: '100%' } }}>
              <Paper elevation={4} sx={{ p: 2, height: { sm: '100%' } }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  User Signups Over Time
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Line data={lineChartData} />
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', lg: '48%', }, height: { sm: '250px', md: '100%' } }}>
              <Paper elevation={4} sx={{ p: 2, height: { sm: '100%' } }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                  Total Comparison
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Bar data={barChartData} />
              </Paper>
            </Box>
          </Box> */}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                        <Box sx={{ width: { xs: '100%', lg: '48%' } }}>
                            <Paper elevation={4} sx={{ p: { xs: 1, sm: 2 } }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                                    User Signups Over Time
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ height: 250, position: 'relative' }}>
                                    <Line data={lineChartData} options={chartOptions} />
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ width: { xs: '100%', lg: '48%' } }}>
                            <Paper elevation={4} sx={{ p: { xs: 1, sm: 2 } }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                                    Total Comparison
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ height: 250, position: 'relative' }}>
                                    <Bar data={barChartData} options={chartOptions} />
                                </Box>
                            </Paper>
                        </Box>
                    </Box>

                </Container>
            )}
        </>
    );

};

export default Dashboard;


