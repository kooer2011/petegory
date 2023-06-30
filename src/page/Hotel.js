import React, { useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Hotel.css'
import roomStd from '../imgs/standard room.jpg'
import roomDeluxe from '../imgs/deluxe room.jpg'
import {Link} from 'react-router-dom';

const { RangePicker } = DatePicker;


function HoTel() {
  const [dates, setDates] = useState([])
  const dateFormat = 'DD/MM/YYYY';
  const onChange = (date, dateString) => {
    setDates(date)
    console.log(date, dateString);
  };



  return (
    <>
      <NavbarHeader />
      <div className='txtHead'>
        <h1>CAT HOTEL</h1>
      </div>
      <section>
        <div className='about container'>
          <div className='row justify-content-center'>
            <div className='col-sm-5'>
              <img src={roomStd} className='img-fluid' />
            </div>
            <div className='col-sm-5'>
              <h6>
                About <span>Standard Room</span>
              </h6>
              <p><strong>💰ราคา 300 บาท/คืน รองรับแมวได้ 1-2 ตัว</strong></p>
              <p>บริการฝากเลี้ยง (รายชั่วโมง)
                ค่าบริการ ชั่วโมงละ 50 บาท</p>
              <p>✅ฟรีน้ำสะอาด ฟรีอาหารเม็ด ฟรีทรายแมว</p>
              <p>✅เลี้ยงระบบปิด อยู่ห้องแอร์เย็นสบาย</p>
              <p>✅มีส่วนกลางให้วิ่งเล่นพักผ่อน</p>
              <p>🚗เมื่อมีธุระหรือไปเที่ยว แต่ไม่มีคนดูแลน้องแมวสุดที่รักของเรา ให้นึกถึง Pet'egory ได้เลย</p>
              <Link to='/hotel/detail' className='btn btn-primary float-end'>
                Read More <i className='fas fa-long-arrow-alt-right'></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='about container'>
          <div className='row justify-content-center'>
            <div className='col-sm-5'>
              <img src={roomDeluxe} className='img-fluid' />
            </div>
            <div className='col-sm-5'>
              <h6>
                About <span>Deluxe Room</span>
              </h6>
              <p><strong>💰ราคา 450 บาท/คืน รองรับแมวได้ 2-3 ตัว</strong></p>
              <p>บริการฝากเลี้ยง (รายชั่วโมง)
                ค่าบริการ ชั่วโมงละ 50 บาท</p>
              <p>✅ฟรีน้ำสะอาด ฟรีอาหารเม็ด ฟรีทรายแมว</p>
              <p>✅เลี้ยงระบบปิด อยู่ห้องแอร์เย็นสบาย</p>
              <p>✅มีส่วนกลางให้วิ่งเล่นพักผ่อน</p>
              <p>🚗เมื่อมีธุระหรือไปเที่ยว แต่ไม่มีคนดูแลน้องแมวสุดที่รักของเรา ให้นึกถึง Pet'egory ได้เลย</p>
              <Link to='/hotel/detail' className='btn btn-primary float-end'>
                Read More <i className='fas fa-long-arrow-alt-right'></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HoTel;
