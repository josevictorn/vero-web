import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { convertLeadToClient } from "@/modules/clients/services";
import type { ConvertLeadToClientBody } from "@/modules/clients/services/types";

interface ConvertLeadControllerChildrenProps {
	isPending: boolean;
	submit: (data: ConvertLeadToClientBody) => Promise<void>;
}

interface ConvertLeadControllerProps
	extends ChildrenController<ConvertLeadControllerChildrenProps> {
	leadId: string | null;
}

export function ConvertLeadController({
	children,
	leadId,
}: ConvertLeadControllerProps) {
	const queryClient = useQueryClient();

	const convertLeadRequest = useMutation({
		mutationFn: async (data: ConvertLeadToClientBody) => {
			if (!leadId) {
				throw new Error("Lead não encontrado");
			}

			await convertLeadToClient({ leadId }, data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["fetchLeads"] });
			await queryClient.invalidateQueries({ queryKey: ["fetchClients"] });
			toast.success("Lead convertido em cliente com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao converter lead", {
				description: errorResponse?.message,
			});
		},
	});

	const submit = async (data: ConvertLeadToClientBody) => {
		await convertLeadRequest.mutateAsync(data);
	};

	return children({
		submit,
		isPending: convertLeadRequest.isPending,
	});
}
