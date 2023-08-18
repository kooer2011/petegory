import React from "react";
import "./style/AccountSetting.css";
import { Col, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountSetting = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/editUser", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/profile/account')
      }
    } catch (error) {
      console.log(error);
      message.error("error update");
    }
  };

  return (
    <div className="account">
      <h2>{user?.name}</h2>
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
          <Form.Item label="Phone" name="phone">
            <Input type="text" placeholder="Your Phone Number" />
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
