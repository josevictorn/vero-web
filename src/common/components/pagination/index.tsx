import {
	CaretDoubleLeftIcon,
	CaretDoubleRightIcon,
	CaretLeftIcon,
	CaretRightIcon,
} from "@phosphor-icons/react";

import { Button } from "@/common/components/ui/button";
import type { PaginationProps } from "./types";

export function Pagination({
	pageIndex,
	perPage,
	totalCount,
	onPageChange,
}: PaginationProps) {
	const pages = Math.ceil(totalCount / perPage) || 1;

	return (
		<div className="flex items-center justify-between max-sm:flex-col max-sm:gap-4">
			<span className="text-muted-foreground text-xs">
				Total de {totalCount} item(s)
			</span>

			<div className="flex items-center gap-4 lg:gap-6">
				<div className="font-medium text-xs">
					Página {pageIndex} de {pages}
				</div>
				<div className="flex items-center gap-2">
					<Button
						className="h-8 w-8 p-0"
						disabled={pageIndex === 1}
						onClick={() => onPageChange(0)}
						variant="outline"
					>
						<CaretLeftIcon className="h-4 w-4" />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						className="h-8 w-8 p-0"
						disabled={pageIndex === 1}
						onClick={() => onPageChange(pageIndex - 1)}
						variant="outline"
					>
						<CaretDoubleLeftIcon className="h-4 w-4" />
						<span className="sr-only">Página anterior</span>
					</Button>
					<Button
						className="h-8 w-8 p-0"
						disabled={pages <= pageIndex + 1}
						onClick={() => onPageChange(pageIndex + 1)}
						variant="outline"
					>
						<CaretRightIcon className="h-4 w-4" />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						className="h-8 w-8 p-0"
						disabled={pages <= pageIndex + 1}
						onClick={() => onPageChange(pages - 1)}
						variant="outline"
					>
						<CaretDoubleRightIcon className="h-4 w-4" />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
