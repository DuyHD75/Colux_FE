
import proxyClient from "../client/proxy.client";

const userEndpoints = {
  getColorFamily: "product-service/api/v1/products/colorFamilies",
  getRooms: "product-service/api/v1/products/rooms",
  getCollections: "product-service/api/v1/products/collections/no-colorFamily-room",
  getColorByColorFamily: ({colorFamilyId}) =>  `product-service/api/v1/products/colorFamilies/${colorFamilyId}/colors/`
};

const colorsApi = {
  getColorFamily: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.getColorFamily);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getRooms: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.getRooms);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getCollections: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.getCollections);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default colorsApi;
