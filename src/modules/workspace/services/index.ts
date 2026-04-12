import request from "@/common/lib/axios";
import type {
	CreateWorkspaceBody,
	CreateWorkspaceResponse,
	EditWorkspaceBody,
	EditWorkspaceResponse,
	FetchWorkspacesQuery,
	WorkspaceDTO,
	WorkspaceParams,
} from "./types";

export async function fetchWorkspaces({ page }: FetchWorkspacesQuery) {
	const response = await request<Paginated<WorkspaceDTO>>({
		method: "GET",
		url: "/workspaces",
		params: {
			page,
		},
	});

	return response.data;
}

export async function createWorkspace({
	name,
	email,
	cellphone,
	cnpj,
}: CreateWorkspaceBody) {
	const response = await request<CreateWorkspaceResponse>({
		method: "POST",
		url: "/workspaces",
		data: {
			name,
			email,
			cellphone,
			cnpj,
		},
	});

	return response.data;
}

export async function getWorkspaceById({ id }: WorkspaceParams) {
	const response = await request<WorkspaceDTO>({
		method: "GET",
		url: `/workspaces/${id}`,
	});

	return response.data;
}

export async function editWorkspace(
	id: string,
	{ name, email, cellphone, cnpj }: EditWorkspaceBody
) {
	const response = await request<EditWorkspaceResponse>({
		method: "PATCH",
		url: `/workspaces/${id}`,
		data: {
			name,
			email,
			cellphone,
			cnpj,
		},
	});

	return response.data;
}

export async function deleteWorkspace({ id }: WorkspaceParams) {
	const response = await request({
		method: "DELETE",
		url: `/workspaces/${id}`,
	});

	return response.data;
}
