import React, { Component } from "react";

import "./DataTable.css";

// Using react component to keep sorting state, which is only used within the data table.
class DataTable extends Component {
	static defaultProps = {
		data: []
	};

	render() {
		return <div>Hello table</div>;
	}
}

export default DataTable;
