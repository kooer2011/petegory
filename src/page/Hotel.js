import React, { useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Hotel.css'

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
      <div className='dateContainer'>

        {/* < RangePicker
          onChange={(values) => {

            setDates(values.map(item => {
              return moment(item).format('DD-MM-YYYY')
            }))
          }}
        /> */}

        <DatePicker
          onChange={onChange}
          format={dateFormat}
        />

      </div>
    </>
  )
}

export default HoTel;
