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
import type { ConvertLeadToClientBody } from "@/modules/clients/services/types";
import { LeadConvertForm } from "../lead-convert-form";

interface LeadConvertDialogProps {
	isPending: boolean;
	leadName?: string;
	onConfirm: (data: ConvertLeadToClientBody) => Promise<void>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function LeadConvertDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	leadName,
}: LeadConvertDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleConvertLead = async (data: ConvertLeadToClientBody) => {
		await onConfirm(data);
		onOpenChange(false);
	};

	const description = leadName
		? `Complete os dados de ${leadName} para converter em cliente.`
		: "Complete os dados para converter o lead em cliente.";

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Converter lead</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<LeadConvertForm
						isPending={isPending}
						onSubmitLead={handleConvertLead}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Converter lead</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				<LeadConvertForm
					className="px-4"
					isPending={isPending}
					onSubmitLead={handleConvertLead}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
