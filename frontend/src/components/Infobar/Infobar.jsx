import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../NavBar';
import { Link } from 'react-router-dom';
import '../../css/Infobar.scss';
import { InfobarHeader } from './InfobarHeader';

class InfoBarUI extends Component {
	render() {
		return (
			<div>
				<InfobarHeader />

				<div className="details">
					<h2>Selected location:</h2>
					{this.getSelectedLocation()}
				</div>
			</div>
		);
	}

	getSelectedLocation = () => {
		if (this.props.locationDetails !== undefined) {
			return (
				<div>
					<h3>Name</h3>
					{this.props.locationDetails[0].name}
					<h3>Id</h3>
					{this.props.locationDetails[0].id}
					<h3>Host name</h3>
					{this.props.locationDetails[0].hostname}
					<h3>Room Type</h3>
					{this.props.locationDetails[0].roomType}
				</div>
			);
		} else {
			return <div>Select a location</div>;
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
