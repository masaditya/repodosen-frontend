import React from "react";
import { Layout, Button, Avatar, Menu, Dropdown } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Switch, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../context/Context";
import { Logout } from "../context/actions/actions";
import { toast } from "react-toastify";
import { NavRoutes } from "../components/NavigationRoutes/NavRoutes";

export const MainContainer = () => {
  const { Header, Content } = Layout;
  const { dispatch } = useContext(RootContext);

  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile"> Profile </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <p
          onClick={() => {
            dispatch(Logout());
            toast.success("Logout Successful", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }}
        >
          Logout
        </p>
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
          }}
        >
          <Button onClick={() => history.push("/add")}>Add Data</Button>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar>A</Avatar>
          </Dropdown>
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
