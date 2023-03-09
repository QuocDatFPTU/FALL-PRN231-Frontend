import axiosClient from "./axiosClient";

type TourData = {
  tourId: Number;
  tourName: String;
  tourDescription: String;
  placeId: Number;
  duration: Number;
  cost: Number;
  available: Number;
};

const customerApi = {
  getAll(params?: any) {
    const url = "/Tour";
    return axiosClient.get(url, { params });
  },

  getByName(name: String) {
    const url = `/Tour/${name}`;
    return axiosClient.get(url);
  },

  create(data: TourData) {
    const url = "/Tour";
    return axiosClient.post(url, data);
  },

  update(data: TourData) {
    const url = "/Tour";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Tour/${id}`;
    return axiosClient.delete(url);
  },
};

export default customerApi;
