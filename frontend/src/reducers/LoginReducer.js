import Cookies from 'universal-cookie';

const initialState = {
	email: '',
	password: '',
	token: null,
	role: '',
	username: '',
	redirect: false
};

export function LoginReducer(state = initialState, action) {
	const cookies = new Cookies();
	var expiration = new Date(Date.now() + 0.2 * 60000);
	switch (action.type) {
		case 'usernameChangeAction':
			return { ...state, username: action.value };
		case 'passwordChangeAction':
			return { ...state, password: action.value };
		case 'setToken':
			cookies.set('token', action.token, { path: '/', expires: expiration });
			return { ...state, token: action.token };
		case 'setUserInfo':
			cookies.set('username', action.username, { path: '/', expires: expiration });
			cookies.set('role', action.role, { path: '/', expires: expiration });
			return { ...state, username: action.username, role: action.role, redirect: true };
		case 'setLoginError':
			return { ...state, error: action.error, redirect: false };
		case 'logoutAction':
			cookies.remove('role');
			cookies.remove('token');
			cookies.remove('username');
			return {
				...state,
				email: '',
				password: '',
				token: null,
				role: '',
				username: ''
			};
		case 'chartsAction':
			return { ...state, charts: true };
		case 'handleRedirectAction':
			return { ...state, redirect: false, error: '' };

		default:
			return state;
	}
}
