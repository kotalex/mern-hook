import jwt_decode from "jwt-decode";

const Token = {
  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  getUserFromToken() {
    const token = this.getToken();
    if (!token) return false;

    const decoded = jwt_decode(token);
    const { firstName, lastName, name, email, role } = decoded;
    return { firstName, lastName, name, email, role };
  },

  tokenExpired() {
    const token = this.getToken();
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  },

  tokenLeftTenMinutes() {
    const token = this.getToken();
    if (!token) return false;

    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp - currentTime < 360;
  }
};

export default Token;
