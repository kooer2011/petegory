import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignupContainer.css'
import Swal from 'sweetalert2'
import { message,Form,Input } from 'antd'

const SignUp = () => {
  // const [data, setData] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   password: ''
  // })

  const navigate = useNavigate()

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:8080/signup', data)
  //     .then(res => {
  //       if (res.data.Status === 'Success') {
  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: 'bottom-start',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener('mouseenter', Swal.stopTimer)
  //             toast.addEventListener('mouseleave', Swal.resumeTimer)
  //           }
  //         })

  //         Toast.fire({
  //           icon: 'success',
  //           title: 'Signed up successfully'
  //         })
  //         navigate('/login')
  //       } else {
  //         alert('Error')
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  //formhandler
  const finishHandler = async (values) => {
    try {
      const res = await axios.post('/user/signup', values)
      if(res.data.success) {
        message.success('Signup Successfully')
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
      <Form onFinish={finishHandler}>
        <Input type='text' placeholder='Name' required  /> 
        <Input type='email' placeholder='Email' required  />
        <Input type='number' placeholder='Phone Number' required  />
        <Input type='password' placeholder='Password' required  />
        <button type='submit' >SignUp</button>
      </Form>
    </div>
  )
}

export default SignUp