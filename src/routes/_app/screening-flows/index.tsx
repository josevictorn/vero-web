import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { ScreeningFlowCreateDialog } from "@/modules/screening_flows/components/screening-flow-create-dialog";
import { ScreeningFlowsList } from "@/modules/screening_flows/components/screening-flow-list";
import { CreateScreeningFlowController } from "@/modules/screening_flows/controllers/create-screening-flow-controller";
import { ListScreeningFlowsController } from "@/modules/screening_flows/controllers/list-screening-flows-controller";

export const searchSchema = z.object({
	page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/_app/screening-flows/")({
	component: ScreeningFlows,
	validateSearch: searchSchema,
});

function ScreeningFlows() {
	const [open, setOpen] = useState(false);

	return (
		<BaseContainer>
			<PageHeader
				buttonProps={{
					text: "Adicionar screening flow",
					onClick: () => setOpen(true),
				}}
				subtitle="Gerencie fluxos de triagem e suas perguntas em JSON"
				title="Gerenciamento de screening flows"
			/>
			<CreateScreeningFlowController>
				{(props) => (
					<ScreeningFlowCreateDialog
						onOpenChange={setOpen}
						open={open}
						{...props}
					/>
				)}
			</CreateScreeningFlowController>
			<ListScreeningFlowsController>
				{(props) => <ScreeningFlowsList {...props} />}
			</ListScreeningFlowsController>
		</BaseContainer>
	);
}
