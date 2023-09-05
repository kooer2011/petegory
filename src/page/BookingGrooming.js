import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Button,
  Row,
  DatePicker,
  TimePicker,
  Col,
  Select,
  message,
} from 'antd';
import './styles/bookedgroom.css';
import { ProfileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import NavbarHeader from '../components/Navbar';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const BookingGrooming = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(0);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  console.log(date);
  console.log(time);

  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';

  const onSubmitPersonalForm = values => {
    setPersonalDetails(values);
    setCurrent(1);
  };
  const onSubmitSerciveForm = values => {
    setServiceDetails(values);
    setCurrent(2);
  };
  const handleDateChange = dateString => {
    const formattedDate = moment(dateString, dateFormat).format('DD-MM-YYYY');
    setDate(formattedDate);
  };
  const handleTimeChange = timeString => {
    const formattedTime = moment(timeString, timeFormat).format('HH:mm');
    setTime(formattedTime);
  };

  const handleChange = (dateString, timeString) => {
    handleDateChange(dateString);
    handleTimeChange(timeString);
  };

  const initialValues = {
    ...personalDetails, // ข้อมูลจาก PersonalForm
    ...serviceDetails, // ข้อมูลจาก ServiceForm
  };

  const isTimeBooking = async (time, date, grooming) => {
    try {
      const response = await axios.get('/api/v1/user/isTimeBooked', {
        params: {
          time,
          date,
          grooming,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data.bookedTimeSlots;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const handleSubmit = async values => {
    try {
      dispatch(showLoading());

      if (!values.time) {
        dispatch(hideLoading());
        message.error('Please select a Room Number.');
        return;
      }

      const isTimeAlreadyBooked = await isTimeBooking(
        date,
        time,
        values.grooming
      );

      if (isTimeAlreadyBooked) {
        dispatch(hideLoading());
        message.error('This time is already booked.');
        return;
      }

      const res = await axios.post(
        '/api/v1/user/bookGrooming',
        {
          ...values,
          userId: user._id,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(values);
      dispatch(hideLoading());

      //api google sheet
      // await axios.post(
      //   'https://sheet.best/api/sheets/cf3ac1d9-a6ba-40bd-9fd9-3644b116aaf8',
      //   {
      //     ...values,
      //     date: date,
      //     time: time,
      //   }
      // );

      if (res.data.success) {
        message.success(res.data.message);
        // navigate('/');
        alert('จองแล้ว');
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
        message.error('Something Went Wrong');
      }
    }
  };

  const forms = [
    <PersonalForm
      onFinish={onSubmitPersonalForm}
      initialValues={personalDetails}
    />,
    <ServiceForm
      onFinish={onSubmitSerciveForm}
      initialValues={serviceDetails}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      onChange={handleChange}
    />,
    <Confirm initialValues={initialValues} />,
  ];
  const isStepDisables = stepNumber => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return personalDetails === null;
    }
    if (stepNumber === 2) {
      return personalDetails === null || serviceDetails === null;
    }
  };
  return (
    <>
      <NavbarHeader />
      <div className="app">
        <div className="step">
          <Steps className="head" onChange={setCurrent} current={current}>
            <Steps.Step
              disabled={isStepDisables(0)}
              title="First"
              icon={<ProfileOutlined />}
            />
            <Steps.Step
              disabled={isStepDisables(1)}
              title="Second"
              icon={<ProfileOutlined />}
            />
            <Steps.Step
              disabled={isStepDisables(2)}
              title="Confirm"
              icon={<CheckCircleOutlined />}
            />
          </Steps>
          {forms[current]}
        </div>
      </div>
    </>
  );
};

//////////////////
function PersonalForm({ onFinish, initialValues }) {
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Row>
        <Col xs={24} md={24} lg={12}>
          <Form.Item
            className="me-3"
            name="PetName"
            rules={[{ message: 'Please enter your pet name', required: true }]}
          >
            <Input type="text" placeholder="Pet Name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <Form.Item
            name="Name"
            rules={[{ message: 'Please enter your name', required: true }]}
          >
            <Input type="text" placeholder="Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} lg={12}>
          <Form.Item
            className="me-3"
            name="breed"
            rules={[{ message: 'Please select breed', required: true }]}
          >
            <Select
              placeholder="Select breed"
              // onChange={handleRoomTypeChange}
              options={[
                {
                  label: 'Cat',
                  options: [
                    {
                      label: 'แมวขนสั้น',
                      value: 'แมวขนสั้น',
                    },
                    {
                      label: 'แมวขนยาว',
                      value: 'แมวขนยาว',
                    },
                  ],
                },
                {
                  label: 'Dog',
                  options: [
                    {
                      label: 'ปอม',
                      value: 'ปอม',
                    },
                    {
                      label: 'ชิวาว่า',
                      value: 'ชิวาว่า',
                    },
                    {
                      label: 'พุดเดิ้ล',
                      value: 'พุดเดิ้ล',
                    },
                    {
                      label: 'ชิสุห์',
                      value: 'ชิสุห์',
                    },
                    {
                      label: 'คอร์กี้',
                      value: 'คอร์กี้',
                    },
                    {
                      label: 'โกลเด้น',
                      value: 'โกลเด้น',
                    },
                    {
                      label: 'ไซบีเรียน',
                      value: 'ไซบีเรียน',
                    },
                    {
                      label: 'ซามอยด์',
                      value: 'ซามอยด์',
                    },
                    {
                      label: 'ขนยาว/บาง',
                      value: 'ขนยาว/บาง',
                    },
                  ],
                },
              ]}
            >
              {/* <Option value="ShortCat">แมวขนสั้น</Option>
              <Option value="LongCat">แมวขนยาว</Option>
              <Option value="Pom">ปอม</Option>
              <Option value="Chihuahua">ชิวาว่า</Option>
              <Option value="Poodle">พุดเดิ้ล</Option>
              <Option value="ShihTzu">ชิสุห์</Option>
              <Option value="Corgi">คอร์กี้</Option>
              <Option value="Golden">โกลเด้น</Option>
              <Option value="Siberian">ไซบีเรียน</Option>
              <Option value="Samoyed">ซามอยด์</Option>
              <Option value="Fur">ขนยาว/บาง</Option> */}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={24} lg={12}>
          <Form.Item
            name="pet_type"
            rules={[{ message: 'Please select pet type', required: true }]}
          >
            <Select
              placeholder="Select pet type"
              // onChange={handleRoomTypeChange}
            >
              <Option value="Cat">Cat</Option>
              <Option value="Dog">Dog</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" className="float-end">
        Continue
      </Button>
    </Form>
  );
}
function ServiceForm({
  onFinish,
  initialValues,
  dateFormat,
  timeFormat,
  onChange,
}) {
  const handleDateChange = (date, dateString) => {
    // เรียกใช้ onChange ที่ถูกส่งมาจาก parent component
    onChange(dateString, date);
  };

  const handleTimeChange = (time, timeString) => {
    // เรียกใช้ onChange ที่ถูกส่งมาจาก parent component
    onChange(time, timeString);
  };
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        name="grooming"
        rules={[{ message: 'Please select service', required: true }]}
      >
        <Select
          placeholder="บริการหลัก"
          mode="multiple"
          // onChange={handleRoomTypeChange}
        >
          <Option value="อาบน้ำ">อาบน้ำ</Option>
          <Option value="ตัดขน">ตัดขน</Option>
        </Select>
      </Form.Item>

      <Form.Item name="addon">
        <Select
          placeholder="บริการเสริม"
          mode="multiple"
          // onChange={handleRoomTypeChange}
        >
          <Option value="เช็ดหู">เช็ดหู</Option>
          <Option value="แปรงฟัน">แปรงฟัน</Option>
          <Option value="ตัดเล็บ+ตะไบเล็บ">ตัดเล็บ+ตะไบเล็บ</Option>
          <Option value="ฟอกน้ำยา Malaceb เชื้อรา">
            ฟอกน้ำยา Malaceb เชื้อรา
          </Option>
          <Option value="ฟอกน้ำยา Hexine ลดแบคทีเรีย">
            ฟอกน้ำยา Hexine ลดแบคทีเรีย
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ message: 'Please select date', required: true }]}
      >
        <DatePicker
          format={dateFormat}
          placeholder="select date"
          disabledDate={current => current && current < moment().startOf('day')}
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        name="time"
        rules={[{ message: 'Please select time', required: true }]}
      >
        <TimePicker
          format={timeFormat}
          placeholder="select time"
          hideDisabledOptions
          disabledHours={() =>
            [...Array(24).keys()].filter(h => h < 9 || h > 20)
          }
          onChange={handleTimeChange}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ message: 'Please enter your phone number', required: true }]}
      >
        <Input type="number" placeholder="phone number" />
      </Form.Item>

      <Form.Item
        name="idline"
        rules={[{ message: 'Please enter your line id', required: true }]}
      >
        <Input type="text" placeholder="line ID" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="float-end">
        Continue
      </Button>
    </Form>
  );
}

