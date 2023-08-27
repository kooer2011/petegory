import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBookingDetail = ({ bookingId, onClose }) => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [bookedGrooming, setBookedGrooming] = useState([]);

  const getBookedHotels = async () => {
    try {
      const res = await axios.get("/api/v1/admin/allBookedHotel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const userHotels = res.data.data.filter(
            (booking) => booking.userId === bookingId && booking.bookType === "Hotel"
          );
        setBookedHotels(userHotels);
        console.log(userHotels)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookedGrooming = async () => {
    try {
      const res = await axios.get("/api/v1/admin/allBookedGrooming", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBookedGrooming(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookedHotels();
    getBookedGrooming();
  }, [bookingId]);

  return (
    <div>
      <div>
        <h4>การจองโรงแรม</h4>
        <ul>
        {bookedHotels.map((booking, index) => (
          <li key={index}>
            <strong>ชื่อผู้จอง:</strong> {booking.Name} <br />
            <strong>ชื่อสัตว์เลี้ยง:</strong> {booking.PetName} <br />
            {/* เพิ่มรายละเอียดอื่น ๆ ที่ต้องการแสดง */}
            <br />
          </li>
        ))}
      </ul>
      </div>

      {/* <div>
        <h4>การจองการตัดแต่ง</h4>
        <ul>
          {bookedGrooming.map((booking, index) => (
            <li key={index}>
              <strong>ชื่อผู้จอง:</strong> {booking.Name} <br />
              <strong>ชื่อสัตว์เลี้ยง:</strong> {booking.PetName} <br />
              <br />
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  ) 
};

export default ViewBookingDetail;
