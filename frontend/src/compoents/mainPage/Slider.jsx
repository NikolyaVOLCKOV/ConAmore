import React from "react";
import { Carousel } from "antd";

const Slider = () => {
  return (
    <div style={{ background: "#8D99AE", padding: "20px" }}>
      <Carousel autoplay>
        <div>
          <h3 style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Акция 1</h3>
        </div>
        <div>
          <h3 style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Новинка 1</h3>
        </div>
        <div>
          <h3 style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Скидка 20%</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
