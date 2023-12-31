import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateGallery = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    image: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.image) {
      // ถ้าไม่มีรูปที่เลือก
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณาเลือกรูปภาพ",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("filename", data.image);
      axios.post("/api/v1/admin/createGall", formData, {
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
      navigate("/admin/dashboard/gallery");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2>Add Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="m-3">
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

            <button type="submit" class="btn btn-primary w-25 mt-3">
              Create
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateGallery;
