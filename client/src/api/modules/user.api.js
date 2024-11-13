import proxyClient from "../client/proxy.client";

const userEndpoints = {
  login: "identity-service/api/v1/users/login",
  register: "identity-service/api/v1/users/register",
  forgotPassword: ({ email }) =>
    `identity-service/api/v1/users/password/reset?email=${email}`,
  resetPassword: "identity-service/api/v1/users/password/reset",
  getInfo: `identity-service/api/v1/users/info`,
  passwordUpdate: "identity-service/api/v1/users/change-password",
  logout: "identity-service/api/v1/users/logout",
  verifyAccount: ({ key }) =>
    `identity-service/api/v1/users/verify/account?key=${key}`,
  verifyResetPassword: ({ key }) =>
    `identity-service/api/v1/users/password/reset/verify?key=${key}`,
  changePassword: "identity-service/api/v1/users/change-password",
  updateProfile: "identity-service/api/v1/users/update-profile",
};

const userApi = {
  login: async ({ email, password }) => {
    try {
      const response = await proxyClient.post(userEndpoints.login, {
        email,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async ({ firstName, lastName, email, password }) => {
    try {
      const response = await proxyClient.post(userEndpoints.register, {
        firstName,
        lastName,
        email,
        password,
        role: "USER",
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await proxyClient.get(
        userEndpoints.forgotPassword({ email })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  resetPassword: async ({ newPassword, confirmPassword }) => {
    try {
      const response = await proxyClient.post(userEndpoints.resetPassword, {
        newPassword,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },

  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await proxyClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  logout: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.logout);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  verifyAccount: async (key) => {
    try {
      const response = await proxyClient.get(
        userEndpoints.verifyAccount({ key })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  verifyResetPassword: async (key) => {
    try {
      const response = await proxyClient.get(
        userEndpoints.verifyResetPassword({ key })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    try {
      const response = await proxyClient.post(userEndpoints.changePassword, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateProfile: async (profile) => {
    try {
      const response = await proxyClient.post(userEndpoints.updateProfile, profile);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
