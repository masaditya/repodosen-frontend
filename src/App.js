import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Sidenav } from "./components/Sidenav/Sidenav";
import { BottomFooter } from "./components/BottomFooter/BottomFooter";
import { Switch, Route } from "react-router-dom";

export const App = () => {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Sidenav />

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
            <Switch>
              <Route exact path="/" />
            </Switch>
          </div>
        </Content>
        <BottomFooter />
      </Layout>
    </Layout>
  );
};

export default App;
