import request from "@/common/lib/axios";
import type {
	CreateLawyerBody,
	CreateLawyerResponse,
	DeleteLawyerResponse,
	EditLawyerBody,
	EditLawyerResponse,
	FetchLawyersQuery,
	FetchLawyersResponse,
	LawyerDTO,
	LawyerParams,
} from "./types";

export async function fetchLawyers({ page }: FetchLawyersQuery) {
	const response = await request<FetchLawyersResponse>({
		method: "GET",
		url: "/lawyers",
		params: {
			page,
		},
	});

	return response.data;
}

export async function createLawyer({
	userId,
	workspaceId,
	cellphone,
	oab,
	oabState,
	pix,
}: CreateLawyerBody) {
	const response = await request<CreateLawyerResponse>({
		method: "POST",
		url: "/lawyers",
		data: {
			userId,
			workspaceId,
			cellphone,
			oab,
			oabState,
			pix,
		},
	});

	return response.data;
}

export async function getLawyerById({ id }: LawyerParams) {
	const response = await request<LawyerDTO>({
		method: "GET",
		url: `/lawyers/${id}`,
	});

	return response.data;
}

export async function editLawyer(
	id: string,
	{ userId, workspaceId, cellphone, oab, oabState, pix }: EditLawyerBody
) {
	const response = await request<EditLawyerResponse>({
		method: "PATCH",
		url: `/lawyers/${id}`,
		data: {
			userId,
			workspaceId,
			cellphone,
			oab,
			oabState,
			pix,
		},
	});

	return response.data;
}

export async function deleteLawyer({ id }: LawyerParams) {
	const response = await request<DeleteLawyerResponse>({
		method: "DELETE",
		url: `/lawyers/${id}`,
	});

	return response.data;
}
