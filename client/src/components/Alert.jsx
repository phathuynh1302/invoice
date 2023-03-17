import { Alert } from "antd";
import React from "react";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Alert type={info.type} message={info.message} />
  );
};

export default AlertMessage;
