export function usernameChangeAction(username) {
	return {
		type: 'usernameChangeAction',
		value: username
	};
}

export function passwordChangeAction(password) {
	return {
		type: 'passwordChangeAction',
		value: password
	};
}

export function setTokenAction(token) {
	return {
		type: 'setToken',
		token: token
	};
}

export function setUserInfoAction(username, role) {
	return {
		type: 'setUserInfo',
		username: username,
		role: role
	};
}

export function setLoginErrorAction(error) {
	return {
		type: 'setLoginError',
		error: error
	};
}

export function logoutAction() {
	return {
		type: 'logoutAction'
	};
}

export function clickLoginButtonAction(username, password) {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			formData.append('client_id', 'client');
			formData.append('client_secret', 'secret');
			formData.append('grant_type', 'password');
			formData.append('username', username);
			formData.append('password', password);
			formData.append('scope', 'openid api1');

			const options = {
				method: 'POST',
				body: formData
			};
			const response = await fetch('http://localhost:5002/connect/token', options);
			const body = await response.json();
			if (response.ok) {
				dispatch(setTokenAction(body.access_token));
				dispatch(getUserInfoDispatcher(body.access_token));
			} else {
				throw new Error();
			}
		} catch (err) {
			dispatch(setLoginErrorAction('Invalid password or username!'));
		}
	};
}

export function getUserInfoDispatcher(token) {
	return async (dispatch) => {
		try {
			const options = {
				method: 'GET',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			};
			const response = await fetch('http://localhost:5002/connect/userinfo', options);
			const body = await response.json();
			if (response.ok) dispatch(setUserInfoAction(body.preferred_username, body.role));
			if (!response.ok) throw new Error();
		} catch (err) {
			dispatch(setLoginErrorAction('Error fetching user info!'));
		}
	};
}

export function chartsAction() {
	return {
		type: 'chartsAction'
	};
}

export function handleRedirectAction() {
	return {
		type: 'handleRedirectAction'
	};
}
