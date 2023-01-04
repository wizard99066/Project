import React, { useState } from "react";
import { Row, Col, Button } from "antd";

import "./style.css";
import DemoProcess from "../DemoProcess";
const Demo = () => {
  const [isPlayed, setPlay] = useState(false);

  return (
    <Row
      style={{
        width: "100%",
      }}
    >
      <Col>
        <Button
          shape={isPlayed ? "circle" : "none"}
          className={`btn_play ${isPlayed ? "played" : ""}`}
          onClick={() => setPlay(!isPlayed)}
        >
          {isPlayed ? "Stop" : "Play"}
        </Button>
      </Col>
      {isPlayed ? (
        <Col span={24}>
          <DemoProcess />
        </Col>
      ) : null}
    </Row>
  );
};

export default Demo;
