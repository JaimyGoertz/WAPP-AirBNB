const initialState = {
	email: '',
	password: ''
};

export function LoginReducer(state = initialState, action) {
	switch (action.type) {
		case 'emailChangeAction':
			return { ...state, email: action.value };
		case 'passwordChangeAction':
			return { ...state, password: action.value };
		case 'handleLoginAction':
			return { ...state, email: action.email, password: '' };
		default:
			return state;
	}
}
