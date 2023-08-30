import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Row, message } from "antd";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [value, setValue] = useState({});
  const [value, setValue] = useState({
    type: "",
    price: "",
    title1: "",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
    image: "",
  });

  const getDetail = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editHotel/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const hotel = res.data.data;
      setValue(hotel);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      // const data = {
      //   type: value.type,
      //   price: value.price,
      //   title1: value.title1,
      //   title2: value.title2,
      //   title3: value.title3,
      //   title4: value.title4,
      //   title5: value.title5,
      //   image: value.image,
      // };
      const data = new FormData();
      data.append("type", value.type);
      data.append("price", value.price);
      data.append("title1", value.title1);
      data.append("title2", value.title2);
      data.append("title3", value.title3);
      data.append("title4", value.title4);
      data.append("title5", value.title5);
      data.append("filename", value.image);

      console.log(value.image);
      const res = await axios.put(`/api/v1/admin/updateHotel/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin/dashboard/hotel");
      }
    } catch (error) {
      console.error(error);
      message.error("Update Hotel Error");
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Add Hotel</h2>
        <form class="row g-3 w-50" onSubmit={handleUpdate} encType="multipart/form-data">
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
              value={value.type}
              onChange={(e) => setValue({ ...value, type: e.target.value })}
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
                value={value.price}
                onChange={(e) => setValue({ ...value, price: e.target.value })}
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
                value={value.title1}
                onChange={(e) => setValue({ ...value, title1: e.target.value })}
              />
            </div>
          </Row>
          <Row>
            <div class="w-50">
              <label for="title" class="form-label">
                <strong>Title2</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="title2"
                placeholder="Input Someting"
                value={value.title2}
                onChange={(e) => setValue({ ...value, title2: e.target.value })}
              />
            </div>
            <div class="w-50">
              <label for="title" class="form-label">
                <strong>Title3</strong>
              </label>
              <input
                type="text"
                class="form-control"
                id="title3"
                placeholder="Input Someting"
                value={value.title3}
                onChange={(e) => setValue({ ...value, title3: e.target.value })}
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
              value={value.title4}
              onChange={(e) => setValue({ ...value, title4: e.target.value })}
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
              value={value.title5}
              onChange={(e) => setValue({ ...value, title5: e.target.value })}
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
              onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
              // onChange={(e) => {
              //   const selectedImage = e.target.files[0];
              //   setValue((prevValue) => ({
              //     ...prevValue,
              //     image: selectedImage,
              //   }));
              // }}
            />

            <button type="submit" class="btn btn-primary w-25">
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditHotel;
