import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { HEADER_HEIGHT, RIGHT_PANEL_WIDTH } from "../../constants/layout";
import FeatureInfo from "./FeatureInfo";

const styles = (theme) => ({
	panel: {
		position: "absolute",
		top: HEADER_HEIGHT,
		height: "auto",
		bottom: 0,
		width: RIGHT_PANEL_WIDTH,
		backgroundColor: theme.palette.background.default,
		boxShadow: "0 3px 10px 0 rgba(0, 0, 0, 0.227451)",
		overflowX: "hidden",
		overflowY: "auto",
		zIndex: 1190
	}
});

// https://github.com/EyeSeeTea/d2-ui-playground/blob/feature/interpretations/src/Root.js
// http://localhost:8082/?id=zDP78aJU8nX&interpretationid=zS8iVkpyCVb
class RightPanel extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		classes: PropTypes.object.isRequired
	};

	render() {
		const { isOpen, classes } = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<Drawer
				open={Boolean(isOpen)}
				variant="persistent"
				anchor="right"
				classes={{ paper: classes.panel }}
			>
				<FeatureInfo />
			</Drawer>
		);
	}
}

export default connect((state) => ({
	isOpen: state.ui.rightPanelOpen
}))(withStyles(styles)(RightPanel));
