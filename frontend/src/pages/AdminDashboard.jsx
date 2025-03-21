import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('users');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (selectedTab === 'users') {
        const response = await api.get('/admin/users');
        setUsers(response.data);
      } else if (selectedTab === 'bookings') {
        const response = await api.get('/admin/bookings');
        setBookings(response.data);
      } else if (selectedTab === 'classes') {
        const response = await api.get('/admin/classes');
        setClasses(response.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/${selectedTab}/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem) {
        await api.put(`/admin/${selectedTab}/${selectedItem._id}`, formData);
      } else {
        await api.post(`/admin/${selectedTab}`, formData);
      }
      setDialogOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error saving item:', err);
      setError('Failed to save item');
    }
  };

  const renderUsersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderBookingsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.user?.name || 'N/A'}</TableCell>
              <TableCell>{booking.classId}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(booking)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(booking._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderClassesTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow key={classItem.id}>
              <TableCell>{classItem.name}</TableCell>
              <TableCell>{classItem.location}</TableCell>
              <TableCell>{classItem.level}</TableCell>
              <TableCell>{classItem.capacity}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(classItem)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(classItem.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Button
          variant={selectedTab === 'users' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('users')}
          sx={{ mr: 2 }}
        >
          Users
        </Button>
        <Button
          variant={selectedTab === 'bookings' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('bookings')}
          sx={{ mr: 2 }}
        >
          Bookings
        </Button>
        <Button
          variant={selectedTab === 'classes' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('classes')}
        >
          Classes
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedItem(null);
            setFormData({});
            setDialogOpen(true);
          }}
        >
          Add New
        </Button>
      </Box>

      {selectedTab === 'users' && renderUsersTable()}
      {selectedTab === 'bookings' && renderBookingsTable()}
      {selectedTab === 'classes' && renderClassesTable()}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? 'Edit' : 'Add'} {selectedTab.slice(0, -1)}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {selectedTab === 'users' && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  margin="normal"
                />
                <TextField
                  select
                  fullWidth
                  label="Role"
                  value={formData.role || 'user'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  margin="normal"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </>
            )}
            {/* Add similar form fields for bookings and classes */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 