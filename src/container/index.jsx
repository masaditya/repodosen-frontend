import React from "react";
import { Layout } from "antd";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { BottomFooter } from "../components/BottomFooter/BottomFooter";
import { Route, Switch } from "react-router-dom";
import { ProfilePages } from "./content/Profile/ProfilePages";
import { MainPages } from "./content/Main/MainPages";

export const MainContainer = () => {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Sidenav />
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
            <Switch>
              <Route exact path="/" component={MainPages} />
              <Route path="/profile" component={ProfilePages} />
            </Switch>
          </div>
        </Content>
        <BottomFooter />
      </Layout>
    </Layout>
  );
};
