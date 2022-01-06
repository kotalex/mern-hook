import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";

const { Title } = Typography;

const resetPasswordData = {
  password: "",
  confirmPassword: ""
};

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const ResetPassword = props => {
  const auth = useSelector(state => state.auth);
  const [showForm, setShowForm] = useState(false);
  const token = props.match.params.token;

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }

    if (!showForm) {
      checkToken();
    }

    async function checkToken() {
      try {
        await Api.request("auth.resetPassword.check", token);

        setShowForm(true);
      } catch (err) {
        props.history.push("/login");
      }
    }
  });

  const sendRequest = async passwordData => {
    try {
      passwordData.token = token;
      await Api.request("auth.resetPassword.reset", passwordData);
      props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={resetPasswordData}
      validationSchema={resetPasswordSchema}
      onSubmit={async values => await sendRequest(values)}
    >
      {({ values, handleChange }) =>
        showForm && (
          <div id="reset-password-form">
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

              <SubmitButton>Submit Request</SubmitButton>
              <Link to="/login">Back to Sign In?</Link>
            </Form>
          </div>
        )
      }
    </Formik>
  );
};

export default ResetPassword;
