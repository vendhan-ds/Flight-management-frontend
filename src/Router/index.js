
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import {NotFound} from "../Pages";
import {Protected} from "../components"

const Router = () => {

	return (
		<>
			<BrowserRouter>
				<Routes>
					{routes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<>{route.element}</>}
							/>
						);
					})}

					{protectedRoutes.map((route) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								element={<Protected>{route.element}</Protected>}
							/>
						);
					})}

					<Route
						path="*"
						element={
							<>
								<NotFound />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;