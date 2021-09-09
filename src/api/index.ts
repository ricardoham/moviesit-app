import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL;

const axiosConfig = () => ({
  baseURL: `${serverURL}/api/v1`,
});

axios.defaults.baseURL = `${serverURL}/api/v1`;

export const moviesItAPI = axios.create(axiosConfig());
