import proxyClient from "../client/proxy.client";

const uploadImageEndpoint = {
    uploadImage: "product-service/api/v1/upload/pics",
  };
  
  const uploadImageApi = {
    uploadImage: async (images) => {
      try {
        const response = await proxyClient.post(
          uploadImageEndpoint.uploadImage,
          images,
          {
            multipart: true,
          }
        );
        return response;
      } catch (err) {
        console.error("Error uploading image:", err);
        return { err };
      }
    },
  };
  
  export default uploadImageApi;
