import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { closeLayersDialog } from "../../actions/layers";

const styles = {
	title: {
		padding: "20px 24px 4px 24px",
		fontSize: 16,
		fontWeight: "bold"
	},
	content: {
		minHeight: 300
	}
};

class LayerCatalog extends Component {
	handleOnClose = () => {
		this.props.dispatch(closeLayersDialog());
	};
	render() {
		const { layers, classes, layersDialogOpen } = this.props;

		return (
			<Dialog
				open={layersDialogOpen}
				maxWidth="lg"
				onBackdropClick={this.handleOnClose}
				fullWidth
			>
				<DialogTitle disableTypography={true} className={classes.title}>
					Layer Catalog
				</DialogTitle>
				<DialogContent className={classes.content}>Hello</DialogContent>
			</Dialog>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		layers: state.map.layers,
		layersDialogOpen: state.ui.layersDialogOpen
	};
};

export default connect(mapStateToProps)(withStyles(styles)(LayerCatalog));
