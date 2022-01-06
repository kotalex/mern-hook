import React from "react";

import { Layout } from "antd";
const { Footer } = Layout;

const FooterComponent = () => (
  <Footer>Copyright @{new Date().getFullYear()} MERN Skeleton App</Footer>
);

export default FooterComponent;
