import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Container,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationIcon from '@mui/icons-material/LocationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { facilities } from '../data/facilities';
import { classes } from '../data/classes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Classes() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openFacilityDialog, setOpenFacilityDialog] = useState(false);
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenFacilityDialog = (facility) => {
    setSelectedFacility(facility);
    setOpenFacilityDialog(true);
  };

  const handleCloseFacilityDialog = () => {
    setOpenFacilityDialog(false);
  };

  const handleOpenClassDialog = (classItem) => {
    setSelectedClass(classItem);
    setOpenClassDialog(true);
  };

  const handleCloseClassDialog = () => {
    setOpenClassDialog(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Classes & Activities
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="facility and class tabs"
            centered
          >
            <Tab label="Facilities" />
            <Tab label="Classes & Activities" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" align="center" gutterBottom>
            Our Facilities
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Explore our state-of-the-art fitness facilities across UB campuses.
          </Typography>

          <Grid container spacing={4}>
            {facilities.map((facility) => (
              <Grid item xs={12} md={6} key={facility.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={facility.image}
                    alt={facility.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {facility.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {facility.description}
                    </Typography>
                    <List dense>
                      {facility.amenities.slice(0, 3).map((amenity, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={amenity} />
                        </ListItem>
                      ))}
                      {facility.amenities.length > 3 && (
                        <ListItem>
                          <Typography variant="body2" color="primary">
                            +{facility.amenities.length - 3} more amenities...
                          </Typography>
                        </ListItem>
                      )}
                    </List>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenFacilityDialog(facility)}
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      View More Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" align="center" gutterBottom>
            Our Classes
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Discover our wide range of classes and activities available at both campuses.
          </Typography>

          <Grid container spacing={3}>
            {classes.map((classItem) => (
              <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={classItem.image}
                    alt={classItem.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {classItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {classItem.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        icon={<LocationIcon />}
                        label={classItem.location}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        icon={<FitnessCenterIcon />}
                        label={classItem.level}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="success.main">
                        Free with membership
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {classItem.spotsLeft}/{classItem.capacity} spots available
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenClassDialog(classItem)}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Facility Dialog */}
        <Dialog
          open={openFacilityDialog}
          onClose={handleCloseFacilityDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedFacility && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5">{selectedFacility.name}</Typography>
                  <IconButton onClick={handleCloseFacilityDialog}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={selectedFacility.image}
                      alt={selectedFacility.name}
                      sx={{ borderRadius: 1, mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                      {selectedFacility.details}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Contact Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon fontSize="small" color="primary" />
                                <Typography>{selectedFacility.contact.phone}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon fontSize="small" color="primary" />
                                <Typography>{selectedFacility.contact.email}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon fontSize="small" color="primary" />
                                <Typography>{selectedFacility.contact.location}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Available Amenities
                      </Typography>
                      <List dense>
                        {selectedFacility.amenities.map((amenity, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={amenity} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
        </Dialog>

        {/* Class Dialog */}
        <Dialog
          open={openClassDialog}
          onClose={handleCloseClassDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedClass && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5">{selectedClass.name}</Typography>
                  <IconButton onClick={handleCloseClassDialog}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={selectedClass.image}
                      alt={selectedClass.name}
                      sx={{ borderRadius: 1, mb: 3 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                      {selectedClass.details}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Class Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon fontSize="small" color="primary" />
                                <Typography>Instructor: {selectedClass.instructor}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon fontSize="small" color="primary" />
                                <Typography>Location: {selectedClass.location}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FitnessCenterIcon fontSize="small" color="primary" />
                                <Typography>Level: {selectedClass.level}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GroupIcon fontSize="small" color="primary" />
                                <Typography>
                                  Capacity: {selectedClass.spotsLeft} spots left out of {selectedClass.capacity}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        Schedule & Information
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {selectedClass.schedule}
                      </Typography>
                      <Box sx={{ 
                        mt: 2,
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 1,
                        textAlign: 'center'
                      }}>
                        <Typography variant="h6">
                          Free with UB Recreation Membership
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          All classes are included with your membership
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Register Now
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
}

export default Classes; 