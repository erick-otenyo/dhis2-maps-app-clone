import React from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { isLayerVisible, getLayerTitle } from "@boundlessgeo/sdk/util";
import { updateLayer } from "@boundlessgeo/sdk/actions/map";
import { fitExtent } from "@boundlessgeo/sdk/actions/map";
import SdkLayerListItem from "@boundlessgeo/sdk/components/layer-list-item";
import { DragSource, DropTarget } from "react-dnd";
import {
  types,
  layerListItemSource,
  layerListItemTarget,
  collectDrop
} from "@boundlessgeo/sdk/components/layer-list-item";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Tooltip from "@material-ui/core/Tooltip";

import SortableHandle from "./SortableHandle";
import LayerToolbar from "./toolbar/LayerToolbar";
import { toggleDataTable } from "../../../actions/dataTable";

const styles = {
  card: {
    position: "relative",
    margin: "8px 4px 0 4px",
    paddingBottom: 0,
    zIndex: 2000
  },
  header: {
    height: 54,
    padding: "2px 8px 0 18px",
    fontSize: 14
  },
  title: {
    width: 227,
    paddingLeft: 15,
    fontSize: 15,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    lineHeight: "17px"
  },
  subheader: {
    width: 195,
    paddingLeft: 15,
    lineHeight: "17px",
    fontSize: 14
  },
  legend: {
    paddingLeft: 32
  },
  actions: {
    backgroundColor: "#eee",
    height: 32
  },
  visibility: {
    position: "absolute",
    right: 28,
    top: 4
  },
  expand: {
    position: "absolute",
    right: -4,
    top: 4
  },
  content: {
    fontSize: 14,
    padding: 0 // TODO: Not working on :last-child
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class LayerListItem extends SdkLayerListItem {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isMouseOver: false
    };
  }

  toggleLayerVisibility = () => {
    console.log(this.props);
    super.toggleVisibility();
  };

  handleOpacityChange = (newOpacity) => {
    const {
      layer: { type, id, paint },
      dispatch
    } = this.props;

    dispatch(
      updateLayer(id, { paint: { ...paint, [`${type}-opacity`]: newOpacity } })
    );
  };

  handleFitToLayerExtent = () => {
    const {
      layer: { metadata },
      dispatch,
      mapSize,
      mapProjection
    } = this.props;

    if (metadata && metadata["bnd:bbox"]) {
      dispatch(fitExtent(metadata["bnd:bbox"], mapSize, mapProjection));
    }
  };

  handleExpandToggle = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  handleMouseEnter = () => {
    this.setState({ isMouseOver: true });
  };
  handleMouseLeave = () => {
    this.setState({ isMouseOver: false });
  };
  render() {
    const { layer, isOver, isDragging, classes, toggleDataTable } = this.props;
    const { type, paint } = layer;
    // get opacity value from layer paint definition
    const opacity =
      paint && paint[`${type}-opacity`] ? paint[`${type}-opacity`] : 1;
    const { isExpanded, isMouseOver } = this.state;
    const layerTitle = getLayerTitle(layer);
    const isVisible = isLayerVisible(layer);

    return this.props.connectDragPreview(
      <div
        ref={(instance) => {
          const node = findDOMNode(instance);
          this.props.connectDropTarget(node);
        }}
      >
        <Card className={classes.card} data-test="layercard">
          <CardHeader
            classes={{
              root: classes.header,
              title: classes.title,
              subheader: classes.subheader
            }}
            title={layerTitle}
            action={[
              <SortableHandle
                ref={(instance) => {
                  const node = findDOMNode(instance);
                  this.props.connectDragSource(node);
                }}
                key="handle"
              />,
              <Tooltip key="expand" title={isExpanded ? "Collapse" : "Expand"}>
                <IconButton
                  className={classes.expand}
                  onClick={this.handleExpandToggle}
                  style={{ backgroundColor: "transparent" }}
                >
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Tooltip>
            ]}
          />

          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.content} style={{ padding: 0 }}>
              <LayerToolbar
                opacity={opacity}
                isVisible={isVisible}
                // onEdit={() => ({})}
                toggleDataTable={() => toggleDataTable(layer.id)}
                toggleLayerVisibility={this.toggleLayerVisibility}
                onOpacityChange={this.handleOpacityChange}
              />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

LayerListItem = DropTarget(types, layerListItemTarget, collectDrop)(
  DragSource(types, layerListItemSource, collect)(LayerListItem)
);

// TODO: Add proptypes

const mapStateToProps = (state, props) => {
  const { size, projection } = state.mapinfo;
  return {
    mapSize: size,
    mapProjection: projection
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDataTable
  }
)(withStyles(styles)(LayerListItem));
