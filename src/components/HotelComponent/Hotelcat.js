import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import imgs1 from '../../imgs/cathotel1.jpg';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Hotelcat.css';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#DAC0A3',
  ...theme.typography.body2,
  fontFamily: 'CaveatVarialbleFont',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: theme.spacing(1),
  textAlign: 'center',

  color: theme.palette.text.secondary,
}));

// Define the hover effect styles
const hoverButtonStyles = {
  backgroundColor: '#FF4081', // Change to your desired hover color
  color: 'white',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: '#E91E63', // Change to your desired hover color
  },
};

export default function Hotelcat() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handlenavigate = () => {
    navigate('/hotel/detail-booking');
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={1}>
        <Grid xs={4}>
          <Item className="cathotel__image">
            <motion.div
              onClick={handlenavigate}
              className="box"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              BOOKING NOW
            </motion.div>
          </Item>
          <Item className="cathotel__image ">
            <p>
              บริการโรงแรม แมว มีหลาย ระดับ ห้อง ให้เลือก มากมาย พร้อมคนดูแล
              ที่มีคุณภาพ{' '}
            </p>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item className="cathotel__image">
            <img
              width="100%"
              height="auto"
              src={imgs1}
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: 'auto',
                maxHeight: 400,
                cursor: 'pointer',
              }}
              onClick={handleOpenModal}
            />
          </Item>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="md">
        <DialogTitle>
          <IconButton
            aria-label="close"
            style={{ position: 'absolute', right: 8, top: 8 }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img src={imgs1} style={{ maxWidth: '100%' }} alt="Hotel" />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
