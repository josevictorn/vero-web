import request from "@/common/lib/axios";
import type {
	ClientDTO,
	ClientParams,
	ConvertLeadToClientBody,
	ConvertLeadToClientParams,
	ConvertLeadToClientResponse,
	CreateClientBody,
	CreateClientResponse,
	DeleteClientResponse,
	EditClientBody,
	EditClientResponse,
	FetchClientsQuery,
	FetchClientsResponse,
} from "./types";

export async function fetchClients({ page }: FetchClientsQuery) {
	const response = await request<FetchClientsResponse>({
		method: "GET",
		url: "/clients",
		params: {
			page,
		},
	});

	return response.data;
}

export async function createClient({
	workspaceId,
	lawyerId,
	name,
	cellphone,
	email,
	maritalStatus,
	profession,
	rg,
	issuingAgency,
	cpf,
	street,
	neighborhood,
	city,
	state,
	zipCode,
}: CreateClientBody) {
	const response = await request<CreateClientResponse>({
		method: "POST",
		url: "/clients",
		data: {
			workspaceId,
			lawyerId,
			name,
			cellphone,
			email,
			maritalStatus,
			profession,
			rg,
			issuingAgency,
			cpf,
			street,
			neighborhood,
			city,
			state,
			zipCode,
		},
	});

	return response.data;
}

export async function getClientById({ id }: ClientParams) {
	const response = await request<ClientDTO>({
		method: "GET",
		url: `/clients/${id}`,
	});

	return response.data;
}

export async function editClient(id: string, body: EditClientBody) {
	const response = await request<EditClientResponse>({
		method: "PATCH",
		url: `/clients/${id}`,
		data: body,
	});

	return response.data;
}

export async function deleteClient({ id }: ClientParams) {
	const response = await request<DeleteClientResponse>({
		method: "DELETE",
		url: `/clients/${id}`,
	});

	return response.data;
}

export async function convertLeadToClient(
	{ leadId }: ConvertLeadToClientParams,
	body: ConvertLeadToClientBody
) {
	const response = await request<ConvertLeadToClientResponse>({
		method: "POST",
		url: `/leads/${leadId}/convert`,
		data: body,
	});

	return response.data;
}
