import axios from "axios";
import useAuthStore from "@/app/stores/AuthStore";
// import i18n from "./i18n"

const authStore = useAuthStore()


const config: any = {
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"access-control-allow-methods": "GET, PUT, POST, DELETE, OPTIONS, POST, GET, OPTIONS, DELETE, PUT, PATCH",
		"accept": "application/json",
		"access-control-max-age": "3600, 3600",
		"access-control-allow-headers":"x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN, Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers"
	}
}

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(
	config => {
		if (authStore?.isAuthenticated && sessionStorage.getItem('authStore') ) {
			if(JSON.parse(sessionStorage.getItem('authStore')).accessToken == authStore.accessToken){
				config.headers.Authorization = `Bearer ${authStore.accessToken}`
			} else {
				window.location.href = "/login"
			}
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		error.response.status == 401 ? window.location.href = "/login" : ''
		return Promise.reject(error)
	}
)

export default axiosInstance
