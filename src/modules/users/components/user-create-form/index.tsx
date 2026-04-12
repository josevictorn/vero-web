import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/common/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select";
import { cn } from "@/common/lib/utils";
import {
	requiredEmail,
	requiredString,
} from "@/common/utils/validation-schemas";
import type { Account } from "../../services/types";
import { userRoleMap, userRoles } from "../../utils";

const userFormBaseSchema = z.object({
	name: requiredString(),
	email: requiredEmail(),
	password: z.string(),
	role: z.enum(userRoles),
});

type UserCreateFormData = z.infer<typeof userFormBaseSchema>;

function getUserFormSchema(isEditMode: boolean) {
	return userFormBaseSchema.superRefine((data, context) => {
		if (!isEditMode && data.password.trim().length === 0) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Campo obrigatório",
				path: ["password"],
			});
		}
	});
}

interface UserCreateFormProps extends React.ComponentProps<"form"> {
	initialValues?: Pick<Account, "email" | "name" | "role">;
	isPending?: boolean;
	mode?: "create" | "edit";
	onSubmitUser: (data: UserCreateFormData) => unknown;
	open?: boolean;
	submitLabel?: string;
}

export function UserCreateForm({
	className,
	initialValues,
	isPending = false,
	mode = "create",
	onSubmitUser,
	submitLabel,
	open,
}: UserCreateFormProps) {
	const isEditMode = mode === "edit";

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<UserCreateFormData>({
		resolver: zodResolver(getUserFormSchema(isEditMode)),
		mode: "onChange",
		defaultValues: {
			name: initialValues?.name ?? "",
			email: initialValues?.email ?? "",
			password: "",
			role: initialValues?.role ?? "ASSISTANT",
		},
	});

	useEffect(() => {
		if (isEditMode && open && initialValues) {
			reset({
				name: initialValues.name ?? "",
				email: initialValues.email ?? "",
				password: "",
				role: initialValues.role ?? "ASSISTANT",
			});
		}
	}, [isEditMode, open, initialValues, reset]);

	const handleCreateUser = async (data: UserCreateFormData) => {
		await onSubmitUser(data);
	};

	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			onSubmit={handleSubmit(handleCreateUser)}
		>
			<FieldGroup>
				<Field data-invalid={!!errors.name}>
					<FieldLabel htmlFor="name">Nome</FieldLabel>
					<Input
						id="name"
						placeholder="Digite o nome completo"
						{...register("name")}
						aria-invalid={!!errors.name}
					/>
					{errors.name && <FieldError errors={[errors.name]} />}
				</Field>

				<Field data-invalid={!!errors.email}>
					<FieldLabel htmlFor="email">E-mail</FieldLabel>
					<Input
						id="email"
						placeholder="Digite o e-mail"
						type="email"
						{...register("email")}
						aria-invalid={!!errors.email}
					/>
					{errors.email && <FieldError errors={[errors.email]} />}
				</Field>

				{!isEditMode && (
					<Field data-invalid={!!errors.password}>
						<FieldLabel htmlFor="password">Senha</FieldLabel>
						<Input
							id="password"
							placeholder="*******"
							type="password"
							{...register("password")}
							aria-invalid={!!errors.password}
						/>
						{errors.password && <FieldError errors={[errors.password]} />}
					</Field>
				)}

				<Field data-invalid={!!errors.role}>
					<FieldLabel htmlFor="role">Função</FieldLabel>
					<Controller
						control={control}
						name="role"
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger
									aria-invalid={!!errors.role}
									className="w-full"
									id="role"
								>
									<SelectValue placeholder="Selecione uma função" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{userRoles.map((role) => (
											<SelectItem key={role} value={role}>
												{userRoleMap[role]}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.role && <FieldError errors={[errors.role]} />}
				</Field>
			</FieldGroup>

			<Button
				className="w-full"
				disabled={isPending || isSubmitting}
				isLoading={isPending || isSubmitting}
				type="submit"
			>
				{submitLabel ?? (isEditMode ? "Salvar alterações" : "Criar usuário")}
			</Button>
		</form>
	);
}
