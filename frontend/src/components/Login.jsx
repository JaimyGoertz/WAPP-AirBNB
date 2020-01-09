import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usernameChangeAction, passwordChangeAction, clickLoginButtonAction } from '../actions/LoginAction';
import '../css/Login.scss';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';

class LoginUI extends Component {
	render() {
		const usernameChangeHandler = (evt) => this.props.usernameChangeDispatcher(evt.target.value);
		const passwordChangeHandler = (evt) => this.props.passwordChangeDispatcher(evt.target.value);
		const clickLoginButtonHandler = () =>
			this.props.clickLoginButtonDispatcher(this.props.username, this.props.password);
		const formHandler = (evt) => evt.preventDefault();
		return (
			<div>
				<NavBar />
				<div className="login-content">
					<h1>Login</h1>
					<form name="login" onSubmit={formHandler}>
						<div className="login-text">
							<h1 className="login-text">Username</h1>
							<input
								placeholder="Username"
								className="login-input"
								type="text"
								name="username"
								value={this.props.username}
								onChange={usernameChangeHandler}
								required
							/>
							<h1 className="login-text">Password</h1>
							<input
								placeholder="password"
								className="login-input"
								type="password"
								name="password"
								value={this.props.password}
								onChange={passwordChangeHandler}
								required
							/>
							<div>
								<Link to="/">
									<button className="bttn__blue login-bttn" onClick={clickLoginButtonHandler}>
										Login
									</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		clickLoginButtonDispatcher: (username, password) => dispatch(clickLoginButtonAction(username, password)),
		usernameChangeDispatcher: (value) => dispatch(usernameChangeAction(value)),
		passwordChangeDispatcher: (value) => dispatch(passwordChangeAction(value))
	};
}

function mapStateToProps(state) {
	return {
		username: state.loginReducer.username,
		password: state.loginReducer.password
	};
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginUI);
