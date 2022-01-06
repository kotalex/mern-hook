import React from "react";

import { Layout } from "antd";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FooterComponent from "./Footer";

const { Content } = Layout;

const MainLayout = props => {
  return (
    <Layout id="main-layout">
      <Navbar />
      <Layout className="content-section">
        <Sidebar location={props.location} />
        <Content id="main-layout-content">{props.children}</Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
