import React, { useRef, useState } from 'react'
import './LoginSignupContainer.css'
import Login from './Login'
import SignUp from './SignUp'
import NavbarHeader from '../components/Navbar'

const LoginSignupContainer = () => {

    const [login, setLogin] = useState(true)

    const LoginSignupContainerRef = useRef(null)

    const handleClick = () => {
        setLogin(!login)
        LoginSignupContainerRef.current.classList.toggle('active')
    }
    return (
        <div className='bg'>
        <NavbarHeader/>
        <div className='LoginSignupcontainer' ref={LoginSignupContainerRef}>
            <Login/>
            <div className='side-div'>
                <button type='button' onClick={handleClick}>{login ? 'Signup' : 'Login'}</button>
            </div>
            <SignUp/>
        </div>
        </div>
    )
}

export default LoginSignupContainer