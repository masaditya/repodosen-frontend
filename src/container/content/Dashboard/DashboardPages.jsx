import React, { useContext, useEffect } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import { RootContext } from "../../../context/Context";
import { useHistory } from "react-router-dom";

export const DashboardPages = ({ noGreeting, dosen, urlDosen = "" }) => {
  const { state } = useContext(RootContext);
  const history = useHistory();

  useEffect(() => {}, [state.username]);

  return (
    <div className="site-card-wrapper">
      {!noGreeting && (
        <Divider orientation="left">
          <h4 className="greeting-text-dashboard text-left">
            Welcome back, {state.username}
          </h4>
        </Divider>
      )}

      <Row gutter={16}>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Kepangkatan">
            <p>
              berisi data status jabatan fungsional dosen, pangkat, golongan,
              dan juga angka kredit.
            </p>

            <Button
              onClick={() => {
                history.push(urlDosen + "/kepangkatan/" + dosen.id_dosen);
              }}
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pendidikan">
            <p>
              berisi data riwayat pendidikan beserta kelengkapan ijazah masing
              masing jenjang pendidikan.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/pendidikan/" + dosen.id_dosen)
              }
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Penelitian">
            <p>
              berisi data penelitian yang pernah dilakukan oleh dosen beserta
              kelengkapan jurnal penelitian.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/penelitian/" + dosen.id_dosen)
              }
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengabdian">
            <p>
              berisi data Pengabdian dosen kepada masyarakat yang merupakan
              salah satu kewajiban dosen dalam berkontribusi untuk negeri.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/pengabdian/" + dosen.id_dosen)
              }
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengajaran">
            <p>
              berisi data kegiatan mengajar yang pernah dilakukan oleh dosen di
              JTI.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/pengajaran/" + dosen.id_dosen)
              }
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pelatihan">
            <p>
              berisi data pelatihan yang di ikuti oleh dosen dalam rangka
              pengembangan pengetahuan dan mempersiapkan program pembelajaran.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/pelatihan/" + dosen.id_dosen)
              }
              className="button-check"
            >
              Check
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Sertifikasi">
            <p>
              berisi sertifikasi yang di ikuti dosen. Biasanya sertifikasi
              dilaksanakan setelah pelatihan.
            </p>

            <Button
              onClick={() =>
                history.push(urlDosen + "/sertifikasi/" + dosen.id_dosen)
              }
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
