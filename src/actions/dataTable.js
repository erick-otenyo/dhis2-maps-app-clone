import * as types from "../constants/actionTypes";

export const openDataTable = (sourceType, sourceName, layerId) => ({
	type: types.DATA_TABLE_OPEN,
	sourceType,
	layerId,
	sourceName
});

export const closeDataTable = () => ({
	type: types.DATA_TABLE_CLOSE
});

export const toggleDataTable = (sourceType, sourceName, layerId) => ({
	type: types.DATA_TABLE_TOGGLE,
	sourceType,
	layerId,
	sourceName
});

export const resizeDataTable = (height) => ({
	type: types.DATA_TABLE_RESIZE,
	height
});
