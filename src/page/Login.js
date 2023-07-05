import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { message,  Form } from 'antd'


const Login = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  // const {loading, error, dispatch} = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({...prev,[e.target.id]: e.target.value}))
  }
  axios.defaults.withCredentials = true;

  const finishHandle = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', credentials)
      if(res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success('Login Successfully')
        navigate('/')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
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