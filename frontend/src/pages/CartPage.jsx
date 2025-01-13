// src/pages/CartPage.js
import React, { useState, useEffect } from "react";
import { Button, Spin, Empty } from "antd";
import { getLocalCart, removeFromLocalCart, updateLocalCartQuantity } from "../utils/CartUtils";
import CartItem from "../components/CartItem";

const CartPage = ({ isLoggedIn, userToken }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузка корзины
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartFromServer();
    } else {
      setCart(getLocalCart());
    }
  }, [isLoggedIn]);

  // Получение корзины с сервера
  const fetchCartFromServer = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    } finally {
      setLoading(false);
    }
  };

  // Обновление количества товара
  const handleUpdateQuantity = (productId, quantity) => {
    if (isLoggedIn) {
      // Отправляем запрос на сервер
      fetch(`/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ quantity }),
      })
        .then((response) => response.json())
        .then(() => fetchCartFromServer());
    } else {
      // Обновляем локальную корзину
      updateLocalCartQuantity(productId, quantity);
      setCart(getLocalCart());
    }
  };

  // Удаление товара
  const handleRemove = (productId) => {
    if (isLoggedIn) {
      // Отправляем запрос на сервер
      fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(() => fetchCartFromServer());
    } else {
      // Удаляем из локальной корзины
      removeFromLocalCart(productId);
      setCart(getLocalCart());
    }
  };

  // Оформить заказ
  const handleCheckout = () => {
    if (isLoggedIn) {
      alert("Оформление заказа через API...");
    } else {
      alert("Войдите в систему, чтобы оформить заказ.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Корзина</h1>
      {loading ? (
        <Spin size="large" />
      ) : cart.length === 0 ? (
        <Empty description="Корзина пуста" />
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" onClick={handleCheckout}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;



