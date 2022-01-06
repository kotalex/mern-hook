import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon, Typography } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";

import * as Yup from "yup";
import Api from "../../../utils/api";
import Loader from "../../common/components/Loader";
import { storeUserDataFromToken } from "../actions/auth";

const { Title } = Typography;

let profileData = {
  firstName: "",
  lastName: "",
  email: ""
};

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first name"),
  lastName: Yup.string().required("Please enter last name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Invalid email")
});

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const updateProfile = async userData => {
    try {
      const result = await Api.request("auth.profile", userData);

      const { token } = result.data;

      storeUserDataFromToken(token, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loading) {
      const { firstName, lastName, email } = auth.user;
      profileData = { firstName, lastName, email };
      setLoading(false);
    }
  }, [loading, auth.user]);

  return loading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={profileData}
      validationSchema={profileSchema}
      onSubmit={async values => await updateProfile(values)}
    >
      {({ values, handleChange }) => (
        <div id="profile-form">
          <Form className="headless-forms login-form">
            <Title
              type="primary"
              strong
              level={4}
              style={{ textAlign: "center" }}
            >
              <Icon type="user" style={{ marginRight: "3px" }} />
              My Profile
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

            <SubmitButton>Update</SubmitButton>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Profile;
