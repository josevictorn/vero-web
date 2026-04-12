import { createFileRoute } from "@tanstack/react-router";
import BaseContainer from "@/common/components/base-container";

export const Route = createFileRoute("/_app/clients/")({
	component: Clients,
});

function Clients() {
	return (
		<BaseContainer>
			<div>Hello "/_app/clients/"!</div>
		</BaseContainer>
	);
}
