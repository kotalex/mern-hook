import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Icon, Typography, Button } from "antd";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import * as Yup from "yup";

import Loader from "../../../common/components/Loader";

import { loadUser, saveUser } from "../actions/users";
import AdminUsersActionTypes from "../types/users";

const { Title } = Typography;

const CreateEditUser = props => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.adminUsers.single);

  const dispatch = useDispatch();

  const userId = props.match.params.id;

  let userSchema = {
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    email: Yup.string()
      .required("Please enter email")
      .email("Invalid email")
  };

  useEffect(() => {
    const fetchUser = async id => {
      try {
        setLoading(true);

        const userData = await loadUser(id);
        dispatch(userData);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      fetchUser(userId);
    }

    return () =>
      dispatch({ type: AdminUsersActionTypes.SET_ADMIN_USERS_SINGLE_EMPTY });
  }, [dispatch, userId]);

  const saveUserData = async (userData, userId) => {
    try {
      setLoading(true);

      const newUserData = await saveUser(userData, userId);
      dispatch(newUserData);

      if (!userId) {
        props.history.push("/admin/users");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    userSchema = {
      ...userSchema,
      password: Yup.string()
        .required("Please enter password")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
    };
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={user}
          validationSchema={Yup.object().shape(userSchema)}
          onSubmit={async values => await saveUserData(values, userId)}
        >
          {({ values, handleChange }) => (
            <div id="admin-user-form">
              <Form className="headless-forms user-form">
                <Title
                  type="primary"
                  strong
                  level={4}
                  style={{ textAlign: "center" }}
                >
                  <Icon type="user" style={{ marginRight: "3px" }} />
                  {userId ? "Update User" : "Create User"}
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

                {!props.match.params.id && (
                  <Fragment>
                    <Form.Item name="password">
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={values.confirmPassword}
                      />
                    </Form.Item>
                  </Fragment>
                )}
                <SubmitButton>Save</SubmitButton>
                <Button
                  type="default"
                  style={{ marginLeft: ".5rem" }}
                  onClick={() => props.history.push("/admin/users")}
                >
                  Go Back
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default CreateEditUser;
