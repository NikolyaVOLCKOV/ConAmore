import React from "react";
import { Layout, Menu, Input, Button } from "antd";
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#2B2D42" }}>
      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Con Amore</div>
      <Menu mode="horizontal" theme="dark" style={{ flex: 1, marginLeft: "20px" }}>
        <Menu.Item key="1">Главная</Menu.Item>
        <Menu.Item key="2">Каталог</Menu.Item>
        <Menu.Item key="3">О нас</Menu.Item>
        <Menu.Item key="4">Контакты</Menu.Item>
      </Menu>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input placeholder="Поиск" style={{ width: 200 }} />
        <Button type="primary">Искать</Button>
        <Button type="default">Войти</Button>
        <Button type="default">Корзина</Button>
      </div>
    </Header>
  );
};

export default AppHeader;
