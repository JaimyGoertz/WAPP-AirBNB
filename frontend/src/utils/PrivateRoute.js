import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRouteUI extends React.Component {
	render() {
		if (this.props.role === 'admin') {
			return <Route exact={this.props.exact || false} to={this.props.path} component={this.props.component} />;
		} else {
			return <Redirect to="/login" />;
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

export const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteUI);
