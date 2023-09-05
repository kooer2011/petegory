import React, { useEffect, useState } from 'react';
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
  Typography,
} from 'antd';
import './styles/bookedgroom.css';
import { ProfileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import NavbarHeader from '../components/Navbar';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';

const { Option } = Select;

const timeSlotsOption = [
  { value: '9:00', label: '9:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
];

const BookingGrooming = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(0);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  console.log('date select: ', date);
  // const [time, setTime] = useState("");

  const [timeSlots, setTimeSlots] = useState([]);

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
    console.log(date);
  };

  const initialValues = {
    ...personalDetails, // ข้อมูลจาก PersonalForm
    ...serviceDetails, // ข้อมูลจาก ServiceForm
  };

  const isTimeBooking = async (time, date) => {
    try {
      const response = await axios.get('/api/v1/user/isTimeBooked', {
        params: {
          time,
          date,
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

      const isTimeAlreadyBooked = await isTimeBooking(values.time, date);

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
          // time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(values);
      dispatch(hideLoading());

      // api google sheet
      await axios.post(
        'https://sheet.best/api/sheets/045a6e1f-dd99-49d1-9afb-4159a0084ecc',
        {
          ...values,
          date: date,
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (date) {
      const updateTimeOptions = async () => {
        const updatedOptions = [];
        const slots = timeSlotsOption || [];

        for (const time of slots) {
          const isBooked = await isTimeBooking(time.value, date);
          updatedOptions.push({
            ...time,
            disabled: isBooked,
          });
        }

        setTimeSlots(updatedOptions);
      };

      updateTimeOptions();
    }
    if (user) {
      setUserId(user._id);
    }
  }, [user, date]);

  const handleChange = dateString => {
    handleDateChange(dateString);
  };

  const forms = [
    <PersonalForm
      onFinish={onSubmitPersonalForm}
      initialValues={personalDetails}
    />,
    <ServiceForm
      onFinish={onSubmitSerciveForm}
      initialValues={serviceDetails}
      // initialValues={{
      //   date: moment().format(dateFormat),
      //   time: moment().format(timeFormat),
      //   ...serviceDetails,
      // }}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      onChange={handleChange}
      timeSlots={timeSlots}
    />,
    <Confirm initialValues={initialValues} onFinish={handleSubmit} />,
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
    <div className="bookinggroom_container">
      <NavbarHeader />
      <div className="app">
        <div style={{ backgroundColor: '#d7d0c8' }} className="step">
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
    </div>
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
            ></Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={24} lg={12}>
          <Form.Item
            name="pet_type"
            rules={[{ message: 'Please select pet type', required: true }]}
          >
            <Select placeholder="Select pet type">
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
  onChange,
  timeSlots,
}) {
  const handleChange = (date, dateString) => {
    // เรียกใช้งาน onChange ที่ถูกส่งมาจาก parent component
    onChange(dateString, date);
  };

  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        name="grooming"
        rules={[{ message: 'Please select service', required: true }]}
      >
        <Select placeholder="บริการหลัก" mode="multiple">
          <Option value="อาบน้ำ">อาบน้ำ</Option>
          <Option value="ตัดขน">ตัดขน</Option>
        </Select>
      </Form.Item>

      <Form.Item name="addon">
        <Select placeholder="บริการเสริม" mode="multiple">
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
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        name="time"
        rules={[{ message: 'Please select time', required: true }]}
      >
        <Select placeholder="Select Time">
          {timeSlots.map(time => (
            <Option
              key={time.value}
              value={time.value}
              disabled={time.disabled}
            >
              {time.label}
            </Option>
          ))}
        </Select>
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

function Confirm({ initialValues, onFinish }) {
  return (
    <div>
      <Form initialValues={initialValues} onFinish={onFinish}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Form.Item name="PetName">
            <strong>Pet Name</strong>
            <Input disabled value={initialValues.PetName} />
          </Form.Item>

          <Form.Item name="Name">
            <strong>Name</strong>
            <Input disabled value={initialValues.Name} />
          </Form.Item>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Form.Item name="breed">
            <strong>Breed</strong>
            <Input disabled value={initialValues.breed} />
          </Form.Item>

          <Form.Item name="pet_type">
            <strong>Pet Type</strong>
            <Input disabled value={initialValues.pet_type} />
          </Form.Item>
        </div>
        <hr />

        <div style={{ textAlign: 'center' }}>
          <Form.Item name="grooming">
            <strong>Services</strong>
            <Input
              disabled
              value={initialValues.grooming}
              className="text-center"
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Form.Item name="addon">
            <strong>Add-on</strong>
            <Input
              disabled
              value={initialValues.addon}
              className="text-center"
            />
          </Form.Item>
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
          <Form.Item name="date">
            <strong>Date</strong>
            <Input
              disabled
              value={moment(initialValues.date).format('DD-MM-YYYY')}
            />
          </Form.Item>

          <Form.Item name="time">
            <strong>Time</strong>
            <Input
              disabled
              value={moment(initialValues.time, 'HH:mm').format('HH:mm')}
            />
          </Form.Item>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Form.Item name="phone">
            <strong>Phone</strong>
            <Input disabled value={initialValues.phone} />
          </Form.Item>

          <Form.Item name="idline">
            <strong>Lind ID</strong>
            <Input disabled value={initialValues.idline} />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" className="float-end">
          Confirm
        </Button>
      </Form>
    </div>
  );
}

export default BookingGrooming;