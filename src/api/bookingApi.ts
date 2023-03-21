import { tourDetailType } from "api/tourDetailsApi";
import axiosClient from "./axiosClient";
import { tourGuideType } from "./tourGuideApi";
import { tourPriceType } from "./tourPriceApi";

export type bookingType = {
  id: Number;
  tourName: String;
  tourDuration: Number;
  tourCapacity: Number;
  status: Number;
  tourGuideId: Number;
  tourGuides: tourGuideType[];
  tourPrices: tourPriceType[];
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
    const url = "/Bookings";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/Bookings/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/Bookings/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/Bookings/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: bookingType) {
    const url = "/Bookings";
    return axiosClient.post(url, data);
  },

  update(data: bookingType) {
    const url = "/Bookings";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/Bookings/${id}`;
    return axiosClient.delete(url);
  },
};

export default tourApi;
