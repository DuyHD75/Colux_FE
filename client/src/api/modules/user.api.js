import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  login: "identity-service/api/v1/users/login",
  register: "identity-service/api/v1/users/register",
  forgotPassword:  ({ email }) => `identity-service/api/v1/users/password/reset?email=${email}`,
  resetPassword:  "identity-service/api/v1/users/password/reset",
  getInfo: ({userId}) => `identity-service/api/v1/users/${userId}`,
  passwordUpdate: "identity-service/api/v1/users/change-password",
  logout: "identity-service/api/v1/users/logout",
};

const userApi = {
  login: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        email,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async (userId) => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo({userId}));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async ({ firstName, lastName, email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        firstName,
        lastName,
        email,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgotPassword: async () => {
    try {
      const response = await publicClient.get(userEndpoints.forgotPassword);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  resetPassword: async ({ newPassword, confirmPassword }) => {
    try {
      const response = await publicClient.post(userEndpoints.resetPassword, {
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
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
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
      const response = await privateClient.get(userEndpoints.logout);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
