/**
 * axios setup to use mock service
 */

import axios from 'axios';
import environment from 'environment';

const axiosServices = axios.create({ baseURL: environment.API_FULL_URL });

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
