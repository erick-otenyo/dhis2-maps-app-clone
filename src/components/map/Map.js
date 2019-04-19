import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OlMap from "@boundlessgeo/sdk/components/map";
import ZoomControl from "../ZoomControl/ZoomControl";
import * as mapActions from "@boundlessgeo/sdk/actions/map";

import { withStyles } from "@material-ui/core/styles";

import { LAYERS_PANEL_WIDTH, RIGHT_PANEL_WIDTH } from "../../constants/layout";

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
  static propTypes = {
    dataTableOpen: PropTypes.bool,
    dataTableHeight: PropTypes.number,
    rightPanelOpen: PropTypes.bool,
    layersPanelOpen: PropTypes.bool,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.configureMap();
  }

  configureMap = () => {
    this.addBaseMap();
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
      top: 40,
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
const mapStateToProps = (state) => ({
  layersPanelOpen: state.ui.layersPanelOpen,
  rightPanelOpen: state.ui.rightPanelOpen,
  dataTableOpen: state.dataTable,
  dataTableHeight: state.ui.dataTableHeight
});

export default connect(mapStateToProps)(withStyles(styles)(Map));
