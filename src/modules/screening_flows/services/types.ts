export type JsonValue =
	| string
	| number
	| boolean
	| null
	| { [key: string]: JsonValue }
	| JsonValue[];

export interface ScreeningFlowDTO {
	case_type: string;
	created_at: string; // ISO datetime
	id: string;
	questions: JsonValue;
}

export interface CreateScreeningFlowBody {
	caseType: string;
	questions: JsonValue;
}

export interface CreateScreeningFlowResponse {
	screeningFlowId: string;
}

export interface FetchScreeningFlowsQuery {
	page?: number;
}

export interface ScreeningFlowParams {
	id: string;
}

export interface EditScreeningFlowBody {
	caseType?: string;
	questions?: JsonValue;
}

export interface EditScreeningFlowResponse {
	screeningFlow: ScreeningFlowDTO;
}

export type DeleteScreeningFlowResponse = null;
