import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignupContainer.css'
import Swal from 'sweetalert2'
import { message, Form } from 'antd'

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
  // const finishHandler = (e) => {
  //   e.preventDefault()

  //   axios.post('http://localhost:8080/api/auth/signup', {name,email,phone,password})
  //     .then(res => {
  //       if(res.data){
  //         Toast.fire({
  //         icon: 'success',
  //         title: 'Signed in successfully'
  //       })
  //       }
  //       navigate('/login')
  //     }).catch(err => console.log(err))
  // }
  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/v1/user/signup', {name,email,phone,password})
      if(res.data.success){
        message.success('Register Successfully')
        navigate('/login')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
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