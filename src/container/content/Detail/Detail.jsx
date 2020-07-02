import React from "react";
import { useHistory } from "react-router-dom";
import { Button, notification } from "antd";
import {
  stringToUppercase,
  Verifikasi,
} from "../../../context/actions/actions";
import { useState } from "react";
import { DashboardPages } from "../Dashboard/DashboardPages";

export const DetailPages = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  let { repo } = history.location.state;

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

  const handleVerify = () => {
    setLoading(true);
    Verifikasi(repo.id_dosen)
      .then((res) => {
        notification.success({
          message: "Verify Dosen " + repo.nama,
          description: res.message,
        });
        setLoading(false);
        setTimeout(() => {
          history.push("/");
        }, 500);
      })
      .catch((err) => {
        notification.success({
          message: "Verify Dosen " + repo.nama,
          description: err.message,
        });
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => history.goBack()}>Back</Button>

        {Object.prototype.hasOwnProperty.call(repo, "isVerified") && (
          <Button
            disabled={repo["isVerified"] === 1}
            type="primary"
            onClick={() => handleVerify()}
            loading={loading}
          >
            {repo["isVerified"] === 1 ? "Verified" : "Verify Now!"}
          </Button>
        )}
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

      {Object.prototype.hasOwnProperty.call(repo, "isVerified") && (
        <DashboardPages
          noGreeting
          withDosen
          id_dosen={repo.id_dosen}
          urlDosen="/user/dosen"
        />
      )}
    </div>
  );
};
