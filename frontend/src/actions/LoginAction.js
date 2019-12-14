export function emailChangeAction(email) {
	return {
		type: 'emailChangeAction',
		value: email
	};
}

export function passwordChangeAction(password) {
	return {
		type: 'passwordChangeAction',
		value: password
	};
}

export function clickLoginButtonAction(email, password) {
	return async (dispatch) => {
		const data = await fetch(`http://localhost:2000/accounts/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		const content = await data.json();
		if (content.error) {
			throw new Error('E-mail or password incorrect');
		} else {
			dispatch(handleLoginAction(content));
		}
	};
}

function handleLoginAction(content) {
	let email = content.email === undefined ? '' : content.email;
	return {
		type: 'handleLoginAction',
		email
	};
}
