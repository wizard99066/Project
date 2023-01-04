import axios from 'axios'
import message from '../components/SessionExpiration'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
  	? process.env.SERVER_API_URL
  	: `${ window.location.origin }/api`
axios.defaults.headers['Pragma'] = 'no-cache'
axios.defaults.headers['Cache-Control'] = 'no-cache, no-store'
axios.interceptors.request.use((config) => {
	const language = window.localStorage.getItem('language')
	if (language)
		config.headers['Accept-Language'] = language

	return config
}, (error) => {
	return Promise.reject(error)
})

axios.interceptors.response.use(undefined, (error) => {
	const originalRequest = error.config
	if (error.response.status === 401 && !originalRequest._retry){
		originalRequest._retry = true
		const jsonUser = window.localStorage.getItem('user')
		if (jsonUser){
			const user = JSON.parse(jsonUser)
			return axios
				.post('/account/refresh', {
					token     : user.token,
					sessionId : user.sessionId
				})
				.then((res) => {
					if (res.status === 200){
						window.localStorage.setItem('user', JSON.stringify({
							userName     : res.data.userName,
							token        : res.data.token,
							refreshToken : res.data.refreshToken,
							sessionId    : res.data.sessionId
						}))
						if (originalRequest.url.includes('user/logout')){
							return User.logout({
								sessionId: res.data.sessionId
							})
						}
						return axios(originalRequest)
					}
					return Promise.reject(error.response)
				})
				.catch((err) => {
					return Promise.reject(err)
				})
		}
		else if (!originalRequest.url.includes('refreshUserData'))
			message()
	}
	else if (
		error.response.status == 403 &&
    error.response.data.errors == 'Invalid RefreshToken'
	){
		const jsonUser = window.localStorage.getItem('user')
		if (jsonUser)
			message()
	}
	else
		return Promise.reject(error.response)
})

const responseBody = (response) => response.data
export const requests = {
	getFile: (url, query = {}) => axios
		.get(url, {
			responseType : 'blob',
			params       : query
		})
		.then(responseBody),
	getLargeFile: (url, query = {}) => axios
		.get(url, {
			responseType : 'arraybuffer',
			params       : query
		})
		.then(responseBody),
	get           : (url) => axios.get(url).then(responseBody),
	getWithParams : (url, query = {}) => axios
		.get(url, {
			params: query
		})
		.then(responseBody),
	post : (url, body = {}) => axios.post(url, body).then(responseBody),
	put  : (url, body = {}) => axios.put(url, body).then(responseBody),
	del  : (url, query = {}) => axios
		.delete(url, {
			data: query
		})
		.then(responseBody),
	postForm: (url, file) => {
		const formData = new FormData()
		formData.append('File', file)
		return axios
			.post(url, formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				}
			})
			.then(responseBody)
	},
	postFormMany: (url, files) => {
		const fd = new FormData()
		files.forEach((file) => {
			fd.append('Files', file)
		})
		return axios
			.post(url, fd, {
				headers: {
					'Content-type': 'multipart/form-data'
				}
			})
			.then(responseBody)
	}
}

const User = {
	login           : (user) => requests.post('/account/login', user),
	logout          : (data) => requests.post('/account/logout', data),
	refreshUserData : () => requests.get('/account/refreshUserData')
}

export default {
	User,
	requests
}
