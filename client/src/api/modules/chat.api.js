import proxyClient from "../client/proxy.client";

const userEndpoints = {
  getRoom: ({ roomId }) => `order-service/api/v1/chats/get-room/${roomId}`,
  createRoom: "order-service/api/v1/chats/create-room",
};

const chatApi = {
  getRoom: async (roomId) => {
    try {
      const response = await proxyClient.get(userEndpoints.getRoom({ roomId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
 
  createRoom: async (data) => {
    try {
      const response = await proxyClient.post(userEndpoints.createRoom, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default chatApi;
