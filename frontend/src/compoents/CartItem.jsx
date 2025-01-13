// src/components/CartItem.js
import React from "react";
import { Button, InputNumber } from "antd";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {/* Название товара */}
      <div>{item.name}</div>

      {/* Цена */}
      <div>{item.price} ₽</div>

      {/* Количество */}
      <InputNumber
        min={1}
        value={item.quantity}
        onChange={(value) => onUpdateQuantity(item.id, value)}
      />

      {/* Удалить товар */}
      <Button type="danger" onClick={() => onRemove(item.id)}>
        Удалить
      </Button>
    </div>
  );
};

export default CartItem;
