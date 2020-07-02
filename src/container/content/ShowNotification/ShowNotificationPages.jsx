import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import {
  stringToUppercase,
  GetOneNotification,
  UpdateReadNotification,
} from "../../../context/actions/actions";
import { useHistory } from "react-router-dom";

export const ShowNotificationPages = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [repo, setRepo] = useState({});
  let tmp = history.location.state.notifikasi;

  useEffect(() => {
    setLoading(true);
    GetOneNotification(tmp.id_notifikasi)
      .then((res) => {
        setRepo(res.data);
      })
      .then((res) => {
        UpdateReadNotification(tmp.id_notifikasi).then((res) => {
          setLoading(false);
        });
      });
  }, [history, tmp]);

  const viewRender = (field = "") => {
    if (
      field.includes("file_") ||
      (field.includes("foto") && repo[field] !== null)
    ) {
      let filename = repo[field].split(".").pop().toLowerCase();
      if (filename === "pdf") {
        return (
          <Button onClick={() => window.open(repo[field], "_blank")}>
            Show Files
          </Button>
        );
      } else {
        return (
          <img
            onClick={() => window.open(repo[field], "_blank")}
            width="150"
            src={repo[field]}
            alt={field}
          />
        );
      }
    } else {
      return <p>{repo[field]}</p>;
    }
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => history.goBack()}>Back</Button>
          </div>
          {Object.keys(repo)
            .splice(2, 99)
            .map((field, i) => {
              return (
                <div
                  key={i}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1em 4em",
                    borderRadius: "1em",
                    border: "0.5px solid #f0f0f0",
                  }}
                >
                  <p>{stringToUppercase(field)}</p>

                  {viewRender(field)}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
