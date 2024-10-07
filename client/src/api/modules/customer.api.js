import proxyClient from "../client/proxy.client";

const customerEndpoints = {
  getUserByUserId: ({ userId }) => `identity-service/api/v1/users/${userId}`,
  changePassword: "identity-service/api/v1/users/change-password",
};

const customerApi = {
  getUserByUserId: async (userId) => {
    try {
      const response = await proxyClient.get(
        customerEndpoints.getUserByUserId({ userId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    try {
      const response = await proxyClient.post(
        customerEndpoints.changePassword,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default customerApi;
