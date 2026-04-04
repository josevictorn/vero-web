import request from "@/common/lib/axios";
import type {
	AuthenticateBody,
	AuthenticateResponse,
	GetProfileResponse,
} from "./types";

export async function authenticate({ email, password }: AuthenticateBody) {
	const response = await request<AuthenticateResponse>({
		method: "POST",
		url: "/accounts/authenticate",
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
		url: "/accounts/profile",
	});

	return response.data.user;
}
