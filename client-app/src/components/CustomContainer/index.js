import React from "react";
import { Col, Row } from "antd";
import "./style.css";

const CustomContainer = ({ children, title, style }) => {
  return (
    <div className="first-level-container" style={style}>
      <div className="second-level-container">
        <section className="section-level-container">
          <Row>
            {title && (
              <Col span={24}>
                <span>{title}</span>
              </Col>
            )}
            <Col span={24}>{children}</Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default CustomContainer;
