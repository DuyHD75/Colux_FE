import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllOrders: "order-service/api/v1/orders/all",

};

const ordersApi = {
    getAllOrders: async () => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getAllOrders
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  
};

export default ordersApi;
