import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';

axiosDefaults.baseURL = 'http://localhost:3001';

export default options => axios({ ...options })
  .then(res => res.data);
