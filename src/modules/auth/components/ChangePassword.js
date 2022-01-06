import React from "react";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";

const { Title } = Typography;

let changePasswordData = {
  currentPassword: "",
  password: "",
  confirmPassword: ""
};

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Please enter old password"),
  password: Yup.string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const ChangePassword = () => {
  const sendRequest = async passwordData => {
    try {
      await Api.request("auth.changePassword", passwordData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={changePasswordData}
      validationSchema={changePasswordSchema}
      onSubmit={async values => await sendRequest(values)}
    >
      {({ values, handleChange }) => (
        <div id="change-password-form">
          <Form className="headless-forms login-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="lock" style={{ marginRight: "3px" }} />
              Change Password
            </Title>

            <Form.Item name="currentPassword">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                onChange={handleChange}
                value={values.currentPassword}
              />
            </Form.Item>

            <Form.Item name="password">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
            </Form.Item>

            <Form.Item name="confirmPassword">
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </Form.Item>

            <SubmitButton>Change Password</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ChangePassword;
