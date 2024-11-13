import proxyClient from "../client/proxy.client";

const colorEndpoints = {
  getColorFamily: "product-service/api/v1/products/colorFamilies",
  getRooms: "product-service/api/v1/products/rooms",
  getCollections:
    "product-service/api/v1/products/collections/no-colorFamily-room",
  getColorByColorFamily: ({ colorFamilyId }) =>
    `product-service/api/v1/products/colorFamilies/${colorFamilyId}/colors/`,
  getColorByColorFamilyAndCollection: ({
    colorFamilyId,
    collectionId,
    pageIndex,
    size,
  }) =>
    `product-service/api/v1/products/colors/color-family/${colorFamilyId}/collection/${collectionId}?page=${pageIndex}&size=${size}`,
  getColorByRoomId: ({ roomId, pageIndex, size }) =>
    `product-service/api/v1/products/colorFamilies/${roomId}/colors?page=${pageIndex}&size=${size}`,
  getColorByRoomAndCollection: ({ roomId, collectionId, pageIndex, size }) =>
    `product-service/api/v1/products/colors/collection/${collectionId}/room/${roomId}?page=${pageIndex}&size=${size}`,
  getColorByCollectionId: ({ collectionId, pageIndex, size }) =>
    `product-service/api/v1/products/collections/${collectionId}/colors?page=${pageIndex}&size=${size}`,
  getColorByExteriorAndInterior: ({ interior, exterior, pageIndex, size }) =>
    `product-service/api/v1/products/colors/getColor?interior=${interior}&exterior=${exterior}&page=${pageIndex}&size=${size}`,
  getAllColors: ({ pageIndex, size }) =>
    `product-service/api/v1/products/colors?page=${pageIndex}&size=${size}`,
  getColorByColorId: ({ colorId }) =>
    `product-service/api/v1/products/colors/${colorId}`,
};

const colorsApi = {
  getColorFamily: async () => {
    try {
      const response = await proxyClient.get(colorEndpoints.getColorFamily);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getRooms: async () => {
    try {
      const response = await proxyClient.get(colorEndpoints.getRooms);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getCollections: async () => {
    try {
      const response = await proxyClient.get(colorEndpoints.getCollections);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getColorByColorFamilyAndCollection: async (
    colorFamilyId,
    collectionId,
    pageIndex,
    size
  ) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByColorFamilyAndCollection({
          colorFamilyId,
          collectionId,
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getColorByRoomId: async (roomId, pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByRoomId({
          roomId,
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getColorByRoomAndCollection: async (
    roomId,
    collectionId,
    pageIndex,
    size
  ) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByRoomAndCollection({
          roomId,
          collectionId,
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getColorByCollectionId: async (collectionId, pageIndex, size) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByCollectionId({
          collectionId,
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getColorByExteriorAndInterior: async (
    interior,
    exterior,
    pageIndex,
    size
  ) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByExteriorAndInterior({
          interior,
          exterior,
          pageIndex,
          size,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },

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
  getColorByColorId: async (colorId) => {
    try {
      const response = await proxyClient.get(
        colorEndpoints.getColorByColorId({
          colorId,
        })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default colorsApi;
