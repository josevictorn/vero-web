import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { ClientsList } from "@/modules/clients/components/client-list";
import { ListClientsController } from "@/modules/clients/controllers/list-clients-controller";

export const searchSchema = z.object({
	page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/_app/clients/")({
	component: Clients,
	validateSearch: searchSchema,
});

function Clients() {
	return (
		<BaseContainer>
			<PageHeader
				subtitle="Acompanhe a base de clientes e mantenha os dados atualizados"
				title="Gerenciamento de clientes"
			/>
			<ListClientsController>
				{(props) => <ClientsList {...props} />}
			</ListClientsController>
		</BaseContainer>
	);
}
