export interface LawyerDTO {
	cellphone: string;
	created_at: string; // ISO datetime
	email: string;
	id: string;
	name: string;
	oab: string;
	oab_state: string;
	pix: string;
	user_id: string;
	workspace_id: string;
}

export interface LawyerEditDTO {
	cellphone: string;
	created_at: string; // ISO datetime
	id: string;
	oab: string;
	oab_state: string;
	pix: string;
	user_id: string;
	workspace_id: string;
}

export interface CreateLawyerBody {
	cellphone: string;
	oab: string;
	oabState: string;
	pix: string;
	userId: string;
	workspaceId: string;
}

export interface CreateLawyerResponse {
	lawyerId: string;
}

export interface FetchLawyersQuery {
	page?: number;
}

export interface FetchLawyersResponse {
	meta: {
		currentPage: number;
		totalCount: number;
		perPage: number;
	};
	results: LawyerDTO[];
}

export interface LawyerParams {
	id: string;
}

export interface EditLawyerBody {
	cellphone?: string;
	oab?: string;
	oabState?: string;
	pix?: string;
	userId?: string;
	workspaceId?: string;
}

export interface EditLawyerResponse {
	lawyer: LawyerEditDTO;
}

export type DeleteLawyerResponse = null;
