import type { UserRole } from "../services/types";

export const userRoles = [
	"ADMIN",
	"CLIENT",
	"ASSISTANT",
	"FINANCE",
	"LAWYER",
] as const;

export const userRoleMap: Record<UserRole, string> = {
	ADMIN: "Administrador",
	ASSISTANT: "Assistente",
	LAWYER: "Advogado",
	FINANCE: "Financeiro",
	CLIENT: "Cliente",
};

export const userRoleBadgeClassMap: Record<UserRole, string> = {
	ADMIN:
		"border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300",
	LAWYER:
		"border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300",
	ASSISTANT:
		"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300",
	FINANCE:
		"border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300",
	CLIENT:
		"border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300",
};
