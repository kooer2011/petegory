import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { Table, Tabs, Input, Modal, message, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import EditBooking from './EditBooking';
import EditBookedGrooming from './EditBookedGrooming';
import Swal from 'sweetalert2';

const AllBookings = () => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [bookedGrooming, setBookedGrooming] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [statusFilterValue, setStatusFilterValue] = useState(null);
  const [petTypeFilterValue, setPetTypeFilterValue] = useState(null);

  //booked hotel
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //booked grooming
  const [selectedBookingGrooming, setSelectedBookingGrooming] = useState(null);
  const [isModalVisibleGrooming, setIsModalVisibleGrooming] = useState(false);

  //filter status && pet type
  const Filter = (value, filterType) => {
    setSearchText('');
    if (filterType === 'status') {
      setStatusFilterValue(value);
    } else if (filterType === 'pet_type') {
      setPetTypeFilterValue(value);
    }
  };

  const getBookedHotels = async () => {
    try {
      const res = await axios.get('/api/v1/admin/allBookedHotel', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const getBookedGrooming = async () => {
    try {
      const res = await axios.get('/api/v1/admin/allBookedGrooming', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setBookedGrooming(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hendleEdit = userId => {
    setSelectedBooking(userId);
    showModal();
  };
  const hendleEditGrooming = userId => {
    setSelectedBookingGrooming(userId);
    showModalGrooming();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const showModalGrooming = () => {
    setIsModalVisibleGrooming(true);
  };
  const handleCancelooming = () => {
    setIsModalVisibleGrooming(false);
    setSelectedBookingGrooming(null);
  };

  const handleDelete = async id => {
    console.log('ID=', id);
    const confirmed = await Swal.fire({
      title: 'ต้องการลบใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await axios.delete(`/api/v1/admin/deleteBookHotel/${id}`, {
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

  const handleDeleteBookedGrooming = async id => {
    console.log('ID=', id);
    const confirmed = await Swal.fire({
      title: 'ต้องการลบใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    });
    if (confirmed.isConfirmed) {
      try {
        const res = await axios.delete(
          `/api/v1/admin/deleteBookedGrooming/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (res.data.success) {
          message.success(res.data.message);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/statusBookHotel',
        { status: record._id, userId: record.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        record.status = 'success';

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error('Someting Went Wrong');
    }
  };

  const handleStatusGrooming = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/statusBookGrooming',
        { status: record._id, userId: record.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        // record.status = "success";

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error('Someting Went Wrong');
    }
  };

  useEffect(() => {
    getBookedHotels();
    getBookedGrooming();
  }, []);

  const hotels = [
    {
      title: 'Name',
      dataIndex: 'Name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          (String(record.name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.PetName)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
            String(record.roomType)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.roomNumber)
              .toLowerCase()
              .includes(value.toLowerCase())) &&
          (!statusFilter || record.status === statusFilter)
        );
      },
    },
    {
      title: 'Pet Name',
      dataIndex: 'PetName',
      filteredValue: [searchText],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      filteredValue: [searchText],
    },
    {
      title: 'ID line',
      dataIndex: 'lineId',
      filteredValue: [searchText],
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      filteredValue: [searchText],
    },
    {
      title: 'Room number',
      dataIndex: 'roomNumber',
      filteredValue: [searchText],
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      filteredValue: [searchText],
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      filteredValue: [searchText],
    },
    {
      title: 'Check-in Time',
      dataIndex: 'time',
      filteredValue: [searchText],
      // render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filteredValue: [searchText],
      render: (text, record) => (
        <div>
          {text === 'pending' && (
            <span className="text-bg-warning text p-1 rounded-1">Pending</span>
          )}
          {text === 'success' && (
            <span className="text-bg-success text p-1 rounded-1">Success</span>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button
              className="btn btn-primary"
              onClick={() => hendleEdit(record._id)}
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
          <div className="m-1">
            {record.status === 'pending' ? (
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, 'approve')}
              >
                Approve
              </button>
            ) : (
              <button className="btn btn-check">Delete</button>
            )}
          </div>
        </div>
      ),
    },
  ];

  const groomings = [
    {
      title: 'Name',
      dataIndex: 'Name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          (String(record.Name).toLowerCase().includes(value.toLowerCase()) ||
            String(record.PetName)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
            String(record.pet_type)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.addon).toLowerCase().includes(value.toLowerCase())) &&
          (!statusFilter || record.status === statusFilter)
        );
      },
    },
    {
      title: 'Pet Name',
      dataIndex: 'PetName',
      filteredValue: [searchText],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      filteredValue: [searchText],
    },
    {
      title: 'Pet Type',
      dataIndex: 'pet_type',
      filteredValue: [petTypeFilterValue],
      onFilter: (value, record) => {
        return !petTypeFilterValue || record.pet_type === petTypeFilterValue;
      },
      render: (text, record) => (
        <div className="fw-bold">
          {text === 'cat' && (
            <span className="text-info text p-2 rounded-1">Cat</span>
          )}
          {text === 'dog' && (
            <span className="text-warning text p-2 rounded-1">Dog</span>
          )}
        </div>
      ),
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      filteredValue: [searchText],
    },
    {
      title: 'Service',
      dataIndex: 'grooming',
      filteredValue: [searchText],
      render: (text, record) => (
        <div style={{ maxWidth: '200px' }}>
          {record.grooming.map((item, index) => (
            <span key={index}>
              {item}
              {index < record.grooming.length - 1 && ', '}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Add on',
      dataIndex: 'addon',
      filteredValue: [searchText],
      render: (text, record) => (
        <div style={{ maxWidth: '200px' }}>
          {record.addon.map((item, index) => (
            <span key={index}>
              {item}
              {index < record.addon.length - 1 && ', '}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: date => moment(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filteredValue: [statusFilterValue],
      onFilter: (value, record) => {
        return !statusFilterValue || record.status === statusFilterValue;
      },
      render: (text, record) => (
        <div>
          {text === 'pending' && (
            <span className="text-bg-warning text p-1 rounded-1">Pending</span>
          )}
          {text === 'success' && (
            <span className="text-bg-success text p-1 rounded-1">Success</span>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <div className="m-1">
            <button
              className="btn btn-primary"
              onClick={() => hendleEditGrooming(record._id)}
            >
              Edit
            </button>
          </div>
          <div className="m-1">
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteBookedGrooming(record._id)}
            >
              Delete
            </button>
          </div>
          <div className="m-1">
            {record.status === 'pending' ? (
              <button
                className="btn btn-success"
                onClick={() => handleStatusGrooming(record, 'approve')}
              >
                Approve
              </button>
            ) : (
              <button className="btn btn-check">Delete</button>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="p-3 text-center pb-0">All Bookings</h3>
      <Tabs>
        <Tabs.TabPane tab={'Grooming'} key={0}>
          <div className="d-flex w-50 mb-3">
            <Input.Search
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Select
              style={{ marginLeft: '10px' }}
              placeholder="Filter Status"
              onChange={value => Filter(value, 'status')}
              allowClear
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="success">Success</Select.Option>
            </Select>
            <Select
              style={{ marginLeft: '10px' }}
              placeholder="Filter Pet"
              onChange={value => Filter(value, 'pet_type')}
              allowClear
            >
              <Select.Option value="cat">Cat</Select.Option>
              <Select.Option value="dog">Dog</Select.Option>
            </Select>
            <a
              href="https://docs.google.com/spreadsheets/d/1BN3LENidjKQr-HWtIsI1VQOK1gVRz4HufAk8R2N-wVE/edit#gid=0"
              target="_blank"
              className="w-50 ms-3 d-flex align-items-center text-decoration-none"
            >
              เพิ่มเวลาการจอง
            </a>
          </div>
          <Table
            columns={groomings}
            dataSource={bookedGrooming}
            pagination={{ pageSize: 4 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={'Hotel'} key={1}>
          <div className="d-flex w-50 mb-3">
            <Input.Search
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Select
              style={{ marginLeft: '10px' }}
              placeholder="Filter Status"
              onChange={setStatusFilter}
              allowClear
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="success">Success</Select.Option>
            </Select>
            <a
              href="https://docs.google.com/spreadsheets/d/14kwdx9zkKZ7a61OgtSdXPBCTBzb2vH36HkZUVlcjkZM/edit#gid=0"
              target="_blank"
              className="w-50 ms-3 d-flex align-items-center text-decoration-none"
            >
              เพิ่มเวลาการจอง
            </a>
          </div>

          <Table
            columns={hotels}
            dataSource={bookedHotels}
            pagination={{ pageSize: 4 }}
          />
        </Tabs.TabPane>
      </Tabs>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <EditBooking bookingId={selectedBooking} onClose={handleCancel} />
      </Modal>
      <Modal
        visible={isModalVisibleGrooming}
        onCancel={handleCancelooming}
        footer={null}
      >
        <EditBookedGrooming
          bookingId={selectedBookingGrooming}
          onClose={handleCancelooming}
        />
      </Modal>
    </Layout>
  );
};

export default AllBookings;
