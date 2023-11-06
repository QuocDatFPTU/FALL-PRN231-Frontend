import axiosClient from './axiosClient';
import { QueryStringWText, QueryString } from '../type/api';
export type destinationsType = {
  id: Number;
  name: String;
  region: String;
  description: String;
  status: Number;
  destinationImages: destinationImagesType[];
};

export type destinationImagesType = {
  id: Number;
  destinationId: Number;
  image: String;
};

const destinationApi = {
  getAll(params?: QueryStringWText) {
    const url = '/cities/unified-suggest-result';
    return axiosClient.get(url, { params });
  },

  getTopDestinations(params?: QueryString) {
    const url = '/cities/top-destinations';
    return axiosClient.get(url, { params });
  },
  getById(id: Number) {
    const url = `/cities/unified-suggest-result/${id}`;
    return axiosClient.get(url);
  },

  create(data: destinationsType) {
    const url = '/cities/unified-suggest-result';
    return axiosClient.post(url, data);
  },

  update(data: destinationsType) {
    const url = '/cities/unified-suggest-result';
    return axiosClient.put(url, data);
  },

  delete(id: Number) {
    const url = `/cities/unified-suggest-result/${id}`;
    return axiosClient.delete(url);
  }
};

export default destinationApi;
