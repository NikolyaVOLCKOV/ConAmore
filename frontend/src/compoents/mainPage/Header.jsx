import React from "react";
import { Layout, Menu, Input, Button, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // для навигации между страницами

const { Header } = Layout;

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Заглушка для проверки авторизации
  const navigate = useNavigate(); // Используем для перехода между страницами

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#2B2D42",
      }}
    >
      {/* Логотип */}
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")} // Переход на главную страницу
      >
        Con Amore
      </div>

      {/* каталог */}
      <Button
        type="default"
        style={{ marginLeft: "40px" }}
        onClick={() => navigate("/catalog")} // Переход на страницу каталога
      >
        Каталог
      </Button>

      {/* Поиск */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Input.Search
          placeholder="Поиск товаров"
          allowClear
          enterButton="Искать"
          size="large"
          onSearch={(value) => {
            console.log("Поиск:", value); // Заглушка: можно реализовать поиск через API
          }}
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Контактный блок */}
      <div
        style={{
          marginRight: "20px",
          color: "white",
          textAlign: "center",
          display: "flex",
          flexDirection: "column", 
          justifyContent: "center", 
          lineHeight: "1.2", 
        }}
      >
        <div>г. Липецк, ул. П.И. Смородина, 13А</div>
        <div>+7 (904) 295-03-10</div>
      </div>

      {/* Кнопки входа/личного кабинета и корзина */}
      <Space>
        {isLoggedIn ? (
          <Button
            type="default"
            icon={<UserOutlined />}
            onClick={() => navigate("/profile")} // Переход в личный кабинет
          >
            Личный кабинет
          </Button>
        ) : (
          <Button
            type="default"
            onClick={() => navigate("/login")} // Переход на страницу входа
          >
            Войти
          </Button>
        )}
        <Button
          type="default"
          icon={<ShoppingCartOutlined />}
          onClick={() => navigate("/cart")} // Переход на страницу корзины
        />
      </Space>
    </Header>
  );
};

export default AppHeader;
