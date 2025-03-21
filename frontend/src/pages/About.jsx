import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  FitnessCenter as FitnessCenterIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Pool as PoolIcon,
  SportsBasketball as BasketballIcon,
  DirectionsRun as TrackIcon,
  EmojiEvents as EventsIcon,
  School as TrainingIcon,
  Payment as PaymentIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

function About() {
  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: 'State-of-the-Art Facilities',
      description: 'Two full-service recreation centers with modern equipment and dedicated spaces for various fitness activities.',
    },
    {
      icon: <PoolIcon sx={{ fontSize: 40 }} />,
      title: 'Olympic Swimming',
      description: '50-meter Olympic pool at Alumni Arena and 25-meter pool at Clark Hall for swimming and aquatic activities.',
    },
    {
      icon: <BasketballIcon sx={{ fontSize: 40 }} />,
      title: 'Multi-Purpose Courts',
      description: 'Courts available for basketball, volleyball, and badminton at both North and South campuses.',
    },
    {
      icon: <TrackIcon sx={{ fontSize: 40 }} />,
      title: 'Indoor Tracks',
      description: 'Climate-controlled indoor tracks for year-round running and walking at both facilities.',
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
            About UB Recreation
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 600 }}>
            Your premier destination for fitness and recreation at the University at Buffalo.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              UB Recreation is committed to providing a comprehensive recreational sports program that enhances the quality of life for the UB community. We strive to create an inclusive environment that promotes physical activity, wellness, and social interaction.
            </Typography>
            <Typography variant="body1" paragraph>
              Our facilities and programs are designed to serve students, faculty, staff, and alumni, offering a wide range of activities from traditional fitness to specialized sports programs. We believe in making fitness accessible and enjoyable for everyone, regardless of their experience level.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3"
              alt="UB Recreation Center"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Facilities Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Our Facilities
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Programs Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Programs & Activities
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Group Fitness Classes
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Yoga & Pilates" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Zumba & Dance" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="HIIT & Cardio" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Strength Training" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sports Programs
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Intramural Sports" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Club Sports" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Tournaments" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Special Events" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Training & Education
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Personal Training" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Swim Lessons" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="CPR/AED Training" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Fitness Assessments" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Membership Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Membership & Access
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Membership Types
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Student Membership" 
                        secondary="Included in student fees"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Faculty/Staff Membership" 
                        secondary="Monthly or annual options available"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Alumni Membership" 
                        secondary="Special rates for UB alumni"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Community Membership" 
                        secondary="Available for non-UB members"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Operating Hours
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Weekdays" 
                        secondary="6:00 AM - 11:00 PM"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Weekends" 
                        secondary="8:00 AM - 8:00 PM"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                      <ListItemText 
                        primary="Holidays" 
                        secondary="Special hours apply"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph>
              Have questions about our facilities or programs? We're here to help!
            </Typography>
            <Typography variant="body1" paragraph>
              Alumni Arena: 175 Alumni Arena, Buffalo, NY 14260
            </Typography>
            <Typography variant="body1" paragraph>
              Clark Hall: Clark Hall, South Campus, Buffalo, NY 14214
            </Typography>
            <Typography variant="body1" paragraph>
              Phone: (716) 645-2286
            </Typography>
            <Typography variant="body1">
              Email: ub-recreation@buffalo.edu
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3"
              alt="Clark Hall"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About; 