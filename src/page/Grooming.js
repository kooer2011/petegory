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
import img3 from '../imgs/grooming2.jpg';
import dogimg from '../imgs/grrom_dog1.jpg';
import dogimg2 from '../imgs/grrom_dog2.jpg';
import catimg from '../imgs/grrom_cat1.jpg';
import catimg2 from '../imgs/grrom_cat2.jpg';
import dayimg from '../imgs/day_time.PNG';
import promotion from '../imgs/grooming1.jpg';
import Typography from '@mui/material/Typography';
import { motion, useScroll } from 'framer-motion';
import { Carousel } from 'antd';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Grooming() {
  return (
    <>
      <NavbarHeader />
      <motion.div
        initial={{ opacity: 0, x: 100 }} // Initial animation state (sliding from right)
        animate={{ opacity: 1, x: 0 }} // Animation when a new page enters (fade-in and slide to center)
        exit={{ opacity: 0, x: -100 }} // Animation when a page exits (slide to left and fade-out)
        transition={{ duration: 0.5 }} // Animation duration
      >
        <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
          <h2>GLOOMING</h2>
          <hr />
          <Grid container spacing={2}>
            <Grid style={{ marginTop: '100px' }} xs={6}>
              <Item
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                }}
              >
                <Carousel className="groom_sliderimage" autoplay={1000}>
                  <img
                    className="image__grooming group"
                    alt="Detailrate grooms"
                    src={img3}
                    style={{
                      width: '800px',
                      height: '800px',
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                  <img
                    className="image__grooming group"
                    alt="Detailrate grooms"
                    src={promotion}
                    style={{
                      width: '800px',
                      height: '800px',
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </Carousel>
              </Item>
            </Grid>
            <Grid xs={5.5} style={{ marginLeft: '10px', marginTop: '50px' }}>
              <motion.div
                className="box"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  textAlign: 'center',
                  border: '1px solid black',
                  borderRadius: '50px',
                  width: '300px',
                  float: 'right',
                }}
              >
                <h3>BOOKING NOW</h3>
              </motion.div>

              <Grid
                xs={30}
                style={{
                  marginTop: '50px',
                  flexDirection: 'row',
                }}
              >
                <Item>
                  <h2>บริการอาบน้ำตัดขน</h2>
                </Item>
                <Item>
                  <div className="overlap-group">
                    <p>
                      กรูมมิ่งของเรามีหลากหลายบริการ
                      เพื่อที่จะรักษาความสะอาดของสุนัข
                      ทำให้สุนัขรู้สึกสบายและมีความสุข ซึ่งก็คือบริการอาบน้ำ
                      เป่าขน ตัดเล็บ เช็ดหู ตัดแต่งขน ไถเท้า ท้อง ก้น
                      โดยช่างที่มีทักษะ และประสบการณ์
                      นอกจากนี้ทางโรมแรมของเรายังเลือกใช้ผลิตภัณฑ์เกรดพรีเมียม
                      ที่เหมาะสำหรับสุนัขแต่ละตัว
                      ซึ่งไม่ทำให้สุนัขระคายเคืองอีกด้วย
                    </p>
                    <hr />
                    <p className="overlap-group1">
                      Our grooming offers a variety of services to help keep
                      your dogs clean, comfortable and happy. Our grooming
                      services include bathing, blow drying, nail clipping, ear
                      cleaning and hair trimming. Our services are done by
                      skilled and experienced staff. We especially use premium
                      grade products which suit for each dog as well.
                    </p>
                  </div>
                </Item>
              </Grid>
            </Grid>
            <Grid xs={100} style={{ marginTop: '50px' }}>
              <div
                style={{
                  textAlign: ' center',
                }}
                className="text-wrapper-3"
              >
                <h3>Photo</h3>
                <hr />
              </div>
              <Item>
                <img
                  className="group"
                  src={dogimg}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%',
                    height: 'auto',

                    margin: '5px',
                  }}
                />
                <img
                  className="group"
                  src={dogimg2}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%',
                    height: 'auto',

                    margin: '5px',
                  }}
                />
                <img
                  className="group"
                  src={catimg}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%',
                    height: 'auto',

                    margin: '5px',
                  }}
                />
                <img
                  className="group"
                  src={catimg2}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: '100%',
                    height: 'auto',

                    margin: '5px',
                  }}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      <Footer />
    </>
  );
}
