import React, { useEffect } from 'react';
import NavbarHeader from '../Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import UserSidebar from './UserSidebar';
import Account from './Account';
import './style/Profile.css';
import MyBooking from './MyBooking';
import ChangePassword from './ChangePassword';
import AccountSetting from './AccountSetting';
import { motion, useScroll } from 'framer-motion';
const Profile = () => {
  const { activepage } = useParams();


  return (
    <div className="userprofile">
      <NavbarHeader />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Initial animation state (start small and transparent)
        animate={{ opacity: 1, scale: 1 }} // Animation when a new page enters (fade-in and scale up)
        exit={{ opacity: 0, scale: 0.5 }} // Animation when a page exits (fade-out and scale down)
        transition={{ duration: 0.5 }} // Animation duration
      >
        <div className="userprofilein">
          <div className="left">
            <UserSidebar activepage={activepage} />
          </div>
          <div className="right">
            {activepage === 'account' && <Account />}
            {activepage === 'accountSetting' && <AccountSetting />}
            {activepage === 'mybooking' && <MyBooking />}
            {activepage === 'changepassword' && <ChangePassword />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
