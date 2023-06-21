import { React, useState } from 'react';
import NavbarHeader from '../components/Navbar';
import { IconName, AiOutlineClose } from 'react-icons/ai';
import img2 from '../imgs/raw2.jpg';
import img3 from '../imgs/CatHeros.jpg';
import img4 from '../imgs/COUTER1.jpg';
import './gallery.css';
const Gallr = () => {
  let data = [
    {
      id: 1,
      imgSrc: img3,
    },
    {
      id: 2,
      imgSrc: img3,
    },
    {
      id: 3,
      imgSrc: img3,
    },
    {
      id: 4,
      imgSrc: img3,
    },
  ];

  const [model, setModel] = useState(false);
  const [temimgSrc, setTempImgSrc] = useState('');

  const getImg = imgSrc => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  return (
    <>
      <div className={model ? 'model open' : 'model'}>
        <img src={temimgSrc} />

        <AiOutlineClose onClick={() => setModel(false)} />
      </div>

      <div className="gallery">
        {data.map((item, index) => {
          return (
            <div
              className="pics"
              key={index}
              onClick={() => getImg(item.imgSrc)}
            >
              <img className="pics-size" src={item.imgSrc} />
            </div>
          );
        })}
      </div>
    </>
  );
};

function GaLLery() {
  return (
    <div>
      {' '}
      <NavbarHeader /> <h1>GALLERY</h1>
      <Gallr />
    </div>
  );
}

export default GaLLery;
