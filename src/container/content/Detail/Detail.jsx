import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

export const DetailPages = () => {
  const history = useHistory();
  const { repo } = history.location.state;

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
                boxShadow: "0px 0px 87px -43px rgba(153,153,153,1)",
                borderRadius: "1em",
                border: "0.5px solid #f0f0f0",
              }}
            >
              <p>{field}</p>

              <p>{repo[field]}</p>
            </div>
          );
        })}
    </div>
  );
};
