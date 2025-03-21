import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Classes from './pages/Classes';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
                <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 