import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";

interface CalendarEventDeleteDialogProps {
	eventSummary?: string;
	isPending: boolean;
	onConfirm: () => Promise<void>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function CalendarEventDeleteDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	eventSummary,
}: CalendarEventDeleteDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remover evento</DialogTitle>
					<DialogDescription>
						Tem certeza que deseja remover
						{eventSummary ? ` ${eventSummary}` : " este evento"}? Essa ação
						não pode ser desfeita.
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
