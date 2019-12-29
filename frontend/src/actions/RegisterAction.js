export function passwordChangeAction(password) {
	return {
		type: 'passwordChangeAction',
		value: password
	};
}

export function passwordRepeatChangeAction(passwordRepeat) {
	return {
		type: 'passwordRepeatChangeAction',
		value: passwordRepeat
	};
}

export function emailChangeAction(email) {
	return {
		type: 'emailChangeAction',
		value: email
	};
}

export function clickRegisterButtonAction(email, password, passwordRepeat) {
	var role = 'user';
	return async (dispatch) => {
		const data = await fetch(`https://localhost:5001/Users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, role })
		});
		const content = await data.json();
		if (content.error) {
			throw new Error('Data incorrect');
		} else {
			dispatch(handleRegisterAction(content));
		}
	};
}

function handleRegisterAction(content) {
	return {
		type: 'handleRegisterAction',
		email: content.email || ''
	};
}
