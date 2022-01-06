import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";

const { Title } = Typography;

const forgotPasswordData = {
  email: ""
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email")
    .email("Invalid email")
});

const ForgotPassword = props => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  });

  const sendRequest = async email => {
    try {
      await Api.request("auth.forgotPassword", email);
      props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={forgotPasswordData}
      validationSchema={forgotPasswordSchema}
      onSubmit={async values => await sendRequest(values)}
    >
      {({ values, handleChange }) => (
        <div id="forgot-password-form">
          <Form className="headless-forms login-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="user" style={{ marginRight: "3px" }} />
              Reset Password
            </Title>
            <Form.Item name="email">
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
              />
            </Form.Item>

            <SubmitButton>Submit Request</SubmitButton>
            <Link to="/login">Back to Sign In?</Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ForgotPassword;
