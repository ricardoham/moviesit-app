import axios from 'axios';

const axiosConfig = () => ({
  baseURL: 'http://localhost:8080/',
});

axios.defaults.baseURL = 'http://localhost:8080/';

export const moviesItAPI = axios.create(axiosConfig());
