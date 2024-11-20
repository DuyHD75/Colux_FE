import proxyClient from "../client/proxy.client";

const userEndpoints = {
  getProvince: "/order-service/api/v1/orders/shipping/province",
  getDistrict: "/order-service/api/v1/orders/shipping/district",
  getWard: "/order-service/api/v1/orders/shipping/ward",
  calculateShippingFee: "/order-service/api/v1/orders/shipping/calculateFee",
};

const ghnApi = {
  getProvince: async () => {
    try {
      const response = await proxyClient.get(userEndpoints.getProvince);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDistrict: async (province_id) => {
    try {
      const response = await proxyClient.post(userEndpoints.getDistrict, {
        province_id,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getWard: async (district_id) => {
    try {
      const response = await proxyClient.post(userEndpoints.getWard, {
        district_id,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  calculateShippingFee: async (
    from_district_id,
    from_ward_code,
    service_id,
    to_district_id,
    to_ward_code,
    width,
    height,
    weight,
    length
  ) => {
    try {
      const response = await proxyClient.post(
        userEndpoints.calculateShippingFee,
        {
          from_district_id,
          from_ward_code,
          service_id,
          to_district_id,
          to_ward_code,
          width,
          height,
          weight,
          length,
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default ghnApi;
