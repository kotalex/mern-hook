import React, { Fragment, useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { authorizeUser } from "../modules/auth/actions/auth";

import Routes from "../routes/Routes";
import Loader from "../modules/common/components/Loader";

const AppLayout = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loader) {
      authorizeUser(dispatch).then(() => setLoader(false));
    }
  });

  return <Fragment>{loader ? <Loader /> : <Routes />}</Fragment>;
};

export default AppLayout;
