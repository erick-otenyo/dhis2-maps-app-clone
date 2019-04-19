import * as types from "../constants/actionTypes";

export const openDataTable = (layerId) => ({
  type: types.DATA_TABLE_OPEN,
  layerId
});

export const closeDataTable = () => ({
  type: types.DATA_TABLE_CLOSE
});

export const toggleDataTable = (layerId) => ({
  type: types.DATA_TABLE_TOGGLE,
  layerId
});

export const resizeDataTable = (height) => ({
  type: types.DATA_TABLE_RESIZE,
  height
});
