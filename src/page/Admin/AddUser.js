import React, { useState } from 'react'
import { Col, Form, Input, message } from "antd";
import Layout from '../../components/Layout/Layout';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'
import axios from 'axios';

const AddUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/signup',values )
          dispatch(hideLoading());
          if(res.data.success){
            message.success('Add New User')
            navigate('/admin/dashboard/users')
          } else {
            message.error(res.data.message)
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error)
          message.error('Someting Went Wrong')
        }
      }
    return (
        <Layout>
            <div className='mt-3 d-flex justify-content-center'>
                <Form layout="vertical" onFinish={handleSubmit} className="m-3">
                    <h1 className="text-center">New User</h1>

                    <Form.Item
                        label="Name"
                        name="name"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="input name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="input email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="number" placeholder="input phone" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input.Password type="text" placeholder="input password" />
                    </Form.Item>
                        <button className="btn btn-primary form-btn" type="submit">
                            Submit
                        </button>
                    

                </Form>
            </div>
        </Layout>
    )
}

export default AddUser