export interface PaginationProps {
	onPageChange: (pageIndex: number) => Promise<void> | void;
	pageIndex: number;
	perPage: number;
	totalCount: number;
}
