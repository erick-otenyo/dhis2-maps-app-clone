import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import mui3theme from "./mui3.theme";
import AppMenu from "./AppMenu";
import LayersPanel from "./components/layers/LayersPanel";
import LayersToggle from "./components/layers/LayersToggle";
import Map from "./components/map/Map";
import RightPanel from "./components/right/RightPanel";
import BottomPanel from "./datatable/BottomPanel";

import "./App.css";

const theme = createMuiTheme(mui3theme);

// Makes d2 available in all child components
export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
