import * as Redux from 'redux';
import { LoginReducer } from './LoginReducer';
import { RegisterReducer } from './RegisterReducer';
import { MapReducer } from './MapReducer';
import { FilterReducer } from './FilterReducer';
import { ChartsReducer } from './ChartsReducer';

export const mainReducer = Redux.combineReducers({
	loginReducer: LoginReducer,
	registerReducer: RegisterReducer,
	mapReducer: MapReducer,
	filterReducer: FilterReducer,
	chartsReducer: ChartsReducer
});
