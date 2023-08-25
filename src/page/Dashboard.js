import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../index.css";
import Layout from "../components/Layout/Layout";
import PieChart from "../components/Chart/PieChart";
import BarChart from "../components/Chart/BarChart";
import { UserData } from "../data/ChartData";

const Dashboard = () => {

  const [userCount, setUserCount] = useState(0);
  const [hotelBookingCount, setHotelBookingCount] = useState(0);
  const [groomingCount, setGroomingBookingCount] = useState(0);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

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
  }
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
  }

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
  }

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

  useEffect(() => {
    getUserData();
    getUserCount();
    getHotelBookingCount();
    getHotelGroomingCount();
  }, []);

  return (
    <Layout>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1 p-2">
            <h4>Users</h4>
          </div>
          <hr />
          <div className="">
            <h5 className="text-center">Total: {userCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1 p-2">
            <h4>Grooming Booking</h4>
          </div>
          <hr />
          <div className="">
            <h5 className="text-center">Total: {groomingCount} </h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1 p-2">
            <h4>Hotel Booking</h4>
          </div>
          <hr />
          <div className="">
            <h5 className="text-center">Total: {hotelBookingCount}</h5>
          </div>
        </div>
      </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          
        </div>
      <div className="mt-4 px-5 pt-3 d-flex justify-content-around">
        <div style={{ width: 400 }}>
          <PieChart chartData={userData} />
        </div>
        <div style={{ width: 700 }}>
          <BarChart chartData={userData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
