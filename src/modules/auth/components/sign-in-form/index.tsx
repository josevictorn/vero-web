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
} from "@/common/utils/validation-schemas";
import type { SignInControllerChildrenProps } from "../../controllers/sign-in-controller";

const signInForm = z.object({
	email: requiredEmail(),
	password: requiredPasswordMinLength(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignInForm({ login }: SignInControllerChildrenProps) {
	const {
		register,
		formState: { isSubmitting, errors },
		handleSubmit,
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
		mode: "onChange",
		defaultValues: {
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
						Bem vindo de volta!
					</h1>
					<p className="text-muted-foreground text-xs">
						Insira suas credenciais abaixo para acessar sua conta.
					</p>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit(login)}>
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
							<div className="flex items-center">
								<FieldLabel htmlFor="password">Senha</FieldLabel>
								<Link
									className="ml-auto text-primary text-xs underline-offset-4 hover:underline"
									to="/sign-in"
								>
									Esqueceu sua senha?
								</Link>
							</div>
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
						disabled={isSubmitting}
						isLoading={isSubmitting}
						type="submit"
					>
						Fazer login
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
