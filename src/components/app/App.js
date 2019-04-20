import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import mui3theme from "../../mui3.theme";
import Header from "../header/Header";
import AppMenu from "./AppMenu";
import LayersPanel from "../layers/LayersPanel";
import LayersToggle from "../layers/LayersToggle";
import Map from "../map/Map";
import RightPanel from "../right/RightPanel";
import BottomPanel from "../datatable/BottomPanel";

import "./App.css";

const theme = createMuiTheme(mui3theme);

// Makes d2 available in all child components
export class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Header />
				<AppMenu />
				<RightPanel />
				<LayersPanel />
				<LayersToggle />
				<Map />
				<BottomPanel />
			</MuiThemeProvider>
		);
	}
}

export default App;
