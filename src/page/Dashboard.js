import React,{useEffect} from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../index.css'
import Layout from '../components/Layout/Layout'

const Dashboard = () => {
    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/user/getUserData',{},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
            getUserData();
    }, [])

    return (
        
        <Layout>
            <h1>Dashboard</h1>
        </Layout>
    )
}

export default Dashboard