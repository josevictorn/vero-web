import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell } from "../ui/table";

interface TableActionsProps {
	children?: React.ReactNode;
}

export function TableActions({ children }: TableActionsProps) {
	return (
		<TableCell className="w-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
						size="icon"
						variant="ghost"
					>
						<DotsThreeVerticalIcon />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					{children}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
}
