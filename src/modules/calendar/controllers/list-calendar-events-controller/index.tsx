import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { endOfMonth, startOfMonth } from "date-fns";
import { fetchCalendarEvents } from "../../services";
import type { FetchCalendarEventsResponse } from "../../services/types";

export interface ListCalendarEventsControllerChildrenProps {
	fetchCalendarEvents: UseQueryResult<FetchCalendarEventsResponse, unknown>;
}

interface ListCalendarEventsControllerProps
	extends ChildrenController<ListCalendarEventsControllerChildrenProps> {
	enabled?: boolean;
	monthDate: Date;
}

export function ListCalendarEventsController({
	children,
	enabled = true,
	monthDate,
}: ListCalendarEventsControllerProps) {
	const monthStart = startOfMonth(monthDate);
	const monthEnd = endOfMonth(monthDate);

	const fetch = useQuery({
		queryKey: [
			"calendar-events",
			monthStart.toISOString(),
			monthEnd.toISOString(),
		],
		queryFn: () =>
			fetchCalendarEvents({
				timeMin: monthStart.toISOString(),
				timeMax: monthEnd.toISOString(),
				maxResults: 50,
			}),
		enabled,
	});

	return children({
		fetchCalendarEvents: fetch,
	});
}
