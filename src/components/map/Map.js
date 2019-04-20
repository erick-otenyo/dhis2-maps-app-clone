import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OlMap from "@boundlessgeo/sdk/components/map";
import ZoomControl from "../ZoomControl/ZoomControl";
import * as mapActions from "@boundlessgeo/sdk/actions/map";
import { withStyles } from "@material-ui/core/styles";
import turfBbox from "@turf/bbox";

import {
	HEADER_HEIGHT,
	LAYERS_PANEL_WIDTH,
	RIGHT_PANEL_WIDTH
} from "../../constants/layout";
import slugify from "../../util/slugify";
import mapConfig from "../../config.json";

import "@boundlessgeo/sdk/stylesheet/sdk.scss";
import "./Map.css";

// https://stackoverflow.com/questions/1818474/how-to-trigger-the-window-resize-event-in-javascript
const resizeEvent = window.document.createEvent("UIEvents");
resizeEvent.initUIEvent("resize", true, false, window, 0);

const styles = {
	mapContainer: {
		height: "100%",
		"& img": {
			// Override from ui/core/UI'
			maxWidth: "none"
		}
	},
	mapDownload: {
		// Roboto font is not loaded by dom-to-image => switch to Arial
		"& div": {
			fontFamily: "Arial,sans-serif!important"
		},
		"& .leaflet-control-zoom, & .leaflet-control-geocoder, & .leaflet-control-measure, & .leaflet-control-fit-bounds": {
			display: "none!important"
		}
	}
};

class Map extends Component {
	constructor(props) {
		super(props);
		this.metadata = {};
	}

	componentDidMount() {
		this.configureMap();
	}

	setMapView = (view) => {
		const { center, zoom, maxZoom, minZoom } = view;

		if (center) {
			this.props.dispatch(mapActions.setView(center, zoom || 1));
		}

		if (maxZoom && minZoom) {
			this.metadata["bnd:minzoom"] = minZoom;
			this.metadata["bnd:maxzoom"] = maxZoom;
		}
	};

	updateMapMetadata = () => {
		this.props.dispatch(mapActions.updateMetadata(this.metadata));
	};

	addGeojsonLayer = (item) => {
		const {
			layerType,
			style,
			id,
			name,
			url,
			data,
			type,
			filter,
			zoomOnEnable
		} = item;

		const { dispatch } = this.props;

		let layerId = id;
		if (!layerId) {
			layerId = slugify(name);
		}
		const source = `${layerId}-source`;

		const features = {
			type: "FeatureCollection",
			features: data && data.features ? data.features : []
		};

		const paint = style && style.paint ? style.paint : {};
		const layout = style && style.layout ? style.layout : {};

		const metadata = {
			"bnd:title": name
		};

		dispatch(mapActions.addSource(source, { type: type, data: features }));

		dispatch(
			mapActions.addLayer({
				id: layerId,
				type: layerType,
				source,
				paint,
				layout,
				filter,
				metadata
			})
		);
		if (url) {
			this.fetchFeaturesAndUpdate(url, source, layerId, metadata, zoomOnEnable);
		}
	};

	fetchFeaturesAndUpdate = (
		url,
		sourceName,
		layerId,
		metadata = {},
		zoomOnEnable
	) => {
		const { dispatch } = this.props;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				if (data.features) {
					metadata["bnd:bbox"] = turfBbox(data);

					dispatch(mapActions.addFeatures(sourceName, data.features));

					dispatch(mapActions.updateLayer(layerId, { metadata }));

					if (zoomOnEnable) {
						this.fitExtent(metadata["bnd:bbox"]);
					}
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	addBaseMap = () => {
		const { dispatch } = this.props;
		// Start with a reasonable global view of the map.
		dispatch(mapActions.setView([-93, 45], 2));

		// add the OSM source
		dispatch(mapActions.addOsmSource("osm"));

		// and an OSM layer.
		// Raster layers need not have any paint styles.
		dispatch(
			mapActions.addLayer({
				id: "osm",
				source: "osm",
				type: "raster"
			})
		);
	};

	configureMap = () => {
		this.addBaseMap();
		const { mapConfig } = this.props;

		const { view, catalog } = mapConfig;

		if (view) {
			this.setMapView(view);
		}

		if (catalog && Array.isArray(catalog)) {
			catalog.forEach((catalogItem) => {
				const { type } = catalogItem;

				if (type) {
					if (type === "geojson") {
						this.addGeojsonLayer(catalogItem);
					}
				}
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		const {
			dataTableHeight,
			dataTableOpen,
			layersPanelOpen,
			rightPanelOpen
		} = this.props;
		if (
			prevProps.dataTableHeight !== dataTableHeight ||
			prevProps.dataTableOpen !== dataTableOpen ||
			prevProps.layersPanelOpen !== layersPanelOpen ||
			prevProps.rightPanelOpen !== rightPanelOpen
		)
			// dispatch a resize event so ol map resizes
			window.dispatchEvent(resizeEvent);
	}

	fitExtent = (extent) => {
		const { dispatch, mapSize, mapProjection } = this.props;

		dispatch(mapActions.fitExtent(extent, mapSize, mapProjection));
	};

	render() {
		const {
			layersPanelOpen,
			rightPanelOpen,
			dataTableOpen,
			dataTableHeight,
			classes
		} = this.props;

		const style = {
			position: "absolute",
			top: HEADER_HEIGHT,
			left: layersPanelOpen ? LAYERS_PANEL_WIDTH : 0,
			right: rightPanelOpen ? RIGHT_PANEL_WIDTH : 0,
			bottom: dataTableOpen ? dataTableHeight : 0
		};

		return (
			<div style={style}>
				<div id="dhis2-maps-container" className={classes.mapContainer}>
					<OlMap>
						<ZoomControl />
					</OlMap>
				</div>
			</div>
		);
	}
}

Map.propTypes = {
	dataTableOpen: PropTypes.bool,
	dataTableHeight: PropTypes.number,
	rightPanelOpen: PropTypes.bool,
	layersPanelOpen: PropTypes.bool,
	mapConfig: PropTypes.object,
	classes: PropTypes.object.isRequired
};

Map.defaultProps = {
	mapConfig: mapConfig
};

const mapStateToProps = (state) => ({
	layersPanelOpen: state.ui.layersPanelOpen,
	rightPanelOpen: state.ui.rightPanelOpen,
	dataTableOpen: state.dataTable,
	dataTableHeight: state.ui.dataTableHeight,
	mapSize: state.mapinfo.size,
	mapProjection: state.mapinfo.projection
});

export default connect(mapStateToProps)(withStyles(styles)(Map));
