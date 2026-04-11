import { zodResolver } from "@hookform/resolvers/zod";
import { ScalesIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
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
import {
	requiredEmail,
	requiredPasswordMinLength,
	requiredString,
} from "@/common/utils/validation-schemas";
import type { SignUpControllerChildrenProps } from "../../controllers/sign-up-controller";

const signUpForm = z.object({
	name: requiredString(),
	email: requiredEmail(),
	password: requiredPasswordMinLength(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUpForm({
	submit: requestSignUpEmail,
	isPending,
}: SignUpControllerChildrenProps) {
	const {
		register,
		formState: { isSubmitting, errors },
		handleSubmit,
	} = useForm<SignUpForm>({
		resolver: zodResolver(signUpForm),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	return (
		<div>
			<div className="mx-4 flex max-w-87 flex-col justify-center gap-6">
				<div className="flex justify-center md:hidden">
					<ScalesIcon className="size-8" />
				</div>
				<div className="flex flex-col gap-2 text-center">
					<h1 className="font-semibold text-xl tracking-tight">
						Cadastra-se agora!
					</h1>
					<p className="text-muted-foreground text-xs">
						Insira seus dados abaixo para criar sua conta.
					</p>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit(requestSignUpEmail)}>
					<FieldGroup>
						<Field data-invalid={!!errors.name}>
							<FieldLabel htmlFor="name">Nome</FieldLabel>
							<Input
								id="name"
								{...register("name")}
								aria-invalid={!!errors.name}
							/>
							{errors.name && <FieldError errors={[errors.name]} />}
						</Field>
					</FieldGroup>

					<FieldGroup>
						<Field data-invalid={!!errors.email}>
							<FieldLabel htmlFor="email">E-mail</FieldLabel>
							<Input
								id="email"
								{...register("email")}
								aria-invalid={!!errors.email}
								type="email"
							/>
							{errors.email && <FieldError errors={[errors.email]} />}
						</Field>
					</FieldGroup>

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

					<Button
						className="w-full"
						disabled={isSubmitting || isPending}
						isLoading={isSubmitting || isPending}
						type="submit"
					>
						Criar conta
					</Button>

					<Button
						asChild
						className="w-full"
						disabled={isSubmitting || isPending}
						type="button"
						variant="outline"
					>
						<Link to="/sign-in">Já tem uma conta? Faça login</Link>
					</Button>
				</form>

				<FieldDescription className="px-6 text-center">
					Ao continuar, você concorda com nossos{" "}
					<Link to="/sign-in">Termos de Serviço</Link> e{" "}
					<Link to="/sign-in">Política de Privacidade</Link>.
				</FieldDescription>
			</div>
		</div>
	);
}
