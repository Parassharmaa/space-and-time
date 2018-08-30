import axios from 'axios';
import config from './../config/';

const GoogleAuth = (data) => {
	return axios({
		method: 'get',
		url: `${config.baseUrl}/auth/google?id_token=${data}`,
	})
}

const AdminAuth = (data) => {
	return axios({
		method: 'post',
		url: `${config.baseUrl}/auth/admin`,
		data: data
	})
}



export { GoogleAuth, AdminAuth };