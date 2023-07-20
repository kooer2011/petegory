import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Table } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../redux/features/userSlice'


const Users = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) {
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <div className='m-1'>
                        <button className='btn btn-primary'>Edit</button>
                    </div>
                    <div className='m-1'>
                        <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                    </div>
                </div>
            )
        },
    ]
    const handleClick = () => {
        navigate('/newusers')
    }
    const handleDelete = async (id) => {
        const confirmed = window.confirm('คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?');
        if (confirmed) {
            try {
                const res = await axios.delete(`/api/v1/user/deleteUser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                dispatch(deleteUser({ id }))
                console.log(res.data); 
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Layout>
            <h1 className='mt-1'>Users List</h1>
            <button className='btn btn-success m-2' onClick={handleClick}>Add +</button>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users