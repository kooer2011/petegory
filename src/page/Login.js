import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'


const Login = () => {

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })
  const {loading, error, dispatch} = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev,[e.target.id]: e.target.value}))
  }

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({type: 'LOGIN_START'})
    try {
      const res =  await axios.post('/api/auth/login', credentials);
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
      Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'WELCOME',
                showConfirmButton: false,
                timer: 1500
              })
      navigate('/')
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE', payload: error.response.data})
    }
  }

  return (
    <div className='login'>
      <div className='text-danger mt-3 fs-4'>
        {error && <span>{error.message}</span>}
      </div>
      <h1>Login</h1>
      <form>
        <input type={'email'} placeholder={'Email'} id='email' required onChange={handleChange} />
        <input type={'password'} placeholder={'Password'} id='password' required onChange={handleChange} />
        <button type={'submit'} disabled={loading} onClick={handleSubmit}>Login</button>
         
      </form>
    </div>
  )
}

export default Login