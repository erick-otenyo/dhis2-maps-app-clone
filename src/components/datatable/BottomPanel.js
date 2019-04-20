import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";

import ResizeHandle from "./ResizeHandle";
import DataTable from "./DataTable";
import {
  HEADER_HEIGHT,
  LAYERS_PANEL_WIDTH,
  RIGHT_PANEL_WIDTH
} from "../../constants/layout";
import { closeDataTable, resizeDataTable } from "../../actions/dataTable";

import "./BottomPanel.css";

const styles = {
  closeIcon: {
    width: 16,
    height: 16
  }
};

// Container for DataTable
class BottomPanel extends Component {
  render() {
    const {
      layersPanelOpen,
      rightPanelOpen,
      dataTableOpen,
      dataTableHeight,
      width,
      height,
      resizeDataTable,
      closeDataTable
    } = this.props;

    if (dataTableOpen) {
      const maxHeight = height - HEADER_HEIGHT - 20;
      const tableHeight =
        dataTableHeight < maxHeight ? dataTableHeight : maxHeight;
      const layersWidth = layersPanelOpen ? LAYERS_PANEL_WIDTH : 0;
      const rightWidth = rightPanelOpen ? RIGHT_PANEL_WIDTH : 0;
      const tableWidth = width - layersWidth - rightWidth;

      const style = {
        height: tableHeight,
        left: layersWidth,
        right: rightWidth
      };

      return (
        <div
          ref={(node) => (this.node = node)}
          className="BottomPanel"
          style={style}
        >
          <span onClick={closeDataTable}>
            <CancelIcon
              className="BottomPanel-close"
              style={styles.closeIcon}
            />
          </span>
          <ResizeHandle
            maxHeight={maxHeight}
            onResize={(height) => this.onResize(height)}
            onResizeEnd={(height) => resizeDataTable(height)}
          />
          <DataTable width={tableWidth} height={tableHeight} />
        </div>
      );
    }

    return null;
  }

  // Called from resize handle
  onResize(height) {
    this.node.style.height = `${height}px`;
  }
}

BottomPanel.propTypes = {
  layersPanelOpen: PropTypes.bool.isRequired,
  rightPanelOpen: PropTypes.bool.isRequired,
  dataTableOpen: PropTypes.bool.isRequired,
  dataTableHeight: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  resizeDataTable: PropTypes.func.isRequired,
  closeDataTable: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    dataTableOpen: state.dataTable ? true : false,
    dataTableHeight: state.ui.dataTableHeight,
    layersPanelOpen: state.ui.layersPanelOpen,
    rightPanelOpen: state.ui.rightPanelOpen,
    width: state.ui.width,
    height: state.ui.height
  }),
  { closeDataTable, resizeDataTable }
)(BottomPanel);
