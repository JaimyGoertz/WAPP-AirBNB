import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavBar.scss';
import { connect } from 'react-redux';
import { logoutAction } from '../actions/LoginAction';

class NavBarUI extends Component {
	chartsButton() {
		if (this.props.role === 'admin') {
			return (
				<NavItem>
					<Link className="text-nav" to="/charts">
						Charts
					</Link>
				</NavItem>
			);
		}
	}

	logoutButton() {
		const logoutHandler = () => this.props.logoutDispatcher();
		if (this.props.token !== null) {
			return (
				<NavItem>
					<Link className="text-nav" to="/">
						<div onClick={logoutHandler}>Logout</div>
					</Link>
				</NavItem>
			);
		}
	}

	render() {
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<div className="navbar-header">
							<a className="navbar-brand" href="/">
								Inside Airbnb<small>Adding data to Amsterdam</small>
							</a>
						</div>

						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<ul className="navbar-nav flex-grow">
							<NavItem>
								<Link className="text-nav" to="/">
									Home
								</Link>
							</NavItem>
							<NavItem>
								<Link className="text-nav" to="/map">
									Map
								</Link>
							</NavItem>
							{this.chartsButton()}
							{this.logoutButton()}
						</ul>
					</Container>
				</Navbar>
			</header>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logoutDispatcher: () => dispatch(logoutAction())
	};
}

function mapStateToProps(state) {
	return {
		token: state.loginReducer.token,
		role: state.loginReducer.role
	};
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);
