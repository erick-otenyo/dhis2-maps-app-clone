import * as types from "../constants/actionTypes";

export const setSelectedFeature = ({ layerId, feature }) => ({
	type: types.SET_SELECTED_FEATURE,
	layerId,
	feature
});

export const clearSelectedFeature = () => ({
	type: types.CLEAR_SELECTED_FEATURE
});
