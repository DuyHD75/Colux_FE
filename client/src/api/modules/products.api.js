
import proxyClient from "../client/proxy.client";

const productEndpoints = {
  getAllProductPageAble: ({pageIndex, size}) => `product-service/api/v1/products/product/pageable?page=${pageIndex}&size=${size}`,
};

const prodcutsApi = {
  getAllProductPageAble: async (pageIndex, size) => {
    try {
      const response = await proxyClient.get(productEndpoints.getAllProductPageAble({pageIndex, size}));
      return { response };
    } catch ( err ) {
      return { err };
    }
  },

};

export default prodcutsApi;
