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

import './Grooming.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#DAC0A3',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '50% 20% / 10% 40%',
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item className="cathotel__image">
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
          <Item className="cathotel__image">
            {' '}
            <Button
              onClick={() => navigate('/grooming/booking')}
              className="pop-in"
              color="secondary"
            >
              BOOKING NOW
            </Button>
          </Item>
          <Item className="cathotel__image cathotel_detail">
            Petegory บริการอาบน้ำตัดขนสำหรับ สุนัข และ แมว ของคุณ
            มีบริการเสริมให้เลือกมากมาย ให้เลือก
          </Item>
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
