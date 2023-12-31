import React, { useState, useEffect } from 'react'
import './styles/Signup.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { message, Form, Input, Divider, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import NavbarHeader from '../components/Navbar'
import AOS from 'aos'
import Swal from 'sweetalert2';

const SignUp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/signup', values)
      dispatch(hideLoading());
      if(res.data.success){
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login')
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
      console.log(error)
      message.error('มีบางอย่างผิดพลาด')
    }
  }

  useEffect(() => {
    AOS.init({duration: 1500})
  }, []);

  return (
    <>
    <NavbarHeader/>
    <div className='signup'>
      <Form className='signupForm' onFinish={handleSubmit} data-aos='zoom-in'>
      <Typography.Title>SignUp</Typography.Title>
      <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please enter your name'
            }
          ]}
        >
        <Input className='input' placeholder='Enter Your name' />
        </Form.Item>

        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter valid email'
            }
          ]}
        >
        <Input className='input' placeholder='Enter Your Email' />
        </Form.Item>

        <Form.Item
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please enter valid Phone',
              len: 10, message: "Phone number must be exactly 10 digits" 
            }
          ]}
        >
        <Input className='input' type='number' placeholder='Enter Your Phone Number' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters.',
            },
          ]}
        >
        <Input.Password className='input' placeholder='Enter Your Password' />
        </Form.Item>
        <button type='submit' >SignUp</button>
        <Divider style={{ borderColor: "black" }}>or</Divider>
        <div className='fs-5 text-center m-2'>
          <span>Already a user? <Link to='/login'>Login</Link></span>
        </div>
      </Form>
    </div>
    </>
  )
}

export default SignUp