import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/common/components/ui/select";
import { BRAZILIAN_STATES } from "../../utils/brazilian-states";
import type { UserCreateFormData } from "../user-create-form";

interface LawyerFieldsProps {
	control: Control<UserCreateFormData>;
	errors: FieldErrors<UserCreateFormData>;
	register: UseFormRegister<UserCreateFormData>;
}

export function LawyerFields({ control, errors, register }: LawyerFieldsProps) {
	return (
		<>
			<div className="mt-4">
				<span className="font-medium text-sm">Informações do advogado</span>
			</div>

			<Field data-invalid={!!errors.lawyerFields?.cellphone}>
				<FieldLabel htmlFor="lawyerCellphone">Celular</FieldLabel>
				<Input
					id="lawyerCellphone"
					placeholder="(00) 00000-0000"
					{...register("lawyerFields.cellphone")}
					aria-invalid={!!errors.lawyerFields?.cellphone}
				/>
				{errors.lawyerFields?.cellphone && (
					<FieldError errors={[errors.lawyerFields.cellphone]} />
				)}
			</Field>

			<Field data-invalid={!!errors.lawyerFields?.oab}>
				<FieldLabel htmlFor="lawyerOab">Número da OAB</FieldLabel>
				<Input
					id="lawyerOab"
					placeholder="Digite o número da OAB"
					{...register("lawyerFields.oab")}
					aria-invalid={!!errors.lawyerFields?.oab}
				/>
				{errors.lawyerFields?.oab && (
					<FieldError errors={[errors.lawyerFields.oab]} />
				)}
			</Field>

			<Field data-invalid={!!errors.lawyerFields?.oabState}>
				<FieldLabel htmlFor="lawyerOabState">Estado da OAB</FieldLabel>
				<Controller
					control={control}
					name="lawyerFields.oabState"
					render={({ field }) => (
						<Select onValueChange={field.onChange} value={field.value}>
							<SelectTrigger
								aria-invalid={!!errors.lawyerFields?.oabState}
								className="w-full"
								id="lawyerOabState"
							>
								<SelectValue placeholder="Selecione o estado" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{BRAZILIAN_STATES.map((state) => (
										<SelectItem key={state.value} value={state.value}>
											{state.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.lawyerFields?.oabState && (
					<FieldError errors={[errors.lawyerFields.oabState]} />
				)}
			</Field>

			<Field data-invalid={!!errors.lawyerFields?.pix}>
				<FieldLabel htmlFor="lawyerPix">Chave PIX</FieldLabel>
				<Input
					id="lawyerPix"
					placeholder="Digite a chave PIX"
					{...register("lawyerFields.pix")}
					aria-invalid={!!errors.lawyerFields?.pix}
				/>
				{errors.lawyerFields?.pix && (
					<FieldError errors={[errors.lawyerFields.pix]} />
				)}
			</Field>
		</>
	);
}
