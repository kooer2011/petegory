import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Row, message } from "antd";

const EditGallery = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    image: "",
  });

  const getDetail = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/editGall/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const gallery = res.data.data;
      setValue(gallery);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("filename", value.image);

      const res = await axios.put(`/api/v1/admin/updateGall/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin/dashboard/gallery");
      }
    } catch (error) {
      console.error(error);
      message.error("Update image Error");
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);
  
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Edit Image Gallery</h2>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="m-3" >
            <label for="image" class="form-label me-2">
              <strong>Image</strong>
            </label>
            <input
              type="file"
              class="form-control me-2"
              id="image"
              name="filename"
              placeholder="Select Image"
              onChange={e => setValue({ ...value, image: e.target.files[0] })}
            />

            <button type="submit" class="btn btn-primary w-25 mt-3">
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default EditGallery