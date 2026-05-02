import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
	type FieldErrors,
	type UseFormRegister,
	useForm,
} from "react-hook-form";
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
import type { ClientDTO } from "../../services/types";

const clientFormSchema = z.object({
	name: requiredString(),
	email: requiredEmail(),
	cellphone: requiredString(),
	cpf: requiredString(),
	rg: requiredString(),
	issuingAgency: requiredString(),
	maritalStatus: requiredString(),
	profession: requiredString(),
	street: requiredString(),
	neighborhood: requiredString(),
	city: requiredString(),
	state: requiredString(),
	zipCode: requiredString(),
});

type ClientCreateFormData = z.infer<typeof clientFormSchema>;

const clientFormFields: Array<{
	className?: string;
	label: string;
	name: keyof ClientCreateFormData;
	placeholder: string;
	type?: React.ComponentProps<typeof Input>["type"];
}> = [
	{
		className: "md:col-span-2",
		label: "Nome",
		name: "name",
		placeholder: "Digite o nome completo",
	},
	{
		label: "E-mail",
		name: "email",
		placeholder: "Digite o e-mail",
		type: "email",
	},
	{
		label: "Telefone",
		name: "cellphone",
		placeholder: "Digite o telefone",
	},
	{
		label: "CPF",
		name: "cpf",
		placeholder: "Digite o CPF",
	},
	{
		label: "RG",
		name: "rg",
		placeholder: "Digite o RG",
	},
	{
		label: "Órgão emissor",
		name: "issuingAgency",
		placeholder: "Digite o órgão emissor",
	},
	{
		label: "Estado civil",
		name: "maritalStatus",
		placeholder: "Digite o estado civil",
	},
	{
		label: "Profissão",
		name: "profession",
		placeholder: "Digite a profissão",
	},
	{
		className: "md:col-span-2",
		label: "Endereço",
		name: "street",
		placeholder: "Rua, número e complemento",
	},
	{
		label: "Bairro",
		name: "neighborhood",
		placeholder: "Digite o bairro",
	},
	{
		label: "Cidade",
		name: "city",
		placeholder: "Digite a cidade",
	},
	{
		label: "Estado",
		name: "state",
		placeholder: "Digite o estado",
	},
	{
		label: "CEP",
		name: "zipCode",
		placeholder: "Digite o CEP",
	},
];

type ClientFormInitialValues = Pick<
	ClientDTO,
	| "name"
	| "email"
	| "cellphone"
	| "cpf"
	| "rg"
	| "issuingAgency"
	| "maritalStatus"
	| "profession"
	| "street"
	| "neighborhood"
	| "city"
	| "state"
	| "zipCode"
>;

interface ClientCreateFormProps extends React.ComponentProps<"form"> {
	initialValues?: ClientFormInitialValues;
	isPending?: boolean;
	mode?: "create" | "edit";
	onSubmitClient: (data: ClientCreateFormData) => unknown;
	open?: boolean;
	submitLabel?: string;
}

interface ClientFormFieldsProps {
	errors: FieldErrors<ClientCreateFormData>;
	register: UseFormRegister<ClientCreateFormData>;
}

function ClientFormFields({ errors, register }: ClientFormFieldsProps) {
	return (
		<FieldGroup className="grid gap-4 md:grid-cols-2">
			{clientFormFields.map((field) => {
				const fieldError = errors[field.name];

				return (
					<Field
						className={field.className}
						data-invalid={!!fieldError}
						key={field.name}
					>
						<FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
						<Input
							aria-invalid={!!fieldError}
							id={field.name}
							placeholder={field.placeholder}
							type={field.type}
							{...register(field.name)}
						/>
						{fieldError && <FieldError errors={[fieldError]} />}
					</Field>
				);
			})}
		</FieldGroup>
	);
}

export function ClientCreateForm({
	className,
	initialValues,
	isPending = false,
	mode = "create",
	onSubmitClient,
	submitLabel,
	open,
}: ClientCreateFormProps) {
	const isEditMode = mode === "edit";

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<ClientCreateFormData>({
		resolver: zodResolver(clientFormSchema),
		mode: "onChange",
		defaultValues: {
			name: initialValues?.name ?? "",
			email: initialValues?.email ?? "",
			cellphone: initialValues?.cellphone ?? "",
			cpf: initialValues?.cpf ?? "",
			rg: initialValues?.rg ?? "",
			issuingAgency: initialValues?.issuingAgency ?? "",
			maritalStatus: initialValues?.maritalStatus ?? "",
			profession: initialValues?.profession ?? "",
			street: initialValues?.street ?? "",
			neighborhood: initialValues?.neighborhood ?? "",
			city: initialValues?.city ?? "",
			state: initialValues?.state ?? "",
			zipCode: initialValues?.zipCode ?? "",
		},
	});

	useEffect(() => {
		if (isEditMode && open && initialValues) {
			reset({
				name: initialValues.name ?? "",
				email: initialValues.email ?? "",
				cellphone: initialValues.cellphone ?? "",
				cpf: initialValues.cpf ?? "",
				rg: initialValues.rg ?? "",
				issuingAgency: initialValues.issuingAgency ?? "",
				maritalStatus: initialValues.maritalStatus ?? "",
				profession: initialValues.profession ?? "",
				street: initialValues.street ?? "",
				neighborhood: initialValues.neighborhood ?? "",
				city: initialValues.city ?? "",
				state: initialValues.state ?? "",
				zipCode: initialValues.zipCode ?? "",
			});
		}
	}, [isEditMode, open, initialValues, reset]);

	const handleCreateClient = async (data: ClientCreateFormData) => {
		await onSubmitClient(data);
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleCreateClient)}
		>
			<ClientFormFields errors={errors} register={register} />

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? (isEditMode ? "Salvar alterações" : "Criar cliente")}
			</Button>
		</form>
	);
}
