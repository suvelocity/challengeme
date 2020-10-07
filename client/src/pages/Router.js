import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import moduleName from ".";
import Home from "./Home";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
				<Route path="/challenges/:challengeId" component={ChallengePage} />
			</Switch>
		</BrowserRouter>
	);
}
