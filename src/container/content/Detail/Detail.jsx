import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { stringToUppercase } from "../../../context/actions/actions";

export const DetailPages = () => {
  const history = useHistory();
  const { repo } = history.location.state;

  const viewRender = (field = "") => {
    if (field.includes("file_") || field.includes("foto")) {
      let filename = repo[field].split(".").pop().toLowerCase();
      if (filename === "pdf") {
        return (
          <Button onClick={() => window.open(repo[field], "_blank")}>
            Show Files
          </Button>
        );
      } else {
        return <img width="150" src={repo[field]} alt={field} />;
      }
    } else {
      return <p>{repo[field]}</p>;
    }
  };

  return (
    <div>
      <div style={{ textAlign: "left" }}>
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
    </div>
  );
};
