import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import '../css/Home.scss';

class HomeUI extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<h1 className="main-text">Welcome to InsideAirBNB Amsterdam!</h1>
				<div className="buttons">
					<div>
						<Link to="/login" className="bttn__blue">
							Login
						</Link>
					</div>
					<div>
						<Link to="/register" className="bttn__blue">
							Register
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {};
}

function mapStateToProps(state) {
	return {};
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUI);
