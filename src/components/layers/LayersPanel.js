import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SdkLayerList from "@boundlessgeo/sdk/components/layer-list";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import LayerList from "./LayerList/LayerList";
import LayerListGroup from "./LayerList/LayerListGroup";
import LayerListItem from "./LayerList/LayerListItem";
import { LAYERS_PANEL_WIDTH } from "../../constants/layout";

const styles = (theme) => ({
  panel: {
    top: 40,
    backgroundColor: theme.palette.background.default,
    boxShadow: `1px 0 1px 0 ${theme.palette.shadow}`,
    height: "auto",
    maxHeight: "100%",
    bottom: 0,
    overflowX: "hidden",
    overflowY: "auto",
    zIndex: 1190,
    width: LAYERS_PANEL_WIDTH
  }
});

const DragDropLayerList = DragDropContext(HTML5Backend)(SdkLayerList);

const LayersPanel = ({ layersPanelOpen, classes }) => (
  <Drawer
    open={layersPanelOpen}
    variant="persistent"
    classes={{ paper: classes.panel }}
  >
    <DragDropLayerList
      layerClass={LayerListItem}
      groupClass={LayerListGroup}
      listClass={LayerList}
    />
  </Drawer>
);

LayersPanel.propTypes = {
  layersPanelOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  layersPanelOpen: state.ui.layersPanelOpen
});

export default connect(mapStateToProps)(withStyles(styles)(LayersPanel));
