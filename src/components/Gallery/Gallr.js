import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallr.css";

const Gallr = () => {

  const [gallery, setGallery] = useState([]);

  const getImage = async () => {
    try {
      const res = await axios.get("api/v1/user/getGall");
      if (res.data.success) {
        setGallery(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="gallery">
      {gallery.map((item, index) => (
        <div className="pics" key={index}>
          <img
            className="pics-size"
            src={`http://localhost:3000/images/${item.image}`}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallr;
