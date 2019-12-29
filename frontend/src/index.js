import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import App from './App';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers/MainReducer';
import './index.css';

const logger = (store) => (next) => (action) => {
	console.log('ACTION:', action.type, action);
	let result = next(action);
	console.log('STATE AFTER ACTION:', action.type, store.getState());
	return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
export const theStore = Redux.createStore(mainReducer, composeEnhancers(Redux.applyMiddleware(logger, thunk)));

const mainComponent = (
	<ReactRedux.Provider store={theStore}>
		<App />
	</ReactRedux.Provider>
);

ReactDOM.render(mainComponent, document.getElementById('root') || document.createElement('div'));
