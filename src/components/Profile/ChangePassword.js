import React, { useState } from 'react';
import { Col, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const response = await axios.post(
        '/api/v1/user/changePassword',
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.message === 'Password changed successfully') {
        message.success('Password changed successfully');
        navigate('/profile/account');
      } else {
        message.error('Failed to change password');
      }
    } catch (error) {
      console.error(error);
      message.error('Someting Went Wrong');
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
