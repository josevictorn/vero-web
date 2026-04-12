import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";

interface LeadDeleteDialogProps {
	isPending: boolean;
	leadName?: string;
	onConfirm: () => Promise<void>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function LeadDeleteDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	leadName,
}: LeadDeleteDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remover lead</DialogTitle>
					<DialogDescription>
						Tem certeza que deseja remover
						{leadName ? ` ${leadName}` : " este lead"}? Essa ação não pode ser
						desfeita.
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
