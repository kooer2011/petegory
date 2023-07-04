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

import { Link } from 'react-router-dom'
import './HotelDetail.css'


const HotelDetail = () => {
  // const [hotels, setHotels] = useState([])
  // const [data, setData] = useState([])
  const images = [
    { id: 0, value: roomstd },
    { id: 1, value: roomdeluxe },
    { id: 2, value: fac },
    { id: 3, value: special },
    { id: 4, value: condi1 },
    { id: 5, value: condi3 },
    { id: 6, value: condi4 },
  ]

  const [sliderData, setSliderData] = useState(images[0],images[1])

  const handleClick = (index) => {
    console.log(index)
    const slider = images[index]
    setSliderData(slider)
  }


  return (
    <>
      <NavbarHeader />
      <div className='txtHead'>
        <h1>CAT HOTEL</h1>
      </div>
      <section className='container'>
        <img src={sliderData.value} style={{width: "auto", height:"500px", objectFit: 'cover'}} />
        <div className='d-flex justify-content-center p-2'>
          {images.map((data, i) =>
          <div className='img-fluid thumbnail'>
            <img  src={data.value} style={{width: "200px", height:"200px", objectFit: 'cover'}} className={sliderData.id==i?'clicked':''} onClick={() => handleClick(i)} />
          </div>
          )
          }
        </div>
      </section >

    </>
  )
}

export default HotelDetail