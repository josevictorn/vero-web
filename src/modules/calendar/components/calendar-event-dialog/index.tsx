import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/common/components/ui/drawer";
import { useMediaQuery } from "@/common/hooks/use-media-query";
import type {
	CalendarEventDTO,
	CreateCalendarEventBody,
} from "../../services/types";
import { CalendarEventForm } from "../calendar-event-form";

interface CalendarEventDialogProps {
	defaultDate?: Date;
	initialValues?: CalendarEventDTO;
	isPending: boolean;
	mode: "create" | "edit";
	onOpenChange: (open: boolean) => void;
	onSubmitEvent: (data: CreateCalendarEventBody) => Promise<unknown>;
	open: boolean;
}

export function CalendarEventDialog({
	defaultDate,
	mode,
	open,
	onOpenChange,
	onSubmitEvent,
	isPending,
	initialValues,
}: CalendarEventDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const isEditMode = mode === "edit";

	const dialogTitle = isEditMode ? "Editar evento" : "Criar evento";
	const dialogDescription = isEditMode
		? "Atualize os dados do evento no calendário."
		: "Preencha os campos abaixo para criar um novo evento.";

	const handleSubmitEvent = async (data: CreateCalendarEventBody) => {
		await onSubmitEvent(data);
		onOpenChange(false);
	};

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-130">
					<DialogHeader>
						<DialogTitle>{dialogTitle}</DialogTitle>
						<DialogDescription>{dialogDescription}</DialogDescription>
					</DialogHeader>
					<CalendarEventForm
						defaultDate={defaultDate}
						initialValues={initialValues}
						isPending={isPending}
						mode={mode}
						onSubmitEvent={handleSubmitEvent}
						open={open}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{dialogTitle}</DrawerTitle>
					<DrawerDescription>{dialogDescription}</DrawerDescription>
				</DrawerHeader>
				<CalendarEventForm
					className="px-4"
					defaultDate={defaultDate}
					initialValues={initialValues}
					isPending={isPending}
					mode={mode}
					onSubmitEvent={handleSubmitEvent}
					open={open}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
