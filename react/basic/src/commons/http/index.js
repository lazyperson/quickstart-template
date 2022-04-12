import axios from 'axios';
import { responseError, response, request } from './interceptors';

const baseURL = `${process.env.API_DOMAIN}/`;

const http = axios.create({
	baseURL,
	headers: {
		'X-Requested-With': '*.com',
	},
	withCredentials: true
});

http.interceptors.request.use(request.interceptor);
http.interceptors.response.use(response.retvalInterceptor, responseError.httpErrorInterceptor);


export default http;
