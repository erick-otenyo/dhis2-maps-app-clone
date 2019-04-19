import React, { Component } from "react";
import PropTypes from "prop-types";

import "./LayerList.css";

export default class SdkList extends Component {
	render() {
		return (
			<div style={this.props.style} className="sdk-layer-list">
				{this.props.children}
			</div>
		);
	}
}
SdkList.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};
