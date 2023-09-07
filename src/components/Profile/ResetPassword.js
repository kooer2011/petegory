import React from 'react';
import { message, Form, Input, Typography } from 'antd';
import './style/ForgotPassword.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reset Password Success',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
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
          <Form.Item
            name="confirm password"
            dependencies={['new password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="input"
              placeholder="Confirm Your New Password"
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
