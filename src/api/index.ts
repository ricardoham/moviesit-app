import axios from 'axios';

const axiosConfig = () => ({
  baseURL: 'http://localhost:8080/api/v1',
});

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

export const moviesItAPI = axios.create(axiosConfig());
