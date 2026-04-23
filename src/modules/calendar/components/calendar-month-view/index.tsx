import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CalendarDotsIcon,
	PencilSimpleLineIcon,
	PlusIcon,
	TrashIcon,
	VideoConferenceIcon,
} from "@phosphor-icons/react";
import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	isSameMonth,
	parseISO,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Skeleton } from "@/common/components/ui/skeleton";
import type { CalendarEventDTO } from "../../services/types";

interface CalendarMonthViewProps {
	currentMonth: Date;
	events: CalendarEventDTO[];
	isLoading: boolean;
	onCreateAtDate: (date: Date) => void;
	onDeleteEvent: (event: CalendarEventDTO) => void;
	onEditEvent: (event: CalendarEventDTO) => void;
	onNextMonth: () => void;
	onPreviousMonth: () => void;
	onToday: () => void;
}

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export function CalendarMonthView({
	currentMonth,
	events,
	isLoading,
	onToday,
	onNextMonth,
	onPreviousMonth,
	onEditEvent,
	onDeleteEvent,
	onCreateAtDate,
}: CalendarMonthViewProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(currentMonth);
	const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
	const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
	const filteredEvents = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		if (normalizedSearch.length === 0) {
			return events;
		}

		return events.filter((event) =>
			event.summary.toLowerCase().includes(normalizedSearch)
		);
	}, [events, searchTerm]);

	const eventsByDay = days.map((day) => ({
		day,
		events: filteredEvents
			.filter((event) => isSameDay(parseISO(event.starts_at), day))
			.sort((a, b) => a.starts_at.localeCompare(b.starts_at)),
	}));

	if (isLoading) {
		return (
			<div className="grid gap-4">
				<Skeleton className="h-20 w-full rounded-xl" />
				<Skeleton className="h-170 w-full rounded-xl" />
			</div>
		);
	}

	return (
		<div className="rounded-xl border bg-card">
			<div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<CalendarDotsIcon className="size-5 text-muted-foreground" />
					<div>
						<p className="font-semibold text-sm">
							{format(currentMonth, "MMMM yyyy", { locale: ptBR })}
						</p>
						<p className="text-muted-foreground text-xs">
							Gerencie seus eventos e compromissos.
						</p>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<Input
						className="w-full md:w-52"
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Pesquisar evento"
						value={searchTerm}
					/>
					<Button onClick={onPreviousMonth} size="icon-sm" variant="outline">
						<ArrowLeftIcon />
					</Button>
					<Button onClick={onToday} variant="outline">
						Hoje
					</Button>
					<Button onClick={onNextMonth} size="icon-sm" variant="outline">
						<ArrowRightIcon />
					</Button>
					<Button onClick={() => onCreateAtDate(new Date())}>
						<PlusIcon />
						Novo evento
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-7 border-b">
				{weekDays.map((weekDay) => (
					<div
						className="border-r p-2 text-center font-medium text-muted-foreground text-xs last:border-r-0"
						key={weekDay}
					>
						{weekDay}
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-7">
				{eventsByDay.map(({ day, events: dayEvents }) => {
					const isCurrentMonthDay = isSameMonth(day, currentMonth);
					const visibleEvents = dayEvents.slice(0, 3);
					const hiddenEventsCount = Math.max(dayEvents.length - visibleEvents.length, 0);

					return (
						<div
							className="min-h-38 border-r border-b p-2 last:border-r-0 md:min-h-44"
							key={day.toISOString()}
						>
							<button
								className="mb-2 rounded px-1 py-0.5 text-left font-medium text-xs hover:bg-muted"
								onClick={() => onCreateAtDate(day)}
								type="button"
							>
								<span
									className={
										isCurrentMonthDay ? "text-foreground" : "text-muted-foreground"
									}
								>
									{format(day, "dd")}
								</span>
							</button>

							<div className="space-y-1">
								{visibleEvents.map((event) => (
									<div
										className="group/event flex items-center gap-1 rounded-md bg-primary/10 p-1"
										key={event.id}
									>
										<div className="min-w-0 flex-1">
											<button
												className="w-full truncate text-left text-[0.65rem] hover:text-primary"
												onClick={() => onEditEvent(event)}
												type="button"
											>
												{format(parseISO(event.starts_at), "HH:mm")} · {event.summary}
											</button>
											{event.hangout_link && (
												<a
													className="inline-flex items-center gap-1 text-[0.6rem] text-primary underline-offset-2 hover:underline"
													href={event.hangout_link}
													rel="noopener"
													target="_blank"
												>
													<VideoConferenceIcon className="size-2.5" />
													Entrar no Meet
												</a>
											)}
										</div>
										<Button
											onClick={() => onEditEvent(event)}
											size="icon-xs"
											type="button"
											variant="ghost"
										>
											<PencilSimpleLineIcon />
										</Button>
										<Button
											onClick={() => onDeleteEvent(event)}
											size="icon-xs"
											type="button"
											variant="ghost"
										>
											<TrashIcon />
										</Button>
									</div>
								))}

								{hiddenEventsCount > 0 && (
									<p className="text-muted-foreground text-xs">
										+{hiddenEventsCount} eventos
									</p>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
