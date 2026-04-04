import { SpinnerIcon } from "@phosphor-icons/react";

export function LoadingScreen() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-foreground">
			<SpinnerIcon
				aria-label="Loading"
				className="size-6 animate-spin"
				color="var(--accent)"
			/>
		</div>
	);
}
