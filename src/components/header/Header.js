import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import "./Header.css";

const styles = {
	root: {
		flexGrow: 1
	}
};

const Header = (props) => {
	const { classes } = props;

	return (
		<header className="header-container">
			<div className="header-left">Mapp</div>
			<div className="header-right" />
		</header>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
