import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	passwordChangeAction,
	passwordRepeatChangeAction,
	emailChangeAction,
	clickRegisterButtonAction
} from '../actions/RegisterAction';
import '../css/Register.scss';
import { NavBar } from './NavBar';

class RegisterUI extends Component {
	render() {
		const passwordChangeHandler = (evt) => this.props.passwordChangeDispatcher(evt.target.value);
		const passwordRepeatChangeHandler = (evt) => this.props.passwordRepeatChangeDispatcher(evt.target.value);
		const emailChangeHandler = (evt) => this.props.emailChangeDispatcher(evt.target.value);
		const clickRegisterButtonHandler = () =>
			this.props.clickRegisterButtonDispatcher(this.props.email, this.props.password, this.props.passwordRepeat);
		const formHandler = (evt) => evt.preventDefault();
		return (
			<div>
				<NavBar />
				<div className="register-content">
					<h1>Register</h1>
					<form name="register" onSubmit={formHandler}>
						<div className="register-text">
							<h1 className="register-text">E-mail</h1>
							<input
								className="register-input"
								type="email"
								name="email"
								placeholder="e-mail"
								value={this.props.email}
								onChange={emailChangeHandler}
								required
							/>
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
							<div>
								<button className="bttn__blue register-bttn" onClick={clickRegisterButtonHandler}>
									Register
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
		clickRegisterButtonDispatcher: (email, password, passwordRepeat) =>
			dispatch(clickRegisterButtonAction(email, password, passwordRepeat)),
		passwordChangeDispatcher: (value) => dispatch(passwordChangeAction(value)),
		passwordRepeatChangeDispatcher: (value) => dispatch(passwordRepeatChangeAction(value)),
		emailChangeDispatcher: (value) => dispatch(emailChangeAction(value))
	};
}

function mapStateToProps(state) {
	return {
		password: state.registerReducer.password,
		passwordRepeat: state.registerReducer.passwordRepeat,
		email: state.registerReducer.email
	};
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterUI);
