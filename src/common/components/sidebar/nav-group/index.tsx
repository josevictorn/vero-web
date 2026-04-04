import { Link, useLocation } from "@tanstack/react-router";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/common/components/ui/sidebar";
import type { NavMainProps } from "./types";

export function NavGroup({ items }: NavMainProps) {
	const { pathname } = useLocation();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem className="mx-1" key={item.title}>
						<SidebarMenuButton asChild tooltip={item.title}>
							<Link
								className="data-[current=true]:bg-sidebar-accent data-[current=true]:font-semibold"
								data-current={pathname === item.url}
								to={item.url}
							>
								<item.icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
