import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/CloseRounded";

import { closeRightPanel } from "../../actions/ui";

const styles = (theme) => ({
	root: {
		padding: theme.spacing.unit,
		boxShadow: "none",
		textAlign: "center"
	},
	table: {
		minWidth: "100%"
	},
	row: {
		"&:nth-of-type(even)": {
			backgroundColor: theme.palette.background.default
		}
	},
	cell: { wordBreak: "break-word", width: "min-content" },
	cellBold: { fontWeight: "700" },
	button: { width: "100%" }
});

const FeatureInfo = (props) => {
	const { classes, feature, closeRightPanel } = props;

	let tableRows;

	if (feature && feature.properties) {
		tableRows = Object.entries(feature.properties).map(([key, value]) => {
			return (
				<TableRow className={classes.row} key={key}>
					<TableCell padding="none" align="left" className={classes.cellBold}>
						{key}
					</TableCell>
					<TableCell padding="checkbox" align="left" className={classes.cell}>
						{value}
					</TableCell>
				</TableRow>
			);
		});
	}

	return (
		<Paper className={classes.root}>
			<Button
				className={classes.button}
				variant="outlined"
				size="small"
				onClick={closeRightPanel}
			>
				<CloseIcon fontSize="small" />
				Close
			</Button>
			<Table className={classes.table}>
				<TableBody>{tableRows}</TableBody>
			</Table>
		</Paper>
	);
};

FeatureInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	feature: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		feature: state.interaction.feature
	};
};

export default connect(
	mapStateToProps,
	{ closeRightPanel }
)(withStyles(styles)(FeatureInfo));
