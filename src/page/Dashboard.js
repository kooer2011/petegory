import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../index.css";
import Layout from "../components/Layout/Layout";
import { Table } from "antd";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [hotelBookingCount, setHotelBookingCount] = useState(0);
  const [groomingCount, setGroomingBookingCount] = useState(0);
  const [bookingHistory, setBookingHistory] = useState([]);

  const getUserCount = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getUserCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUserCount(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getHotelBookingCount = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getBookHotelCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setHotelBookingCount(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHotelGroomingCount = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getBookGroomingCount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setGroomingBookingCount(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingHistory = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getBookingHistory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookingHistory(res.data.data);
      } else {
        console.log("Error fetching booking history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getUserCount();
    getHotelBookingCount();
    getHotelGroomingCount();
    getBookingHistory();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Pet Name",
      dataIndex: "PetName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Booking Type",
      dataIndex: "bookType",
      render: (text, record) => (
        <div className="fw-bold">
          {text === "Hotel" && (
            <span className="text-primary text p-2 rounded-1">Hotel</span>
          )}
          {text === "Grooming" && (
            <span className="text-danger text p-2 rounded-1">Grooming</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {text === "pending" && (
            <span className="text-bg-warning text p-1 rounded-1">Pending</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-3 mt-3">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <div className="px-3 pt-2 pb-3 border shadow-sm bg-light">
              <div className="text-center pb-1 p-2">
                <h4>Users</h4>
              </div>
              <hr />
              <div className="">
                <h5 className="text-center">Total: {userCount}</h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="px-3 pt-2 pb-3 border shadow-sm bg-light">
              <div className="text-center pb-1 p-2">
                <h4>Grooming Booking</h4>
              </div>
              <hr />
              <div className="">
                <h5 className="text-center">Total: {groomingCount} </h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="px-3 pt-2 pb-3 border shadow-sm bg-light">
              <div className="text-center pb-1 p-2">
                <h4>Hotel Booking</h4>
              </div>
              <hr />
              <div className="">
                <h5 className="text-center">Total: {hotelBookingCount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className=" pt-2 pb-3 border shadow-sm w-100 justify-content-center">
        <h3 className="p-2 m-2 mt-0 text-info fw-bold fs-3">รายการจองล่าสุด</h3>
        <div className="w-100">
          <Table
            columns={columns}
            dataSource={bookingHistory}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
