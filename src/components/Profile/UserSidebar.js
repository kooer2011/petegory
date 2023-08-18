import React from "react";
import "./style/UserSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const UserSidebar = ({ activepage }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(showLoading());
    localStorage.clear();
    dispatch(hideLoading());
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="usersidebar">
      {activepage === "account" ? (
        <div className="s2">
          <i class="fa-regular fa-circle-user"></i>
          <span>Account</span>
        </div>
      ) : (
        <Link to="/profile/account" className="txtstyle">
          <div className="s1">
            <i class="fa-regular fa-circle-user"></i>
            <span>Account</span>
          </div>
        </Link>
      )}

      {activepage === "mybooking" ? (
        <div className="s2">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>My Booking</span>
        </div>
      ) : (
        <Link to="/profile/mybooking" className="txtstyle">
          <div className="s1">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>My Booking</span>
          </div>
        </Link>
      )}

      {activepage === "changepassword" ? (
        <div className="s2">
          <i class="fa-regular fa-eye"></i>
          <span>Change Password</span>
        </div>
      ) : (
        <Link to="/profile/changepassword" className="txtstyle">
          <div className="s1">
            <i class="fa-regular fa-eye"></i>
            <span>Change Password</span>
          </div>
        </Link>
      )}

      {activepage === "accountSetting" ? (
        <div className="s2">
          <i class="fa-solid fa-gear"></i>
          <span>AccountSetting</span>
        </div>
      ) : (
        <Link to="/profile/accountSetting" className="txtstyle">
          <div className="s1">
            <i class="fa-solid fa-gear"></i>
            <span>AccountSetting</span>
          </div>
        </Link>
      )}

      {(user?.isAdmin || user?.isEmployee) &&
        (activepage === "dashboard" ? (
          <div className="s2">
            <i className="fa-solid fa-gauge"></i>
            <span>Dashboard</span>
          </div>
        ) : (
          <Link to="/admin/dashboard" className="txtstyle">
            <div className="s1">
              <i className="fa-solid fa-gauge"></i>
              <span>Dashboard</span>
            </div>
          </Link>
        ))}

      <div className="s1" onClick={handleLogout}>
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default UserSidebar;
