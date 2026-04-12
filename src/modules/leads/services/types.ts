export interface LeadDTO {
	cellphone: string;
	created_at: string; // ISO datetime
	email: string;
	id: string;
	lawyer_id: string | null;
	name: string;
	workspace_id: string;
}

export interface CreateLeadBody {
	cellphone: string;
	email: string;
	lawyerId?: string;
	name: string;
	workspaceId: string;
}

export interface CreateLeadResponse {
	leadId: string;
}

export interface FetchLeadsQuery {
	page?: number;
}

export interface LeadParams {
	id: string;
}

export interface EditLeadBody {
	cellphone?: string;
	email?: string;
	lawyerId?: string | null;
	name?: string;
	workspaceId?: string;
}

export interface EditLeadResponse {
	lead: LeadDTO;
}

export type DeleteLeadResponse = null;
