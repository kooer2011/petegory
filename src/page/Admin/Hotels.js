import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style/hotel.css';
import Swal from 'sweetalert2';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const addHotels = async () => {
    navigate('/admin/dashboard/create-hotel');
  };

  const getHotels = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getHotels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setHotels(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log('ID=', id);
    const confirmed = await Swal.fire({
      title: 'คุณต้องการลบใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await axios.delete(`/api/v1/admin/deleteHotels/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const handleEdit = (id) => {
    navigate(`/edithotel/${id}`);
  };

  useEffect(() => {
    getHotels();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text, record) => (
        <img
          src={`http://localhost:3000/images/${record.image}`}
          className="imgSize"
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Price/Hr',
      dataIndex: 'title1',
    },
    {
      title: 'Detail 1',
      dataIndex: 'title2',
    },
    {
      title: 'Detail 2',
      dataIndex: 'title3',
    },
    {
      title: 'Detail 3',
      dataIndex: 'title4',
    },
    {
      title: 'Detail 4',
      dataIndex: 'title5',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(record._id)}
            >
              Edit
            </button>
          </div>
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
  return (
    <Layout>
      <h1 className="mt-1 m-0">Hotels List</h1>
      <button className="btn btn-success m-2" onClick={addHotels}>
        Add +
      </button>
      <Table
        columns={columns}
        dataSource={hotels}
        pagination={{ pageSize: 3, total: hotels.length }}
      />
    </Layout>
  );
};

export default Hotels;
