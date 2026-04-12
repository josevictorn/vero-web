import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/common/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { cn } from "@/common/lib/utils";
import { errors } from "@/common/utils";
import { requiredString } from "@/common/utils/validation-schemas";
import type { JsonValue, ScreeningFlowDTO } from "../../services/types";

const EMPTY_JSON_OBJECT = "{}";

function isValidJson(value: string) {
	try {
		JSON.parse(value);
		return true;
	} catch {
		return false;
	}
}

function parseJsonValue(value: string): JsonValue {
	return JSON.parse(value) as JsonValue;
}

function stringifyJsonValue(value: JsonValue) {
	return JSON.stringify(value, null, 2);
}

const screeningFlowFormSchema = z.object({
	caseType: requiredString(),
	question: requiredString().refine((value) => isValidJson(value), {
		message: errors.invalid,
	}),
});

type ScreeningFlowCreateFormData = z.infer<typeof screeningFlowFormSchema>;

interface ScreeningFlowCreateFormProps extends React.ComponentProps<"form"> {
	initialValues?: Pick<ScreeningFlowDTO, "case_type" | "questions">;
	isPending?: boolean;
	mode?: "create" | "edit";
	onSubmitScreeningFlow: (data: {
		caseType: string;
		questions: JsonValue;
	}) => Promise<unknown>;
	open?: boolean;
	submitLabel?: string;
}

export function ScreeningFlowCreateForm({
	className,
	initialValues,
	isPending = false,
	mode = "create",
	onSubmitScreeningFlow,
	open,
	submitLabel,
}: ScreeningFlowCreateFormProps) {
	const isEditMode = mode === "edit";

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors: formErrors, isSubmitting },
	} = useForm<ScreeningFlowCreateFormData>({
		resolver: zodResolver(screeningFlowFormSchema),
		mode: "onChange",
		defaultValues: {
			caseType: initialValues?.case_type ?? "",
			question: initialValues
				? stringifyJsonValue(initialValues.questions)
				: EMPTY_JSON_OBJECT,
		},
	});

	useEffect(() => {
		if (isEditMode && open && initialValues) {
			reset({
				caseType: initialValues.case_type,
				question: stringifyJsonValue(initialValues.questions),
			});
		}
	}, [isEditMode, open, initialValues, reset]);

	const handleCreateScreeningFlow = async (
		data: ScreeningFlowCreateFormData
	) => {
		const questions = parseJsonValue(data.question);

		await onSubmitScreeningFlow({
			caseType: data.caseType,
			questions,
		});
	};

	const handleFormatJson = () => {
		const questionValue = watch("question");

		if (!isValidJson(questionValue)) {
			return;
		}

		const formattedJson = stringifyJsonValue(parseJsonValue(questionValue));
		setValue("question", formattedJson, { shouldValidate: true });
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleCreateScreeningFlow)}
		>
			<FieldGroup>
				<Field data-invalid={!!formErrors.caseType}>
					<FieldLabel htmlFor="caseType">Tipo de caso</FieldLabel>
					<Input
						aria-invalid={!!formErrors.caseType}
						id="caseType"
						placeholder="Ex.: Revisão contratual"
						{...register("caseType")}
					/>
					{formErrors.caseType && <FieldError errors={[formErrors.caseType]} />}
				</Field>

				<Field data-invalid={!!formErrors.question}>
					<div className="flex items-center justify-between gap-2">
						<FieldLabel htmlFor="question">Question (JSON)</FieldLabel>
						<Button onClick={handleFormatJson} type="button" variant="outline">
							Formatar JSON
						</Button>
					</div>
					<Textarea
						aria-invalid={!!formErrors.question}
						className="min-h-40 font-mono"
						id="question"
						placeholder='{"steps": []}'
						spellCheck={false}
						{...register("question")}
					/>
					<FieldDescription>
						Insira um JSON válido para definir as perguntas do fluxo.
					</FieldDescription>
					{formErrors.question && <FieldError errors={[formErrors.question]} />}
				</Field>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ??
					(isEditMode ? "Salvar alterações" : "Criar screening flow")}
			</Button>
		</form>
	);
}
