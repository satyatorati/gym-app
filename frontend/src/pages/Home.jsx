import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Alert,
} from '@mui/material';

function MembershipTable() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Membership Rates
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Membership Type</TableCell>
              <TableCell align="right">Month Permit</TableCell>
              <TableCell align="right">Semester Permit</TableCell>
              <TableCell align="right">Annual Permit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>UB Undergraduate Student*</TableCell>
              <TableCell align="right">FREE</TableCell>
              <TableCell align="right">FREE</TableCell>
              <TableCell align="right">FREE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>UB Graduate/Professional Student*</TableCell>
              <TableCell align="right">N/A</TableCell>
              <TableCell align="right">$27</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>UB Faculty and Staff*</TableCell>
              <TableCell align="right">$25</TableCell>
              <TableCell align="right">$85</TableCell>
              <TableCell align="right">$195</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Community</TableCell>
              <TableCell align="right">$35</TableCell>
              <TableCell align="right">$105</TableCell>
              <TableCell align="right">$230</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        *Undergraduate/Graduate/Professional Students must currently be enrolled in courses at UB. Faculty and Staff must currently be employed at UB.
      </Typography>
    </Box>
  );
}

function OperatingHours() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Hours of Operation
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        In observance of Spring Break, Recreation will reduce hours of operation Saturday, 3/15/25 - Sunday, 3/23/25.
      </Alert>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Alumni Arena" />
            <CardContent>
              <Typography variant="body1">
                Monday-Friday: 6:00 AM - 11:00 PM
                <br />
                Saturday-Sunday: 8:00 AM - 9:00 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Clark Hall" />
            <CardContent>
              <Typography variant="body1">
                Monday-Friday: 7:00 AM - 10:00 PM
                <br />
                Saturday-Sunday: 9:00 AM - 8:00 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        *Hours are subject to change. For real-time updates, please visit the UB Events Calendar.
      </Typography>
    </Box>
  );
}

function Home() {
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                UB Recreation Center
              </Typography>
              <Typography variant="h5" paragraph>
                Welcome to UB Recreation
              </Typography>
              <Typography variant="body1" paragraph>
                A wide variety of programs are offered for our Students, Faculty, Staff and Alumni as well as the general community.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Buffalo_Bulls_logo.svg/1280px-Buffalo_Bulls_logo.svg.png"
                alt="UB Bulls Logo"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  filter: 'brightness(0) invert(1)',
                  transform: 'scale(1.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ mb: 8 }}>
        <MembershipTable />
        <OperatingHours />
      </Container>
    </Box>
  );
}

export default Home; 