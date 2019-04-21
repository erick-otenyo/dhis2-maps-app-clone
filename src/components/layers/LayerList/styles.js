export default {
	card: {
		position: "relative",
		margin: "8px 4px 0 4px",
		paddingBottom: 0,
		zIndex: 2000
	},
	header: {
		height: 54,
		padding: "2px 8px 0 18px",
		fontSize: 14
	},
	title: {
		width: 227,
		paddingLeft: 15,
		fontSize: 15,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontWeight: 500,
		lineHeight: "17px",
		userSelect: "none"
	},
	subheader: {
		width: 195,
		paddingLeft: 15,
		lineHeight: "17px",
		fontSize: 14
	},
	legend: {
		paddingLeft: 32
	},
	actions: {
		backgroundColor: "#eee",
		height: 32
	},
	visibility: {
		position: "absolute",
		right: 28,
		top: 4
	},
	expand: {
		position: "absolute",
		right: -4,
		top: 4
	},
	content: {
		fontSize: 14,
		padding: 0 // TODO: Not working on :last-child
	}
};
