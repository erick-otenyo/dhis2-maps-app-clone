import * as types from "../constants/actionTypes";

const defaultState = { layerId: null, feature: null };

const interaction = (state = defaultState, action) => {
	switch (action.type) {
		case types.SET_SELECTED_FEATURE:
			return { layerId: action.layerId, feature: action.feature };
		case types.CLEAR_SELECTED_FEATURE:
			return defaultState;
		default:
			return state;
	}
};

export default interaction;
