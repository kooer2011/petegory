import React from 'react';
import { message, Form, Input, Typography } from 'antd';
import './style/ForgotPassword.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const finishHandle = async values => {
    try {
      const res = await axios.post(
        `/api/v1/user/resetPassword/${id}/${token}`,
        {
          password: values['new password'],
        }
      );
      if (res.data.success) {
        message.success('Reset Password Success');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Error for Reset');
    }
  };

  const linkStyle = {
    fontFamily: 'CaveatVarialbleFont',
  };

  return (
    <>
      <div style={linkStyle} className="forgot">
        <Form className="Form" onFinish={finishHandle}>
          <Typography.Title>Reset Password</Typography.Title>
          <Form.Item
            name="new password"
            rules={[
              {
                required: true,
                message: 'Please enter new password',
              },
            ]}
          >
            <Input.Password
              className="input"
              placeholder="Enter Your New Password"
            />
          </Form.Item>
          <button className="btn btn-success w-100" type="submit">
            Reset
          </button>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
