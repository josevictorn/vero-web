import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import storage from "@/common/Config/storage";
import { LoadingScreen } from "@/common/components/loading-screen";
import { constants } from "@/common/utils";
import { getProfile } from "@/modules/auth/services";
import type { User } from "@/modules/auth/services/types";

interface UserContextValues {
	authorized: boolean;
	userInfo?: User;
}

const UserContext = createContext<UserContextValues>({} as UserContextValues);

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const token = storage.local.get(constants.localStorageKeys.ACCESS_TOKEN);
	const hasToken = !!token;

	const fetchUserInfo = useQuery({
		queryFn: getProfile,
		queryKey: ["userInfo"],
		staleTime: Number.POSITIVE_INFINITY, // We can set this to Infinity since the user info won't change during the session. It will only be refetched on page reload.
		retry: 1,
		enabled: hasToken,
	});

	return (
		<UserContext.Provider
			value={{
				authorized: !!fetchUserInfo.data,
				userInfo: fetchUserInfo.data,
			}}
		>
			{fetchUserInfo.isLoading ? <LoadingScreen /> : children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	return context;
};
