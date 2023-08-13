import React, { useEffect } from "react";
import NavbarHeader from "../Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import { adminProfile, userProfile } from "../../data/DataPath";
import UserSidebar from "./UserSidebar";
import Account from "./Account";
import "./style/Profile.css";
import MyBooking from "./MyBooking";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { activepage } = useParams();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/");
  };


  return (
    <div className="userprofile">
      <NavbarHeader />
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "account" && <Account />}
          {activepage === "mybooking" && <MyBooking />}
          {activepage === "changepassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
