import React from "react";
import { connect } from "react-redux";
import { zoomIn, zoomOut } from "@boundlessgeo/sdk/actions/map";

import "./ZoomControl.css";

const ZoomControl = ({ zoomIn, zoomOut }) => {
  return (
    <div className="zoom-control-container">
      <div className="zoom-tool" onClick={zoomIn}>
        +
      </div>
      <div className="zoom-tool" onClick={zoomOut}>
        −
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    zoomIn: () => {
      dispatch(zoomIn());
    },
    zoomOut: () => {
      dispatch(zoomOut());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ZoomControl);
