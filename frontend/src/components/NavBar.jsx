import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavBar.scss';

export class NavBar extends Component {
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
							<NavItem>
								<Link className="text-nav" to="/charts">
									Charts
								</Link>
							</NavItem>
						</ul>
					</Container>
				</Navbar>
			</header>
		);
	}
}
