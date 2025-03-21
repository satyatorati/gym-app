import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              UB Recreation
            </Typography>
            <Typography variant="body2">
              Providing quality recreation and wellness programs for the UB community.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/about" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="/classes" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Classes
              </Link>
              <Link href="/facilities" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Facilities
              </Link>
              <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" paragraph>
              Alumni Arena (North Campus)
              <br />
              175 Alumni Arena, Buffalo, NY 14260
              <br />
              Phone: (716) 645-2286
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                href="https://www.facebook.com/UBRecreation"
                target="_blank"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com/UBRecreation"
                target="_blank"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/ubrecreation"
                target="_blank"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/user/UBRecreation"
                target="_blank"
                color="inherit"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} University at Buffalo Recreation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 