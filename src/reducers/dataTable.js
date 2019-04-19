import * as types from "../constants/actionTypes";

const dataTable = (state = null, action) => {
  switch (action.type) {
    case types.DATA_TABLE_OPEN:
      return action.layerId;

    case types.DATA_TABLE_CLOSE:
      return null;

    case types.DATA_TABLE_TOGGLE:
      return state === action.layerId ? null : action.layerId;

    default:
      return state;
  }
};

export default dataTable;
