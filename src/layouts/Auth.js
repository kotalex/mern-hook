import React, { Fragment } from "react";

import { Layout } from "antd";

import FooterComponent from "./Footer";

const { Content } = Layout;

const AuthLayout = props => {
  return (
    <Fragment>
      <Layout id="auth-layout">
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
      <FooterComponent />
    </Fragment>
  );
};

export default AuthLayout;
