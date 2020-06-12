import React, { useContext } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import { RootContext } from "../../../context/Context";
import { useHistory } from "react-router-dom";

export const DashboardPages = () => {
  const { state } = useContext(RootContext);
  const history = useHistory();

  return (
    <div className="site-card-wrapper">
      <Divider orientation="left">
        <h4 className="greeting-text-dashboard text-left">
          Welcome back, {state.username}
        </h4>
      </Divider>

      <Row gutter={16}>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Kepangkatan">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/kepangkatan")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pendidikan">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/pendidikan")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Penelitian">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/penelitian")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengabdian">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/pengabdian")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengajaran">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/pengajaran")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pelatihan">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/pelatihan")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Sertifikasi">
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button
              onClick={() => history.push("/sertifikasi")}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
