import React from "react";
import "../Layout/LayoutStyle.css";
import { adminMenu, employeeMenu } from "../../data/DataPath";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/");
  };

  // const SidebarMenu = user?.isAdmin ? adminMenu : employeeMenu;
  // const SidebarMenu = user?.isAdmin ? adminMenu : (user?.isEmployee ? employeeMenu : null);
  const SidebarMenu =
    user?.isAdmin || user?.isEmployee
      ? user?.isAdmin
        ? adminMenu
        : employeeMenu
      : null;

  return (
    <>
      <div className="p-2 vh-100">
        <div className="d-flex">
          <div className="col-md-4 col-lg-2 sidebar">
            <div className="fs-3 text-center m-3 manage">Management</div>
            <hr />
            <div className="menu">
              {SidebarMenu &&
                SidebarMenu.map(menu => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item ${isActive && 'active'}`}>
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link>
                      </div>
                    </>
                  );
                })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <a href="">Logout</a>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/admin/dashboard/notification");
                  }}
                >
                  <i class="fa-solid fa-bell" />
                </Badge>
                <Link to="/profile/account">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
