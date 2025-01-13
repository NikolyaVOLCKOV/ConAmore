import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Данные для входа:", values);
    // Здесь будет обработка отправки данных на сервер
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Вход в магазин
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите ваш email" },
            { type: "email", message: "Введите корректный email" },
          ]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите ваш пароль" }]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <span>Нет аккаунта? </span>
        <Button type="link" onClick={() => navigate("/register")}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
