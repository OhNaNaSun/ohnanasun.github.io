/* eslint-disable */
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LogInPage: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [isCheckingUser, setIsCheckingUser] = useState(true);
	const [isSigning, setIsSigning] = useState(false);
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	useEffect(() => {
		(async () => {
			setIsCheckingUser(true);
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/user`,
				{ withCredentials: true }
			);
			setIsCheckingUser(false);
			if (res.data.name) {
				navigate("./home");
			}
		})();
	}, []);
	const handleSubmit = async (event: any) => {
		console.log(name, password);
		event.preventDefault();
		const res = await login({
			email: name,
			password,
		});
		console.log(res);
		if (res.message === "success") {
			navigate("/");
		}
	};

	return isCheckingUser ? null : (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				width: 450,
				fontSize: "2rem",
				margin: "10% auto",
				"& > input": { color: "white !important" },
				"& > :not(style)": { m: 1, width: "100%" },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				name="name"
				onChange={(e) => {
					setName(e.target.value);
				}}
				value={name}
				sx={{ m: 1, width: "100%" }}
				variant="filled"
				color="success"
				focused
			/>
			<TextField
				name="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				sx={{ m: 1, width: "100%" }}
				variant="filled"
				color="success"
				focused
			/>
			<Button variant="contained" color="success" type="submit">
				{!isSigning ? "Log in" : "Sign up"}
			</Button>
			{!isSigning && (
				<Button
					variant="text"
					color="success"
					onClick={() => {
						setIsSigning(true);
					}}
				>
					Sign up
				</Button>
			)}
		</Box>
	);
};

export default LogInPage;
