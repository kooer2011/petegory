import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Table, Tabs, Input } from "antd";
import axios from "axios";

const AllBookings = () => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getBookedHotels = async () => {
    try {
      const res = await axios.get("/api/v1/admin/allBookedHotel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          searchText: searchText,
        },
      });
      if (res.data.success) {
        setBookedHotels(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookedHotels();
  }, []);

  const hotels = [
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
            String(record.name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.petname).toLowerCase().includes(value.toLowerCase()) ||
            String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
            String(record.roomType).toLowerCase().includes(value.toLowerCase()) ||
            String(record.roomNumber).toLowerCase().includes(value.toLowerCase()) 
            )
      },
    },
    {
      title: "Pet Name",
      dataIndex: "petname",
      filteredValue: [searchText],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      filteredValue: [searchText],
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      filteredValue: [searchText],
    },
    {
      title: "Room number",
      dataIndex: "roomNumber",
      filteredValue: [searchText],
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      filteredValue: [searchText],
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      filteredValue: [searchText],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button className="btn btn-primary">Edit</button>
          </div>
          <div className="m-1">
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h3 className="p-3 text-center">All Bookings</h3>
      <Tabs>
        <Tabs.TabPane tab={"Grooming"} key={0}>
          <div>grooming</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Hotel"} key={1}>
          <div className="d-flex w-25 mb-3">
            <Input.Search
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Table
            columns={hotels}
            dataSource={bookedHotels}
            pagination={{ pageSize: 4 }}
          />
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default AllBookings;
