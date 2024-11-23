import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllProduct: "product-service/api/v1/products/public",
  getAllCategory: "product-service/api/v1/categories/public",
  getAllBrands: "product-service/api/v1/brands/public",
  getAllSuppliers: "product-service/api/v1/suppliers/public",
  getAllVariants: "product-service/api/v1/variants/public",
  getAllProperties: "product-service/api/v1/properties/public",
  getAllFeatures: "product-service/api/v1/features/public",
  getProductByCategory: ({ categoryId, pageIndex, size }) =>
    `product-service/api/v1/categories/public/categoryId/${categoryId}/products?page=${pageIndex}&size=${size}`,
  updateProduct: "product-service/api/v1/products",
  createproduct: "product-service/api/v1/products",
  addBrand: "product-service/api/v1/brands",
  addSupplier: "product-service/api/v1/suppliers",
  addProperties: "product-service/api/v1/properties",
  addFeatures: "product-service/api/v1/features",
  getAllProductPageAble: ({ pageIndex, size }) =>
    `product-service/api/v1/products/public/pageable?page=${pageIndex}&size=${size}`,
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
  getAllSuppliers: async () => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllSuppliers);
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
  createProduct: async (product) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.createproduct, product
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  addBrand: async (brand) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.addBrand, brand
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  addSupplier: async (supplier) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.addSupplier, supplier
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  addProperties: async (properties) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.addProperties, properties
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  addFeatures: async (features) => {
    try {
      const response = await proxyClient.post(
        productEndpoints.addFeatures, features
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
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
};

export default prodcutsApi;
