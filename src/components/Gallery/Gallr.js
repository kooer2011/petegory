import { React, useState } from 'react';
import { IconName, AiOutlineClose } from 'react-icons/ai';
import img1 from '../../imgs/cat2.jpg'
import img2 from '../../imgs/cat_cow.jpg'
import img3 from '../../imgs/cat3.jpg'
import img4 from '../../imgs/cat4.jpg'
import img5 from '../../imgs/dog.jpg'
import img6 from '../../imgs/dog2.jpg'
import img7 from '../../imgs/dog3.jpg'
import img8 from '../../imgs/dog4.jpg'
import img9 from '../../imgs/dog5.jpg'

const Gallr = () => {
    let data = [
      {
        id: 1,
        imgSrc: img1,
      },
      {
        id: 2,
        imgSrc: img2,
      },
      {
        id: 3,
        imgSrc: img3,
      },
      {
        id: 4,
        imgSrc: img4,
      },
      {
        id: 5,
        imgSrc: img5,
      },
      {
        id: 6,
        imgSrc: img6,
      },
      {
        id: 7,
        imgSrc: img7,
      },
      {
        id: 8,
        imgSrc: img8,
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

  export default Gallr;