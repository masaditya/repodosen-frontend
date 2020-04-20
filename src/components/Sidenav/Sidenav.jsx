import React, { useContext } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon } from "antd";
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/Context";

export const Sidenav = () => {
  const history = useHistory();

  const { state } = useContext(RootContext);
  console.log(state);
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
          {/* <Avatar size="large" icon={<UserOutlined />} /> */}
        </Menu>
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="0" onClick={() => history.push("/dosen")}>
          <Icon type="usergroup-add" />
          <span className="nav-text">Dosen</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => history.push("/kepangkatan")}>
          <Icon type="user" />
          <span className="nav-text">Kepangkatan</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => history.push("/pendidikan")}>
          <Icon type="video-camera" />
          <span className="nav-text">Pendidikan</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => history.push("/penelitian")}>
          <Icon type="upload" />
          <span className="nav-text">Penelitian</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => history.push("/pengabdian")}>
          <Icon type="bar-chart" />
          <span className="nav-text">Pengabdian</span>
        </Menu.Item>
        <Menu.Item key="5" onClick={() => history.push("/pengajaran")}>
          <Icon type="cloud-o" />
          <span className="nav-text">Pengajaran</span>
        </Menu.Item>
        <Menu.Item key="6" onClick={() => history.push("/pelatihan")}>
          <Icon type="appstore-o" />
          <span className="nav-text">Pelatihan</span>
        </Menu.Item>
        <Menu.Item key="7" onClick={() => history.push("/sertifikasi")}>
          <Icon type="team" />
          <span className="nav-text">Sertifikasi</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
