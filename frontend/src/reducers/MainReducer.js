import * as Redux from 'redux';
import { LoginReducer } from './LoginReducer';
import { RegisterReducer } from './RegisterReducer';
import { MapReducer } from './MapReducer';

export const mainReducer = Redux.combineReducers({
	loginReducer: LoginReducer,
	registerReducer: RegisterReducer,
	mapReducer: MapReducer
});
