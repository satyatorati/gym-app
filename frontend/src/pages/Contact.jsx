import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  DirectionsCar as ParkingIcon,
  Info as InfoIcon,
  SportsBasketball as BasketballIcon,
  Pool as PoolIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    setStatus({
      type: 'success',
      message: 'Thank you for your message. We will get back to you soon!',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Alumni Arena (North Campus)',
      content: '175 Alumni Arena, Buffalo, NY 14260',
      details: 'Main recreation facility on North Campus featuring Olympic pool and multi-purpose courts',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Clark Hall (South Campus)',
      content: 'Clark Hall, South Campus, Buffalo, NY 14214',
      details: 'Full-service recreation center on South Campus with pool and fitness facilities',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      content: '(716) 645-2286',
      details: 'Main office line for general inquiries and facility information',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      content: 'ub-recreation@buffalo.edu',
      details: 'General inquiries and program information',
    },
    {
      icon: <TimeIcon sx={{ fontSize: 40 }} />,
      title: 'Hours',
      content: 'Weekdays: 6:00 AM - 11:00 PM\nWeekends: 8:00 AM - 8:00 PM',
      details: 'Hours may vary during holidays and academic breaks',
    },
    {
      icon: <ParkingIcon sx={{ fontSize: 40 }} />,
      title: 'Parking',
      content: 'Free parking available for members with valid UB parking permit',
      details: 'Parking lots adjacent to both facilities',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Contact UB Recreation
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 600 }}>
            Have questions? We're here to help! Reach out to us through any of the following methods.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ color: 'primary.main', mt: 0.5 }}>{info.icon}</Box>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {info.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ whiteSpace: 'pre-line' }}
                          >
                            {info.content}
                          </Typography>
                          {info.details && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {info.details}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Send us a Message
                </Typography>
                {status.message && (
                  <Alert severity={status.type} sx={{ mb: 2 }}>
                    {status.message}
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Additional Information */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Additional Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InfoIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Membership Information</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    • Student membership is included in your student fees
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Faculty/Staff memberships are available with monthly or annual options
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Alumni memberships are available at special rates
                  </Typography>
                  <Typography variant="body2">
                    • Community memberships are available for non-UB members
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InfoIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Important Notes</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    • Valid UB ID required for entry
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Locker rooms and showers available
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Towel service available for purchase
                  </Typography>
                  <Typography variant="body2">
                    • Equipment rental available for various activities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Contact; 