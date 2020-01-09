import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PublicRouteUI extends React.Component {
	render() {
		if (this.props.token === null) {
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
		token: state.loginReducer.token
	};
}

export const PublicRoute = connect(mapStateToProps, mapDispatchToProps)(PublicRouteUI);
