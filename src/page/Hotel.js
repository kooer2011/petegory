import React, { useContext, useEffect, useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Hotel.css'
import roomStd from '../imgs/standard room.jpg'
import roomDeluxe from '../imgs/deluxe room.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import Footer from '../components/Footer/Footer';


const { RangePicker } = DatePicker;


function HoTel() {
  // const [dates, setDates] = useState([])
  // const dateFormat = 'DD/MM/YYYY';
  // const onChange = (date, dateString) => {
  //   setDates(date)
  //   console.log(date, dateString);
  // };

  const navigate = useNavigate()

  const [data, setData] = useState([])
    const images = [
      roomStd,
      roomDeluxe
    ]

  const handleClick = () => {
    
      navigate('/hotel/detail' )
  }

  useEffect(() => {
    fetch('/api/hotels/getDetailHotels', {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        setData(data.data)
    })
}, [])



  return (
    <>
      <NavbarHeader />
      <div className='txtHead'>
        <h1>CAT HOTEL</h1>
      </div>
      <section>
        <div>
          <h2>เงื่อนไขการเข้าใช้บริการ</h2>
          <p></p>
        </div>
      
      {data && images.map((img,i) => (
            <div className='about container'>
          <div className='row justify-content-center'>
            <div className='col-sm-5'>
              <img src={img} className='img-fluid' />
            </div>
            <div className='col-sm-5'>
              <h6>
                About <span>{data[i]?.type}</span>
              </h6>
              <p><strong>💰ราคา {data[i]?.price} บาท/คืน รองรับแมวได้ 1-2 ตัว</strong></p>
              <p>บริการฝากเลี้ยง (รายชั่วโมง)
                ค่าบริการ ชั่วโมงละ {data[i]?.title1} บาท</p>
              <p>{data[i]?.title2}</p>
              <p>{data[i]?.title3}</p>
              <p>{data[i]?.title4}</p>
              <p>{data[i]?.title5}</p>
              <button  className='btn btn-primary float-end' onClick={handleClick}>
                Read More <i className='fas fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
        ))}
        
      </section>
        <Footer/>
    </>
  )
}

export default HoTel;
