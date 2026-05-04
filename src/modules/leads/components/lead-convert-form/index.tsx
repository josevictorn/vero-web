import { zodResolver } from "@hookform/resolvers/zod";
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
import { requiredString } from "@/common/utils/validation-schemas";
import type { ConvertLeadToClientBody } from "@/modules/clients/services/types";

const convertLeadFormSchema = z.object({
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

type ConvertLeadFormData = z.infer<typeof convertLeadFormSchema>;

const convertLeadFields: Array<{
	className?: string;
	label: string;
	name: keyof ConvertLeadFormData;
	placeholder: string;
}> = [
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

interface ConvertLeadFormFieldsProps {
	errors: FieldErrors<ConvertLeadFormData>;
	register: UseFormRegister<ConvertLeadFormData>;
}

function ConvertLeadFormFields({
	errors,
	register,
}: ConvertLeadFormFieldsProps) {
	return (
		<FieldGroup className="grid gap-4 md:grid-cols-2">
			{convertLeadFields.map((field) => {
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
							{...register(field.name)}
						/>
						{fieldError && <FieldError errors={[fieldError]} />}
					</Field>
				);
			})}
		</FieldGroup>
	);
}

interface LeadConvertFormProps extends React.ComponentProps<"form"> {
	isPending?: boolean;
	onSubmitLead: (data: ConvertLeadToClientBody) => Promise<void>;
	submitLabel?: string;
}

export function LeadConvertForm({
	className,
	isPending = false,
	onSubmitLead,
	submitLabel,
}: LeadConvertFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ConvertLeadFormData>({
		resolver: zodResolver(convertLeadFormSchema),
		mode: "onChange",
		defaultValues: {
			cpf: "",
			rg: "",
			issuingAgency: "",
			maritalStatus: "",
			profession: "",
			street: "",
			neighborhood: "",
			city: "",
			state: "",
			zipCode: "",
		},
	});

	const handleConvertLead = async (data: ConvertLeadFormData) => {
		await onSubmitLead(data);
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleConvertLead)}
		>
			<ConvertLeadFormFields errors={errors} register={register} />
			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? "Converter em cliente"}
			</Button>
		</form>
	);
}
