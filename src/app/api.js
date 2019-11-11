import axios from 'axios';
import { FLICKR_API_URL, FLICKR_API_KEY } from './constants';

export const getImages = options =>
  axios.get(FLICKR_API_URL, {
    params: {
      api_key: FLICKR_API_KEY,
      format: 'json',
      safe_search: 1,
      media: 'photos',
      nojsoncallback: 1,
      // content_type: 1,
      ...options,
    },
  });
