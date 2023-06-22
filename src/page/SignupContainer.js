import React from 'react'
import SignUp from './SignUp'
import NavbarHeader from '../components/Navbar'
import './LoginSignupContainer.css'
import { useNavigate } from 'react-router-dom'



const SignupContainer = () => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }
  return (
    <div className='bg'>
        <NavbarHeader/>
        <div className='LoginSignupcontainer' >
            <SignUp/>
            <div className='side-div'>
                <button type='button' onClick={handleClick}>Login</button>
            </div>
        </div>
        </div>
  )
}

export default SignupContainer