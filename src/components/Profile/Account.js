import React from "react";
import "./style/Account.css";
import { Col, Form, Input } from "antd";
import { useSelector } from "react-redux";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="account">
      <h2>{user?.name}</h2>
      <Form layout="vertical" className="form">
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 5 }}>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="Your Name" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 5 }}>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="Your Email" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 5 }}>
          <Form.Item
            label="Phone"
            name="phone"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="Your Phone Number" />
          </Form.Item>
        </Col>

        <Col xs={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 5 }}>
          <button className="btn btn-primary" type="submit">
            Save Change
          </button>
        </Col>
      </Form>
    </div>
  );
};

export default Account;
