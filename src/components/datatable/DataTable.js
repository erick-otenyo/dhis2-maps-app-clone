import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./DataTable.css";

// Using react component to keep sorting state, which is only used within the data table.
class DataTable extends Component {
	render() {
		// const { width, height, data } = this.props;

		return <div>Hello</div>;
	}
}

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
};

DataTable.defaultProps = {
	data: []
};

const mapStateToProps = (state) => {
	let data;

	const source = state.dataTable
		? state.map.sources[state.dataTable.sourceName]
		: null;

	if (source) {
		if (source.type === "geojson" && source.data) {
			data = source.data.features.map((feature) => feature.properties);
		} else {
			data = state.dataTable.remoteData;
		}

		return {
			data
		};
	}

	return null;
};

export default connect(mapStateToProps)(DataTable);
