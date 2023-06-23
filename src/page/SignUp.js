import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignupContainer.css'
import Swal from 'sweetalert2'

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/signup', data)
      .then(res => {
        if (res.data.Status === 'Success') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed up successfully'
          })
          navigate('/login')
        } else {
          alert('Error')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='signup'>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' id='inputName' placeholder='Name' onChange={e => setData({ ...data, name: e.target.value })} />
        <input type='email' id='inputEmail' placeholder='Email' onChange={e => setData({ ...data, email: e.target.value })} />
        <input type='password' id='inputPassword' placeholder='Password' onChange={e => setData({ ...data, password: e.target.value })} />
        <button type={'submit'} >SignUp</button>
      </form>
    </div>
  )
}

export default SignUp