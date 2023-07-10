import React, { useEffect } from 'react'
import NavbarHeader from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { adminProfile, userProfile } from '../../data/DataPath'

const Profile = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        navigate("/");
    };

    const dashboard = (user?.isAdmin && user?.isEmployee) ? adminProfile : userProfile
    return (
        <>
            <NavbarHeader />
            {(user?.isAdmin || user?.isEmployee) && (
                <div className='d-flex justify-content-center align-items-center m-4 mb-5'>
                    <Link to='/admin/dashboard'>Dashboard</Link>
                </div>
            )}
            <div className='d-flex justify-content-center align-items-center m-5'>
                Welcome: {user?.name}
            </div>

            <div className='text-center ' onClick={handleLogout}>
                <a href='' className='text-decoration-none text-bg-danger p-3 mt-2' >Logout</a>
            </div>
        </>
    )
}

export default Profile