import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";

import { openLayersDialog } from "../../actions/layers";
import { LAYERS_PANEL_WIDTH } from "../../constants/layout";

const styles = {
	button: {
		boxSizing: "border-box",
		width: LAYERS_PANEL_WIDTH + 1,
		paddingLeft: 18,
		justifyContent: "flex-start",
		borderRadius: 0
	},
	label: {
		textTransform: "none",
		fontSize: 15,
		fontWeight: "normal",
		justifyContent: "initial"
	},
	icon: {
		marginRight: 8
	}
};

export class AddLayer extends Component {
	handleClick = (event) => {
		event.preventDefault(); // This prevents ghost click.
		this.props.openLayersDialog();
	};

	render() {
		const { classes } = this.props;

		return [
			<Button
				key="button"
				onClick={(event) => this.handleClick(event)}
				classes={{
					root: classes.button,
					label: classes.label
				}}
			>
				<AddCircleIcon className={classes.icon} />
				Add layer
			</Button>
		];
	}
}

AddLayer.propTypes = {
	openLayersDialog: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

export default connect(
	null,
	{ openLayersDialog }
)(withStyles(styles)(AddLayer));
