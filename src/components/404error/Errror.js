import React from "react";
import './style/style.css'
import img from './image/Scarecrow.png'

const Errror = () => {
  return (
    <main>
    

    <section id="content">
      <div class="part_1">
          <img src={img} alt="Scarecrow Image"/>
      </div>

      <div class="part_2">
        <div class="text_1">
          <h2>404 NOT FOUND</h2>
        </div>

        <div class="button_part">
          <a href="/"><button class="btn">Back To Homepage</button></a>
      </div>
      </div>
    </section>
  </main>
  );
};

export default Errror;
