import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  const addImages = () => {
    navigate('/creategallery');
  };

  const getGallery = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getGall', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setGallery(res.data.data);
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
        const res = await axios.delete(`/api/v1/admin/deleteGall/${id}`, {
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
    navigate(`/editGall/${id}`)
  }

  useEffect(() => {
    getGallery();
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
          title: 'Actions',
          dataIndex: 'actions',
          render: (text, record) => (
            <div className="d-flex">
              <div className="m-1">
                <button className="btn btn-primary" onClick={() => handleEdit(record._id)}>Edit</button>
              </div>
              <div className="m-1">
                <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
              </div>
            </div>
          ),
        },
      ];

  return (
    <Layout>
      <h1 className="mt-1 m-0">Images</h1>
      <button className="btn btn-success m-2" onClick={addImages}>
        Add +
      </button>
      <Table
        columns={columns}
        dataSource={gallery}
        pagination={{ pageSize: 3, total: gallery.length }}
      />
    </Layout>
  )
}

export default Gallery