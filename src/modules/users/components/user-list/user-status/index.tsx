import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { Badge } from "@/common/components/ui/badge";

export function UserStatus({ isActive }: { isActive: boolean }) {
	return (
		<Badge className="px-1.5 text-muted-foreground" variant="outline">
			{isActive ? (
				<CheckCircleIcon className="fill-green-500 dark:fill-green-400" />
			) : (
				<XCircleIcon className="fill-red-500 dark:fill-red-400" />
			)}
			{isActive ? "Ativo" : "Inativo"}
		</Badge>
	);
}
