import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import './Card.css';
import imgs from '../../imgs/promotion_1.jpg';
import img2 from '../../imgs/promotion_2.jpg';
import img3 from '../../imgs/promotion_3.jpg';

function GridExample() {
  const gridStyle = {
    textAlign: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = imageSrc => {
    setModalImage(imageSrc);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalImage(null);
  };

  return (
    <div className="item__Card">
      <Card className="card_info" title="NEWS">
        <Card.Grid
          style={gridStyle}
          className="card_grid"
          onClick={() => handleImageClick(imgs)}
        >
          <img src={imgs} alt="Image 1" className="card_image" />
        </Card.Grid>
        <Card.Grid
          style={gridStyle}
          className="card_grid"
          onClick={() => handleImageClick(img2)}
        >
          <img src={img2} alt="Image 2" className="card_image" />
        </Card.Grid>
        <Card.Grid
          style={gridStyle}
          className="card_grid"
          onClick={() => handleImageClick(img3)}
        >
          <img src={img3} alt="Image 3" className="card_image" />
        </Card.Grid>
      </Card>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        centered
      >
        {modalImage && <img src={modalImage} alt="Modal Image" />}
      </Modal>
    </div>
  );
}

export default GridExample;
