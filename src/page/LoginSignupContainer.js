import React from 'react'
import './LoginSignupContainer.css'
import Login from './Login'
import SignUp from './SignUp'
import NavbarHeader from '../components/Navbar'
import { useNavigate } from 'react-router-dom'


const LoginSignupContainer = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/signup')
    }

    return (
        <div className='bg'>
            <NavbarHeader />
            <div className='LoginSignupcontainer' >
                <Login />
                <div className='side-div'>
                    <button type='button' onClick={handleClick}>Signup</button>
                </div>
                <SignUp />
            </div>
        </div>
    )
}

export default LoginSignupContainer