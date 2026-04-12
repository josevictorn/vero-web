import request from "@/common/lib/axios";
import type {
	AuthenticateBody,
	AuthenticateResponse,
	GetProfileResponse,
} from "./types";

export async function authenticate({ email, password }: AuthenticateBody) {
	const response = await request<AuthenticateResponse>({
		method: "POST",
		url: "/users/authenticate",
		data: {
			email,
			password,
		},
	});

	return response.data;
}

export async function getProfile() {
	const response = await request<GetProfileResponse>({
		method: "GET",
		url: "/me",
	});

	return response.data.user;
}
