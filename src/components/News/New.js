import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal'; // Import Modal component
import imgs1 from '../../imgs/poster1.jpg';
import imgs2 from '../../imgs/poster2.jpg';
import imgs3 from '../../imgs/poster3.jpg';
import './Grid.css';
import axios from 'axios';



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

  const [news, setNews] = useState([]);

  const handleImageClick = image => {
    setSelectedImage(`http://localhost:3000/images/${image}`);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const getNews = async () => {
    try {
      const res = await axios.get('api/v1/user/getNews')
      if (res.data.success) {
        setNews(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNews();
  }, [])

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

        {news.map((data, i) => (
          <Grid item xs={12} sm={6} md={4}>
            <Item onClick={() => handleImageClick(data.image)}>
              <img
                className="img-hover-effect"
                // src={imgs1}
                src={`http://localhost:3000/images/${data.image}`}
                width="100%"
                height="auto"
                alt="Image"
              />
            </Item>
          </Grid>
          ))}
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
