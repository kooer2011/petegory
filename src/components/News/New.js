import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal'; // Import Modal component
import imgs1 from '../../imgs/poster1.jpg';
import imgs2 from '../../imgs/poster2.jpg';
import imgs3 from '../../imgs/poster3.jpg';
import './Grid.css';
// ... rest of your code

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#DAC0A3',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicGrid() {
  const [modalOpen, setModalOpen] = useState(false); // State to track modal open/close
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  const handleImageClick = image => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Item onClick={() => handleImageClick(imgs1)}>
              <img
                className="img-hover-effect"
                src={imgs1}
                width="100%"
                height="auto"
                alt="Image"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Item onClick={() => handleImageClick(imgs2)}>
              <img
                className="img-hover-effect"
                src={imgs2}
                width="100%"
                height="auto"
                alt="Image"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Item onClick={() => handleImageClick(imgs3)}>
              <img
                className="img-hover-effect"
                src={imgs3}
                width="100%"
                height="auto"
                alt="Image"
              />
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <img src={selectedImage} alt="Image" width="100%" />
        </Box>
      </Modal>
    </>
  );
}
