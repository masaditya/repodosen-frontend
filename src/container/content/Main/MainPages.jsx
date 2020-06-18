import React, { useState, useEffect, useContext } from "react";
import { Row, Divider } from "antd";
import {
  GetAllData,
  stringToUppercase,
} from "../../../context/actions/actions";
import { RepoItems } from "../../../components/RepoItems/RepoItems";
import { RootContext } from "../../../context/Context";

export const MainPages = (props) => {
  const { state } = useContext(RootContext);
  const [repos, setRepos] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllData(props.location.pathname)
      .then((res) => {
        setRepos(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setRepos([]);
        setLoading(false);
      });
  }, [props.location.pathname, state.username]);
  return (
    <div>
      <Divider orientation="left" style={{ color: "#333" }}>
        <p className="text-divider">
          {stringToUppercase(props.location.pathname.substr(1))}
        </p>
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
