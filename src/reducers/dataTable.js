import * as types from "../constants/actionTypes";

const defaultState = {
	isOpen: false,
	sourceType: null,
	layerId: null,
	sourceName: null,
	remoteData: null,
	isLoading: false,
	fetchError: null
};

const dataTable = (state = defaultState, action) => {
	switch (action.type) {
		case types.DATA_TABLE_OPEN:
			return {
				isOpen: true,
				sourceType: action.sourceType,
				layerId: action.layerId,
				sourceName: action.sourceName
			};

		case types.DATA_TABLE_CLOSE:
			return { ...state, isOpen: false };

		case types.DATA_TABLE_FETCH_DATA:
			return { ...state, isLoading: true };

		case types.DATA_TABLE_FETCH_DATA_SUCCESS:
			return {
				...state,
				isLoading: false,
				remoteData: action.data,
				error: null
			};

		case types.DATA_TABLE_FETCH_DATA_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.error,
				remoteData: null
			};

		case types.DATA_TABLE_TOGGLE:
			return {
				...state,
				isOpen: !state.isOpen,
				sourceType: action.sourceType,
				layerId: action.layerId,
				sourceName: action.sourceName
			};

		default:
			return state;
	}
};

export default dataTable;
