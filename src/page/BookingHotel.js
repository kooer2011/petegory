import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  message,
  Select,
  TimePicker,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import AOS from "aos";
import { motion, useScroll } from 'framer-motion';
const { Option } = Select;

const roomOptionsByType = {
  Standard: [
    { value: "room1", label: "Room 1" },
    { value: "room2", label: "Room 2" },
    { value: "room3", label: "Room 3" },
    { value: "room4", label: "Room 4" },
    { value: "room5", label: "Room 5" },
    { value: "room6", label: "Room 6" },
  ],
  Deluxe: [
    { value: "room7", label: "Room 7" },
    { value: "room8", label: "Room 8" },
    { value: "room9", label: "Room 9" },
    { value: "room10", label: "Room 10" },
  ],
};

const BookingHotel = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");

  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [roomOptions, setRoomOptions] = useState([]);

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

  const isRoomBooking = async (roomType, roomNumber, startDate, endDate) => {
    try {
      const response = await axios.get("/api/v1/user/isRoomBooked", {
        params: {
          roomType,
          roomNumber,
          startDate,
          endDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data.isBooked;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      // ตรวจสอบว่าผู้ใช้ได้ทำการเลือก Room Type และ Room Number แล้ว
      if (!selectedRoomType) {
        dispatch(hideLoading());
        message.error("โปรดเลือกประเภทห้อง");
        return;
      }

      if (!values.roomNumber) {
        dispatch(hideLoading());
        message.error("โปรดเลือกห้องพัก");
        return;
      }

      const isRoomAlreadyBooked = await isRoomBooking(
        selectedRoomType,
        values.roomNumber,
        startDate,
        endDate
      );

      if (isRoomAlreadyBooked) {
        dispatch(hideLoading());
        message.error("This room is already booked.");
        return;
      }

      const checkInTime = values.time.format("HH:mm");

      const res = await axios.post(
        "/api/v1/user/bookHotel",
        {
          ...values,
          userId: user._id,
          startDate: startDate,
          endDate: endDate,
          time: checkInTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //api google sheet
      const googleAppsScriptURL =
        "https://api.sheety.co/4c46d85387de0a2dbc603c2af92a036f/bookedHotelApi/sheet1";
      let body = {
        sheet1: {
          name: values.Name,
          petName: values.PetName,
          phone: values.phone,
          roomType: values.roomType,
          roomNumber: values.roomNumber,
          startDate: startDate,
          endDate: endDate,
          time: checkInTime,
        },
      };
      await axios.post(googleAppsScriptURL, body);
      console.log(body);

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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle API error message
        message.error(error.response.data.message);
      } else {
        message.error("Something Went Wrong");
      }
    }
  };

  const handleRoomTypeChange = (value) => {
    setSelectedRoomType(value);
  };

  useEffect(() => {
    if (selectedRoomType && startDate && endDate) {
      const updateRoomOptions = async () => {
        const updatedOptions = [];
        const rooms = roomOptionsByType[selectedRoomType] || [];

        for (const room of rooms) {
          const isBooked = await isRoomBooking(
            selectedRoomType,
            room.value,
            startDate,
            endDate
          );
          updatedOptions.push({
            ...room,
            disabled: isBooked,
          });
        }

        setRoomOptions(updatedOptions);
      };
      updateRoomOptions();
    }
    if (user) {
      setUserId(user._id);
    }
  }, [selectedRoomType, startDate, endDate, user]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="mt-3 bookBG" data-aos="fade">
      <Form layout="vertical" onFinish={handleSubmit} className="m-3">
        <h3 className="text-center" style={{fontFamily:'ChakraPetchBold',fontWeight:'bold'}}>Booking hotel</h3>
        <Row>
          <Form.Item
            label="Name"
            name="Name"
            required
            rules={[{ required: true }]}
            initialValue={user?.name}
          >
            <Input type="text" placeholder="your name" disabled />
          </Form.Item>
          <Form.Item
            label="PetName"
            name="PetName"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="your petname" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label="Phone No"
            name="phone"
            required
            rules={[
              { required: true },
              { len: 10, message: "Phone number must be exactly 10 digits" },
            ]}
          >
            <Input type="number" placeholder="your contact no" />
          </Form.Item>
          <Form.Item
            label="id line"
            name="lineId"
            required
            rules={[{ required: true, message: "Input id line" }]}
          >
            <Input type="text" placeholder="your contact no" />
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            label="Start Date"
            name="startDate"
            required
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker
              format={dateFormat}
              onChange={handleStartDateChange}
              disabledDate={(current) =>
                (current && current < moment().startOf("day")) ||
                current.day() === 1
              }
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            required
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker
              format={dateFormat}
              onChange={handleEndDateChange}
              disabledDate={(current) =>
                (current && current < moment().startOf("day")) ||
                current.day() === 1
              }
            />
          </Form.Item>
        </Row>

        <Row gutter={15}>
          <Col xs={24} md={12} lg={10}>
            <Form.Item
              label="Room Type"
              name="roomType"
              required
              rules={[{ required: true, message: "Please select room type" }]}
            >
              <Select
                placeholder="Select Room Type"
                onChange={handleRoomTypeChange}
              >
                <Option value="Standard">Standard</Option>
                <Option value="Deluxe">Deluxe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Form.Item
              label="Room Number"
              name="roomNumber"
              required
              rules={[{ required: true, message: "Please select room number" }]}
            >
              <Select placeholder="Select Room Number">
                {roomOptions.map((room) => (
                  <Option
                    key={room.value}
                    value={room.value}
                    disabled={room.disabled}
                  >
                    {room.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Check-in Time"
          name="time"
          required
          rules={[{ required: true, message: "Please select time" }]}
        >
          <TimePicker
            format="HH:mm"
            hideDisabledOptions
            disabledHours={() =>
              [...Array(24).keys()].filter((h) => h < 9 || h > 20)
            }
          />
        </Form.Item>
        <Form.Item
          label="Pet Information"
          name="petinfo"
          required
          rules={[
            { required: true, message: "กรุณากรอกสุขภาพสัตว์เลี้ยงของคุณ" },
          ]}
        >
          <TextArea
            placeholder="ข้อมูลสุขภาพสัตว์เลี้ยง"
            rows="3"
            style={{ resize: "none" }}
          ></TextArea>
        </Form.Item>
        <Col xs={24} md={24} lg={8}>
          <motion.div
         
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
         >
            <button className="btn btn-primary form-btn" style={{backgroundColor:'#FF314A'}} type="submit">
            Submit
          </button>
          </motion.div>
          
        </Col>
      </Form>
    </div>
  );
};

export default BookingHotel;
