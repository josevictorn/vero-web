import {
	ChartBarIcon,
	FileTextIcon,
	HandshakeIcon,
	HouseIcon,
	ScalesIcon,
	UserCircleGearIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/common/components/ui/sidebar";
import { NavGroup } from "./nav-group";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: HouseIcon,
		},

		{
			title: "Clientes",
			url: "/clients",
			icon: UserCircleGearIcon,
		},
		{
			title: "Propostas",
			url: "/proposals",
			icon: HandshakeIcon,
		},
		{
			title: "Contratos",
			url: "/contracts",
			icon: FileTextIcon,
		},
		{
			title: "Financeiro",
			url: "/financial",
			icon: ChartBarIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="lg">
							<Link to="/dashboard">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<ScalesIcon className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Vero App</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavGroup items={data.navMain} />
			</SidebarContent>

			<SidebarFooter>SidebarFooter</SidebarFooter>
		</Sidebar>
	);
}
