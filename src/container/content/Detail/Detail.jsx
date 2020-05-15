import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

export const DetailPages = () => {
  const history = useHistory();
  const { repo } = history.location.state;

  return (
    <div>
      <Button onClick={() => history.goBack()}>Back</Button>

      {JSON.stringify(repo)}
    </div>
  );
};
