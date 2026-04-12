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
import { Skeleton } from "@/common/components/ui/skeleton";
import { useMediaQuery } from "@/common/hooks/use-media-query";
import type { Account, UpdateUserBody } from "../../services/types";
import { UserCreateForm } from "../user-create-form";

type UserEditDialogProps = BaseFormProps<UpdateUserBody, Account> & {
	isFetchingUser: boolean;
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function UserEditDialog({
	open,
	onOpenChange,
	submit,
	initialValues,
	isPending,
	isFetchingUser,
}: UserEditDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleUpdateUser = async (data: UpdateUserBody) => {
		if (!initialValues) {
			return;
		}

		await submit(data);
		onOpenChange(false);
	};

	const content = isFetchingUser ? (
		<div className="space-y-4">
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
		</div>
	) : (
		<UserCreateForm
			initialValues={initialValues}
			isPending={isPending}
			mode="edit"
			onSubmitUser={async (data) => {
				if (!initialValues) {
					return;
				}

				await handleUpdateUser({
					id: initialValues.id,
					email: data.email,
					name: data.name,
					password: data.password || undefined,
					role: data.role,
				});
			}}
			open={open}
			submitLabel="Salvar alterações"
		/>
	);

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Editar usuário</DialogTitle>
						<DialogDescription>
							Atualize os dados do usuário selecionado.
						</DialogDescription>
					</DialogHeader>
					{content}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Editar usuário</DrawerTitle>
					<DrawerDescription>
						Atualize os dados do usuário selecionado.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4">{content}</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
