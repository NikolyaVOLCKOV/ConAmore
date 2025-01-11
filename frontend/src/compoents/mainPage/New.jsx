import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";

const Popular = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Товар 1" },
    { id: 2, name: "Товар 2" },
    { id: 3, name: "Товар 3" },
  ]);

  useEffect(() => {
    // fetch('/api/popular').then((res) => res.json()).then(setProducts);
  }, []);

  return (
    <div className="block">
      <h2>Новые товары</h2>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} key={product.id}>
            <Card title={product.name} bordered={false}>
              Описание товара
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Popular;
