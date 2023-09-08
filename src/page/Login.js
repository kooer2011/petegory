import React, { useState, useEffect } from "react";
import "./styles/Login.css";
import axios from "axios";
import { message, Form, Input, Divider, Typography } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link } from "react-router-dom";
import NavbarHeader from "../components/Navbar";
import AOS from 'aos'
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
const Login = () => {
  const dispatch = useDispatch();

  const finishHandle = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 1500,
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
      dispatch(hideLoading());
      console.log(error);
      message.error("Someting Went Wrong");
    }
  };

  useEffect(() => {
    AOS.init({duration: 1500})
  }, []);

  return (
    <>
      <NavbarHeader />
      <div className="main-content">
      <div className="login">
        <Form className="loginForm" onFinish={finishHandle} data-aos='zoom-in'>
          <Typography.Title  style={{ color: 'black', fontFamily: 'ChakraPetchBold' }}>Login</Typography.Title>
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
            <Link to="/forgot-password">Forgot Password?</Link>
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
      </div>
    </>
  );
};

export default Login;
