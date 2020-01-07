import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../NavBar';
import { Link } from 'react-router-dom';
import '../../css/Infobar.scss';
import { InfobarHeader } from './InfobarHeader';

class InfoBarUI extends Component {
	render() {
		return (
			<div className="Details">
				<InfobarHeader />

				<div className="details">
					<h2 className="detailsHeader">Selected location details:</h2>
					{this.getSelectedLocation()}
				</div>
			</div>
		);
	}

	getSelectedLocation = () => {
		if (this.props.locationDetails !== undefined) {
			return (
				<div>
					<h3 className="detailsHeader">Name</h3>
					{this.props.locationDetails[0].name}
					<h3 className="detailsHeader">Host name</h3>
					{this.props.locationDetails[0].hostname}
					<h3 className="detailsHeader">Room Type</h3>
					{this.props.locationDetails[0].roomType}
					<h3 className="detailsHeader">Price</h3>
					{'$' + this.props.locationDetails[0].price}
					<h3 className="detailsHeader">Neighbourhood</h3>
					{this.props.locationDetails[0].neighbourhood}
					<h3 className="detailsHeader">Average review score</h3>
					{this.props.locationDetails[0].reviewScoresRating}
				</div>
			);
		} else {
			return <div className="detailsHeader">Select a location to see details</div>;
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

function mapStateToProps(state) {
	return {
		locations: state.mapReducer.locations,
		locationDetails: state.mapReducer.locationDetails
	};
}

export const InfoBar = connect(mapStateToProps, mapDispatchToProps)(InfoBarUI);
