/* eslint-disable */
import React, { Suspense } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import {
	Route,
	Redirect,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import PageHeader from "components/PageHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { AuthProvider, useAuth } from "hooks/useAuth";
import LogInPage from "./page/LogInPage";

import "./css/markdown-body.css";
import "./css/global.css";
import { LoginOutlined } from "@ant-design/icons";

// const EditPage = React.lazy(() => import('./page/EditPage'));

// const QuestionPage = React.lazy(() => import('./page/Question'));

const Home = React.lazy(() => import("./page/Home"));

const App: React.FC = () => {
	const theme = createTheme({
		typography: {
			fontSize: 17,
		},
		overrides: {
			MuiCssBaseline: {
				"@global": {
					body: {
						backgroundColor: "#272c34",
					},
					"*": {
						fontFamily:
							"-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
					},
					a: {
						color: "rgb(83, 155, 245)",
						fontWeight: 600,
						lineHeight: "21px",
					},
				},
			},
			MuiSvgIcon: {
				root: {
					fontSize: "1.3rem",
				},
			},
		},
		palette: {
			type: "dark",
			primary: {
				main: "#212121",
				// main: '#272c34',
			},
			text: { primary: "#adbac7" },
			secondary: {
				main: "#90caf9",
			},
			background: {
				paper: "#272c34",
			},
		},
	});

	const auth = useAuth();
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							{/* <Route path="/:category/:fileId">
                <PageHeader />
                <EditPage />
              </Route> */}
							{/* <Route path="/question" exact>
                <PageHeader />
                <Container>
                  <QuestionPage />
                </Container>
              </Route> */}
							<Route path="/" element={<LogInPage />} />
							<Route
								path="/home"
								element={
									<>
										<Container>
											<Home />
										</Container>
									</>
								}
							></Route>
						</Routes>
					</Suspense>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
};
export default App;
