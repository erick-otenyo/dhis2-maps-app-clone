import * as types from "../constants/actionTypes";

const layerAdd = (state = null, action) => {
	switch (action.type) {
		case types.LAYER_ADD:
			return action.payload;
		case types.LAYER_ADD_CLEAR:
			return null;
		default:
			return state;
	}
};

export default layerAdd;
