const initialState = {
	email: '',
	password: ''
};

export function RegisterReducer(state = initialState, action) {
	switch (action.type) {
		case 'passwordChangeAction':
			return { ...state, password: action.value };
		case 'passwordRepeatChangeAction':
			return { ...state, passwordRepeat: action.value };
		case 'emailChangeAction':
			return { ...state, email: action.value };
		case 'handleRegisterAction':
			return { ...state, email: action.email, password: '', passwordRepeat: '' };
		default:
			return state;
	}
}
