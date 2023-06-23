import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../index.css'

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:8080/logout')
        .then(res => {
            navigate('/')
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
                                <Link to="/employee" className="nav-link px-0 align-middle text-white m-3 style">
                                    <i className="fs-4 bi-people p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Manage Employees</span> </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="nav-link px-0 align-middle text-white m-3 style">
                                    <i className="fs-4 bi-person p-1"></i> <span className="ms-1 d-none d-sm-inline p-2">Users</span></Link>
                            </li>
                            <li onClick={handleLogout}>
                                <a href='#' className="nav-link px-0 align-middle text-white m-3 style">
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