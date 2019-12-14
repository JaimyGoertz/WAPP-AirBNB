import * as Redux from 'redux';
import { LoginReducer } from './LoginReducer';
import { RegisterReducer } from './RegisterReducer';

export const mainReducer = Redux.combineReducers({
	loginReducer: LoginReducer,
	registerReducer: RegisterReducer
});
