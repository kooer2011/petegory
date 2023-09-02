import React, { useState, useEffect } from 'react';
import {
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  message,
  TimePicker,
  Select,
} from 'antd';
import axios from 'axios';
import moment from 'moment';

const EditBookedGrooming = ({ bookingId, onClose }) => {
  const [form] = Form.useForm();
  const [bookingData, setBookingData] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  //   const [grooming, setGrooming] = useState('');
  //   const [addon, setAddon] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    grooming: '',
    addon: '',
  });

  const dateFormat = 'DD-MM-YYYY';
  const timeFormat = 'HH:mm';

  const groomingOptions = [
    { label: 'อาบน้ำ', value: 'อาบน้ำ' },
    { label: 'ตัดขน', value: 'ตัดขน' },
  ];

  const addonOption = [
    { label: 'ตัดเล็บ+ตะไบเล็บ', value: 'ตัดเล็บ+ตะไบเล็บ' },
    { label: 'เช็ดหู', value: 'เช็ดหู' },
    { label: 'ฟอกน้ำยา Malaceb เชื้อรา', value: 'ฟอกน้ำยา Malaceb เชื้อรา' },
    {
      label: 'ฟอกน้ำยา Hexine ลดแบคทีเรีย',
      value: 'ฟอกน้ำยา Hexine ลดแบคทีเรีย',
    },
    { label: 'แปรงฟัน', value: 'แปรงฟัน' },
  ];

  const handleDateChange = dateString => {
    const formattedDate = moment(dateString, dateFormat).format('DD-MM-YYYY');
    setDate(formattedDate);
  };
  const handleTimeChange = timeString => {
    const formattedTime = moment(timeString, timeFormat).format('HH:mm');
    setTime(formattedTime);
  };

  const getUserBooking = async () => {
    try {
      const res = await axios.get(
        `/api/v1/admin/editBookGrooming/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const user = res.data.data;
      setBookingData(user);

      form.setFieldsValue({
        userId: user.userId,
        date: moment(user.date),
        time: moment(user.time, 'HH:mm'),
        grooming: user.grooming,
        addon: user.addon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (
        bookingData.date === date &&
        bookingData.time === time &&
        bookingData.grooming === bookingDetails.grooming &&
        bookingData.addon === bookingDetails.addon
      ) {
        message.warning('No changes detected.');
        return;
      }
      //   const values = await form.getFieldsValue();
      // ตรวจสอบว่าค่าวันที่ไม่ถูกกำหนดในฟอร์ม ให้ใช้ค่าวันที่เดิม
      //   const updatedDate = date || bookingData.date;
      //   const updatedTime = time || bookingData.time;
      //   const updatedGrooming = grooming || bookingData.grooming;
      //   const updatedAddon = addon || bookingData.addon;
      const res = await axios.put(
        `/api/v1/admin/updateBookGrooming/${bookingId}`,
        {
          //   date: updatedDate,
          //   time: updatedTime,
          //   grooming: updatedGrooming,
          //   addon: updatedAddon,
          date: date || bookingData.date,
          time: time || bookingData.time,
          grooming: bookingDetails.grooming || bookingData.grooming,
          addon: bookingDetails.addon || bookingData.addon,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(bookingData.addon);
      if (res.data.success) {
        message.success(res.data.message);
        onClose();
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
      message.error('Update User booking Error');
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
        <h2 className="text-center">Edit Grooming hotel</h2>
        <br />
        <div className="ms-4">
          <Col xs={24} md={12} lg={15}>
            <Form.Item label="User ID" required>
              <Input type="text" value={bookingData?.userId} disabled />
            </Form.Item>
          </Col>
          <Row>
            <Form.Item
              label="Date"
              name="date"
              required
              rules={[{ required: true, message: 'Select Date' }]}
            >
              <DatePicker format={dateFormat} onChange={handleDateChange} />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              required
              rules={[{ required: true, message: 'Select Date' }]}
            >
              <TimePicker format={timeFormat} onChange={handleTimeChange} />
            </Form.Item>
          </Row>
          <Form.Item label="Service" name="grooming" required>
            <Select options={groomingOptions} mode="multiple" />
          </Form.Item>
          <Form.Item label="Add-on" name="addon" required>
            <Select options={addonOption} mode="multiple" />
          </Form.Item>

          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default EditBookedGrooming;
