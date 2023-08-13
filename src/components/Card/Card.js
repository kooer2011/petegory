import React from 'react';
import { Card } from 'antd';
import './Card.css';
import imgs from '../../imgs/promotion_1.jpg';
import img2 from '../../imgs/promotion_2.jpg';
import img3 from '../../imgs/promotion_3.jpg';

function GridExample() {
  const gridStyle = {
    textAlign: 'center',
    borderRadius: 30,
    overflow: 'hidden', // Ensures the animation doesn't overflow
  };

  return (
    <div className="item__Card">
      <Card className="card_info" title="NEWS">
        <Card.Grid style={gridStyle} className="card_grid">
          <img src={imgs} alt="Image 1" className="card_image" />
        </Card.Grid>
        <Card.Grid style={gridStyle} className="card_grid">
          <img src={img2} alt="Image 2" className="card_image" />
        </Card.Grid>
        <Card.Grid style={gridStyle} className="card_grid">
          <img src={img3} alt="Image 3" className="card_image" />
        </Card.Grid>
      </Card>
    </div>
  );
}

export default GridExample;
