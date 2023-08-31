import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import StepForm from '../components/StepForm';
import Typography from '@mui/material/Typography';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer/Footer';

function GroomBooking() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  return (
    <div className="formGrooming">
      <NavbarHeader />
      <Container component="main" maxWidth="sm" sx={{ mb: 20 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="outlined" align="center">
            <h3>GROOMING</h3>
          </Typography>
          <StepForm />
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}
export default GroomBooking;
