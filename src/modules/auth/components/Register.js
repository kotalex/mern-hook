import React from "react";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";

const { Title } = Typography;

const registerData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first name"),
  lastName: Yup.string().required("Please enter last name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Invalid email"),
  password: Yup.string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const Register = props => {
  const registerUser = async userData => {
    try {
      await Api.request("auth.register", userData);

      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={registerData}
      validationSchema={registerSchema}
      onSubmit={async values => await registerUser(values)}
    >
      {({ values, handleChange }) => (
        <div id="register-form">
          <Form className="headless-forms login-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="user" style={{ marginRight: "3px" }} />
              Sign Up
            </Title>

            <Form.Item name="firstName">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstName}
              />
            </Form.Item>

            <Form.Item name="lastName">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={values.lastName}
              />
            </Form.Item>

            <Form.Item name="email">
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
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

            <SubmitButton>Submit</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
