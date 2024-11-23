import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllOrders: "order-service/api/v1/orders/getAll",
  createWallbill: "order-service/api/v1/waybills/create",
  createOrder: "order-service/api/v1/orders/create",
  getAWallbilll: ({waybillId}) => `order-service/api/v1/waybills/public/${waybillId}`,
  updateOrder: "order-service/api/v1/orders/update",
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
  createWallbill: async (data) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.createWallbill, data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createOrder: async (data) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.createOrder, data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAWallbilll: async (waybillId) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getAWallbilll({ waybillId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateOrder: async (data) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.updateOrder, data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default ordersApi;
