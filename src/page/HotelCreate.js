import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Swal from "sweetalert2";
import { Row } from "antd";

const HotelCreate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    type: "",
    price: "",
    title1: "",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("type", data.type);
      formData.append("price", data.price);
      formData.append("title1", data.title1);
      formData.append("title2", data.title2);
      formData.append("title3", data.title3);
      formData.append("title4", data.title4);
      formData.append("title5", data.title5);
      formData.append("filename", data.image);
      axios.post("/api/v1/admin/createHotels", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "เพิ่มข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/admin/dashboard/hotel");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Add Hotel</h2>
        <form class="row g-3 w-50" onSubmit={handleSubmit}>
          <div class="col-12">
            <label for="inputName" class="form-label">
              <strong>Type</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Type Room"
              autoComplete="off"
              onChange={(e) => setData({ ...data, type: e.target.value })}
            />
          </div>
          <Row>
            <div class="me-4">
              <label for="price" class="form-label">
                <strong>Price Room</strong>
              </label>
              <input
                type="number"
                class="form-control"
                id="price"
                placeholder="input price"
                autoComplete="off"
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div>
              <label for="price" class="form-label">
                <strong>Price/Hr</strong>
              </label>
              <input
                type="number"
                class="form-control"
                id="title1"
                placeholder="input price"
                autoComplete="off"
                onChange={(e) => setData({ ...data, title1: e.target.value })}
              />
            </div>
          </Row>
          <Row>
          <div class="row-12">
            <label for="title" class="form-label">
              <strong>Title2</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="title2"
              placeholder="Input Someting"
              onChange={(e) => setData({ ...data, title2: e.target.value })}
            />
          </div>
          <div class="row-12">
            <label for="title" class="form-label">
              <strong>Title3</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="title3"
              placeholder="Input Someting"
              onChange={(e) => setData({ ...data, title3: e.target.value })}
            />
          </div>
          </Row>
          <div class="col-12">
            <label for="title" class="form-label">
              <strong>Title4</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="title4"
              placeholder="Input Someting"
              onChange={(e) => setData({ ...data, title4: e.target.value })}
            />
          </div>
          <div class="col-12">
            <label for="title" class="form-label">
              <strong>Title5</strong>
            </label>
            <input
              type="text"
              class="form-control"
              id="title5"
              placeholder="Input Someting"
              onChange={(e) => setData({ ...data, title5: e.target.value })}
            />
          </div>

          <div class="col-10 d-flex flex-row">
            <label for="image" class="form-label me-2">
              <strong>Image</strong>
            </label>
            <input
              type="file"
              class="form-control me-2"
              id="image"
              name="filename"
              placeholder="Select Image"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />

            <button type="submit" class="btn btn-primary w-25">
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default HotelCreate;
