import React, { useState } from 'react'
import './styles/Login.css'
import axios from 'axios'
import { message, Form } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const Login = () => {

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const finishHandle = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', credentials)
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success('Login Successfully')
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
    <div className='login'>
      <h1>Login</h1>
      <Form onFinish={finishHandle}>
        <input type={'email'} placeholder={'Email'} id='email' required onChange={handleChange} />
        <input type={'password'} placeholder={'Password'} id='password' required onChange={handleChange} />
        <button type={'submit'}>Login</button>

      </Form>
    </div>
  )
}

export default Login