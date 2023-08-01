import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ContactInfoItem from './ContactInfoItem';
import ContactForm from './ContactForm';
import './contact1.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

function ContactSelection() {
  return (
    <Container className='mb-3'>
      <Row className="mb-5 mt-3">
        <Col lg="12">
          <h1 className="text-center">Contact Us</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">Get in touch</h3>
          <div className='d-flex'>
            <i class="fa-solid fa-envelope fa-2x" />
            <div className='ms-5'> 
            <strong>Email</strong>
            <br/>
            <p>petegory.grooming@gmail.com</p>
            </div>
          </div>
          <br />
          <div className='d-flex'>
          <i class="fa-solid fa-phone-volume fa-2x"></i>
            <div className='ms-5'> 
            <strong>Tel</strong>
            <br/>
            <p>081 106 7896</p>
            </div>
          </div>
          <br />
          <div className='d-flex'>
          <i class="fa-solid fa-map-location-dot fa-2x"></i>
            <div className='ms-5'> 
            <strong>Address</strong>
            <br/>
            <p>โครงการ U-AVENUE, Amphoe Kamphaeng Saen, Thailand, Nakhon Pathom 73140</p>
            </div>
          </div>
        </Col>
        <Col lg="7" className="d-flex align-items-center ">
          <form className="contact__form w-100" method='POST'>
            <Row className='mb-3'>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                />
              </Col>
            </Row>
            <textarea
              className="form-control"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              required
            ></textarea>
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <button className="btnSub" type="submit">
                <i class="fa-solid fa-location-arrow"/> send
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
    //////////
    //     <section>
    //   <h1>ConTact Us</h1>
    // <div className="frame">
    //       <div className="mask-group-wrapper">
    //         <div className="mask-group">
    //           <div className="desktop">
    //             <div className="overlap-group">
    //               <img
    //                 className="img"
    //                 alt="Img"
    //                 src="https://generation-sessions.s3.amazonaws.com/d0c9fd4fbbbd2f4afe87d489c647d8f6/img/img-15-1686576689916-1@2x.png"
    //               />
    //             </div>
    //             <h1 className="let-s-discuss-on">
    //               <span className="text-wrapper">
    //                 Let’s discuss <br />
    //                 on something{" "}
    //               </span>
    //               <span className="span">cool </span>
    //               <span className="text-wrapper">together</span>
    //             </h1>
    //             <div className="div">
    //               <div className="div-2">
    //                 <img
    //                   className="envelope-fill"
    //                   alt="Envelope fill"
    //                   src="https://generation-sessions.s3.amazonaws.com/d0c9fd4fbbbd2f4afe87d489c647d8f6/img/envelopefill.svg"
    //                 />
    //                 <div className="text-wrapper-2">SaulDesign@gmail.com</div>
    //               </div>
    //               <div className="div-3">
    //                 <img
    //                   className="telephone-fill"
    //                   alt="Telephone fill"
    //                   src="https://generation-sessions.s3.amazonaws.com/d0c9fd4fbbbd2f4afe87d489c647d8f6/img/telephonefill.svg"
    //                 />
    //                 <div className="text-wrapper-3">+123 456 789</div>
    //               </div>
    //               <div className="div-4">
    //                 <img
    //                   className="vector"
    //                   alt="Vector"
    //                   src="https://generation-sessions.s3.amazonaws.com/d0c9fd4fbbbd2f4afe87d489c647d8f6/img/vector.svg"
    //                 />
    //                 <div className="text-wrapper-4">123 Street 456 House</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     </section>
  )
}
export default ContactSelection