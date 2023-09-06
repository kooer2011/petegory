import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import img1 from '../../imgs/grooming1.jpg';
import img2 from '../../imgs/grooming2.jpg';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Grooming.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#eee',
  ...theme.typography.body2,
  fontFamily: 'CaveatVarialbleFont',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: '30px',
  color: theme.palette.text.secondary,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#eee',
  ...theme.typography.body2,
  fontFamily: 'CaveatVarialbleFont',
  fontWeight: 'bold',
  fontSize: '5rem',

  padding: theme.spacing(1),
  textAlign: 'center',
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FF314A',
  ...theme.typography.body2,
  fontFamily: 'CaveatVarialbleFont',
  fontWeight: 'bold',
  fontSize: '1rem',
  width: '100%',
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  borderRadius: '100px',
}));

export default function GroomingComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleOpenModal = image => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };
  const handlenavigate = () => {
    navigate('/grooming/booking');
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
      }}
    >
      <br />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item className="">
            <img
              className="grroming__imgs fade-in"
              src={img2}
              onClick={() => handleOpenModal(img2)}
              alt="Image"
              style={{
                maxWidth: '100%', // Set maximum width to 100% of its container
                height: 'auto', // Allow height to adjust proportionally
                width: 'auto', // Allow width to adjust proportionally
                maxHeight: 400, // Set maximum height to 400 pixels
              }}
            />
            <img
              className="grroming__imgs fade-in"
              src={img1}
              onClick={() => handleOpenModal(img1)}
              alt="Image"
              style={{
                maxWidth: '100%', // Set maximum width to 100% of its container
                height: 'auto', // Allow height to adjust proportionally
                width: 'auto', // Allow width to adjust proportionally
                maxHeight: 400, // Set maximum height to 400 pixels
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <motion.div
            onClick={handlenavigate}
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Item2
              sx={{
                margin: '5px',
                color: 'white',
                width: '100%',
              }}
            >
              BOOKING NOW
            </Item2>
          </motion.div>
          <Item
            sx={{
              color: 'black',
            }}
            className="cathotel__image"
          >
            Petegory บริการอาบน้ำตัดขนสำหรับ สุนัข และ แมว ของคุณ
            มีบริการเสริมให้เลือกมากมาย ให้เลือก
          </Item>
          <Item1
            className="cathotel__image"
            sx={{
              marginTop: '50px',
            }}
          >
            01
          </Item1>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: 'auto',
              }}
              alt="Image"
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
