import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Employees = () => {
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllEmployees', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) {
                setEmployees(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getEmployees()
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
            title: 'Role',
            dataIndex: 'role',
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
            <h1 className='mt-1 m-0'>Employees</h1>
            <button className='btn btn-success m-2'>Add +</button>
            <Table columns={columns} dataSource={employees} pagination={{ pageSize: 5, total: employees.length }} />
        </Layout>
    )
}

export default Employees