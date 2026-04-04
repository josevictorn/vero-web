import type { Icon as PhosphorIconType } from "@phosphor-icons/react";

interface Item {
	icon: PhosphorIconType;
	isActive?: boolean;
	title: string;
	url: string;
}

interface NavMainProps {
	items: Item[];
}

export type { NavMainProps };
