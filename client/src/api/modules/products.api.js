import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllProductPageAble: ({ pageIndex, size }) =>
    `product-service/api/v1/products/public/pageable?page=${pageIndex}&size=${size}`,
  getAllCategory: "product-service/api/v1/categories/public",
  getAllProperties: "product-service/api/v1/properties/public",
  getAllFeatures: "product-service/api/v1/features/public",
  getProductByCategory: ({ categoryId, pageIndex, size }) =>
    `product-service/api/v1/categories/public/categoryId/${categoryId}/products?page=${pageIndex}&size=${size}`,
  search: ({ keySearch }) =>
    `product-service/api/v1/search/public?keyword=${keySearch}`,
  getTopProducts: ({ pageIndex, size }) =>
    `order-service/api/v1/orders/topProducts?page=${pageIndex}&size=${size}`,
  filterProducts: ({ params }) =>
    `product-service/api/v1/products/filter?${params}`,
  getProductByProductId: ({ productId }) =>
    `product-service/api/v1/products/public/productId/${productId}`,
  getProductByColorId: ({ colorId, pageIndex, size }) =>
    `product-service/api/v1/paints/public/colorId/${colorId}?page=${pageIndex}&size=${size}`,
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
  getTopProducts: async (pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getTopProducts({ pageIndex, size })
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
  search: async (keySearch) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.search({ keySearch })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  filterProducts: async (params) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.filterProducts({ params })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getProductByProductId: async (productId) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getProductByProductId({
          productId,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getProductByColorId: async (colorId, pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        productEndpoints.getProductByColorId({ colorId, pageIndex, size })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default prodcutsApi;