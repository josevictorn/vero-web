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
import { cn } from "@/common/lib/utils";
import {
	requiredEmail,
	requiredString,
} from "@/common/utils/validation-schemas";
import type { LeadDTO } from "../../services/types";

const leadFormSchema = z.object({
	name: requiredString(),
	email: requiredEmail(),
	cellphone: requiredString(),
});

type LeadCreateFormData = z.infer<typeof leadFormSchema>;

interface LeadCreateFormProps extends React.ComponentProps<"form"> {
	initialValues?: Pick<LeadDTO, "cellphone" | "email" | "name">;
	isPending?: boolean;
	mode?: "create" | "edit";
	onSubmitLead: (data: LeadCreateFormData) => unknown;
	open?: boolean;
	submitLabel?: string;
}

export function LeadCreateForm({
	className,
	initialValues,
	isPending = false,
	mode = "create",
	onSubmitLead,
	submitLabel,
	open,
}: LeadCreateFormProps) {
	const isEditMode = mode === "edit";

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<LeadCreateFormData>({
		resolver: zodResolver(leadFormSchema),
		mode: "onChange",
		defaultValues: {
			name: initialValues?.name ?? "",
			email: initialValues?.email ?? "",
			cellphone: initialValues?.cellphone ?? "",
		},
	});

	useEffect(() => {
		if (isEditMode && open && initialValues) {
			reset({
				name: initialValues.name ?? "",
				email: initialValues.email ?? "",
				cellphone: initialValues.cellphone ?? "",
			});
		}
	}, [isEditMode, open, initialValues, reset]);

	const handleCreateLead = async (data: LeadCreateFormData) => {
		await onSubmitLead(data);
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleCreateLead)}
		>
			<FieldGroup>
				<Field data-invalid={!!errors.name}>
					<FieldLabel htmlFor="name">Nome</FieldLabel>
					<Input
						aria-invalid={!!errors.name}
						id="name"
						placeholder="Digite o nome do lead"
						{...register("name")}
					/>
					{errors.name && <FieldError errors={[errors.name]} />}
				</Field>

				<Field data-invalid={!!errors.email}>
					<FieldLabel htmlFor="email">E-mail</FieldLabel>
					<Input
						aria-invalid={!!errors.email}
						id="email"
						placeholder="Digite o e-mail"
						type="email"
						{...register("email")}
					/>
					{errors.email && <FieldError errors={[errors.email]} />}
				</Field>

				<Field data-invalid={!!errors.cellphone}>
					<FieldLabel htmlFor="cellphone">Telefone</FieldLabel>
					<Input
						aria-invalid={!!errors.cellphone}
						id="cellphone"
						placeholder="Digite o telefone"
						{...register("cellphone")}
					/>
					{errors.cellphone && <FieldError errors={[errors.cellphone]} />}
				</Field>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? (isEditMode ? "Salvar alterações" : "Criar lead")}
			</Button>
		</form>
	);
}
