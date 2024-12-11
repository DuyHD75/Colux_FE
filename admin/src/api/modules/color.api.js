import proxyClient from "../client/proxy.client";

const colorEndpoints = {
  getAllColors: ({ pageIndex, size }) =>
    `product-service/api/v1/colors/public?page=${pageIndex}&size=${size}`,
  getColorFamily: "product-service/api/v1/colorFamilies/public",
  getIndependentCollections:
  "product-service/api/v1/collections/public/no-colorFamily-room",
  updateColorToCollection: "product-service/api/v1/collections",
  createColorFamily: "product-service/api/v1/colorFamilies",
  createCollection: "product-service/api/v1/collections",
  createColors: "product-service/api/v1/colors",
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

  getColorFamily: async () => {
    try {
      const response = await proxyClient.get(colorEndpoints.getColorFamily);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getIndependentCollections: async () => {
    try {
      const response = await proxyClient.get(colorEndpoints.getIndependentCollections);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateColorToCollection: async (data) => {
    try {
      const response = await proxyClient.put(colorEndpoints.updateColorToCollection, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createColorFamily: async (data) => {
    try {
      const response = await proxyClient.post(colorEndpoints.createColorFamily, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createCollection: async (data) => {
    try {
      const response = await proxyClient.post(colorEndpoints.createCollection, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createColors: async (data) => {
    try {
      const response = await proxyClient.post(colorEndpoints.createColors, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default colorsApi;
