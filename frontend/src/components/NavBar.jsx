import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export class NavBar extends Component {
	render() {
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand to="/">Inside AirBNB</NavbarBrand>
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
								<Link className="text-nav" to="/">
									3
								</Link>
							</NavItem>
						</ul>
					</Container>
				</Navbar>
			</header>
		);
	}
}
