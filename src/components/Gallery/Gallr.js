import React from 'react';
import img1 from '../../imgs/cat2.jpg';
import img2 from '../../imgs/cat_cow.jpg';
import img3 from '../../imgs/cat3.jpg';
import img4 from '../../imgs/cat4.jpg';
import img5 from '../../imgs/dog.jpg';
import img6 from '../../imgs/dog2.jpg';
import img7 from '../../imgs/dog3.jpg';
import img8 from '../../imgs/dog4.jpg';
import './Gallr.css';

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

  const handleImageClick = imgSrc => {
    // Do something when an image is clicked, e.g., navigate to a new page or show a detailed view
    console.log('Image clicked:', imgSrc);
  };

  return (
    <div className="gallery">
      {data.map((item, index) => (
        <div
          className="pics"
          key={index}
          onClick={() => handleImageClick(item.imgSrc)}
        >
          <img className="pics-size" src={item.imgSrc} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallr;
