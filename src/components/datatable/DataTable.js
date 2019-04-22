import React, { Component } from "react";
import PropTypes from "prop-types";

import "./DataTable.css";

// Using react component to keep sorting state, which is only used within the data table.
class DataTable extends Component {
	render() {
		// const { data } = this.props;

		return <div style={{ userSelect: "none" }}>Hello table</div>;
	}
}

DataTable.defaultProps = {
	data: []
};

DataTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default DataTable;
