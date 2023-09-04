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
} from 'antd';
import './styles/bookedgroom.css';
import { ProfileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import NavbarHeader from '../components/Navbar';
import moment from 'moment';

const { Option } = Select;

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
                      value: 'ShortCat',
                    },
                    {
                      label: 'แมวขนยาว',
                      value: 'LongCat',
                    },
                  ],
                },
                {
                  label: 'Dog',
                  options: [
                    {
                      label: 'ปอม',
                      value: 'Pom',
                    },
                    {
                      label: 'ชิวาว่า',
                      value: 'Chihuahua',
                    },
                    {
                      label: 'พุดเดิ้ล',
                      value: 'Poodle',
                    },
                    {
                      label: 'ชิสุห์',
                      value: 'ShihTzu',
                    },
                    {
                      label: 'คอร์กี้',
                      value: 'Corgi',
                    },
                    {
                      label: 'โกลเด้น',
                      value: 'Golden',
                    },
                    {
                      label: 'ไซบีเรียน',
                      value: 'Siberian',
                    },
                    {
                      label: 'ซามอยด์',
                      value: 'Samoyed',
                    },
                    {
                      label: 'ขนยาว/บาง',
                      value: 'Fur',
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
function ServiceForm({ onFinish, initialValues }) {
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
          <Option value="Grooming">อาบน้ำ</Option>
          <Option value="Haircut">ตัดขน</Option>
        </Select>
      </Form.Item>

      <Form.Item name="addon">
        <Select
          placeholder="บริการเสริม"
          mode="multiple"
          // onChange={handleRoomTypeChange}
        >
          <Option value="addon1">เช็ดหู</Option>
          <Option value="addon2">แปรงฟัน</Option>
          <Option value="addon3">ตัดเล็บ+ตะไบเล็บ</Option>
          <Option value="addon4">ฟอกน้ำยา Malaceb เชื้อรา</Option>
          <Option value="addon5">ฟอกน้ำยา Hexine ลดแบคทีเรีย</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ message: 'Please select date', required: true }]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          placeholder="select date"
          disabledDate={current => current && current < moment().startOf('day')}
        />
      </Form.Item>

      <Form.Item
        name="time"
        rules={[{ message: 'Please select time', required: true }]}
      >
        <TimePicker
          format="HH:mm"
          placeholder="select time"
          hideDisabledOptions
          disabledHours={() =>
            [...Array(24).keys()].filter(h => h < 9 || h > 20)
          }
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
        <Form.Item label="Pet Name" name="PetName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Name" name="Name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Breed" name="breed">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Pet Type" name="pet_type">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Selected Services" name="grooming">
          <Select mode="multiple" disabled>
            <Option value="Grooming">อาบน้ำ</Option>
            <Option value="Haircut">ตัดขน</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Add-on Services" name="addon">
          <Select mode="multiple" disabled>
            <Option value="addon1">เช็ดหู</Option>
            <Option value="addon2">แปรงฟัน</Option>
            <Option value="addon3">ตัดเล็บ+ตะไบเล็บ</Option>
            <Option value="addon4">ฟอกน้ำยา Malaceb เชื้อรา</Option>
            <Option value="addon5">ฟอกน้ำยา Hexine ลดแบคทีเรีย</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Time" name="time">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Line ID" name="idline">
          <Input disabled />
        </Form.Item>
      </Form>
      <Button type="primary" className="float-end">
        Confirm
      </Button>
    </div>
  );
}

const BookingGrooming = () => {
  const [current, setCurrent] = useState(0);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);

  const onSubmitPersonalForm = values => {
    setPersonalDetails(values);
    setCurrent(1);
  };
  const onSubmitSerciveForm = values => {
    setServiceDetails(values);
    setCurrent(2);
  };

  const initialValues = {
    ...personalDetails, // ข้อมูลจาก PersonalForm
    ...serviceDetails, // ข้อมูลจาก ServiceForm
  };

  const forms = [
    <PersonalForm
      onFinish={onSubmitPersonalForm}
      initialValues={personalDetails}
    />,
    <ServiceForm
      onFinish={onSubmitSerciveForm}
      initialValues={serviceDetails}
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

export default BookingGrooming;
