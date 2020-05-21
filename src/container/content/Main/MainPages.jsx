import React, { useState, useEffect } from "react";
import { Row, Divider } from "antd";
import {
  GetAllData,
  stringToUppercase,
} from "../../../context/actions/actions";
import { RepoItems } from "../../../components/RepoItems/RepoItems";

export const MainPages = (props) => {
  const [repos, setRepos] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllData(props.location.pathname).then((res) => {
      setRepos(res.data);
      setLoading(false);
    });
  }, [props.location.pathname]);
  return (
    <div>
      <Divider
        orientation="left"
        style={{ color: "#333", fontWeight: "normal" }}
      >
        {stringToUppercase(props.location.pathname.substr(1))}
      </Divider>
      <Row gutter={[16, 16]}>
        {repos.length > 0 ? (
          <RepoItems
            repos={repos}
            loading={loading}
            pathname={props.location.pathname}
          />
        ) : (
          <img
            style={{ minWidth: "400px", width: "30%" }}
            alt="empty"
            src={require("../../../assets/undraw_empty.png")}
          />
        )}
      </Row>
    </div>
  );
};
