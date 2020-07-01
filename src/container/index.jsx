import React, { useEffect } from "react";
import { Layout, Button, Menu, Dropdown, notification } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Switch, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../context/Context";
import { Logout } from "../context/actions/actions";
import { NavRoutes } from "../components/NavigationRoutes/NavRoutes";
import { useState } from "react";
import { BellOutlined, InfoCircleOutlined } from "@ant-design/icons";

export const MainContainer = () => {
  const { Header, Content } = Layout;
  const { state, dispatch } = useContext(RootContext);
  const [username, setUsername] = useState(state.username);

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
    return () => {
      setUsername("");
    };
  }, [state.username, state.isAuthenticated]);

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

  const notif = (
    <Menu
      style={{
        minWidth: "300px",
        maxWidth: "350px",
        maxHeight: "350px",
        overflowY: "auto",
      }}
    >
      <Menu.Item>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InfoCircleOutlined size={30} style={{ marginRight: "10px" }} />
          <p
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            Ini notifikasi ya .
          </p>
        </div>
      </Menu.Item>

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
            <Dropdown overlay={notif} trigger={["click"]}>
              <BellOutlined />
            </Dropdown>
          )}

          {/* button add data */}

          {!showAddButton() && (
            <Button
              onClick={() => {
                if (state.isAdmin) {
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
