import request from "@/common/lib/axios";
import type {
	CreateLeadBody,
	CreateLeadResponse,
	DeleteLeadResponse,
	EditLeadBody,
	EditLeadResponse,
	FetchLeadsQuery,
	LeadDTO,
	LeadParams,
} from "./types";

export async function fetchLeads({ page }: FetchLeadsQuery) {
	const response = await request<Paginated<LeadDTO>>({
		method: "GET",
		url: "/leads",
		params: { page },
	});

	return response.data;
}

export async function createLead({
	workspaceId,
	lawyerId,
	name,
	cellphone,
	email,
}: CreateLeadBody) {
	const response = await request<CreateLeadResponse>({
		method: "POST",
		url: "/leads",
		data: {
			workspaceId,
			lawyerId,
			name,
			cellphone,
			email,
		},
	});

	return response.data;
}

export async function getLeadById({ id }: LeadParams) {
	const response = await request<LeadDTO>({
		method: "GET",
		url: `/leads/${id}`,
	});

	return response.data;
}

export async function editLead(
	id: string,
	{ workspaceId, lawyerId, name, cellphone, email }: EditLeadBody
) {
	const response = await request<EditLeadResponse>({
		method: "PATCH",
		url: `/leads/${id}`,
		data: {
			workspaceId,
			lawyerId,
			name,
			cellphone,
			email,
		},
	});

	return response.data;
}

export async function deleteLead({ id }: LeadParams) {
	const response = await request<DeleteLeadResponse>({
		method: "DELETE",
		url: `/leads/${id}`,
	});

	return response.data;
}
