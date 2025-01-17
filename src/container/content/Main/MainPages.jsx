import React, { useState, useEffect, useContext } from "react";
import { Divider, Button } from "antd";
import {
  GetAllData,
  stringToUppercase,
} from "../../../context/actions/actions";
import { RootContext } from "../../../context/Context";
import { TableListPages } from "../TableList/TableListPages";
import { useHistory } from "react-router-dom";

export const MainPages = (props) => {
  const { state, dispatch } = useContext(RootContext);
  const [repos, setRepos] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllData(props.location.pathname)
      .then((res) => {
        setRepos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setRepos([]);
        setLoading(false);
      });

    return () => {
      setRepos([]);
      setLoading(false);
    };
  }, [props.location.pathname, state.username, state.isAdmin, dispatch]);

  const history = useHistory();

  return (
    <div>
      <Divider orientation="left" style={{ color: "#333" }}>
        <p className="text-divider">
          {stringToUppercase(props.location.pathname.substr(1))}
        </p>
      </Divider>
      {props.location.pathname.includes("dosen") && (
        <div style={{ textAlign: "left" }}>
          <Button onClick={() => history.goBack()}>Back</Button>
        </div>
      )}

      {repos.length > 0 ? (
        <TableListPages
          loading={loading}
          repos={repos}
          pathname={props.location.pathname}
        />
      ) : (
        <img
          style={{ minWidth: "400px", width: "30%" }}
          alt="empty"
          src={require("../../../assets/undraw_empty.png")}
        />
      )}
    </div>
  );
};
