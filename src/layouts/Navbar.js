import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Icon, Dropdown, Menu, Button } from "antd";

import { blue } from "@ant-design/colors";
import { logoutUser } from "../modules/auth/actions/auth";

const { Header } = Layout;

/**
 * Navbar component
 */
const Navbar = props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  /**
   * Menu links
   */
  const getMenu = () => (
    <Menu>
      <Menu.Item key="0" disabled={true}>
        <span className="user-name">{`${auth.user.name}`}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/change-password">Change Password</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => logoutUser(dispatch)}>
        Logout
      </Menu.Item>
    </Menu>
  );

  /**
   * Authorized menu
   */
  const authorizedLinks = () => (
    <Dropdown overlay={getMenu()} trigger={["click"]}>
      <Button shape="circle" icon="meh" />
    </Dropdown>
  );

  /**
   * Guest menu
   */
  const guestLinks = () => (
    <Link to="/login">
      <Icon type="login" />
    </Link>
  );

  return (
    <Header style={{ background: blue["9"] }}>
      <div className="logo">
        <Link to="/">
          <Icon type="home" />
        </Link>
      </div>
      {auth.isAuthenticated ? authorizedLinks() : guestLinks()}
    </Header>
  );
};

export default Navbar;
