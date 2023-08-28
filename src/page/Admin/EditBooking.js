import React, { useState, useEffect } from "react";
import { Col, Form, Input, Row, DatePicker, message, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";

const EditBooking = ({ bookingId, onClose }) => {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");

  const [bookingData, setBookingData] = useState(null);

  const dateFormat = "DD-MM-YYYY";
  const timeFormat = "HH:mm";

  const handleStartDateChange = (date, dateString) => {
    const formattedStartDate = moment(dateString, dateFormat).format(
      "DD-MM-YYYY"
    );
    setStartDate(formattedStartDate);
  };

  const handleEndDateChange = (date, dateString) => {
    const formattedEndDate = moment(dateString, dateFormat).format(
      "DD-MM-YYYY"
    );
    setEndDate(formattedEndDate);
  };

  const handleTimeChange = (time, timeString) => {
    const formattedTime = moment(timeString, timeFormat).format("HH:mm");
    setTime(formattedTime);
  };

  const getUserBooking = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editBookHotel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const user = res.data.data;
      setBookingData(user);
      console.log(user);

      form.setFieldsValue({
        userId: user.userId,
        startDate: moment(user.startDate, "DD-MM-YYYY"),
        endDate: moment(user.endDate, "DD-MM-YYYY"),
        time: moment(user.time, "HH:mm"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (
        bookingData.startDate === startDate &&
        bookingData.endDate === endDate &&
        bookingData.time === time
      ) {
        message.warning("No changes detected.");
        return;
      }

      // ตรวจสอบว่าค่าวันที่ไม่ถูกกำหนดในฟอร์ม ให้ใช้ค่าวันที่เดิม
      const updatedStartDate = startDate || bookingData.startDate;
      const updatedEndDate = endDate || bookingData.endDate;
      const updatedTime = time || bookingData.time;
      const res = await axios.put(
        `/api/v1/admin/updateBookHotel/${bookingId}`,
        {
          startDate:updatedStartDate,
          endDate:updatedEndDate,
          time:updatedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      message.error("Update User booking Error");
    }
  };

  useEffect(() => {
    getUserBooking();
  }, [bookingId]);

  return (
    <div>
      <Form
        layout="vertical"
        className="m-3"
        onFinish={handleUpdate}
        form={form}
      >
        <h2 className="text-center">Edit Booking hotel</h2>
        <br />
        <div className="ms-4">
          <Col xs={24} md={12} lg={15}>
            <Form.Item label="User ID" required>
              <Input type="text" value={bookingData?.userId} disabled />
            </Form.Item>
          </Col>
          <Row>
            <Form.Item
              label="Start Date"
              name="startDate"
              required
              rules={[{ required: true, message: "Select Date" }]}
            >
              <DatePicker
                format={dateFormat}
                onChange={handleStartDateChange}
              />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="endDate"
              required
              rules={[{ required: true, message: "Select Date" }]}
            >
              <DatePicker format={dateFormat} onChange={handleEndDateChange} />
            </Form.Item>
          </Row>

          <Form.Item label="Check-in Time" name="time" required>
            <TimePicker format={timeFormat} onChange={handleTimeChange} />
          </Form.Item>

          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default EditBooking;
