import React from 'react'
import { Col, Form, Input, Row, TimePicker, message, Select } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios';
import PrivateRoute from '../components/ProtectedRoute/PrivateRoute';


const BookingHotel = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/bookHotel',
                { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(values)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Someting Went Wrong')
        }
    }
    return (
        <div className='mt-3 bookBG'>
            <Form layout="vertical" onFinish={handleSubmit} className="m-3">
                <h1 className="text-center">Booking hotel</h1>
                <h4 className="">Personal Details : </h4>
                {/* <Row gutter={20}> */}
                <Col xs={24} md={24} lg={15}>
                    <Form.Item
                        label="Name"
                        name="name"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="your name" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={15}>
                    <Form.Item
                        label="PetName"
                        name="petname"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="your petname" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={15}>
                    <Form.Item
                        label="Phone No"
                        name="phone"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="your contact no" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={15}>
                    <Form.Item
                        label="Room Type"
                        name="room"
                        required
                        rules={[{ required: true }]}
                    >
                        <Select
                            defaultValue="Select Type"
                            style={{
                                width: 120,
                            }}
                            options={[
                                {
                                    value: 'Standard',
                                    label: 'Standard',
                                },
                                {
                                    value: 'Deluxe',
                                    label: 'Deluxe',
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timings" name="time" required>
                        <TimePicker format="HH:mm" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <button className="btn btn-primary form-btn" type="submit">
                        Submit
                    </button>
                </Col>
                {/* </Row> */}

            </Form>
        </div>
    )
}

export default BookingHotel