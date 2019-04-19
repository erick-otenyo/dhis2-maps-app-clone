import * as types from "../constants/actionTypes";

export const resizeScreen = (width, height) => ({
  type: types.SCREEN_RESIZE,
  width,
  height
});

export const openLayersPanel = () => ({
  type: types.LAYERS_PANEL_OPEN
});

export const closeLayersPanel = () => ({
  type: types.LAYERS_PANEL_CLOSE
});

export const openRightPanel = () => ({
  type: types.RIGHT_PANEL_OPEN
});

export const closeRightPanel = () => ({
  type: types.RIGHT_PANEL_CLOSE
});
