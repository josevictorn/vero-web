import type { UseQueryResult } from "@tanstack/react-query";

export interface TableProps<Type> {
	fetchData: UseQueryResult<Paginated<Type>, unknown>;
	headerData: {
		title: string;
		className?: string;
	}[];
	paginator: {
		total: number;
		amountPerPage: number;
		currentPage: number;
		onPageChange: (pageIndex: number) => void;
	};
	renderRow: (data: Type) => React.ReactElement;
}
