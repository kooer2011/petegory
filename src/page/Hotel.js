import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import './Hotel.css'
import roomStd from '../imgs/standard room.jpg'
import roomDeluxe from '../imgs/deluxe room.jpg'
import { useNavigate} from 'react-router-dom';

import axios from 'axios';

function HoTel() {

  const [details, setDetails] = useState([])
  const navigate = useNavigate()
  const images = [
    roomStd,
    roomDeluxe
  ]

  const handleClick = () => {
    navigate('/hotel/detail-booking')
  }

  const getDetails = async () => {
    try {
      const res = await axios.get('/api/v1/user/getDetailHotel')
      if (res.data.success) {
        setDetails(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <>
      <div className='txtHead'>
        <h1>CAT HOTEL</h1>
      </div>
      <section>
        <div>
          <h2>เงื่อนไขการเข้าใช้บริการ</h2>
          <p></p>
        </div>

        {details && images.map((img, i) => (
          <div className='about container'>
            <div className='row justify-content-center'>
              <div className='col-sm-5'>
                <img src={img} className='img-fluid' alt={`Room ${i + 1}`} />
              </div>
              <div className='col-sm-5'>
                <h6>
                  About <span>{details[i]?.type}</span>
                </h6>
                <p><strong>💰ราคา {details[i]?.price} บาท/คืน รองรับแมวได้ 1-2 ตัว</strong></p>
                <p>บริการฝากเลี้ยง (รายชั่วโมง)
                  ค่าบริการ ชั่วโมงละ {details[i]?.title1} บาท</p>
                <p>{details[i]?.title2}</p>
                <p>{details[i]?.title3}</p>
                <p>{details[i]?.title4}</p>
                <p>{details[i]?.title5}</p>
                <button className='btn btn-primary float-end' onClick={handleClick}>
                  Read More or Booking
                </button>
              </div>
            </div>
          </div>
        ))}

      </section>
    </>
  )
}

export default HoTel;
