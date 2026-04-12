import { zodResolver } from "@hookform/resolvers/zod";
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
import { userRoleMap, userRoles } from "../../utils";

const userCreateFormSchema = z.object({
	name: requiredString(),
	email: requiredEmail(),
	password: requiredString(),
	role: z.enum(userRoles),
});

type UserCreateFormData = z.infer<typeof userCreateFormSchema>;

interface UserCreateFormProps extends React.ComponentProps<"form"> {
	onCreateUser: (data: UserCreateFormData) => void;
}

export function UserCreateForm({
	className,
	onCreateUser,
}: UserCreateFormProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<UserCreateFormData>({
		resolver: zodResolver(userCreateFormSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "CLIENT",
		},
	});

	const handleCreateUser = async (data: UserCreateFormData) => {
		await onCreateUser?.(data);
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

				<FieldGroup>
					<Field data-invalid={!!errors.password}>
						<FieldLabel htmlFor="password">Senha</FieldLabel>
						<Input
							id="password"
							type="password"
							{...register("password")}
							aria-invalid={!!errors.password}
						/>
						{errors.password && <FieldError errors={[errors.password]} />}
					</Field>
				</FieldGroup>

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

			<Button className="w-full" isLoading={isSubmitting} type="submit">
				Criar usuário
			</Button>
		</form>
	);
}
