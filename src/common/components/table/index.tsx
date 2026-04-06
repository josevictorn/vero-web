// biome-ignore-all lint/suspicious/noArrayIndexKey: using array index as key is acceptable for skeleton rows
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Table as TableShadcn,
} from "@/common/components/ui/table";
import { Pagination } from "../pagination";
import { Skeleton } from "../ui/skeleton";
import type { TableProps } from "./types";

const SKELETON_ROW_COUNT = 10;

export function Table<Type>({
	fetchData,
	headerData,
	paginator,
	renderRow,
}: TableProps<Type>) {
	const data = fetchData.data?.results ?? [];

	const total = paginator.total;
	const amountPerPage = paginator.amountPerPage;
	const currentPage = paginator.currentPage;

	function handlePaginate(pageIndex: number) {
		paginator.onPageChange(pageIndex);
	}

	const renderLoadingRows = () => {
		return Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => (
			<TableRow key={`skeleton-row-${rowIndex + 1}`}>
				{headerData.map((header) => (
					<TableCell
						className={header.className}
						key={`skeleton-cell-${rowIndex + 1}-${header.title}`}
					>
						<Skeleton className="h-4 w-full" />
					</TableCell>
				))}
			</TableRow>
		));
	};

	const renderEmptyRow = () => {
		return (
			<TableRow>
				<TableCell
					className="text-center text-muted-foreground"
					colSpan={headerData.length}
				>
					Nenhum resultado encontrado.
				</TableCell>
			</TableRow>
		);
	};

	const renderBody = () => {
		if (fetchData.isLoading) {
			return renderLoadingRows();
		}

		if (data.length > 0) {
			return data.map(renderRow);
		}

		return renderEmptyRow();
	};

	return (
		<>
			<div className="flex flex-col gap-4 overflow-hidden rounded-lg border">
				<TableShadcn>
					<TableHeader className="sticky top-0 z-10 bg-muted">
						<TableRow>
							{headerData.map((header) => (
								<TableHead className={header.className} key={header.title}>
									{header.title}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody className="**:data-[slot=table-cell]:first:w-8">
						{renderBody()}
					</TableBody>
				</TableShadcn>
			</div>
			<Pagination
				onPageChange={handlePaginate}
				pageIndex={currentPage}
				perPage={amountPerPage}
				totalCount={total}
			/>
		</>
	);
}
