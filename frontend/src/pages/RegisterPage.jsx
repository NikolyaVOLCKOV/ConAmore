import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Данные для регистрации:", values);
    // Здесь будет обработка отправки данных на сервер
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Регистрация
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите ваше имя" }]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>
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
        <Form.Item
          label="Подтверждение пароля"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Подтвердите ваш пароль" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Подтвердите пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <span>Уже есть аккаунт? </span>
        <Button type="link" onClick={() => navigate("/login")}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
