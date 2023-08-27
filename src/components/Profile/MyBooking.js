import React, { useState, useEffect } from "react";
import "./style/Mybooking.css";
import axios from "axios";
import { Table, Tabs, message } from "antd";
import Swal from "sweetalert2";
import moment from "moment";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [bookedGrooming, setBookedGrooming] = useState([]);

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

  const getGooming = async () => {
    try {
      const res = await axios.get("/api/v1/user/getMyBookingGrooming", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookedGrooming(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooking();
    getGooming();
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
          message.success(res.data.message);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteGrooming = async (id) => {
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
        const res = await axios.delete(`/api/v1/user/deleteBookedGrooming/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          message.success(res.data.message);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Pet Name",
      dataIndex: "PetName",
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
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(record._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];
  const grooming = [
    {
      title: "Pet Name",
      dataIndex: "PetName",
    },
    {
      title: "Pet Type",
      dataIndex: "pet_type",
    },
    {
      title: "Add on",
      dataIndex: "addon",
      render: (text, record) => (
        <div style={{maxWidth: '350px'}}>
          {record.addon.map((item, index) => (
            <span key={index}>
              {item}
              {index < record.addon.length - 1 && ", "}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteGrooming(record._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="booking">
      <h2 className="mt-0">Your Booking</h2>
      <Tabs>
        <Tabs.TabPane tab={"Hotel"} key={0}>
          <Table
            columns={columns}
            dataSource={bookings}
            pagination={{ pageSize: 3, total: bookings.length }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={"Grooming"} key={1}>
          <Table
            columns={grooming}
            dataSource={bookedGrooming}
            pagination={{ pageSize: 3, total: bookedGrooming.length }}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyBooking;
