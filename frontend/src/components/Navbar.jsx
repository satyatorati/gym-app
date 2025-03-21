import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => setMobileMenuAnchor(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Classes', path: '/classes' },
    { label: 'Booking', path: '/booking' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  /** User Dropdown Menu (Appears under AccountCircle) */
  const renderUserMenu = (
    <Menu
      anchorEl={userMenuAnchor}
      open={Boolean(userMenuAnchor)}
      onClose={handleUserMenuClose}
    >
      <MenuItem component={Link} to="/my-bookings" onClick={handleUserMenuClose}>
        My Bookings
      </MenuItem>
      {user && user.role === 'admin' && (
        <MenuItem component={Link} to="/admin" onClick={handleUserMenuClose}>
          Admin Dashboard
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  /** Mobile Navigation Menu */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          component={Link}
          to={item.path}
          onClick={handleMobileMenuClose}
        >
          {item.label}
        </MenuItem>
      ))}
      {!user && (
        <>
          <MenuItem component={Link} to="/login" onClick={handleMobileMenuClose}>
            Login
          </MenuItem>
          <MenuItem component={Link} to="/register" onClick={handleMobileMenuClose}>
            Register
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            UB Recreation Center
          </Typography>

          {isMobile ? (
            <>
              {/* Mobile Menu Button */}
              <IconButton color="inherit" onClick={handleMobileMenuOpen}>
                <MenuIcon />
              </IconButton>
              {/* User Account Icon (Only if logged in) */}
              {user && (
                <IconButton color="inherit" onClick={handleUserMenuOpen}>
                  <AccountCircle />
                </IconButton>
              )}
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button key={item.path} color="inherit" component={Link} to={item.path}>
                  {item.label}
                </Button>
              ))}
              {user ? (
                <>
                  {/* Admin Dashboard (Only for Admins) */}
                  {user.role === 'admin' && (
                    <Button color="inherit" component={Link} to="/admin">
                      Admin Dashboard
                    </Button>
                  )}
                  {/* User Account Icon */}
                  <IconButton color="inherit" onClick={handleUserMenuOpen}>
                    <AccountCircle />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* User Menu & Mobile Menu */}
          {renderUserMenu}
          {renderMobileMenu}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;