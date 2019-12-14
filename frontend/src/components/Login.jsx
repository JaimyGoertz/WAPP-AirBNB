import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChangeAction, passwordChangeAction, clickLoginButtonAction } from '../actions/LoginAction';
import '../css/Login.scss';
import { NavBar } from './NavBar';

class LoginUI extends Component {
	render() {
		const emailChangeHandler = (evt) => this.props.emailChangeDispatcher(evt.target.value);
		const passwordChangeHandler = (evt) => this.props.passwordChangeDispatcher(evt.target.value);
		const clickLoginButtonHandler = () =>
			this.props.clickLoginButtonDispatcher(this.props.email, this.props.password);
		const formHandler = (evt) => evt.preventDefault();
		return (
			<div>
				<NavBar />
				<div className="login-content">
					<form name="login" onSubmit={formHandler}>
						<div className="login-text">
							<h1 className="login-text">E-mail</h1>
							<input
								placeholder="E-mail"
								className="login-input"
								type="text"
								name="email"
								value={this.props.email}
								onChange={emailChangeHandler}
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
								<button className="bttn__blue login-bttn" onClick={clickLoginButtonHandler}>
									Login
								</button>
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
		clickLoginButtonDispatcher: (email, password) => dispatch(clickLoginButtonAction(email, password)),
		emailChangeDispatcher: (value) => dispatch(emailChangeAction(value)),
		passwordChangeDispatcher: (value) => dispatch(passwordChangeAction(value))
	};
}

function mapStateToProps(state) {
	return {
		email: state.loginReducer.email,
		password: state.loginReducer.password
	};
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginUI);
