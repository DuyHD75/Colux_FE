import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllProductPageAble: ({ pageIndex, size }) =>
    `product-service/api/v1/products/product/pageable?page=${pageIndex}&size=${size}`,
  getAllCategory: "product-service/api/v1/products/categories",
  getAllProperties: "product-service/api/v1/products/properties",
  getAllFeatures: "product-service/api/v1/products/features",
  getProductByCategory: ({ categoryId, pageIndex, size }) =>
    `product-service/api/v1/products/categories/${categoryId}/products?page=${pageIndex}&size=${size}`,
};

const prodcutsApi = {
  getAllProductPageAble: async (pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getAllProductPageAble({ pageIndex, size })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllCategory: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllCategory);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllProperties: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllProperties);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllFeatures: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllFeatures);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getProductByCategory: async (categoryId, pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getProductByCategory({ categoryId, pageIndex, size })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default prodcutsApi;
