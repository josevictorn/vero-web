import { cn } from "@/common/lib/utils";
import { Button } from "../ui/button";
import type { PageHeaderProps } from "./types";

export function PageHeader({
	title,
	subtitle,
	buttonProps,
	className,
}: PageHeaderProps) {
	return (
		<div
			className={cn(
				"item-center flex flex-1 flex-col gap-2 sm:items-stretch",
				className
			)}
		>
			<div className="mb-2 flex flex-1 flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
				<div className="flex flex-col items-center sm:items-stretch">
					<h1 className="font-semibold text-foreground text-xl tracking-tight">
						{title}
					</h1>
					{subtitle && (
						<h2 className="text-muted-foreground text-xs">{subtitle}</h2>
					)}
				</div>
				{buttonProps && (
					<Button className="w-full sm:w-fit" {...buttonProps}>
						{buttonProps.text}
					</Button>
				)}
			</div>
		</div>
	);
}
