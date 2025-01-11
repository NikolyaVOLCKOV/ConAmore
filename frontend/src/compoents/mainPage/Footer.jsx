import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", background: "#2B2D42", color: "white" }}>
      <p>Подпишитесь на нас в социальных сетях:</p>
      <a href="#" style={{ color: "#EDF2F4", margin: "0 10px" }}>Whatsapp</a>
      <a href="#" style={{ color: "#EDF2F4", margin: "0 10px" }}>VK</a>
      <a href="#" style={{ color: "#EDF2F4", margin: "0 10px" }}>Telegram</a>
      <p>Контакты: info@conamore.ru</p>
    </Footer>
  );
};

export default AppFooter;
