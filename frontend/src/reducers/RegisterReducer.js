const initialState = {
	username: '',
	password: '',
	error: '',
	redirect: false,
	passwordError: '',
	passwordRepeat: ''
};

export function RegisterReducer(state = initialState, action) {
	switch (action.type) {
		case 'passwordChangeAction':
			return { ...state, password: action.value };
		case 'passwordRepeatChangeAction':
			return { ...state, passwordRepeat: action.value };
		case 'usernameChangeAction':
			return { ...state, username: action.value };
		case 'handleRegisterAction':
			return { ...state, username: action.username, password: '', passwordRepeat: '', redirect: true };
		case 'setRegisterError':
			return { ...state, error: action.error };
		case 'handleRedirectAction':
			return { ...state, redirect: false, error: '', passwordError: '' };
		case 'passwordErrorAction':
			return { ...state, redirect: false, passwordError: action.value };
		case 'clearPasswordError':
			return { ...state, passwordError: '' };
		default:
			return state;
	}
}
