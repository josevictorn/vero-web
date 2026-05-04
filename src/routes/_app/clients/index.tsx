import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { ClientCreateDialog } from "@/modules/clients/components/client-create-dialog";
import { ClientsList } from "@/modules/clients/components/client-list";
import { CreateClientController } from "@/modules/clients/controllers/create-client-controller";
import { ListClientsController } from "@/modules/clients/controllers/list-clients-controller";

export const searchSchema = z.object({
	page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/_app/clients/")({
	component: Clients,
	validateSearch: searchSchema,
});

function Clients() {
	const [open, setOpen] = useState(false);

	return (
		<BaseContainer>
			<PageHeader
				buttonProps={{
					text: "Adicionar cliente",
					onClick: () => setOpen(true),
				}}
				subtitle="Acompanhe a base de clientes e mantenha os dados atualizados"
				title="Gerenciamento de clientes"
			/>
			<CreateClientController>
				{(props) => (
					<ClientCreateDialog onOpenChange={setOpen} open={open} {...props} />
				)}
			</CreateClientController>
			<ListClientsController>
				{(props) => <ClientsList {...props} />}
			</ListClientsController>
		</BaseContainer>
	);
}
