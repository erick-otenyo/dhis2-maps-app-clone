import React, { Component } from "react";
import { getLayerIndexById } from "@boundlessgeo/sdk/util";

import LayerListItem from "./LayerListItem";

class SdkLayerListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGroupExpanded: false
    };
  }
  handleGroupToggle = () => {
    this.setState({ isGroupExpanded: !this.state.isGroupExpanded });
  };
  render() {
    // const { isGroupExpanded } = this.state;
    // const {
    //   group: { name }
    // } = this.props;

    const layerListItems = [];
    for (let i = 0, ii = this.props.childLayers.length; i < ii; i++) {
      layerListItems.push(
        <LayerListItem
          key={i}
          exclusive={this.props.group.exclusive}
          index={getLayerIndexById(
            this.props.layers,
            this.props.childLayers[i].id
          )}
          groupLayers={this.props.childLayers}
          layers={this.props.layers}
          layer={this.props.childLayers[i]}
          groupId={this.props.groupId}
          error={this.props.error}
        />
      );
    }

    return <div className="layer-list-content" />;
  }
}

// TODO: Add proptypes

export default SdkLayerListGroup;
