import React from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Sidenav = () => {
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div
        className="logo"
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
        }}
      >
        <Menu theme="dark" mode="inline">
          <Avatar size="large" icon={<UserOutlined />} />
        </Menu>
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="bar-chart" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="cloud-o" />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="appstore-o" />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="team" />
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="shop" />
          <span className="nav-text">nav 8</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
