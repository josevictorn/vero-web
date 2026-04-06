import type { ButtonProps } from "../ui/button";

interface PageHeaderButtonProps extends Omit<ButtonProps, "children"> {
	text: string;
}

export interface PageHeaderProps {
	buttonProps?: PageHeaderButtonProps;
	className?: string;
	subtitle?: string;
	title: string;
}
