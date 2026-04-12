export interface WorkspaceDTO {
	cellphone: string;
	cnpj: string;
	created_at: string; // ISO datetime
	email: string;
	id: string;
	name: string;
}

export interface CreateWorkspaceBody {
	cellphone: string;
	cnpj: string;
	email: string;
	name: string;
}

export interface CreateWorkspaceResponse {
	workspaceId: string;
}

export interface FetchWorkspacesQuery {
	page?: number;
}

export interface WorkspaceParams {
	id: string;
}

export interface EditWorkspaceBody {
	cellphone?: string;
	cnpj?: string;
	email?: string;
	name?: string;
}

export interface EditWorkspaceResponse {
	workspace: WorkspaceDTO;
}

export interface DeleteWorkspaceResponse {
	message: string;
}
