import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  login: "accounts/login",
  register: "accounts/register",
  getInfo: "accounts/info",
  passwordUpdate: "accounts/update-password",
};

const userApi = {
  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async ({
    username,
    displayName,
    phoneNumber,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        username,
        displayName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgotPassword: async ({ email }) => {
    try {
      const response = await publicClient.post(userEndpoints.resetPassword, {
        email,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  resetPassword: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.resetPasswovrd, {
        email, password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
