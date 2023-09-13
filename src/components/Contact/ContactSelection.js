import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ContactInfoItem from './ContactInfoItem';
import ContactForm from './ContactForm';
import './contact1.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
function ContactSelection() {
  const handleSend = async values => {
    try {
      const res = await axios.post('/api/v1/user/sendContact', values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ขอบคุณ',
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'โปรดเข้าสู่ระบบ',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mb-3">
      <Row className="mb-5 mt-3">
        <Col lg="12">
          <h2
            className="text-center"
            style={{ color: 'black', fontFamily: 'ChakraPetchBold' }}
          >
            CONTACT US
          </h2>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3
            style={{ color: '#FF314A', fontFamily: 'CaveatVarialbleFont' }}
            className="color_sec py-4"
          >
            Get in touch
          </h3>
          <div className="d-flex">
            <i
              style={{ color: '#FF314A' }}
              class="fa-solid fa-envelope fa-2x"
            />
            <div className="ms-5">
              <strong style={{ fontFamily: 'CaveatVarialbleFont' }}>
                Email
              </strong>
              <br />
              <p style={{ fontFamily: 'CaveatVarialbleFont' }}>
                petegory.grooming@gmail.com
              </p>
            </div>
          </div>
          <br />
          <div className="d-flex">
            <i
              style={{ color: '#FF314A' }}
              class="fa-solid fa-phone-volume fa-2x"
            ></i>
            <div className="ms-5">
              <strong style={{ fontFamily: 'CaveatVarialbleFont' }}>Tel</strong>
              <br />
              <p style={{ fontFamily: 'CaveatVarialbleFont' }}>081 106 7896</p>
            </div>
          </div>
          <br />
          <div className="d-flex">
            <i
              style={{ color: '#FF314A' }}
              class="fa-solid fa-map-location-dot fa-2x"
            ></i>
            <div className="ms-5">
              <strong style={{ fontFamily: 'CaveatVarialbleFont' }}>
                Address
              </strong>
              <br />
              <p style={{ fontFamily: 'CaveatVarialbleFont' }}>
                โครงการ U-AVENUE, Amphoe Kamphaeng Saen, Thailand, Nakhon Pathom
                73140
              </p>
            </div>
          </div>
        </Col>
        <Col lg="7" className="d-flex align-items-center ">
          <Form className="contact__form w-100" onFinish={handleSend}>
            <Row className="mb-3">
              <Col lg="6" className="form-group">
                <Form.Item name="name" required rules={[{required: true, message: 'Please enter your name'}]}>
                  <Input placeholder="Name" type="text" />
                </Form.Item>
              </Col>
              <Col lg="6" className="form-group">
                <Form.Item name="email" required rules={[{required: true, message: 'Please enter email'}]}>
                  <Input placeholder="Email" type="email" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="message" required rules={[{required: true, message: 'Please input someting'}]}>
              <TextArea placeholder="Message" rows="5"></TextArea>
            </Form.Item>
            <div className="mt-4">
              {/* <Col lg="12" className="form-group"> */}

              <button className="btnSub w-50" type="submit">
                <i class="fa-solid fa-location-arrow" /> send
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default ContactSelection;
