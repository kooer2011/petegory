import React, { useState } from 'react'
import './styles/Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './styles/LoginSignupContainer.css'
import { message, Form } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'

const SignUp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/signup', {name,email,phone,password})
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
    <div className='signup'>
      <h1>SignUp</h1>
      <Form onFinish={handleSubmit}>
        <input type='text' placeholder='Name' required onChange={(e) => setName(e.target.value)} />
        <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        <input type='number' placeholder='Phone Number' required onChange={(e) => setPhone(e.target.value)} />
        <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' >SignUp</button>
      </Form>
    </div>
  )
}

export default SignUp