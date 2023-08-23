import React, { useState,useEffect } from "react";
import './style/Mybooking.css'
import axios from "axios";
import { Table } from "antd";
const MyBooking = () => {
  const [bookings, setBookings] = useState([])

  const getBooking = async () => {
    try {
        const res = await axios.get('/api/v1/user/getMyBooking', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (res.data.success) {
          setBookings(res.data.data)
          console.log(res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
  getBooking()
}, [])

const columns = [
  {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.name}
        </span>
      )
  },
  {
      title: 'Phone',
      dataIndex: 'phone',
  },
  {
      title: 'Room Type',
      dataIndex: 'roomType',
  },
  {
      title: 'Room number',
      dataIndex: 'roomNumber',
  },
  {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
          <div className='d-flex'>
              <div className='m-1'>
                  <button className='btn btn-danger'>Delete</button>
              </div>
          </div>
      )
  },
]

  return (
    <div className="booking">
      <h2>Your Booking</h2>
      <Table columns={columns} dataSource={bookings}/>
    </div>
  );
};

export default MyBooking;
