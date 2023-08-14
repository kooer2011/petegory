import React, { useState } from "react";
import "./styles/Login.css";
import axios from "axios";
import { message, Form, Input, Divider } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link } from "react-router-dom";
import NavbarHeader from "../components/Navbar";

const Login = () => {
  const dispatch = useDispatch();

  const finishHandle = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Someting Went Wrong");
    }
  };

  return (
    <>
      <NavbarHeader />
      <div className="login">
        <Form className="loginForm" onFinish={finishHandle}>
          <h1>Login</h1>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input className="input" placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              className="input"
              placeholder="Enter Your Password"
            />
          </Form.Item>
          <div className="mb-2 mt-0 float-end fs-6">
            <Link to="">Forgot Password?</Link>
          </div>
          <button type={"submit"}>Login</button>

          <Divider style={{ borderColor: "black" }}>or</Divider>

          <div className="fs-6">
            <span>
              Don't have an account? <Link to="/signup"> Create Account</Link>
            </span>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
