/* eslint-disable */
import * as React from "react";
import axios from "axios";

const authContext = React.createContext(null);
export function useAuth() {
	const [authed, setAuthed] = React.useState(false);
	const login = async (data: { email: string; password: string }) => {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/login`,
			data,
			{ withCredentials: true }
		);
		if (res.message === "success") {
			setAuthed(true);
		}
		return res;
	};
	return {
		authed,
		login,
		// logout() {
		// 	return new Promise((res) => {
		// 		setAuthed(false);
		// 		// res();
		// 	});
		// },
	};
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const auth = useAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
	return React.useContext(authContext);
}
