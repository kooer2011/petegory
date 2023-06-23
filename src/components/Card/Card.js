import { Button } from 'react-bootstrap';
import './Card.css';
import { useState } from 'react';

function GridExample() {
  const [cards] = useState([
    {
      title: 'Grooming',
      text: 'Grooming',
    },
    {
      title: 'Hotel',
      text: 'HOTEL',
    },
    {
      title: 'FEEDBACK',
      text: 'ALL FEEDBACK',
    },
  ]);

  return (
    <div>
      <section>
        <div className="container_card">
          <h1>WELCOME TO PET’EGORY </h1>
          <div className="cards">
            {cards.map((card, i) => (
              <div key={i} className="card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <button className="btnRead">Read more</button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default GridExample;
