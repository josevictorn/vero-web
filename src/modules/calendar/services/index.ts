import request from "@/common/lib/axios";
import type {
	CalendarEventDTO,
	CalendarEventParams,
	CreateCalendarEventBody,
	CreateCalendarEventResponse,
	DisconnectGoogleCalendarResponse,
	EditCalendarEventBody,
	EditCalendarEventResponse,
	FetchCalendarEventsQuery,
	FetchCalendarEventsResponse,
	GetCalendarEventResponse,
	GetGoogleConnectUrlResponse,
	GoogleCallbackQuery,
	GoogleCallbackResponse,
} from "./types";

type CalendarEventApi = Omit<CalendarEventDTO, "hangout_link"> & {
	hangoutLink?: string | null;
	hangout_link?: string | null;
};

function normalizeCalendarEvent(event: CalendarEventApi): CalendarEventDTO {
	return {
		...event,
		hangout_link: event.hangout_link ?? event.hangoutLink ?? null,
	};
}

export async function getGoogleConnectUrl() {
	const response = await request<GetGoogleConnectUrlResponse>({
		method: "GET",
		url: "/calendar/google/connect-url",
	});

	return response.data;
}

export async function connectGoogleCalendar({
	code,
	state,
}: GoogleCallbackQuery) {
	const response = await request<GoogleCallbackResponse>({
		method: "GET",
		url: "/calendar/google/callback",
		params: {
			code,
			state,
		},
	});

	return response.data;
}

export async function disconnectGoogleCalendar() {
	const response = await request<DisconnectGoogleCalendarResponse>({
		method: "DELETE",
		url: "/calendar/google/disconnect",
	});

	return response.data;
}

export async function fetchCalendarEvents({
	timeMin,
	timeMax,
	maxResults,
}: FetchCalendarEventsQuery) {
	const response = await request<FetchCalendarEventsResponse>({
		method: "GET",
		url: "/calendar/events",
		params: {
			timeMin,
			timeMax,
			maxResults,
		},
	});

	return {
		events: response.data.events.map((event) =>
			normalizeCalendarEvent(event as CalendarEventApi)
		),
	};
}

export async function getCalendarEventById({ id }: CalendarEventParams) {
	const response = await request<GetCalendarEventResponse>({
		method: "GET",
		url: `/calendar/events/${id}`,
	});

	return {
		event: normalizeCalendarEvent(response.data.event as CalendarEventApi),
	};
}

export async function createCalendarEvent({
	summary,
	description,
	starts_at,
	ends_at,
	time_zone,
}: CreateCalendarEventBody) {
	const response = await request<CreateCalendarEventResponse>({
		method: "POST",
		url: "/calendar/events",
		data: {
			summary,
			description,
			starts_at,
			ends_at,
			time_zone,
		},
	});

	return response.data;
}

export async function editCalendarEvent(
	id: string,
	{ summary, description, starts_at, ends_at, time_zone }: EditCalendarEventBody
) {
	const response = await request<EditCalendarEventResponse>({
		method: "PATCH",
		url: `/calendar/events/${id}`,
		data: {
			summary,
			description,
			starts_at,
			ends_at,
			time_zone,
		},
	});

	return {
		event: normalizeCalendarEvent(response.data.event as CalendarEventApi),
	};
}

export async function deleteCalendarEvent({ id }: CalendarEventParams) {
	const response = await request({
		method: "DELETE",
		url: `/calendar/events/${id}`,
	});

	return response.data;
}
