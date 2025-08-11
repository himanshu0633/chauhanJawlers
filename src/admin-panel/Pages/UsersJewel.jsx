import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import { toast } from 'react-toastify';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  backgroundColor:
    status === 'active' ? theme.palette.success.light : theme.palette.error.light,
  color: status === 'active' ? theme.palette.success.dark : theme.palette.error.dark,
  pointerEvents: 'none',
}));

const UsersJewel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    address: '',
    phone: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/readallAdmins');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditingUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address || '',
      phone: user.phone || '',
    });
    setShowModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/admin/updateAdmin/${selectedUser._id}`, formData);
      setShowModal(false);
      setSelectedUser(null);
      fetchUsers();
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (!confirmDelete) return;

      await axiosInstance.delete(`/admin/deleteAdmin/${userId}`);
      fetchUsers();
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', role: '', address: '', phone: '' });
    setSelectedUser(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
        >
          User Management
        </Typography>

        <div >

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <StyledTableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="user table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                    {['Name', 'Email', 'Role', 'Address', 'Phone', 'Status', 'Actions'].map(
                      (head) => (
                        <TableCell
                          key={head}
                          sx={{
                            color: (theme) => theme.palette.primary.contrastText,
                            fontWeight: 'bold',
                          }}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((user) => (
                    <TableRow key={user._id} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{ fontWeight: 600 }}
                          color={
                            user.role === 'admin'
                              ? 'primary'
                              : user.role === 'manager'
                                ? 'secondary'
                                : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>{user.address || 'N/A'}</TableCell>
                      <TableCell>{user.phone || 'N/A'}</TableCell>
                      <TableCell>
                        <StatusChip
                          label={user.deleted_at ? 'Deleted' : 'Active'}
                          status={user.deleted_at ? 'inactive' : 'active'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => startEditingUser(user)}
                          aria-label="edit"
                          disabled={!!user.deleted_at}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteUser(user._id)}
                          aria-label="delete"
                          disabled={!!user.deleted_at}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  backgroundColor: (theme) => theme.palette.action.hover,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </StyledTableContainer>
          )}
        </div>

        <Dialog open={showModal} onClose={resetForm} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ position: 'relative' }}>
            Edit User
            <IconButton
              aria-label="close"
              onClick={resetForm}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <form onSubmit={handleUpdateUser}>
            <DialogContent dividers>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {/* If you later re-enable role editing, mirror CategoryJewel's Select style */}
              <TextField
                margin="normal"
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={resetForm} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update User
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
};

export default UsersJewel;
