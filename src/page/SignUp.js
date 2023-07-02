import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignupContainer.css'
import Swal from 'sweetalert2'

const SignUp = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

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

  //formhandler
  const finishHandler = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8080/api/auth/signup', {name,email,phone,password})
      .then(res => {
        if(res.data){
          Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        }
        navigate('/login')
      }).catch(err => console.log(err))
  }

  return (
    <div className='signup'>
      <h1>SignUp</h1>
      <form onSubmit={finishHandler}>
        <input type='text' placeholder='Name' require onChange={e => setName(e.target.value)} />
        <input type='email' placeholder='Email' require onChange={e => setEmail(e.target.value)} />
        <input type='number' placeholder='Phone Number' require onChange={e => setPhone(e.target.value)} />
        <input type='password' placeholder='Password' require onChange={e => setPassword(e.target.value)} />
        <button type='submit' >SignUp</button>
      </form>
    </div>
  )
}

export default SignUp