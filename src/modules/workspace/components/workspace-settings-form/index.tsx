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
import type { EditWorkspaceBody, WorkspaceDTO } from "../../services/types";

const workspaceSettingsSchema = z.object({
	name: requiredString(),
	email: requiredEmail(),
	cellphone: requiredString(),
	cnpj: requiredString(),
});

type WorkspaceSettingsFormData = z.infer<typeof workspaceSettingsSchema>;

interface WorkspaceSettingsFormProps extends React.ComponentProps<"form"> {
	initialValues?: WorkspaceDTO;
	isPending?: boolean;
	onSubmitWorkspace: (data: EditWorkspaceBody) => Promise<unknown>;
	open?: boolean;
	submitLabel?: string;
}

export function WorkspaceSettingsForm({
	className,
	initialValues,
	isPending = false,
	onSubmitWorkspace,
	submitLabel,
	open,
}: WorkspaceSettingsFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<WorkspaceSettingsFormData>({
		resolver: zodResolver(workspaceSettingsSchema),
		mode: "onChange",
		defaultValues: {
			name: initialValues?.name ?? "",
			email: initialValues?.email ?? "",
			cellphone: initialValues?.cellphone ?? "",
			cnpj: initialValues?.cnpj ?? "",
		},
	});

	useEffect(() => {
		if (!open) {
			return;
		}

		if (!initialValues) {
			return;
		}

		reset({
			name: initialValues.name ?? "",
			email: initialValues.email ?? "",
			cellphone: initialValues.cellphone ?? "",
			cnpj: initialValues.cnpj ?? "",
		});
	}, [initialValues, open, reset]);

	const handleEditWorkspace = async (data: WorkspaceSettingsFormData) => {
		await onSubmitWorkspace(data);
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleEditWorkspace)}
		>
			<FieldGroup>
				<Field data-invalid={!!errors.name}>
					<FieldLabel htmlFor="workspace-name">Nome do escritório</FieldLabel>
					<Input
						id="workspace-name"
						placeholder="Digite o nome do escritório"
						{...register("name")}
						aria-invalid={!!errors.name}
					/>
					{errors.name && <FieldError errors={[errors.name]} />}
				</Field>

				<Field data-invalid={!!errors.email}>
					<FieldLabel htmlFor="workspace-email">E-mail</FieldLabel>
					<Input
						id="workspace-email"
						placeholder="Digite o e-mail"
						type="email"
						{...register("email")}
						aria-invalid={!!errors.email}
					/>
					{errors.email && <FieldError errors={[errors.email]} />}
				</Field>

				<Field data-invalid={!!errors.cellphone}>
					<FieldLabel htmlFor="workspace-cellphone">Telefone</FieldLabel>
					<Input
						id="workspace-cellphone"
						placeholder="(00) 00000-0000"
						{...register("cellphone")}
						aria-invalid={!!errors.cellphone}
					/>
					{errors.cellphone && <FieldError errors={[errors.cellphone]} />}
				</Field>

				<Field data-invalid={!!errors.cnpj}>
					<FieldLabel htmlFor="workspace-cnpj">CNPJ</FieldLabel>
					<Input
						id="workspace-cnpj"
						placeholder="00.000.000/0000-00"
						{...register("cnpj")}
						aria-invalid={!!errors.cnpj}
					/>
					{errors.cnpj && <FieldError errors={[errors.cnpj]} />}
				</Field>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? "Salvar alterações"}
			</Button>
		</form>
	);
}
