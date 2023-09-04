import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/userSlice';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async id => {
    console.log('ID=', id);
    const confirmed = await Swal.fire({
      title: 'คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await axios.delete(`/api/v1/admin/deleteUser/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          message.success(res.data.message);
          window.location.reload();
          dispatch(deleteUser({ id: id }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = userId => {
    navigate(`/edituser/${userId}`);
  };

  const handleStatus = async (record, role) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/changeStatus',
        { userId: record.userId, isEmployee: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/admin/dashboard/employees');
      }
    } catch (error) {
      console.log(error);
      message.error('Someting Went Wrong');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
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
            {record.role === 'barber' ? (
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record)}
              >
                Approve
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ),
    },
  ];
  const handleClick = () => {
    navigate('/newusers');
  };

  return (
    <Layout>
      <h1 className="mt-1 m-0">Users List</h1>
      <button className="btn btn-success m-2" onClick={handleClick}>
        Add +
      </button>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 4, total: users.length }}
      />
    </Layout>
  );
};

export default Users;
