import React, { useEffect, useState, useContext } from 'react'
import NavbarHeader from '../components/Navbar'
import axios from 'axios'
import roomstd from '../imgs/standard room.jpg'
import roomdeluxe from '../imgs/deluxe room.jpg'
import fac from '../imgs/fac.jpg'
import special from '../imgs/special.jpg'
import condi1 from '../imgs/codi1.jpg'
import condi2 from '../imgs/condi2.jpg'
import condi3 from '../imgs/condi3.jpg'
import condi4 from '../imgs/condi4.jpg'
import condi5 from '../imgs/condi5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

import './styles/HotelDetail.css'
import Footer from '../components/Footer/Footer'
import BookingHotel from './BookingHotel'


const HotelDetail = () => {


  const images = [
    { id: 0, value: roomstd },
    { id: 1, value: roomdeluxe },
    { id: 2, value: fac },
    { id: 3, value: special },
    { id: 4, value: condi1 },
    { id: 5, value: condi3 },
    { id: 6, value: condi4 },
    // { id: 7, value: condi2 },
    { id: 8, value: condi5 },
  ]

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber - 1)
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === images.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1)
  }


  return (
    <>
      <NavbarHeader />
      <br />
      <section className='d-flex flex-md-row justify-content-around'>

        {openModal &&
          <div className='sliderWrap'>
            <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
            <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
            <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
            <div className='fullScreenImage'>
              <img src={images[slideNumber].value} />
            </div>
          </div>
        }
        <div className='float-start'>
          <div className='galleryWrap'>
            {
              images && images.map((slide, index) => {
                return (
                  <div
                    className='single'
                    key={index}
                    onClick={() => handleOpenModal(index)}
                  >
                    <img src={slide.value} />
                  </div>
                )
              })
            }
          </div>
        </div>
          <BookingHotel />
      </section >

      <Footer />
    </>
  )
}

export default HotelDetail