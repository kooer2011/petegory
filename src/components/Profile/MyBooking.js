import React, { useState, useEffect } from "react";
import "./style/Mybooking.css";
import axios from "axios";
import { Table, message } from "antd";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  const getBooking = async () => {
    try {
      const res = await axios.get("/api/v1/user/getMyBooking", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookings(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);

  const handleDelete = async (id) => {
    console.log("ID=", id);
    const confirmed = await Swal.fire({
      title: "คุณต้องการยกเลิกการจองใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await axios.delete(`/api/v1/user/deleteBookhotel/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          message.success(res.data.message)
          window.location.reload();
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
    },
    {
      title: "Room number",
      dataIndex: "roomNumber",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="booking">
      <h2>Your Booking</h2>
      <Table
        columns={columns}
        dataSource={bookings}
        pagination={{ pageSize: 3, total: bookings.length }}
      />
    </div>
  );
};

export default MyBooking;
