import React, { useContext } from "react";
import { Card, Row, Col, Button, Divider } from "antd";
import { RootContext } from "../../../context/Context";

export const DashboardPages = () => {
  const { state } = useContext(RootContext);

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
            <p>
              berisi data status jabatan fungsional dosen, pangkat, golongan,
              dan juga angka kredit.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pendidikan">
            <p>
              berisi data riwayat pendidikan beserta kelengkapan ijazah masing
              masing jenjang pendidikan.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Penelitian">
            <p>
              berisi data penelitian yang pernah dilakukan oleh dosen beserta
              kelengkapan jurnal penelitian.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengabdian">
            <p>
              berisi data Pengabdian dosen kepada masyarakat yang merupakan
              salah satu kewajiban dosen dalam berkontribusi untuk negeri.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pengajaran">
            <p>
              berisi data kegiatan mengajar yang pernah dilakukan oleh dosen di
              JTI.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Pelatihan">
            <p>
              berisi data pelatihan yang di ikuti oleh dosen dalam rangka
              pengembangan pengetahuan dan mempersiapkan program pembelajaran.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard text-left" title="Sertifikasi">
            <p>
              berisi sertifikasi yang di ikuti dosen. Biasanya sertifikasi
              dilaksanakan setelah pelatihan.
            </p>
            <Button className="button-check">Check</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
