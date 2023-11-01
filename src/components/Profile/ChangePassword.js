import React, { useState } from 'react';
import { Col, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (values.oldPassword === values.newPassword) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'รหัสผ่านซ้ำกัน',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const response = await axios.post('/api/v1/user/changePassword', {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.data.message === 'Password changed successfully') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เปลี่ยนรหัสผ่านสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/profile/account');
        } else {
          message.error('ไม่สามารถเปลี่ยนรหัสผ่านได้');
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'รหัสผ่านเก่าไม่ถูกต้อง',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const linkStyle = {
    fontFamily: 'CaveatVarialbleFont',
  };

  return (
    <div style={linkStyle} className="account">
      <h2 style={{ color: '#FF314A' }}>CHANGE PASSWORD</h2>
      <Form layout="vertical" onFinish={onFinish} className="form">
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: 'Please enter your old password' },
            ]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              {
                min: 6,
                message: 'Password must be at least 6 characters.',
              },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 15, offset: 5 }}
        >
          <button className="btn btn-primary" type="submit" loading={loading}>
            Save Change
          </button>
        </Col>
      </Form>
    </div>
  );
};

export default ChangePassword;
