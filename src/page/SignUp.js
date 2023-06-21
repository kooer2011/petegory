import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignupContainer.css'

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/signup', data)
      .then(res => {
        if(res.data.Status === 'Success') {
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
        <input type='text' id='inputName' placeholder='Name' onChange={e => setData({...data, name: e.target.value})} />
        <input type='email' id='inputEmail' placeholder='Email' onChange={e => setData({...data, email: e.target.value})} />
        <input type='password' id='inputPassword' placeholder='Password' onChange={e => setData({...data, password: e.target.value})} />
        <button type={'submit'} >SignUp</button>
      </form>
    </div> 
  )
}

export default SignUp