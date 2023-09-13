import React, { useEffect } from 'react';
import axios from 'axios';
import { message, Form, Input, Typography } from 'antd';
import './style/ForgotPassword.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';

const ForgotPassword = () => {
  const finishHandle = async values => {
    try {
      const res = await axios.post('/api/v1/user/forgotPassword', values);
      if (res.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'โปรดเช็คอีเมลล์ของคุณ',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      message.error('ส่งอีเมลล์ผิดพลาด');
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  const linkStyle = {
    fontFamily: 'CaveatVarialbleFont',
  };
  return (
    <>
      <div style={linkStyle} className="forgot">
        <Form className="Form" onFinish={finishHandle} data-aos="fade">
          <Typography.Title>Forgot Password</Typography.Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter valid email',
              },
            ]}
          >
            <Input className="input" placeholder="Enter Your Email" />
          </Form.Item>
          <div className="mb-3 float-end">
            <Link to="/login" className="fs-6">
              Login
            </Link>
          </div>
          <button className="btn btn-success w-100" type="submit">
            Send
          </button>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
