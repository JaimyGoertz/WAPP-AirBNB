import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/MainReducer';

const logger = (store) => (next) => (action) => {
	console.log('ACTION:', action.type, action);
	let result = next(action);
	console.log('STATE AFTER ACTION:', action.type, store.getState());
	return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(mainReducer, composeEnhancers(applyMiddleware(logger, thunk)));
