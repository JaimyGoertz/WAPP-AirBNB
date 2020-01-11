import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

class PublicRouteUI extends React.Component {
	render() {
		const cookies = new Cookies();
		const token = cookies.get('token');
		if (token === null || token === undefined) {
			return <Route exact={this.props.exact || false} to={this.props.path} component={this.props.component} />;
		} else {
			return <Redirect to="/" />;
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {};
}

function mapStateToProps(state) {
	return {
		token: state.loginReducer.token,
		role: state.loginReducer.role
	};
}

export const PublicRoute = connect(mapStateToProps, mapDispatchToProps)(PublicRouteUI);
