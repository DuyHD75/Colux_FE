import proxyAdmin from "../admin/proxy.admin";

const adminEndpoints = {
  login: "identity-service/api/v1/users/login",
  getInfo: "identity-service/api/v1/users/info",
  logout: "identity-service/api/v1/users/logout",
  changePassword: "identity-service/api/v1/users/change-password",
  verifyToken: "identity-service/api/v1/users/verify-token",
  getAllUser: "identity-service/api/v1/users/getAll",
  setStatusUser: (id) => `identity-service/api/v1/users/status/${id}`,
  createEmployee: "identity-service/api/v1/users/register/employee",
  updateProfile: "identity-service/api/v1/users/update-profile",
  
  // Dashboard endpoints
  getDashboard: "order-service/api/v1/admins/dashboard",
  getSalesData: "order-service/api/v1/admins/dashboard/sales",
  getTopProducts: "order-service/api/v1/admins/dashboard/top-products",
  getTransactions: "order-service/api/v1/admins/dashboard/transactions",
  getTopUsers: "order-service/api/v1/admins/dashboard/top-users",

  // Product management
  getProducts: "order-service/api/v1/admins/products",
  addProduct: "order-service/api/v1/admins/products/add",
  updateProduct: (id) => `order-service/api/v1/admins/products/${id}`,
  deleteProduct: (id) => `order-service/api/v1/admins/products/${id}`,

  // Add new endpoint for order details
  getOrderDetails: (orderId) => `order-service/api/v1/orders/order/${orderId}`,

};

const adminApi = {
  login: async ({ email, password }) => {
    try {
      const response = await proxyAdmin.post(adminEndpoints.login, {
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
      const response = await proxyAdmin.get(adminEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  logout: async () => {
    try {
      const response = await proxyAdmin.get(adminEndpoints.logout);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  changePassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const response = await proxyAdmin.post(adminEndpoints.changePassword, {
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
      const response = await proxyAdmin.post(adminEndpoints.updateProfile, profile);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  verifyToken: async () => {
    try {
      const response = await proxyAdmin.post(adminEndpoints.verifyToken);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Dashboard APIs
  getDashboard: async () => {
    try {
      const response = await proxyAdmin.get(adminEndpoints.getDashboard);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Product APIs
  getProducts: async (params) => {
    try {
      const response = await proxyAdmin.get(adminEndpoints.getProducts, {
        params,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await proxyAdmin.post(
        adminEndpoints.addProduct,
        productData
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await proxyAdmin.put(
        adminEndpoints.updateProduct(id),
        productData
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await proxyAdmin.delete(adminEndpoints.deleteProduct(id));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  // Add new method for getting order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await proxyAdmin.get(
        adminEndpoints.getOrderDetails(orderId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  setStatusUser: async (id) => {
    try {
      const response = await proxyAdmin.put(
        adminEndpoints.setStatusUser(id)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getAllUser: async () => {
    try {
      const response = await proxyAdmin.get(adminEndpoints.getAllUser);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createEmployee: async (info) => {
    try {
      const response = await proxyAdmin.post(adminEndpoints.createEmployee, info);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default adminApi;
