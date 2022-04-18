import http from '@commons/http';

class Model {

	fetchContent() {
		return http.get('/home/content');
	}

}

export default new Model();
