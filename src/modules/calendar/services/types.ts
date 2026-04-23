export interface CalendarEventDTO {
	description: string | null;
	ends_at: string; // ISO datetime
	hangout_link: string | null;
	id: string;
	starts_at: string; // ISO datetime
	summary: string;
}

export interface GetGoogleConnectUrlResponse {
	auth_url: string;
}

export interface GoogleCallbackQuery {
	code: string;
	state: string;
}

export interface GoogleCallbackResponse {
	connected: boolean;
	google_email: string;
}

export interface DisconnectGoogleCalendarResponse {
	message?: string;
}

export interface FetchCalendarEventsQuery {
	maxResults?: number;
	timeMax?: string; // ISO datetime
	timeMin?: string; // ISO datetime
}

export interface FetchCalendarEventsResponse {
	events: CalendarEventDTO[];
}

export interface CalendarEventParams {
	id: string;
}

export interface GetCalendarEventResponse {
	event: CalendarEventDTO;
}

export interface CreateCalendarEventBody {
	description?: string;
	ends_at: string; // ISO datetime
	starts_at: string; // ISO datetime
	summary: string;
	time_zone?: string;
}

export interface CreateCalendarEventResponse {
	event_id: string;
	hangout_link: string | null;
}

export interface EditCalendarEventBody {
	description?: string;
	ends_at?: string; // ISO datetime
	starts_at?: string; // ISO datetime
	summary?: string;
	time_zone?: string;
}

export interface EditCalendarEventResponse {
	event: CalendarEventDTO;
}
