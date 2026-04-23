import {
	CalendarDotsIcon,
	ChartBarIcon,
	FileTextIcon,
	FunnelIcon,
	HandshakeIcon,
	HouseIcon,
	ScalesIcon,
	UsersThreeIcon,
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
import { useUser } from "@/common/contexts/user";
import { Skeleton } from "../ui/skeleton";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";

export const navMain = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: HouseIcon,
	},
	{
		title: "Leads",
		url: "/leads",
		icon: FunnelIcon,
	},
	{
		title: "Screening Flows",
		url: "/screening-flows",
		icon: FileTextIcon,
	},
	{
		title: "Clientes",
		url: "/clients",
		icon: UsersThreeIcon,
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
	{
		title: "Calendário",
		url: "/calendar",
		icon: CalendarDotsIcon,
	},
	{
		title: "Gereciamento de usuários",
		url: "/users",
		icon: UsersThreeIcon,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { userInfo } = useUser();
	return (
		<Sidebar collapsible="offcanvas" {...props}>
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
				<NavGroup items={navMain} />
			</SidebarContent>

			<SidebarFooter>
				{userInfo ? (
					<NavUser
						user={{
							name: userInfo?.name,
							email: userInfo?.email,
						}}
					/>
				) : (
					<Skeleton className="h-10 w-full rounded-lg" />
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
