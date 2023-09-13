import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editUser/${id}`, {
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
      const res = await axios.put(`/api/v1/admin/updateUser/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin/dashboard/users");
      }
    } catch (error) {
      console.error(error);
      message.error("ไม่สามารถแก้ไขข้อมูลได้");
    }
  };

  return (
    <Layout>
      <div className="mt-3 d-flex justify-content-center">
        <Form
          layout="vertical"
          className="m-3"
          form={form}
          onFinish={handleUpdate}
        >
          <h1 className="text-center">Edit User</h1>

          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="input name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="text" placeholder="input email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input
              type="number"
              placeholder="input phone"
            />
          </Form.Item>
          <button className="btn btn-primary form-btn" type="submit">
            Update
          </button>
        </Form>
      </div>
    </Layout>
  );
};

export default EditUser;
