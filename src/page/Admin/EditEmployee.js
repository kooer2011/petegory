import React, {useState, useEffect} from "react";
import { Select, Form, Input, message } from "antd";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const EditEmployee = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editEmployee/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
    });

      const user = res.data.data;
      setUserData(user);
      form.setFieldsValue(user); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(`/api/v1/admin/updateEmployee/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message)
        navigate('/admin/dashboard/employees')
      }
    } catch (error) {
      console.error(error);
      message.error('Update User Error')
    }
  }

  return (
    <Layout>
      <div className="mt-3 d-flex justify-content-center">
        <Form layout="vertical" form={form} onFinish={handleUpdate} className="m-3">
          <h1 className="text-center">Edit Employees</h1>

          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="input name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" placeholder="input email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            required
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="input phone" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            required
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a role">
              <Option value="barber">Barber</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <button className="btn btn-primary form-btn" type="submit">
            Update
          </button>
        </Form>
      </div>
    </Layout>
  );
};

export default EditEmployee;
