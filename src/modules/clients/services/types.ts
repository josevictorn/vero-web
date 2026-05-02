export interface ClientDTO {
	cellphone: string;
	city: string;
	cpf: string;
	createdAt: string; // ISO datetime
	email: string;
	id: string;
	issuingAgency: string;
	lawyerId: string | null;
	maritalStatus: string;
	name: string;
	neighborhood: string;
	profession: string;
	rg: string;
	state: string;
	street: string;
	updatedAt: string; // ISO datetime
	workspaceId: string;
	zipCode: string;
}

export interface ClientListItemDTO {
	cellphone: string;
	created_at: string; // ISO datetime
	email: string;
	id: string;
	lawyer_id: string | null;
	name: string;
	workspace_id: string;
}

export interface ClientEditDTO {
	cellphone: string;
	city: string;
	cpf: string;
	created_at: string; // ISO datetime
	email: string;
	id: string;
	issuing_agency: string;
	lawyer_id: string | null;
	marital_status: string;
	name: string;
	neighborhood: string;
	profession: string;
	rg: string;
	state: string;
	street: string;
	workspace_id: string;
	zip_code: string;
}

export interface CreateClientBody {
	cellphone: string;
	city: string;
	cpf: string;
	email: string;
	issuingAgency: string;
	lawyerId?: string;
	maritalStatus: string;
	name: string;
	neighborhood: string;
	profession: string;
	rg: string;
	state: string;
	street: string;
	workspaceId: string;
	zipCode: string;
}

export interface CreateClientResponse {
	clientId: string;
}

export interface FetchClientsQuery {
	page?: number;
}

export interface FetchClientsResponse {
	clients: ClientListItemDTO[];
	meta: {
		currentPage: number;
		totalCount: number;
		perPage: number;
	};
}

export interface ClientParams {
	id: string;
}

export interface EditClientBody {
	cellphone?: string;
	city?: string;
	cpf?: string;
	email?: string;
	issuingAgency?: string;
	lawyerId?: string | null;
	maritalStatus?: string;
	name?: string;
	neighborhood?: string;
	profession?: string;
	rg?: string;
	state?: string;
	street?: string;
	workspaceId?: string;
	zipCode?: string;
}

export interface EditClientResponse {
	client: ClientEditDTO;
}

export interface ConvertLeadToClientParams {
	leadId: string;
}

export interface ConvertLeadToClientBody {
	city: string;
	cpf: string;
	issuingAgency: string;
	maritalStatus: string;
	neighborhood: string;
	profession: string;
	rg: string;
	state: string;
	street: string;
	zipCode: string;
}

export interface ConvertLeadToClientResponse {
	clientId: string;
}

export type DeleteClientResponse = null;
