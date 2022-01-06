const API_ENDPOINTS = {
  auth: {
    login: {
      method: "post",
      url: "/auth/login"
    },
    register: {
      method: "post",
      url: "/auth/register"
    },
    user: {
      method: "get",
      url: "/auth/me"
    },
    refresh: {
      method: "get",
      url: "/auth/refresh"
    },
    profile: {
      method: "put",
      url: "/auth/profile"
    },
    changePassword: {
      method: "put",
      url: "/auth/change-password"
    },
    forgotPassword: {
      method: "post",
      url: "/auth/forgot-password"
    },
    resetPassword: {
      check: {
        method: "get",
        url: "/auth/reset-password/check"
      },
      reset: {
        method: "put",
        url: "/auth/reset-password"
      }
    }
  },
  admin: {
    users: {
      list: {
        method: "post",
        url: "/admin/users/list"
      },
      single: {
        method: "get",
        url: "/admin/users"
      },
      create: {
        method: "post",
        url: "/admin/users"
      },
      update: {
        method: "put",
        url: "/admin/users"
      },
      delete: {
        method: "delete",
        url: "/admin/users"
      }
    }
  }
};

export default API_ENDPOINTS;
