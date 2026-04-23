import { GoogleLogoIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { addMonths } from "date-fns";
import { useState } from "react";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { Button } from "@/common/components/ui/button";
import { CalendarEventDeleteDialog } from "@/modules/calendar/components/calendar-event-delete-dialog";
import { CalendarEventDialog } from "@/modules/calendar/components/calendar-event-dialog";
import { CalendarMonthView } from "@/modules/calendar/components/calendar-month-view";
import { CreateCalendarEventController } from "@/modules/calendar/controllers/create-calendar-event-controller";
import { DeleteCalendarEventController } from "@/modules/calendar/controllers/delete-calendar-event-controller";
import { EditCalendarEventController } from "@/modules/calendar/controllers/edit-calendar-event-controller";
import { GoogleCalendarConnectionController } from "@/modules/calendar/controllers/google-calendar-connection-controller";
import { ListCalendarEventsController } from "@/modules/calendar/controllers/list-calendar-events-controller";
import type { CalendarEventDTO } from "@/modules/calendar/services/types";

const searchSchema = z.object({
	code: z.string().optional(),
	state: z.string().optional(),
});

export const Route = createFileRoute("/_app/calendar/")({
	component: CalendarRoute,
	validateSearch: searchSchema,
});

function CalendarRoute() {
	const navigate = Route.useNavigate();
	const { code, state } = Route.useSearch();
	const [currentMonth, setCurrentMonth] = useState(() => new Date());
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [editingEvent, setEditingEvent] = useState<CalendarEventDTO | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [deletingEvent, setDeletingEvent] = useState<CalendarEventDTO | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleCreateDialogChange = (open: boolean) => {
		setIsCreateDialogOpen(open);
		if (!open) {
			setSelectedDate(null);
		}
	};

	const handleEditDialogChange = (open: boolean) => {
		setIsEditDialogOpen(open);
		if (!open) {
			setEditingEvent(null);
		}
	};

	const handleDeleteDialogChange = (open: boolean) => {
		setIsDeleteDialogOpen(open);
		if (!open) {
			setDeletingEvent(null);
		}
	};

	const handleGoogleCallbackHandled = () => {
		navigate({
			search: {
				code: undefined,
				state: undefined,
			},
			replace: true,
		});
	};

	return (
		<BaseContainer>
			<GoogleCalendarConnectionController
				callbackCode={code}
				callbackState={state}
				onCallbackHandled={handleGoogleCallbackHandled}
			>
				{({ isGoogleConnected, isPending, toggleGoogleConnection }) => (
					<>
						<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
							<PageHeader
								buttonProps={{
									text: "Adicionar evento",
									onClick: () => {
										setSelectedDate(new Date());
										setIsCreateDialogOpen(true);
									},
									disabled: !isGoogleConnected,
								}}
								subtitle="Conecte sua conta Google Calendar e gerencie eventos no calendário mensal"
								title="Calendário"
							/>

							<Button
								disabled={isPending}
								isLoading={isPending}
								onClick={toggleGoogleConnection}
								variant={isGoogleConnected ? "outline" : "default"}
							>
								<GoogleLogoIcon />
								{isGoogleConnected
									? "Desconectar Google Calendar"
									: "Conectar Google Calendar"}
							</Button>
						</div>

						<ListCalendarEventsController
							enabled={isGoogleConnected}
							monthDate={currentMonth}
						>
							{({ fetchCalendarEvents }) => (
								<CalendarMonthView
									currentMonth={currentMonth}
									events={fetchCalendarEvents.data?.events ?? []}
									isLoading={fetchCalendarEvents.isPending}
									onCreateAtDate={(date) => {
										setSelectedDate(date);
										setIsCreateDialogOpen(true);
									}}
									onDeleteEvent={(event) => {
										setDeletingEvent(event);
										setIsDeleteDialogOpen(true);
									}}
									onEditEvent={(event) => {
										setEditingEvent(event);
										setIsEditDialogOpen(true);
									}}
									onNextMonth={() => setCurrentMonth((prev) => addMonths(prev, 1))}
									onPreviousMonth={() =>
										setCurrentMonth((prev) => addMonths(prev, -1))
									}
									onToday={() => setCurrentMonth(new Date())}
								/>
							)}
						</ListCalendarEventsController>

						<CreateCalendarEventController>
							{({ isPending: isCreatingEvent, submit }) => (
								<CalendarEventDialog
									defaultDate={selectedDate ?? undefined}
									isPending={isCreatingEvent}
									mode="create"
									onOpenChange={handleCreateDialogChange}
									onSubmitEvent={submit}
									open={isCreateDialogOpen}
								/>
							)}
						</CreateCalendarEventController>

						<EditCalendarEventController eventId={editingEvent?.id ?? null}>
							{({ initialValues, isFetchingEvent, isPending, submit }) => (
								<CalendarEventDialog
									initialValues={initialValues}
									isPending={isPending || isFetchingEvent}
									mode="edit"
									onOpenChange={handleEditDialogChange}
									onSubmitEvent={submit}
									open={isEditDialogOpen}
								/>
							)}
						</EditCalendarEventController>

						<DeleteCalendarEventController eventId={deletingEvent?.id ?? null}>
							{({ isPending: isDeletingEvent, submit }) => (
								<CalendarEventDeleteDialog
									eventSummary={deletingEvent?.summary}
									isPending={isDeletingEvent}
									onConfirm={submit}
									onOpenChange={handleDeleteDialogChange}
									open={isDeleteDialogOpen}
								/>
							)}
						</DeleteCalendarEventController>
					</>
				)}
			</GoogleCalendarConnectionController>
		</BaseContainer>
	);
}
