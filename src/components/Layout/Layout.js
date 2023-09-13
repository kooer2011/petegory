import React, { useState } from "react";
import "../Layout/LayoutStyle.css";
import { adminMenu, employeeMenu } from "../../data/DataPath";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message, Drawer } from "antd";
import Swal from 'sweetalert2';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Success',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // const SidebarMenu = user?.isAdmin ? adminMenu : employeeMenu;
  // const SidebarMenu = user?.isAdmin ? adminMenu : (user?.isEmployee ? employeeMenu : null);
  const SidebarMenu =
    user?.isAdmin || user?.isEmployee
      ? user?.isAdmin
        ? adminMenu
        : employeeMenu
      : null;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="p-2 vh-100">
        <div className="d-flex">
          <div className="col-md-4 col-lg-2 sidebar">
            <div className="fs-3 text-center m-3 manage">Management</div>
            <hr />
            <div className="menu">
              {SidebarMenu &&
                SidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item ${isActive && "active"}`}>
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
                {/* ปุ่ม hamburger icon */}
                <div className="hamburger-icon" onClick={toggleDrawer}>
                  <i className="fa-solid fa-bars text-black"></i>
                </div>
                <div className="header-right">
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
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>

      <Drawer
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={isDrawerOpen}
        width={250} // ปรับขนาดของ Drawer ตามต้องการ
        zIndex={1000} // ระดับ zIndex สำหรับการแสดงผลในกรณีทับกับ Sidebar
      >
        {/* เนื้อหาของ Drawer */}
        <div className="drawer-content">
          {SidebarMenu &&
            SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.path}
                  className={`menu-item ${isActive && "active"}`}
                  onClick={toggleDrawer}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
          <div className={`menu-item `} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <a href="">Logout</a>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Layout;
