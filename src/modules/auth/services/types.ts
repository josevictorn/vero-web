export interface User {
	email: string;
	id: string;
	name: string;
	role: "ADMIN" | "CLIENT" | "ASSISTANT" | "FINANCE" | "LAWYER";
}

export interface AuthenticateBody {
	email: string;
	password: string;
}

export interface AuthenticateResponse {
	access_token: string;
	user: User;
}

export type GetProfileResponse = {
	user: User;
};
