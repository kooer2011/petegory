import React from 'react';
import './style/AccountSetting.css';
import { Col, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AccountSetting = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  const onSubmit = async values => {
    try {
      const res = await axios.post('/api/v1/user/editUser', values, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/profile/account');
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Email นี้ถูกใช้แล้ว',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      message.error('error update');
    }
  };

  const linkStyle = {
    fontFamily: 'CaveatVarialbleFont',
  };

  return (
    <div style={linkStyle} className="account">
      <h2 style={{ color: '#FF314A' }}>{user?.name}</h2>
      <Form layout="vertical" className="form" onFinish={onSubmit}>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Your Name" />
          </Form.Item>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <Form.Item label="Email" name="email">
            <Input type="text" placeholder="Your Email" />
          </Form.Item>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <Form.Item label="Phone" name="phone" rules={[{len: 10, message: 'Please enter a 10-digit phone number.'}]}>
            <Input type="number" placeholder="Your Phone Number" />
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <button className="btn btn-primary" type="submit">
            Save Change
          </button>
        </Col>
      </Form>
    </div>
  );
};

export default AccountSetting;
