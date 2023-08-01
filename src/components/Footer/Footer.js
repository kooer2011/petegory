import React from 'react'
import '../../App.css'

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>PET'E</span>GORY</h3>
                            <p>โครงการ U-AVENUE, Amphoe Kamphaeng Saen, Thailand, Nakhon Pathom 73140</p>
                            <div className="footer-icons">
                                <a href="https://www.facebook.com/petegory.kps" target="_blank"><i class="fa-brands fa-facebook" /></a>
                                <a href="https://line.me/R/ti/p/@706mfqsc"><i class="fa-brands fa-line" /></a>
                                <a href="mailto:petegory.grooming@gmail.com"><i class="fa-solid fa-envelope" /></a>
                                <a href="tel:081 106 7896"><i class="fa-solid fa-phone" /></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/grooming">Grooming</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/hotel">Hotel</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/gallery">Gallery</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/contact">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Contact Us</h5>
                            <p><i class="fa-solid fa-phone-volume"></i> 081 106 7896</p>
                            <p><i class="fa-solid fa-envelope"></i> petegory.grooming@gmail.com</p>
                            <p><i class="fa-solid fa-calendar"></i> Opening every day 9.00 - 20.00
                                <p style={{ marginLeft: '28px' }}> Closed every monday</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Last-footer'>

                <p><i class="fa-regular fa-copyright" /> 2023 By Tanpumin & Punyawut</p>
            </div>
        </>
    )
}

export default Footer