import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import AddLayer from "../layers/AddLayer";

const styles = (theme) => ({
	toolbar: {
		position: "absolute",
		width: "100%",
		height: 40,
		minHeight: 40,
		paddingLeft: 0,
		paddingRight: 0,
		zIndex: 1200,

		backgroundColor: theme.palette.background.paper,
		boxShadow: `0 1px 1px 0 ${theme.palette.shadow}`
	},
	divider: {
		height: "100%",
		borderRight: `1px solid ${theme.palette.divider}`,
		marginRight: theme.spacing.unit
	}
});

export const AppMenu = ({ classes }) => (
	<Toolbar variant="dense" className={classes.toolbar}>
		<AddLayer />
		<span className={classes.divider} />
	</Toolbar>
);

AppMenu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppMenu);
