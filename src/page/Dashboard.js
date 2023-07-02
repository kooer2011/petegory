import React,{useEffect, useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../index.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [role, setRole] = useState('')
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if(res.data.valid) {
                    setRole(res.data.role)
                } else {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/api/logout')
            .then(res => {
                window.location.reload();
            }).catch(err => console.log(err))
    }
    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/admin/dashboard" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span class="fs-5 fw-bold d-none d-sm-inline">Admin Dashboard</span>
                        </a>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/admin/dashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle m-3 style">
                                    <i className="fs-4 bi-speedometer2 p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Dashboard</span> </Link>
                            </li>
                            <li>
                                <Link to="/admin/dashboard/employees" className="nav-link px-0 align-middle text-white m-3 style">
                                    <i className="fs-4 bi-people p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Employees</span> </Link>
                            </li>
                            <li>
                                <Link to="/admin/dashboard/users" className="nav-link px-0 align-middle text-white m-3 style">
                                    <i className="fs-4 bi-person p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Users</span></Link>
                            </li>
                            <li>
                                <Link to="/" className="nav-link px-0 align-middle text-white m-3 style">
                                    <i class="fs-4 bi bi-house p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Home</span></Link>
                            </li>
                            <li onClick={handleLogout}>
                                <a className="nav-link px-0 align-middle text-white m-3 style">
                                    <i className="fs-4 bi-power p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard