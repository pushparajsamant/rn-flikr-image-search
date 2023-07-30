import axios from 'axios';
import Config from 'react-native-config';
import {API_URL} from '../util/constants';
import {PhotosResponse} from '../redux/types';

export const searchFlikr = async (searchTerm: string, pageNumber: number) => {
  let url = `${API_URL}&api_key=${Config.APIKEY}&format=json&nojsoncallback=1&text=${searchTerm}&per_page=40&page=${pageNumber}`;
  //return await axios.get<PhotosResponse>(url);
  try {
    const response = await axios.get<PhotosResponse>(url);
    if (response.data.stat === 'ok') {
      response.data.photos.search = searchTerm;
      response.data.photos.page = pageNumber;
      return response.data;
    }
    throw new Error('Failed to fetch data.');
  } catch (e) {
    throw new Error('Failed to fetch data.');
  }
};
