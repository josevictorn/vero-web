import { api } from "@/common/lib/axios";
import type { AuthenticateBody } from "./types";

export async function authenticate({ email, password }: AuthenticateBody) {
	const response = await api.post("/accounts/authenticate", {
		email,
		password,
	});

	return response.data;
}
