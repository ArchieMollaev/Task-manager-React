import axios from 'axios';
import { AUTH_TOKEN } from 'const';
import axiosDefaults from 'axios/lib/defaults';

axiosDefaults.baseURL = 'http://localhost:3001';
axiosDefaults.headers.common['Authorization'] = AUTH_TOKEN;

export default options => axios({ ...options })
  .then(res => res.data);
