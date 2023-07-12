import React, { useEffect, useState, useContext } from 'react'
import NavbarHeader from '../components/Navbar'
import axios from 'axios'
import roomstd from '../imgs/standard room.jpg'
import roomdeluxe from '../imgs/deluxe room.jpg'
import fac from '../imgs/fac.jpg'
import special from '../imgs/special.jpg'
import condi1 from '../imgs/codi1.jpg'
import condi2 from '../imgs/condi2.jpg'
import condi3 from '../imgs/condi3.jpg'
import condi4 from '../imgs/condi4.jpg'
import condi5 from '../imgs/condi5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import './HotelDetail.css'
import Footer from '../components/Footer/Footer'
import { Col, Form, Input, Row, TimePicker, message, Select } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'


const HotelDetail = () => {


  const images = [
    { id: 0, value: roomstd },
    { id: 1, value: roomdeluxe },
    { id: 2, value: fac },
    { id: 3, value: special },
    { id: 4, value: condi1 },
    { id: 5, value: condi3 },
    { id: 6, value: condi4 },
    // { id: 7, value: condi2 },
    { id: 8, value: condi5 },
  ]

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber - 1)
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === images.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1)
  }


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
    <>
      <NavbarHeader />
      <br />
      <section className='d-flex flex-md-row justify-content-around'>

        {openModal &&
          <div className='sliderWrap'>
            <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal} />
            <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
            <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
            <div className='fullScreenImage'>
              <img src={images[slideNumber].value} />
            </div>
          </div>
        }
        <div className='float-start'>
          <div className='galleryWrap'>
            {
              images && images.map((slide, index) => {
                return (
                  <div
                    className='single'
                    key={index}
                    onClick={() => handleOpenModal(index)}
                  >
                    <img src={slide.value} />
                  </div>
                )
              })
            }
          </div>
        </div>

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
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Submit
              </button>
            </Col>
            {/* </Row> */}

          </Form>
        </div>
      </section >

      <section>
        {/* <h1 className="text-center">Apply hotel</h1>
        <Form layout="vertical" onFinish={handleSubmit} className="m-3">
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="PetName"
                name="petname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your petname" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="time" required>
                <TimePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Submit
              </button>
            </Col>
          </Row>

        </Form> */}
      </section>

      <Footer />
    </>
  )
}

export default HotelDetail