import proxyClient from "../client/proxy.client";

const colorEndpoints = {
  getAllColors: ({ pageIndex, size }) =>
    `product-service/api/v1/colors/public?page=${pageIndex}&size=${size}`,
};

const colorsApi = {

  getAllColors: async (pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getAllColors({
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },

};

export default colorsApi;
