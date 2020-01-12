export function passwordChangeAction(password) {
	const regex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/gm;
	return async (dispatch) => {
		if (!password.match(regex)) {
			console.log('not');
			dispatch(
				passwordErrorAction(
					'Password must contain: Minimum eight characters, at least one letter, one number and one special character'
				)
			);
			dispatch(passwordDispatch(password));
		} else {
			dispatch(passwordDispatch(password));
			dispatch(clearPasswordError());
		}
	};
}
function passwordDispatch(password) {
	return {
		type: 'passwordChangeAction',
		value: password
	};
}

function clearPasswordError() {
	return {
		type: 'clearPasswordError'
	};
}

export function passwordErrorAction(error) {
	return {
		type: 'passwordErrorAction',
		value: error
	};
}

export function passwordRepeatChangeAction(passwordRepeat) {
	return {
		type: 'passwordRepeatChangeAction',
		value: passwordRepeat
	};
}

export function usernameChangeAction(username) {
	return {
		type: 'usernameChangeAction',
		value: username
	};
}

export function clickRegisterButtonAction(username, password, passwordRepeat, passwordError) {
	var role = 'user';

	return async (dispatch) => {
		if (username === '') {
			dispatch(setRegisterErrorAction('Username is empty!'));
		}
		if (passwordError === '') {
			try {
				if (password !== passwordRepeat) {
					dispatch(setRegisterErrorAction('Passwords do not match!'));
				}
				const data = await fetch(`https://localhost:5001/Users`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password, role })
				});
				const content = await data.json();
				if (content.error) {
					dispatch(setRegisterErrorAction('Data is incorrect!'));
				} else {
					dispatch(handleRegisterAction(content));
				}
			} catch (err) {
				dispatch(setRegisterErrorAction('Username is already in use!'));
			}
		} else {
			dispatch(
				passwordErrorAction(
					'Password must contain: Minimum eight characters, at least one letter, one number and one special character'
				)
			);
		}
	};
}

function handleRegisterAction(content) {
	return {
		type: 'handleRegisterAction',
		username: content.username || ''
	};
}

export function setRegisterErrorAction(error) {
	return {
		type: 'setRegisterError',
		error: error
	};
}

export function handleRedirectAction() {
	return {
		type: 'handleRedirectAction'
	};
}
