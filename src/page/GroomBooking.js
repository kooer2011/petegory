import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import StepForm from '../components/StepForm';
import Typography from '@mui/material/Typography';
import NavbarHeader from '../components/Navbar';
import { motion, useScroll } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import './styles/groom.css';
function GroomBooking() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  return (
    <>
      <NavbarHeader />
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial animation state (sliding from right)
        animate={{ opacity: 1, x: 0 }} // Animation when a new page enters (fade-in and slide to center)
        exit={{ opacity: 0, x: -100 }} // Animation when a page exits (slide to left and fade-out)
        transition={{ duration: 0.5 }} // Animation duration
        className="formGrooming"
      >
        <Container component="main" maxWidth="sm" sx={{ mb: 20 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <StepForm />
          </Paper>
        </Container>
      </motion.div>
      <Footer />
    </>
  );
}
export default GroomBooking;
