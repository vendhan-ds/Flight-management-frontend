
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import {NotFound} from "../Pages";

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