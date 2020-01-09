const initialState = {
	email: '',
	password: '',
	token: null,
	role: '',
	username: ''
};

export function LoginReducer(state = initialState, action) {
	switch (action.type) {
		case 'usernameChangeAction':
			return { ...state, username: action.value };
		case 'passwordChangeAction':
			return { ...state, password: action.value };
		case 'setToken':
			return { ...state, token: action.token };
		case 'setUserInfo':
			return { ...state, username: action.username, role: action.role };
		case 'setLoginError':
			return { ...state, error: action.error };
		case 'logoutAction':
			return {
				...state,
				email: '',
				password: '',
				token: null,
				role: '',
				username: ''
			};
		default:
			return state;
	}
}
