import request from "@/common/lib/axios";
import type {
	CreateScreeningFlowBody,
	CreateScreeningFlowResponse,
	DeleteScreeningFlowResponse,
	EditScreeningFlowBody,
	EditScreeningFlowResponse,
	FetchScreeningFlowsQuery,
	ScreeningFlowDTO,
	ScreeningFlowParams,
} from "./types";

export async function fetchScreeningFlows({ page }: FetchScreeningFlowsQuery) {
	const response = await request<Paginated<ScreeningFlowDTO>>({
		method: "GET",
		url: "/screening-flows",
		params: {
			page,
		},
	});

	return response.data;
}

export async function createScreeningFlow({
	caseType,
	questions,
}: CreateScreeningFlowBody) {
	const response = await request<CreateScreeningFlowResponse>({
		method: "POST",
		url: "/screening-flows",
		data: {
			caseType,
			questions,
		},
	});

	return response.data;
}

export async function getScreeningFlowById({ id }: ScreeningFlowParams) {
	const response = await request<ScreeningFlowDTO>({
		method: "GET",
		url: `/screening-flows/${id}`,
	});

	return response.data;
}

export async function editScreeningFlow(
	id: string,
	{ caseType, questions }: EditScreeningFlowBody
) {
	const response = await request<EditScreeningFlowResponse>({
		method: "PATCH",
		url: `/screening-flows/${id}`,
		data: {
			caseType,
			questions,
		},
	});

	return response.data;
}

export async function deleteScreeningFlow({ id }: ScreeningFlowParams) {
	const response = await request<DeleteScreeningFlowResponse>({
		method: "DELETE",
		url: `/screening-flows/${id}`,
	});

	return response.data;
}
