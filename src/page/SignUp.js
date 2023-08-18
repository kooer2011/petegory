import React, { useState } from 'react'
import './styles/Signup.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { message, Form, Input, Divider, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import NavbarHeader from '../components/Navbar'

const SignUp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/signup', values)
      dispatch(hideLoading());
      if(res.data.success){
        message.success('Register Successfully')
        navigate('/login')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      message.error('Someting Went Wrong')
    }
  }

  return (
    <>
    <NavbarHeader/>
    <div className='signup'>
      <Form className='signupForm' onFinish={handleSubmit}>
      <Typography.Title>SignUp</Typography.Title>
      <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please enter valid name'
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
              message: 'Please enter valid Phone'
            }
          ]}
        >
        <Input className='input' placeholder='Enter Your Phone Number' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please enter your password'
            }
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