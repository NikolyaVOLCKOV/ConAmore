import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="block">
      <Title level={3}>О нас</Title>
      <Paragraph>
        Con Amore — это магазин, где каждый найдет что-то для себя. Мы гордимся качеством наших товаров и обслуживанием клиентов.
      </Paragraph>
    </div>
  );
};

export default About;
