import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import BaseContainer from "@/common/components/base-container";
import { PageHeader } from "@/common/components/page-header";
import { UsersList } from "@/modules/users/components/user-list";
import { ListUsersController } from "@/modules/users/controllers/list-users-controller";

export const searchSchema = z.object({
	page: z.coerce.number().default(1),
});

export const Route = createFileRoute("/_app/users/")({
	component: RouteComponent,
	validateSearch: searchSchema,
});

function RouteComponent() {
	return (
		<BaseContainer>
			<PageHeader
				buttonProps={{
					text: "Adicionar usuário",
				}}
				subtitle="Gerencie os usuários da plataforma e suas permissões de acesso"
				title="Gerecionamento de usuários"
			/>
			<ListUsersController>
				{(props) => <UsersList {...props} />}
			</ListUsersController>
		</BaseContainer>
	);
}
