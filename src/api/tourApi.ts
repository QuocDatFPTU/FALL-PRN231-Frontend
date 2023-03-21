import { tourDetailType } from "api/tourDetailsApi";
import axiosClient from "./axiosClient";

export type tourType = {
  id: Number;
  tourName: String;
  tourDuration: Number;
  tourCapacity: Number;
  status: Number;
  tourGuideId: Number;
  tourGuides: any;
  tourPrices: any;
  tourDetails: tourDetailType[];
};

// export type TourData = {
//   tourId: Number;
//   tourName: String;
//   tourDescription: String;
//   placeId: Number;
//   duration: Number;
//   cost: Number;
//   available: Number;
// };

const tourApi = {
  getAll(params?: any) {
    const url = "/Tours";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/Tours/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/Tours/${id}`;
    return axiosClient.get(url);
  },

  getByPlaceId(params: any) {
    const url = `/Tours/getToutByPlaceId`;
    return axiosClient.get(url, { params });
  },

  create(data: tourType) {
    const url = "/Tours";
    return axiosClient.post(url, data);
  },

  update(data: tourType) {
    const url = "/Tours";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Tours/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
