import type React from "react";
import type { ComponentProps } from "react";
import { cn } from "@/common/lib/utils";

const BaseContainer: React.FC<ComponentProps<"div">> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={cn("flex w-full flex-col gap-4", className)} {...props}>
			{children}
		</div>
	);
};

export default BaseContainer;
