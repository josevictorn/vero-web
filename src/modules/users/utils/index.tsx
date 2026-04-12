import type { UserRole } from "../services/types";

export const userRoles = ["ADMIN", "LAWYER", "ASSISTANT"] as const;

export const userRoleMap: Record<UserRole, string> = {
	ADMIN: "Administrador",
	ASSISTANT: "Assistente",
	LAWYER: "Advogado",
};

export const userRoleBadgeClassMap: Record<UserRole, string> = {
	ADMIN:
		"border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300",
	LAWYER:
		"border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300",
	ASSISTANT:
		"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300",
};