function Confirm({ initialValues }) {
  return (
    <div>
      <Form initialValues={initialValues}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <strong>Pet Name</strong>
            <p>{initialValues.PetName}</p>
          </div>
          <hr />
          <div>
            <strong>Name</strong>
            <p>{initialValues.Name}</p>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <strong>Breed</strong>
            <p>{initialValues.breed}</p>
          </div>
          <hr />
          <div style={{ marginLeft: '50px' }}>
            <strong>Pet Type</strong>
            <p>{initialValues.pet_type}</p>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: 'center' }}>
          <strong>Services</strong>
          <p>{initialValues.grooming.join(', ')}</p>
        </div>
        <hr />
        <div style={{ textAlign: 'center' }}>
          <strong>Add-on</strong>
          <p>{initialValues.addon.join(', ')}</p>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <strong>Date</strong>
            <p>{moment(initialValues.date).format('DD-MM-YYYY')}</p>
          </div>
          <div style={{ marginLeft: '50px' }}>
            <strong>Time</strong>
            <p>{moment(initialValues.time, 'HH:mm').format('HH:mm')}</p>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <div>
            <strong>Phone</strong>
            <p>{initialValues.phone}</p>
          </div>
          <hr />
          <div>
            <strong>Lind ID</strong>
            <p>{initialValues.idline}</p>
          </div>
        </div>
      </Form>
      <Button type="primary" className="float-end">
        Confirm
      </Button>
    </div>
  );
}

export default BookingGrooming;
