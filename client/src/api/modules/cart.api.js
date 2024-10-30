import proxyClient from "../client/proxy.client";

const userEndpoints = {
  getCart: ({ userID }) => `order-service/api/v1/carts/${userID}`,
  saveCart: "order-service/api/v1/carts/add-to-cart",
  deleteCartItem: "order-service/api/v1/carts/delete-cart-item"
};

const cartApi = {
  getCart: async (userID) => {
    try {
      console.log("userID", userID);

      const response = await proxyClient.get(userEndpoints.getCart({ userID }));

      console.log("response", response);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteCartItem: async (cartId,variantIds) => {
    try {
      console.log("cartId", cartId);
      console.log("variantIds", variantIds);
      const response = await proxyClient.delete(userEndpoints.deleteCartItem,
       { data: { cartId, variantIds }}

      );

      console.log("response", response);

      return { response };
    } catch (err) {
      console.log("err", err);
      
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
      console.log("cartId", cartId);
      console.log("userId", customerId);
      console.log("status", status);
      console.log("updateQuantityType", updateQuantityType);
      console.log("cartItems", cartItems);
      
      const response = await proxyClient.post(userEndpoints.saveCart,
        ({cartId,
        customerId,
        status,
        updateQuantityType,
        cartItems})
              );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default cartApi;
