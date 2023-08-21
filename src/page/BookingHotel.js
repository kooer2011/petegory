import React, { useState } from "react";
import { Col, Form, Input, Row, DatePicker, message, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const availableHours = Array.from({ length: 12 }, (_, index) => index + 9);
function formatTime(hour) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

const BookingHotel = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/bookHotel",
        { ...values, userId: user._id  },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        // Handle API error message
        message.error(error.response.data.message);
      } else {
        message.error("Something Went Wrong");
      }
    }
  };

  //////
  const [selectedTime, setSelectedTime] = useState("");

  const dateFormat = "DD/MM/YYYY";

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  return (
    <div className="mt-3 bookBG">
      <Form layout="vertical" onFinish={handleSubmit} className="m-3">
        <h1 className="text-center">Booking hotel</h1>
        <h4 className="">Personal Details : </h4>
        {/* <Row gutter={20}> */}
        <Col xs={24} md={24} lg={15}>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="your name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={15}>
          <Form.Item
            label="PetName"
            name="petname"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="your petname" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={15}>
          <Form.Item
            label="Phone No"
            name="phone"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="your contact no" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={15}>
          <Form.Item
            label="Room Type"
            name="room"
            required
            rules={[{ required: true }]}
          >
            <Select
              defaultValue="Select Type"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "Standard",
                  label: "Standard",
                },
                {
                  value: "Deluxe",
                  label: "Deluxe",
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Row>
          <Form.Item label="Start Date" name="startDate" required>
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label="End Date" name="endDate" required>
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Row>
        <Col xs={24} md={24} lg={8}>
          <Form.Item label="Time" name="time" required>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="p-1"
            >
              <option>-- โปรดเลือกเวลา --</option>
              {availableHours.map((hour) => (
                <option key={hour} value={formatTime(hour)} className="m-1">
                  {formatTime(hour)} น.
                </option>
              ))}
            </select>
          </Form.Item>
        </Col>

        <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary form-btn" type="submit">
            Submit
          </button>
        </Col>
        {/* </Row> */}
      </Form>
    </div>
  );
};

export default BookingHotel;
