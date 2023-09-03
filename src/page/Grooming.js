import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import img1 from '../imgs/grooming1.jpg';
import img2 from '../imgs/grooming2.jpg';
import Button from '@mui/material/Button';
import NavbarHeader from '../components/Navbar';
import GroomingComponent from '../components/Grooming/GroomingComponent';
import Footer from '../components/Footer/Footer';
import './styles/groom.css';
import Typography from '@mui/material/Typography';
import { motion, useScroll } from 'framer-motion';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

export default function Grooming() {
  return (
    <div>
      <NavbarHeader />
      <br />
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial animation state (sliding from right)
        animate={{ opacity: 1, x: 0 }} // Animation when a new page enters (fade-in and slide to center)
        exit={{ opacity: 0, x: -100 }} // Animation when a page exits (slide to left and fade-out)
        transition={{ duration: 0.5 }} // Animation duration
      >
        <Typography variant="outlined" align="center">
          <h2 className="header__groom">GROOMING</h2>
        </Typography>
        <hr className="t_border my-4 ml-0 text-left" />
        <GroomingComponent />

        <Footer />
      </motion.div>
    </div>
  );
}
