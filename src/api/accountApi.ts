import { bookingType } from 'api/bookingApi';
import axiosClient from "./axiosClient";

export type accountType = {
  id: Number;
  email: String;
  password: String;
  firstName: String;
  phone: String;
  address: String;
  lastName: String;
  city: String;
  province: String;
  district: String;
  avatar: String;
  role: Number;
  status: Number;
  bookings: bookingType
};

const accountApi = {
  getAll(params?: any) {
    const url = "/accounts";
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/accounts/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/accounts/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/accounts/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: accountType) {
    const url = "/accounts";
    return axiosClient.post(url, data);
  },

  update(data: accountType) {
    const url = "/accounts";
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/accounts/${id}`;
    return axiosClient.delete(url);
  },
};

export default accountApi;
