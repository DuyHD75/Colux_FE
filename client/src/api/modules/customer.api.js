import proxyClient from "../client/proxy.client";

const customerEndpoints = {
    getUserByUserId: ({ userId }) => `identity-service/api/v1/users/${userId}`,
};

const customerApi = {
    getUserByUserId: async (userId) => {
        try {
          const response = await proxyClient.get(customerEndpoints.getUserByUserId({userId}));
    
          return { response };
        } catch (err) {
          return { err };
        }
      },

}


export default customerApi;