import axios, { type AxiosError, HttpStatusCode } from "axios";
import { env } from "@/common/env";
import storage from "../config/storage";
import { constants } from "../utils";

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		return config;
	});
}

export const clearTokens = () => {
	storage.local.delete(constants.localStorageKeys.ACCESS_TOKEN);
};

api.interceptors.request.use(
	(config) => {
		const accessToken = storage.local.get(
			constants.localStorageKeys.ACCESS_TOKEN
		);

		if (!config.url) {
			return Promise.resolve(config);
		}

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return Promise.resolve(config);
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(responseError: AxiosError) => {
		const accessToken = storage.local.get(
			constants.localStorageKeys.ACCESS_TOKEN
		);

		const isUnauthorized =
			responseError?.response?.status === HttpStatusCode.Unauthorized;

		if (!isUnauthorized) {
			return Promise.reject(responseError);
		}

		if (!accessToken) {
			clearTokens();

			return Promise.reject(responseError);
		}

		return Promise.reject(responseError);
	}
);

const request = api.request;

export default request;
