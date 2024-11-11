import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllProduct: "product-service/api/v1/products/product",
  getAllCategory: "product-service/api/v1/products/categories",
  getAllBrands: "product-service/api/v1/products/brands",
  getAllVariants: "product-service/api/v1/products/variants",
  getAllProperties: "product-service/api/v1/products/properties",
  getAllFeatures: "product-service/api/v1/products/features",
  getProductByCategory: ({ categoryId, pageIndex, size }) =>
    `product-service/api/v1/products/categories/${categoryId}/products?page=${pageIndex}&size=${size}`,
  updateProduct: "product-service/api/v1/products/product",
};

const prodcutsApi = {
  getAllProduct: async () => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getAllProduct
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
  getAllBrands: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllBrands);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllVariants: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllVariants);
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
  updateProduct: async (product) => {
    try {
      const response = await proxyClient.put(
        productEndpoints.updateProduct, product
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default prodcutsApi;
