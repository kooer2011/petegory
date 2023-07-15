import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {
    const [users, setUsers] = useState([])

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
                        <button className='btn btn-danger'>Delete</button>
                    </div>
                </div>
            )
        },
    ]

    return (
        <Layout>
            <h1 className='mt-1'>Users List</h1>
            <button className='btn btn-success m-2'>Add +</button>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users