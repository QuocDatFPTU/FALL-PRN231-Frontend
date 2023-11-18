import { tourDetailType } from 'api/tourDetailsApi';
import axiosClient from './axiosClient';
import { tourGuideType } from './tourGuideApi';
import { tourPriceType } from './tourPriceApi';
import moment from 'moment';

export type tourType = {
  id: Number;
  tourName: String;
  tourDuration: Number;
  tourCapacity: Number;
  status: Number;
  tourGuideId: Number;
  tourGuide: tourGuideType;
  tourPrices: tourPriceType[];
  tourDetails: tourDetailType[];
};

export type ImageType = {
  imageUrl: string;
  id: number;
};
export type HotelTypeNew = {
  id: number;
  name: string;
  pricePerNight: number;
  phoneNumber: string;
  notes: string;
  websiteAddress: string;
  reviewCount: number;
  reviewRatting: number;
  categoryId: number;
  address: AddressType;
  category: CategoryType;
  hotelImages: HotelImage[];
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  checkInDate: string;
  checkOutDate: string;
};

export type HotelGroupFacilitiesType = {
  facilityId: number;
  name: string;
  available: boolean;
};

export type HotelGroups = {
  groupId: number;
  hotelGroupFacilities: HotelGroupFacilitiesType[];
  name: string;
  order: 1;
};

export type RoomGroupsType = {
  groupId: number;
  roomTypeGroupFacilities: HotelGroupFacilitiesType[];
  name: string;
  order: 1;
};

export type MasterRooms = {
  availability: number;
  name: string;
  price: number;
  reviewCount: number;
  reviewRatting: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  roomTypeGroups: RoomGroupsType[];
  roomTypeImages: ImageType[];
  id: string;
  checkInDate: string,
  checkOutDate : string
};
export type HotelDetailypeNew = {
  id: number;
  name: string;
  // pricePerNight: number;
  phoneNumber: string;
  notes: string;
  websiteAddress: string;
  reviewCount: number;
  reviewRatting: number;
  categoryId: number;
  address: string;
  category: CategoryType;
  hotelImages: HotelImage[];
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  authorId: string;
  hotelFacilityHighlights: {
    facilityId: number;
    name: string;
    available: boolean;
  }[];
  hotelGroups: HotelGroups[];
  masterRooms: MasterRooms[];
  soldOutRooms: {
    availability: number;
    name: string;
    price: number;
    reviewCount: number;
    reviewRatting: number;
    createdBy: string;
    createdAt: string;
    modifiedBy: string;
    modifiedAt: string;
    roomTypeImages: ImageType[];
    description: string;
  }[];
  quantity: number;
  description: string;
  checkInDate: string;
  checkOutDate: string;
};

export type AddressType = {
  area: AreaType;
  city: CityType;
  country: ContryType;
};

export type AreaType = {
  name: string;
  noOfHotels: number;
  latitude: number;
  longtitude: number;
  id: number;
};

export type CityType = {
  name: string;
  imageUrl: string;
  latitude: number;
  longtitude: number;
  id: number;
};

export type ContryType = {
  name: string;
  iso2: string;
  latitude: number;
  longtitude: number;
  id: number;
};

export type CategoryType = {
  name: string;
  id: number;
};
export type HotelImage = {
  imageUrl: string;
  id: number;
};

export const defaultRequestPayload = {
  quantity: 1,
  sorting: {
    sortField: 'Ranking',
    sortOrder: 'Desc'
  },
  page: {
    pageIndex: 0,
    pageSize: 8
  },
  searchCriteria: {
    checkInDate: moment(Date.now()).format('YYYY-MM-DD'),
    checkOutDate: moment(Date.now()).format('YYYY-MM-DD')
  }
};
const hotelApi = {
  getAll(params?: any) {
    const url = '/tours';
    return axiosClient.get(url, { params });
  },

  getByName(name: string) {
    const url = `/tours/${name}`;
    return axiosClient.get(url);
  },

  getById(params: any) {
    const url = `/hotels/search`;
    const requestPayload = { ...defaultRequestPayload, cityId: params.cityId };
    return axiosClient.post(url, requestPayload);
  },

  getByIdV2(params: any) {
    const url = `/hotels/search`;
    return axiosClient.post(url, params);
  },
  getHotelById(cityId: number, params: any) {
    const url = `/hotels/${cityId}`;

    return axiosClient.post(url, params);
  },
  // getByPlaceId(params: any) {
  //   const url = `/tours/getToutByPlaceId`;
  //   return axiosClient.get(url, { params });
  // },

  create(data: tourType) {
    const url = '/tours';
    return axiosClient.post(url, data);
  },

  update(data: tourType) {
    const url = '/tours';
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/tours/${id}`;
    return axiosClient.delete(url);
  }
};

export default hotelApi;
