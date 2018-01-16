import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';

axiosDefaults.baseURL = 'http://localhost:4000';

export default options => axios({ ...options })
  .then(res => res.data);
