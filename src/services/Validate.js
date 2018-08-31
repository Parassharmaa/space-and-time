import axios from 'axios';
import config from "./../config/";

const ValidateUser = () => {
	return axios({
		method: 'get',
		headers: { 'Authorization': localStorage.getItem('token') },
		url: `${config.baseUrl}/validate/user`
	})
}

const ValidateAdmin = () => {
	return axios({
		method: 'get',
		headers: { 'Authorization': localStorage.getItem('adminToken') },
		url: `${config.baseUrl}/validate/admin`
	})
}



export { ValidateUser, ValidateAdmin }; 