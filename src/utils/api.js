import axios from "axios";
import _ from "lodash";

import API_ENDPOINTS from "./../constants/api";
import Flash, { MessageTypes } from "./flash";
import Token from "./token";

import store from "../redux/store";
import { storeUserDataFromToken } from "./../modules/auth/actions/auth";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const Api = {
  async request(endpoint, params, body, disableTokenCheck) {
    try {
      await this.checkTokenExpiration(disableTokenCheck);
      return await this.send(endpoint, params, body);
    } catch (err) {
      console.log("err: ", err);
      if (err.response && err.response.status === 401) {
        Flash(
          MessageTypes.ERROR,
          err.response.data.message || "Please authorize to proceed"
        );

        window.location.href = "/login";
        throw err.response;
      }

      if (err.response && err.response.data.message) {
        Flash(MessageTypes.ERROR, err.response.data.message);
      }

      throw err;
    }
  },

  async send(endpoint, params, body) {
    const { method, url } = _.get(API_ENDPOINTS, endpoint);

    const res = await axios[method](this.url(url, params), body || params);

    if (res.data.message) {
      Flash(MessageTypes.SUCCESS, res.data.message);
    }

    if (res.data.info) {
      Flash(MessageTypes.INFO, res.data.info);
    }

    if (res.data.warning) {
      Flash(MessageTypes.WARNING, res.data.warning);
    }

    return res.data;
  },

  url(url, params) {
    url = `${process.env.REACT_APP_API_URL}${url}`;
    if (Number(params) || typeof params === "string") {
      url += `/${params}`;
    } else if (Array.isArray(params)) {
      params.forEach(param => (url += `/${param}`));
    }

    return url;
  },

  checkTokenExpiration(noTokenCheck) {
    return new Promise((resolve, reject) => {
      if (noTokenCheck) {
        return resolve(true);
      }

      if (!Token.getToken() || !Token.tokenLeftTenMinutes()) {
        return resolve(true);
      }

      this.send("auth.refresh")
        .then(res => {
          storeUserDataFromToken(res.data.token, store.dispatch);
          resolve(true);
        })
        .catch(err => reject(err));
    });
  },

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }
};

export default Api;
