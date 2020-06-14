import React from "react";
import { Layout, Button, Menu, Dropdown, notification } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Switch, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../context/Context";
import { Logout } from "../context/actions/actions";
import { NavRoutes } from "../components/NavigationRoutes/NavRoutes";

export const MainContainer = () => {
  const { Header, Content } = Layout;
  const { state, dispatch } = useContext(RootContext);

  const history = useHistory();

  let { pathname } = history.location;
  let prevRoute = history.location.pathname.substring(1);

  const showAddButton = () => {
    let tmp =
      pathname.toString() === "/profile" ||
      pathname.toString() === "/update-password";
    return tmp;
  };

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
          }}
        >
          {/* avatar */}

          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="primary" shape="circle">
              {state.username[0].toUpperCase()}
            </Button>
          </Dropdown>

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
