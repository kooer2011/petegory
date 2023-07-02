import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'


const Login = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const {loading, error, dispatch} = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios.get('http://localhost:8080')
  //   .then(res => {
  //     if(res.data.valid) {
  //       navigate('/')
  //     } else {
  //       navigate('/login')
  //     }
  //   })
  //   .catch(err => console.log(err))
  // }, [])

  // if (res.data.Login) {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'WELCOME',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })


  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({type: 'LOGIN_START'})
    try {
      const res =  await axios.post('http://localhost:8080/api/auth/login', credentials);
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE', payload: error.response.data})
    }

    axios.post('http://localhost:8080/api/auth/login', credentials)
    .then(res => {
      if (res.data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'WELCOME',
            showConfirmButton: false,
            timer: 1500
          })}
         navigate('/') 
    }).catch(err => console.log(err))
    
  }

  return (
    <div className='login'>
      <div className='text-danger mt-3 fs-4'>
        {error && error}
      </div>
      <h1>Login</h1>
      <form>
        <input type={'email'} placeholder={'Email'} name='email' required onChange={handleChange} />
        <input type={'password'} placeholder={'Password'} name='password' required onChange={handleChange} />
        <button type={'submit'} onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login