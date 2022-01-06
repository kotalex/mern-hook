import { message } from "antd";

export const MessageTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const Flash = (type, text) => {
  return message[type](text);
};

export default Flash;
