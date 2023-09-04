import React, { useEffect, useState } from "react";
import axios from "axios";

import img1 from "../../imgs/cat2.jpg";
import img2 from "../../imgs/cat_cow.jpg";
import img3 from "../../imgs/cat3.jpg";
import img4 from "../../imgs/cat4.jpg";
import img5 from "../../imgs/dog.jpg";
import img6 from "../../imgs/dog2.jpg";
import img7 from "../../imgs/dog3.jpg";
import img8 from "../../imgs/dog4.jpg";
import "./Gallr.css";

const Gallr = () => {
  const data = [
    { id: 1, imgSrc: img1 },
    { id: 2, imgSrc: img2 },
    { id: 3, imgSrc: img3 },
    { id: 4, imgSrc: img4 },
    { id: 5, imgSrc: img5 },
    { id: 6, imgSrc: img6 },
    { id: 7, imgSrc: img7 },
    { id: 8, imgSrc: img8 },
  ];

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
