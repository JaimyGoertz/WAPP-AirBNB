import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	passwordChangeAction,
	passwordRepeatChangeAction,
	usernameChangeAction,
	clickRegisterButtonAction,
	handleRedirectAction
} from '../actions/RegisterAction';
import '../styles/Register.scss';
import { NavBar } from './NavBar';
import { Redirect } from 'react-router-dom';

class RegisterUI extends Component {
	render() {
		const passwordChangeHandler = (evt) => this.props.passwordChangeDispatcher(evt.target.value);
		const passwordRepeatChangeHandler = (evt) => this.props.passwordRepeatChangeDispatcher(evt.target.value);
		const usernameChangeHandler = (evt) => this.props.usernameChangeDispatcher(evt.target.value);
		const clickRegisterButtonHandler = () =>
			this.props.clickRegisterButtonDispatcher(
				this.props.username,
				this.props.password,
				this.props.passwordRepeat,
				this.props.passwordError
			);
		const formHandler = (evt) => evt.preventDefault();
		return (
			<div>
				<NavBar />
				<div className="register-content">
					<div className="direction">
						<h1 className="title">Register</h1>
						{this.handleRedirect()}
						<form name="register" onSubmit={formHandler}>
							<div className="register-text">
								<div className="item">
									<h1 className="register-text">Username</h1>
									<input
										className="register-input"
										type="username"
										name="username"
										placeholder="username"
										value={this.props.username}
										onChange={usernameChangeHandler}
										required
									/>
								</div>
								<div className="item">
									<h1 className="register-text">Password</h1>
									<input
										className="register-input"
										type="password"
										name="password"
										placeholder="password"
										value={this.props.password}
										onChange={passwordChangeHandler}
										required
									/>
									<p className="redError">{this.props.passwordError}</p>
								</div>
								<div className="item">
									<h1 className="register-text">Repeat Password</h1>
									<input
										className="register-input"
										type="password"
										name="passwordRepeat"
										placeholder="password"
										value={this.props.passwordRepeat}
										onChange={passwordRepeatChangeHandler}
										required
									/>
								</div>
								<div>
									<button className="button-register" onClick={clickRegisterButtonHandler}>
										Register
									</button>
								</div>
							</div>
						</form>
					</div>
					<h3 className="error">{this.props.error}</h3>
				</div>
			</div>
		);
	}
	handleRedirect() {
		if (this.props.redirect) {
			this.props.handleRedirect();
			return <Redirect to="/login" />;
		}
		return null;
	}
}

function mapDispatchToProps(dispatch) {
	return {
		clickRegisterButtonDispatcher: (username, password, passwordRepeat, passwordError) =>
			dispatch(clickRegisterButtonAction(username, password, passwordRepeat, passwordError)),
		passwordChangeDispatcher: (value) => dispatch(passwordChangeAction(value)),
		passwordRepeatChangeDispatcher: (value) => dispatch(passwordRepeatChangeAction(value)),
		usernameChangeDispatcher: (value) => dispatch(usernameChangeAction(value)),
		handleRedirect: () => dispatch(handleRedirectAction())
	};
}

function mapStateToProps(state) {
	return {
		password: state.registerReducer.password,
		passwordRepeat: state.registerReducer.passwordRepeat,
		username: state.registerReducer.username,
		error: state.registerReducer.error,
		passwordError: state.registerReducer.passwordError,
		redirect: state.registerReducer.redirect
	};
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterUI);
