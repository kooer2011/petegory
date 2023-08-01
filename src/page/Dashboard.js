import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../index.css'
import Layout from '../components/Layout/Layout'

const getUserData = async () => {
    try {
        const res = await axios.post('/api/v1/user/getUserData', {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/v1/admin/getUserCount');
                console.log(response.data)
                setUserCount(response.data.data[0]?.user || 0); // กำหนดค่า userCount จาก response.data.data[0]?.user หากไม่พบให้เป็น 0
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        getUserData()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (

        <Layout>
            <div className='p-3 d-flex justify-content-around mt-3'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Users</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: {userCount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Grooming Booking</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: </h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Hotel Booking</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: </h5>
                    </div>
                </div>
            </div>
            <div className='mt-4 px-5 pt-3'>
                <h3>List of Admins</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admin</td>
                            <td>Admin</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Dashboard