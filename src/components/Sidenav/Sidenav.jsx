import React, { useState, useEffect } from "react";
import Sider from "antd/lib/layout/Sider";
import { Menu, Icon } from "antd";
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../../context/Context";

export const Sidenav = () => {
  const history = useHistory();
  const { state } = useContext(RootContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(state.isAdmin);
    return () => {
      setIsAdmin(false);
    };
  }, [state.isAdmin]);

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
          margin: "16px",
        }}
      >
        <Link to="/">
          <img width="160px" src={require("../../assets/put.png")} alt="hm" />
        </Link>
      </div>

      <Menu theme="dark" mode="inline">
        {isAdmin && (
          <Menu.Item key="0" onClick={() => history.push("/user/dosen")}>
            <Icon type="usergroup-add" />
            <span className="nav-text">Dosen</span>
          </Menu.Item>
        )}

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
