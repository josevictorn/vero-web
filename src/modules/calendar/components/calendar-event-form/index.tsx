import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/common/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { cn } from "@/common/lib/utils";
import { requiredString } from "@/common/utils/validation-schemas";
import type {
	CalendarEventDTO,
	CreateCalendarEventBody,
} from "../../services/types";

interface CalendarEventFormProps extends React.ComponentProps<"form"> {
	defaultDate?: Date;
	initialValues?: CalendarEventDTO;
	isPending?: boolean;
	mode?: "create" | "edit";
	onSubmitEvent: (data: CreateCalendarEventBody) => Promise<unknown>;
	open?: boolean;
	submitLabel?: string;
}

type CalendarEventFormData = z.infer<typeof calendarEventSchema>;

const calendarEventSchema = z
	.object({
		summary: requiredString(),
		description: z.string().optional(),
		starts_at: requiredString(),
		ends_at: requiredString(),
	})
	.superRefine((data, context) => {
		const startsAt = new Date(data.starts_at);
		const endsAt = new Date(data.ends_at);

		if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
			return;
		}

		if (endsAt <= startsAt) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "A data de fim deve ser maior que a data de início",
				path: ["ends_at"],
			});
		}
	});

function toDateTimeLocalValue(isoDate: string) {
	const date = new Date(isoDate);
	const timezoneOffsetInMs = date.getTimezoneOffset() * 60_000;
	const localDate = new Date(date.getTime() - timezoneOffsetInMs);

	return localDate.toISOString().slice(0, 16);
}

function getDefaultStartsAt(date?: Date) {
	if (!date) {
		return "";
	}

	const startsAt = new Date(date);
	startsAt.setHours(9, 0, 0, 0);

	return toDateTimeLocalValue(startsAt.toISOString());
}

function getDefaultEndsAt(date?: Date) {
	if (!date) {
		return "";
	}

	const endsAt = new Date(date);
	endsAt.setHours(10, 0, 0, 0);

	return toDateTimeLocalValue(endsAt.toISOString());
}

export function CalendarEventForm({
	className,
	defaultDate,
	initialValues,
	isPending = false,
	mode = "create",
	onSubmitEvent,
	submitLabel,
	open,
}: CalendarEventFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<CalendarEventFormData>({
		resolver: zodResolver(calendarEventSchema),
		mode: "onChange",
		defaultValues: {
			summary: initialValues?.summary ?? "",
			description: initialValues?.description ?? "",
			starts_at: initialValues?.starts_at
				? toDateTimeLocalValue(initialValues.starts_at)
				: getDefaultStartsAt(defaultDate),
			ends_at: initialValues?.ends_at
				? toDateTimeLocalValue(initialValues.ends_at)
				: getDefaultEndsAt(defaultDate),
		},
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		reset({
			summary: initialValues?.summary ?? "",
			description: initialValues?.description ?? "",
			starts_at: initialValues?.starts_at
				? toDateTimeLocalValue(initialValues.starts_at)
				: getDefaultStartsAt(defaultDate),
			ends_at: initialValues?.ends_at
				? toDateTimeLocalValue(initialValues.ends_at)
				: getDefaultEndsAt(defaultDate),
		});
	}, [open, defaultDate, initialValues, reset]);

	const handleSubmitEvent = async (data: CalendarEventFormData) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		await onSubmitEvent({
			summary: data.summary,
			description: data.description,
			starts_at: new Date(data.starts_at).toISOString(),
			ends_at: new Date(data.ends_at).toISOString(),
			time_zone: timeZone,
		});
	};

	const isEditMode = mode === "edit";

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleSubmitEvent)}
		>
			<FieldGroup>
				<Field data-invalid={!!errors.summary}>
					<FieldLabel htmlFor="summary">Título</FieldLabel>
					<Input
						id="summary"
						placeholder="Ex.: Reunião com cliente"
						{...register("summary")}
					/>
					{errors.summary && <FieldError errors={[errors.summary]} />}
				</Field>

				<Field data-invalid={!!errors.description}>
					<FieldLabel htmlFor="description">Descrição</FieldLabel>
					<Textarea
						id="description"
						placeholder="Adicione detalhes do evento"
						{...register("description")}
					/>
					{errors.description && <FieldError errors={[errors.description]} />}
				</Field>

				<Field data-invalid={!!errors.starts_at}>
					<FieldLabel htmlFor="starts_at">Início</FieldLabel>
					<Input
						id="starts_at"
						type="datetime-local"
						{...register("starts_at")}
					/>
					{errors.starts_at && <FieldError errors={[errors.starts_at]} />}
				</Field>

				<Field data-invalid={!!errors.ends_at}>
					<FieldLabel htmlFor="ends_at">Fim</FieldLabel>
					<Input id="ends_at" type="datetime-local" {...register("ends_at")} />
					{errors.ends_at && <FieldError errors={[errors.ends_at]} />}
				</Field>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? (isEditMode ? "Salvar alterações" : "Criar evento")}
			</Button>
		</form>
	);
}
