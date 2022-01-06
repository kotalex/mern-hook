import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
import { userHasRole } from "../modules/auth/actions/auth";
import Roles from "../constants/roles";
const { Sider } = Layout;

const Sidebar = props => {
  const [collapsed, setCollapsed] = useState(false);

  const getPage = () => {
    return props.location.pathname.substr(1);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[getPage()]}>
        <Menu.Item key="profile">
          <Link to="/profile">
            <Icon type="profile" />
            <span>My Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="change-password">
          <Link to="/change-password">
            <Icon type="unlock" />
            <span>Change Password</span>
          </Link>
        </Menu.Item>
        {userHasRole(Roles.ADMIN) && (
          <Menu.Item key="users">
            <Link to="/admin/users">
              <Icon type="profile" />
              <span>Admin: Users</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
