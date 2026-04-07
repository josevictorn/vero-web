import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/common/components/ui/drawer";
import { useMediaQuery } from "@/common/hooks/use-media-query";
import type { CreateAccountBody } from "../../services/types";
import { UserCreateForm } from "../user-create-form";

type UserCreateDialogProps = BaseFormProps<CreateAccountBody> & {
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function UserCreateDialog({
	open,
	onOpenChange,
	submit,
}: UserCreateDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleCreateUser = async (data: CreateAccountBody) => {
		await submit(data);
		onOpenChange(false);
	};

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Criar usuário</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para criar um novo usuário.
						</DialogDescription>
					</DialogHeader>
					<UserCreateForm onCreateUser={handleCreateUser} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Criar usuário</DrawerTitle>
					<DrawerDescription>
						Preencha os campos abaixo para criar um novo usuário.
					</DrawerDescription>
				</DrawerHeader>
				<UserCreateForm className="px-4" onCreateUser={handleCreateUser} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
