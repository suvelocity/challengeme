import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChallengePage from "../components/ChallengePage/ChallengePage";
import Home from "./Home";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/challenges/:challengeId" component={ChallengePage} />
			</Switch>
		</BrowserRouter>
	);
}