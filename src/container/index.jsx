import React, { useEffect } from "react";
import { Layout, Button, Menu, Dropdown, notification } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Switch, Link, useHistory, useRouteMatch } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../context/Context";
import {
  Logout,
  GetAllDosen,
  GetAllNotification,
} from "../context/actions/actions";
import { NavRoutes } from "../components/NavigationRoutes/NavRoutes";
import { useState } from "react";
import { BellOutlined, InfoCircleOutlined } from "@ant-design/icons";

export const MainContainer = () => {
  let match = useRouteMatch("/user/dosen");
  const { Header, Content } = Layout;
  const { state, dispatch } = useContext(RootContext);
  const [username, setUsername] = useState(state.username);
  const [notif, setNotif] = useState([]);
  const history = useHistory();

  let { pathname } = history.location;
  let prevRoute = history.location.pathname.substring(1);

  const showAddButton = () => {
    let tmp =
      pathname.toString() === "/profile" ||
      pathname.toString() === "/update-password";
    return tmp;
  };

  useEffect(() => {
    setUsername(state.username);
    if (state.isAdmin) {
      GetAllDosen().then((res) => {
        if (res.success) {
          dispatch({
            type: "SET_DOSEN",
            payload: {
              dosen: res.data,
            },
          });
        }
      });
      GetAllNotification().then((res) => {
        setNotif(res.data);
      });
    }
    return () => {
      setUsername("");
    };
  }, [state.username, state.isAuthenticated, state.isAdmin, dispatch]);

  const menu = (
    <Menu>
      {!state.isAdmin && (
        <Menu.Item key="0" onClick={() => history.push("/profile")}>
          <Link to="/profile"> Profile </Link>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => history.push("/update-password")}>
        <Link to="/update-password"> Update Password </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="2"
        onClick={() => {
          dispatch(Logout());
          notification.success({
            message: "Logout Successfuly! ",
            description: "See you again " + state.username,
          });
          history.push("/");
        }}
      >
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  const notify = (
    <Menu
      style={{
        minWidth: "300px",
        maxWidth: "350px",
        maxHeight: "350px",
        overflowY: "auto",
      }}
    >
      {notif.map((notifikasi, i) => {
        return (
          <Menu.Item
            key={i}
            onClick={() => history.push("/notifikasi", { notifikasi })}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {notifikasi.isRead === 0 && (
                <InfoCircleOutlined size={30} style={{ marginRight: "10px" }} />
              )}
              <p
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                <b>{notifikasi.username}</b> {notifikasi.konten}
              </p>
            </div>
            <h6>{notifikasi.waktu} </h6>
          </Menu.Item>
        );
      })}
      <Menu.Divider />
    </Menu>
  );

  return (
    <Layout>
      <Sidenav />
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            background: "#fff",
            padding: " 15px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          {/* avatar */}

          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="primary" shape="circle">
              {username[0].toUpperCase()}
            </Button>
          </Dropdown>

          {/* notify */}
          {state.isAdmin && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "20px" }}>
                Unread Notification (
                {notif.filter((item) => item.isRead === 0).length})
              </p>

              <Dropdown overlay={notify} trigger={["click"]}>
                <BellOutlined />
              </Dropdown>
            </div>
          )}

          {/* button add data */}

          {!showAddButton() && (
            <Button
              onClick={() => {
                if (match) {
                  history.push("/add-dosen");
                } else {
                  history.push("/add", prevRoute);
                }
              }}
            >
              Add Data
            </Button>
          )}
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
            <Switch>
              <NavRoutes />
            </Switch>
          </div>
        </Content>
        <BottomFooter />
      </Layout>
    </Layout>
  );
};
