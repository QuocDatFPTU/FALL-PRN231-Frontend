import { tourDetailType } from 'api/tourDetailsApi';
import axiosClient from './axiosClient';
import { tourGuideType } from './tourGuideApi';
import { tourPriceType } from './tourPriceApi';
import { tourType } from 'api/hotelApi';
import { paymentType } from './paymentApi';

export type bookingType = {
  tourId: Number;
  customerId: Number;
  bookingDate: Date;
  numAdults: Number;
  numChildren: Number;
  numInfants: Number;
  totalPrice: Number;
  tour: tourType;
  customer: any;
  payments: paymentType[];
};

export type createBookingType = {
  tourId: Number;
  bookingDate: Date;
  numAdults: Number;
  numChildren: Number;
  numInfants: Number;
  totalPrice: Number;
  paymentMethod: String;
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
interface DataReserveType {
  totalPrice: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: 'string';
  };
  roomTypeRequests: [
    {
      roomTypeId: number;
      quantity: number;
      checkInDate: string;
      checkOutDate: string;
    }
  ];
}
const bookingApi = {
  getAll(params?: any) {
    const url = '/bookings';
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/bookings/${name}`;
    return axiosClient.get(url);
  },

  getById(id: Number) {
    const url = `/bookings/${id}`;
    return axiosClient.get(url);
  },

  // getByPlaceId(params: any) {
  //   const url = `/bookings/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(query: string, data: DataReserveType) {
    const url = `/payments/return?returnUrl=${encodeURIComponent(query)}`;
    return axiosClient.post(url, data);
  },

  update(data: bookingType) {
    const url = '/bookings';
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/bookings/${id}`;
    return axiosClient.delete(url);
  },
  getConfirm(query : any) {
    const url = `/payments/IPN?${query}`;
    return axiosClient.get(url);
  }
};

export default bookingApi;
