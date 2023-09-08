import React, { useEffect, useState } from 'react';
import './styles/Hotel.css';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarHeader from '../components/Navbar';
import { motion, useScroll } from 'framer-motion';
import Footer from '../components/Footer/Footer';

function HoTel() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/hotel/detail-booking');
  };

  const getDetails = async () => {
    try {
      const res = await axios.get('/api/v1/user/getDetailHotel');
      if (res.data.success) {
        setDetails(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="hotel__page2">
        <NavbarHeader />
        <motion.div>
          <section className="info">
            <h2 style={{ color: 'black', fontFamily: 'ChakraPetchBold' }}>
              CAT HOTEL
            </h2>
            <hr />
            <div className=" fs-5 p-4 mt-0" data-aos="fade-up">
              <h2 style={{ color: '#FF314A', fontFamily: 'ChakraPetchBold' }}>
                เงื่อนไขการเข้าใช้บริการ
              </h2>
              <p className="d-flex justify-content-center">
                1.น้องแมวต้องมีอายุ 4
                เดือนขึ้นไปและได้รับวัคซีนป้องกันโรคติดต่อพื้นฐานครบแล้ว
                <br />
                2.น้องแมวต้องได้รับการหยดยาป้องกันปรสิตภายนอกและภายในเรียบร้อยแล้ว
                <br />
                3.น้องแมวที่ใช้กระบะทรายเป็น
                <br />
                4.ไม่รับน้องแมวดุร้าย ป่วย ช่วงเวลาฮีท ตั้งครรภ์ ต้องมีการหยอดยา
                ป้อนยา ทุกชนิด
              </p>
            </div>

            {details.map((data, i) => (
              <div className="about container" data-aos="zoom-in">
                <div className="row justify-content-center">
                  <div className="col-sm-5">
                    <img
                      src={`http://localhost:3000/images/${data.image}`}
                      className="img-fluid"
                      alt={`Room ${i + 1}`}
                    />
                  </div>
                  <div className="col-sm-5">
                    <h6>
                      About{' '}
                      <span style={{ color: '#FF314A' }}>{data.type}</span>
                    </h6>
                    <p>
                      <strong>
                        💰ราคา {data.price} บาท/คืน รองรับแมวได้ 1-2 ตัว
                      </strong>
                    </p>
                    <p>
                      บริการฝากเลี้ยง (รายชั่วโมง) ค่าบริการ ชั่วโมงละ{' '}
                      {data.title1} บาท
                    </p>
                    <p>{data.title2}</p>
                    <p>{data.title3}</p>
                    <p>{data.title4}</p>
                    <p>{data.title5}</p>
                    <button
                      className="btn btn-primary float-end"
                      onClick={handleClick}
                    >
                      Read More or Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{ color: '#FF314A', fontFamily: 'ChakraPetchBold' }}
              className="alert p-5"
              data-aos="fade-up"
            >
              <div className="text-danger fs-4 ">
                <span
                  className="head__alert fw-bold fs-1"
                  style={{ color: '#FF314A', fontFamily: 'ChakraPetchBold' }}
                >
                  *โปรดอ่าน*
                </span>
                <br />
                -หากเจ้าของทิ้ง/ไม่มารับน้องแมว จะถูกดำเนินคดีกฎหมาย ตาม
                พ.ร.บ.คุ้มครองสัตว์
                <br />
                -ทางร้านจะดูแลน้องแมวอย่างดีที่สุด
                แต่หากเกิดเหตุการณ์ที่อยู่นอกเหนือการควบคุม ทางร้านขอสวนสิทธิ์
                ไม่รับผิดชอบทุกกรณี
                <br />
                -หากพบว่าน้องแมวผิดไปจากเงื่อนไขในวันที่เข้าพัก{' '}
                <u>ขอปฎิเสธการเข้าพักทันทีและสงวนสิทธิ์การคืนเงินทั้งหมด</u>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default HoTel;
