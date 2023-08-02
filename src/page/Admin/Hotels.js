import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style/hotel.css'

const Hotels = () => {
    const [hotels, setHotels] = useState([])
    const navigate = useNavigate()

    const addHotels = async () => {
       navigate('/admin/dashboard/create-hotel')
    }
    
    const getHotels = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getHotels', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (res.data.success) {
                setHotels(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getHotels()
    }, [])

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            render: (text, record) => (
                <img
                  src={`http://localhost:3000/images/${record.image}`} 
                  className='imgSize'
                />
              ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Price',
            dataIndex: 'price',
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
            <h1 className='mt-1 m-0'>Hotels List</h1>
            <button className='btn btn-success m-2' onClick={addHotels}>Add +</button>
            <Table columns={columns} dataSource={hotels} pagination={{ pageSize: 3, total: hotels.length }}/>
        </Layout>
  )
}

export default Hotels