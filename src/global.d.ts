declare global {
	interface ChildrenController<ParamsType> {
		children: (params: ParamsType) => React.ReactElement;
	}

	type ExtractValueOf<T> = T extends string
		? T
		: { [K in keyof T]: ExtractValueOf<T[K]> }[keyof T];

	interface ErrorResponse {
		message: string;
		statusCode: number;
	}

	interface Paginated<T> {
		meta: {
			currentPage: number;
			totalCount: number;
			perPage: number;
		};
		results: T[];
	}
}

export {};
