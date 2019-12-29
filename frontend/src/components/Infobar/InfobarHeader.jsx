import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../NavBar';
import { Link } from 'react-router-dom';
import '../../css/Infobar.scss';

class InfoBarHeaderUI extends Component {
	render() {
		return <div className="header">dit is de header</div>;
	}
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

export const InfobarHeader = connect(mapStateToProps, mapDispatchToProps)(InfoBarHeaderUI);
