import React, { useState, useEffect } from "react";
import UncontrolledExample from "../components/Carousel/CarouSel";
import NavbarHeader from "../components/Navbar";
import Gallr from "../components/Gallery/Gallr";
import Footer from "../components/Footer/Footer";
import GroomingComponent from "../components/Grooming/GroomingComponent";
import ContactSelection from "../components/Contact/ContactSelection";
import { FloatButton, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles/userpage.css"; // Import the CSS file
import TokenExpirationChecker from "../components/CheckToken/TokenExpirationChecker";
import BasicGrid from "../components/News/New";
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll } from "framer-motion";
import Hotelcat from "../components/HotelComponent/Hotelcat";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const Userpage = () => {
  const { scrollYProgress } = useScroll();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/hotel");
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [lineLink, setLineLink] = useState("https://line.me/R/ti/p/@706mfqsc");

  const handleTokenExpired = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <div className="homepage">
      <TokenExpirationChecker
        token={token}
        onTokenExpired={handleTokenExpired}
      />

      <section className="page_navebarsection">
        <NavbarHeader />
      </section>

      <motion.div>
        <section className="dialog__section">
          <UncontrolledExample />
        </section>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(["NEWS", 1000], ["ข่าวสาร", 1000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontFamily: "ChakraPetchBold",
              color: "black",
              fontWeight: "bold",
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="grid__section" data-aos="fade-up">
          <BasicGrid />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(["GROOMING", 1000], ["บริการ อาบน้ำ ตัดขน", 1000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontFamily: "ChakraPetchBold",
              color: "black",
              fontWeight: "bold",
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="grooming__section" data-aos="zoom-in">
          <GroomingComponent />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={(["CATHOTEL", 1000], ["โรงแรมแมว", 3000])}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontFamily: "ChakraPetchBold",
              color: "black",
              fontWeight: "bold",
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="hotelcat__section" data-aos="zoom-in">
          <Hotelcat />
        </div>
        <br />
        <div className="custom_text">
          <TypeAnimation
            sequence={["GALLERY", 1000]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              fontFamily: "ChakraPetchBold",
              color: "black",
              fontWeight: "bold",
            }}
            repeat={Infinity}
          />
        </div>
        <br />
        <div className="gallery__section" data-aos="zoom-in">
          <Gallr />
        </div>
        <br />
        <div className="contact__section" data-aos="fade-up">
          <ContactSelection />
        </div>
        <div>
          <FloatButton.Group
            trigger="hover"
            // type="primary"
            style={{
              right: 24,
            }}
            icon={<CustomerServiceOutlined />}
          >
            <FloatButton
              icon={<FacebookOutlined style={{ color: "blue" }} />}
              tooltip={
                <div style={{ backgroundColor: "black", color: "white" }}>
                  Facebook
                </div>
              }
              href="https://www.facebook.com/petegory.grooming"
              target="_blank"
            />
            <FloatButton
              icon={<CommentOutlined style={{ color: "#06C755" }} />}
              tooltip={
                <div style={{ backgroundColor: "black", color: "white" }}>
                  Line
                </div>
              }
              // href="https://line.me/R/ti/p/@706mfqsc"
              // target="_blank"
              onClick={showModal}
            />
          </FloatButton.Group>

          <FloatButton.BackTop
            style={{ backgroundColor: "red", right: 94 }}
            tooltip={
              <div style={{ backgroundColor: "black", color: "white" }}>
                Back to top
              </div>
            }
            type="primary"
          />
        </div>
        <Modal
          title="Line QR Code"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className="fullscreen-modal"
        >
          <div style={{width: '100%', height: '70vh'}}>
            <iframe src="https://line.me/R/ti/p/@706mfqsc" className="w-100 h-100"></iframe>

          </div>
        </Modal>

        <Footer />
      </motion.div>
    </div>
  );
};

export default Userpage;
