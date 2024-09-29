import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  getColorFamily: "product-service/api/v1/products/colorFamilies",
  getRooms: "product-service/api/v1/products/rooms",
  getCollections: "product-service/api/v1/products/collections",
};

const colorsApi = {
  getColorFamily: async () => {
    try {
      const response = await publicClient.get(userEndpoints.getColorFamily);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getRooms: async () => {
    try {
      const response = await publicClient.get(userEndpoints.getRooms);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getCollections: async () => {
    try {
      const response = await publicClient.get(userEndpoints.getCollections);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default colorsApi;
