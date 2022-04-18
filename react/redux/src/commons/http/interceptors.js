/**
 * 请求拦截
 */
export const request = {
	interceptor(res) {
		return res;
	}
};

/**
 * 结果拦截
 */
export const response = {
	retvalInterceptor(res) {
		return res.data;
	}
};

/**
 * 错误处理
 */
export const responseError = {
	httpErrorInterceptor(error) {
		return Promise.reject(error);
	}
};
