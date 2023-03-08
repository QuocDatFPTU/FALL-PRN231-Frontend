import axiosClient from "./axiosClient";

type placesData = {
  placeId: number;
  placeName: String;
  placeDescription: String;
  location: String;
};

const placeApi = {
  getAll(params?: any) {
    const url = "/Places";
    return axiosClient.get(url, { params });
  },

  getById(id: Number) {
    const url = `/Places/${id}`;
    return axiosClient.get(url);
  },

  create(data: placesData) {
    const url = "/Places";
    return axiosClient.post(url, data);
  },

  update(data: placesData) {
    const url = "/Places";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Places/${id}`;
    return axiosClient.delete(url);
  },
};

export default placeApi;
