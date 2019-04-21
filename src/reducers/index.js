import { combineReducers } from "redux";
import map from "@boundlessgeo/sdk/reducers/map";
import mapinfo from "@boundlessgeo/sdk/reducers/mapinfo";

import dataTable from "./dataTable";
import ui from "./ui";
import interaction from "./interaction";

export default combineReducers({
	map,
	mapinfo,
	dataTable,
	ui,
	interaction
});
