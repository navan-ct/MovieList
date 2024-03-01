import axios from 'axios';
import Config from 'react-native-config';

export const http = axios.create({
  baseURL: Config.API_BASE_URL,
  params: {
    apikey: Config.API_KEY,
    type: 'movie'
  }
});
