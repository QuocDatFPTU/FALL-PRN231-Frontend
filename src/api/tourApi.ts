import axiosClient from "./axiosClient";

export type tourType = {
  tourId: Number;
  tourName: String;
  tourDescription: String;
  placeId: Number;
  duration: Number;
  cost: Number;
  available: Number;
  place?: any;
  bookings?: any;
};

export type TourData = {
  tourId: Number;
  tourName: String;
  tourDescription: String;
  placeId: Number;
  duration: Number;
  cost: Number;
  available: Number;
};

const tourApi = {
  getAll(params?: any) {
    const url = "/Tour";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/Tour/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/Tour/${id}`;
    return axiosClient.get(url);
  },

  getByPlaceId(params: any) {
    const url = `/Tour/getToutByPlaceId`;
    return axiosClient.get(url, { params });
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

export default tourApi;
