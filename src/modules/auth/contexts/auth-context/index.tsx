import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import storage from "@/common/config/storage";
import { constants } from "@/common/utils";
import { authenticate } from "../../services";
import type {
	AuthenticateBody,
	AuthenticateResponse,
} from "../../services/types";

interface AuthContextValue {
	isAuthenticated: boolean;
	login: UseMutationResult<
		AuthenticateResponse,
		// biome-ignore lint/suspicious/noExplicitAny: We want to allow any error type here since the API might return different error shapes.
		AxiosError<unknown, any>,
		AuthenticateBody,
		unknown
	>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const queryClient = useQueryClient();

	const handleLogout = useCallback(async () => {
		storage.local.delete(constants.localStorageKeys.ACCESS_TOKEN);
		await queryClient.setQueryData(["userInfo"], null);
		await queryClient.refetchQueries({ queryKey: ["userInfo"] });

		setIsAuthenticated(false);
	}, [queryClient]);

	const handleLogin = async (data: AuthenticateResponse) => {
		storage.local.set(
			constants.localStorageKeys.ACCESS_TOKEN,
			data.access_token
		);

		await queryClient.setQueryData(["userInfo"], data.user);
		setIsAuthenticated(true);
	};

	const requestLogin = useMutation({
		mutationFn: authenticate,
		onSuccess: handleLogin,
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;
			toast.error(errorResponse?.message);
		},
	});

	const logout = useCallback(async () => {
		await handleLogout();
	}, [handleLogout]);

	return (
		<AuthContext.Provider
			value={{ login: requestLogin, logout, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
};

export { AuthProvider, useAuth };
