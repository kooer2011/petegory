import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  message,
  TimePicker,
} from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";



const EditBooking = ({ bookingId, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");

  const [bookingData, setBookingData] = useState(null);

  const dateFormat = "DD/MM/YYYY";

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

  const getUserBooking = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editBookHotel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // const user = {userId: user}

      const user = res.data.data;
      setBookingData(user);
      form.setFieldsValue(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(
        `/api/v1/admin/updateBookHotel/${bookingId}`,
        {values,startDate,endDate},
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
        form={form}
        onFinish={handleUpdate}
      >
        <h2 className="text-center">Edit Booking hotel</h2>
        <br/>
        <div className="ms-4">
          <Col xs={24} md={12} lg={15}>
            <Form.Item label="User ID" required>
              <Input type="text" value={bookingData?.userId} disabled />
            </Form.Item>
          </Col>
          <Row>
            <Form.Item label="Name" name="name" required>
              <Input type="text" placeholder="your name" disabled />
            </Form.Item>
            <Form.Item label="PetName" name="petname" required>
              <Input type="text" placeholder="your petname" disabled />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item label="Start Date" name="startDate" required>
              <DatePicker
                format={dateFormat}
                onChange={handleStartDateChange}
                value={bookingData?.startDate}
              />
            </Form.Item>
            <Form.Item label="End Date" name="endDate" required>
              <DatePicker format={dateFormat} onChange={handleEndDateChange} />
            </Form.Item>
          </Row>

          <Form.Item label="Check-in Time" name="time" required>
            <TimePicker
              format="HH:mm"
              //   value={
              //     bookingData?.time ? moment(bookingData.time, "HH:mm") : null
              //   }
            />
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
