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
import Typography from '@mui/material/Typography';
import { motion, useScroll } from 'framer-motion';
const StyledGrooming = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust the margin as needed
}));

export default function Grooming() {
  return (
    <>
      <NavbarHeader />
      <div className="grooming__container">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grooming-page"
        >
          <div className="title">
            <div className="text-wrapper">
              <h2>GLOOMING</h2>
            </div>
          </div>
          <div className="overlap">
            <img
              className="detailrate-grooms"
              alt="Detailrate grooms"
              src={img3}
            />
          </div>
          <div className="overlap-group">
            <div className="group">
              <div className="div-wrapper">
                <div className="div">BOOKNOW</div>
              </div>
            </div>
            <div className="overlap-2">
              <div className="text-wrapper-2">PET’EGORY</div>
              <div className="pet-egory">
                Pet’egory&nbsp;&nbsp;บริการอาบน้ำตัดขนสัตว์เลี้ยงของคุณ
                มีบริการเสริมต่างๆให้เลือกอีกมากมายมีบริการตรวจสุขภาพฟรีโดยสัตว์แพทย์
              </div>
            </div>
          </div>
          <div className="overlapmage__group">
            <div className="text-wrapper-3">Photo</div>
            <img
              style={{
                borderRadius: '100px',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              className="element"
              alt="Element"
              src={dogimg}
            />
            <img
              style={{
                borderRadius: '100px',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              className="img"
              alt="Img"
              src={dogimg2}
            />
            <img
              style={{
                borderRadius: '100px',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              className="img-2"
              alt="Img"
              src={catimg}
            />
            <img
              style={{
                borderRadius: '100px',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              className="element-2"
              alt="Element"
              src={catimg2}
            />
          </div>

          <div className="rectangle" />
        </motion.div>
        <section className="overlap__footer">
          <Footer />
        </section>
      </div>
    </>
  );
}
