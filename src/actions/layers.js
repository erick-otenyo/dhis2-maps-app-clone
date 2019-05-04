import * as types from "../constants/actionTypes";

// Add new layer
export const addLayer = (config) => ({
	type: types.LAYER_ADD,
	payload: config
});

// Remove an overlay
export const removeLayer = (id) => ({
	type: types.LAYER_REMOVE,
	id
});

// Edit overlay
export const editLayer = (layer) => ({
	type: types.LAYER_EDIT,
	payload: layer
});

// Cancel overlay (stop editing)
export const cancelLayer = () => ({
	type: types.LAYER_CANCEL
});

// Update existing overlay
export const updateLayer = (layer) => ({
	type: types.LAYER_UPDATE,
	payload: layer
});

// Load layer data
export const loadLayer = (layer) => ({
	type: types.LAYER_LOAD,
	payload: layer
});

// Open overlay selection dialog
export const openLayersDialog = () => ({
	type: types.LAYERS_DIALOG_OPEN
});

// Close overlay selection dialog
export const closeLayersDialog = () => ({
	type: types.LAYERS_DIALOG_CLOSE
});
