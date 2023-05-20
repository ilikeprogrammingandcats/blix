import { Button, Layout } from "antd";
import React from "react";
import { Content, Header } from "antd/es/layout/layout";

export const Home = () => {
  return (
    <Layout>
      <Header title="Home" style={{ backgroundColor: "#f0f2f5" }}>
        Home
      </Header>
      <Content
        style={{
          //   margin: '24px 16px',
          padding: 34,
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{ margin: "20px" }}
          href={"/register"}
          //  onClick={handleRegisterClick}
        >
          Register new Account
        </Button>

        <Button
          type="primary"
          size="large"
          href={"/users"}
          style={{ margin: "20px" }}
        >
          See Users
        </Button>
      </Content>
    </Layout>
  );
};
