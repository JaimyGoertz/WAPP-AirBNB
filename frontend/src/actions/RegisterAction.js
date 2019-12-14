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
	console.log(`http://localhost:2000/accounts/register`);
	return async (dispatch) => {
		const data = await fetch(`http://localhost:2000/accounts/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, passwordRepeat })
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
