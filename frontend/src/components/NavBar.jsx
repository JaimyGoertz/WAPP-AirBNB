import React, { Component } from 'react';
import { Container, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';
import { connect } from 'react-redux';
import { logoutAction } from '../actions/LoginAction';
import { chartsAction } from '../actions/LoginAction';
import Cookies from 'universal-cookie';

class NavBarUI extends Component {
	chartsButton() {
		const cookies = new Cookies();
		const role = cookies.get('role');
		const chartsHandler = () => this.props.chartsDispatcher();
		if (role === 'admin') {
			return (
				<NavItem>
					<Link className="text-nav" to="/charts">
						<div className="text" onClick={chartsHandler}>
							Charts
						</div>
					</Link>
				</NavItem>
			);
		}
	}

	logoutButton() {
		const cookies = new Cookies();
		const token = cookies.get('token');
		const logoutHandler = () => this.props.logoutDispatcher();
		if (token !== undefined) {
			return (
				<NavItem>
					<Link className="text-nav" to="/">
						<div className="text" onClick={logoutHandler}>
							Logout
						</div>
					</Link>
				</NavItem>
			);
		} else {
			return (
				<NavItem>
					<Link className="text-nav" to="/login">
						<div className="text">Login</div>
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
									<div className="text">Home</div>
								</Link>
							</NavItem>
							<NavItem>
								<Link className="text-nav" to="/map">
									<div className="text">Map</div>
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
		logoutDispatcher: () => dispatch(logoutAction()),
		chartsDispatcher: () => dispatch(chartsAction())
	};
}

function mapStateToProps(state) {
	return {
		token: state.loginReducer.token,
		role: state.loginReducer.role
	};
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarUI);
