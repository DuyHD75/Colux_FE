import proxyClient from "../client/proxy.client";

const colorEndpoints = {
  getColorFamily: "product-service/api/v1/colorFamilies/public",
  getRooms: "product-service/api/v1/rooms/public",
  getCollections:
    "product-service/api/v1/collections/public/no-colorFamily-room",
  getColorByColorFamily: ({ colorFamilyId }) =>
    `product-service/api/v1/colorFamilies/public/colorFamilyId/${colorFamilyId}/colors/`,
  getColorByColorFamilyAndCollection: ({
    colorFamilyId,
    collectionId,
    pageIndex,
    size,
  }) =>
    `product-service/api/v1/colors/public/color-family/${colorFamilyId}/collection/${collectionId}?page=${pageIndex}&size=${size}`,
  getColorByRoomId: ({ roomId, pageIndex, size }) =>
    `product-service/api/v1/rooms/public/roomId/${roomId}/colors?page=${pageIndex}&size=${size}`,
  getColorByRoomAndCollection: ({ roomId, collectionId, pageIndex, size }) =>
    `product-service/api/v1/colors/public/collection/${collectionId}/room/${roomId}?page=${pageIndex}&size=${size}`,
  getColorByCollectionId: ({ collectionId, pageIndex, size }) =>
    `product-service/api/v1/collections/public/collectionId/${collectionId}/colors?page=${pageIndex}&size=${size}`,
  getColorByExteriorAndInterior: ({ interior, exterior, pageIndex, size }) =>
    `product-service/api/v1/colors/public/getColor?interior=${interior}&exterior=${exterior}&page=${pageIndex}&size=${size}`,
  getAllColors: ({ pageIndex, size }) =>
    `product-service/api/v1/colors/public?page=${pageIndex}&size=${size}`,
  getColorByColorId: ({ colorId }) =>
    `product-service/api/v1/colors/public/colorId/${colorId}`,
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
