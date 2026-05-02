import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";

interface ClientDeleteDialogProps {
	clientName?: string;
	isPending: boolean;
	onConfirm: () => Promise<void>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function ClientDeleteDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	clientName,
}: ClientDeleteDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remover cliente</DialogTitle>
					<DialogDescription>
						Tem certeza que deseja remover
						{clientName ? ` ${clientName}` : " este cliente"}? Essa ação não
						pode ser desfeita.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() => onOpenChange(false)}
						variant="outline"
					>
						Cancelar
					</Button>
					<Button
						disabled={isPending}
						isLoading={isPending}
						onClick={async () => {
							await onConfirm();
							onOpenChange(false);
						}}
						variant="destructive"
					>
						Remover
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
