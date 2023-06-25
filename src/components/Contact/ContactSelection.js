import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ContactInfoItem from './ContactInfoItem';
import ContactForm from './ContactForm';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import './contact1.css';
import { Link } from 'react-router-dom';
import Map from './Map'

function ContactSelection() {
  return (
    <div className='sectionstyle'>
    <div className='Selction_container'>
        <h1>Contact</h1>
        <div className='contactSection_wrapper'>
            <div className='left'>
            <ContactInfoItem icon={<PhoneIcon/>} text='081 106 7896'   />
            <Link to="https://www.facebook.com/petegory.kps"  className='itemStyles'><div className='icon'><FacebookIcon /> </div><div className='info'>Grooming & Hotel อาบน้ำตัดขนแมวและสุนัข โรงแรมแมว กำแพงแสน</div></Link>
            <ContactInfoItem icon={<EmailIcon/>} text='petegory.grooming@gmail.com'/>
            </div>
            <div className='right'> 
        <ContactForm />
            </div>
     
        </div>
    </div>
    </div>
  )
}
export default ContactSelection