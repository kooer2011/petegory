import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080')
    .then(res => {
      if(res.data.valid) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8080/login', values)
      .then(res => {
        if (res.data.Login) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'WELCOME',
            showConfirmButton: false,
            timer: 1500
          })
            navigate('/')

        } else {
          setError(res.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='login'>
      <div className='text-danger mt-3 fs-4'>
        {error && error}
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type={'email'} placeholder={'Email'} name='email' onChange={e => setValues({ ...values, email: e.target.value })} />
        <input type={'password'} placeholder={'Password'} name='password' onChange={e => setValues({ ...values, password: e.target.value })} />
        <button type={'submit'}>Login</button>
      </form>
    </div>
  )
}

export default Login