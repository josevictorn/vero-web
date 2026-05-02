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
import type { ClientDTO } from "../../services/types";

interface ClientDetailsDialogProps {
	client?: ClientDTO;
	isFetchingClient: boolean;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

function formatValue(value?: string | null) {
	return value || "—";
}

function getInitials(name?: string | null) {
	if (!name) {
		return "CL";
	}

	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

export function ClientDetailsDialog({
	client,
	isFetchingClient,
	onOpenChange,
	open,
}: ClientDetailsDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const content = isFetchingClient ? (
		<div className="space-y-4">
			<div className="flex items-center gap-3 rounded-lg border p-3">
				<Skeleton className="size-12 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-3 w-1/2" />
				</div>
			</div>
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-5 w-4/5" />
			<Skeleton className="h-5 w-3/5" />
			<Skeleton className="h-5 w-4/5" />
		</div>
	) : (
		<div className="grid gap-4 text-sm">
			<div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
				<div className="flex items-center gap-3">
					<div className="flex size-12 items-center justify-center rounded-full border bg-background font-semibold text-foreground">
						{getInitials(client?.name)}
					</div>
					<div>
						<p className="font-semibold text-base">
							{formatValue(client?.name)}
						</p>
						<p className="text-muted-foreground text-xs">
							{formatValue(client?.email)}
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-4 rounded-lg border p-4">
				<div className="grid gap-4 text-xs md:grid-cols-2">
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Telefone</span>
						<span>{formatValue(client?.cellphone)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">CPF</span>
						<span>{formatValue(client?.cpf)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">RG</span>
						<span>{formatValue(client?.rg)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Órgão emissor</span>
						<span>{formatValue(client?.issuingAgency)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Estado civil</span>
						<span>{formatValue(client?.maritalStatus)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Profissão</span>
						<span>{formatValue(client?.profession)}</span>
					</div>
				</div>
			</div>

			<div className="grid gap-4 rounded-lg border p-4 text-xs">
				<div className="grid gap-1">
					<span className="text-muted-foreground text-xs">Endereço</span>
					<span>
						{formatValue(client?.street)}
						{client?.neighborhood ? `, ${client.neighborhood}` : ""}
					</span>
				</div>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Cidade</span>
						<span>{formatValue(client?.city)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">Estado</span>
						<span>{formatValue(client?.state)}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-muted-foreground text-xs">CEP</span>
						<span>{formatValue(client?.zipCode)}</span>
					</div>
				</div>
			</div>
		</div>
	);

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Detalhes do cliente</DialogTitle>
						<DialogDescription>
							Confira as informações do cliente selecionado.
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
					<DrawerTitle>Detalhes do cliente</DrawerTitle>
					<DrawerDescription>
						Confira as informações do cliente selecionado.
					</DrawerDescription>
				</DrawerHeader>
				<div className="min-h-0 flex-1 overflow-y-auto px-4">{content}</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Fechar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
