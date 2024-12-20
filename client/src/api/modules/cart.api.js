import { use } from "react";
import proxyClient from "../client/proxy.client";

const userEndpoints = {
  getCart: ({ userID }) => `order-service/api/v1/carts/${userID}`,
  saveCart: "order-service/api/v1/carts/add-to-cart",
  deleteCartItem: "order-service/api/v1/carts/delete-cart-item",
  createOrder: "/order-service/api/v1/orders/create",
  getOrdersbyCustomerId: ({ customerId }) =>
    `/order-service/api/v1/orders/customerId/${customerId}`,
  getAWayBill: (wayBillId) =>
    `/order-service/api/v1/waybills/public/${wayBillId}`,
  cancelOrder: "/order-service/api/v1/orders/cancel",
};

const cartApi = {
  getCart: async (userID) => {
    try {
      const response = await proxyClient.get(userEndpoints.getCart({ userID }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteCartItem: async (cartId, itemDeleteRequests) => {
    try {
      const response = await proxyClient.post(userEndpoints.deleteCartItem, {
        cartId,
        itemDeleteRequests,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  saveCart: async (
    cartId,
    customerId,
    status,
    updateQuantityType,
    cartItems
  ) => {
    try {
      const response = await proxyClient.post(userEndpoints.saveCart, {
        cartId,
        customerId,
        status,
        updateQuantityType,
        cartItems,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createOrder: async (order) => {
    try {
      const response = await proxyClient.post(userEndpoints.createOrder, order);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getOrdersbyCustomerId: async (customerId) => {
    try {
      const response = await proxyClient.get(
        userEndpoints.getOrdersbyCustomerId({ customerId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAWayBill: async (waybillId) => {
    try {
      console.log("waybillId", waybillId);

      const response = await proxyClient.get(
        userEndpoints.getAWayBill(waybillId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  cancelOrder: async (orderCancelRequest) => {
    try {
      const response = await proxyClient.post(
        userEndpoints.cancelOrder,
        orderCancelRequest
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default cartApi;
