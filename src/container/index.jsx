import React from "react";
import { Layout, Button, Avatar, Menu, Dropdown } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { ProfilePages } from "./content/Profile/ProfilePages";
import { MainPages } from "./content/Main/MainPages";
import { useContext } from "react";
import { RootContext } from "../context/Context";
import { Logout } from "../context/actions/actions";
import { toast } from "react-toastify";
import { FormDataPages } from "./content/FormData/FormDataPages";
import { FormUpdatePages } from "./content/FormUpdate/FormUpdatePages";

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
              <Route exact path="/" component={MainPages} />
              <Route path="/profile" component={ProfilePages} />
              <Route
                path="/kepangkatan"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/pendidikan"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/penelitian"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/pengabdian"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/pengajaran"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/pelatihan"
                render={(props) => <MainPages {...props} />}
              />
              <Route
                path="/sertifikasi"
                render={(props) => <MainPages {...props} />}
              />

              {/* form */}

              <Route path="/add" component={FormDataPages} />

              <Route path="/update" component={FormUpdatePages} />
            </Switch>
          </div>
        </Content>
        <BottomFooter />
      </Layout>
    </Layout>
  );
};
