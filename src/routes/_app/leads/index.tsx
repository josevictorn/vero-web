import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { LeadCreateDialog } from "@/modules/leads/components/lead-create-dialog";
import { LeadsList } from "@/modules/leads/components/lead-list";
import { CreateLeadController } from "@/modules/leads/controllers/create-lead-controller";
import { ListLeadsController } from "@/modules/leads/controllers/list-leads-controller";

export const searchSchema = z.object({
	page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/_app/leads/")({
	component: Leads,
	validateSearch: searchSchema,
});

function Leads() {
	const [open, setOpen] = useState(false);

	return (
		<BaseContainer>
			<PageHeader
				buttonProps={{
					text: "Adicionar lead",
					onClick: () => setOpen(true),
				}}
				subtitle="Gerencie leads e mantenha a base de contatos atualizada"
				title="Gerenciamento de leads"
			/>
			<CreateLeadController>
				{(props) => (
					<LeadCreateDialog onOpenChange={setOpen} open={open} {...props} />
				)}
			</CreateLeadController>
			<ListLeadsController>
				{(props) => <LeadsList {...props} />}
			</ListLeadsController>
		</BaseContainer>
	);
}
