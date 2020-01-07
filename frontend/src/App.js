import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Map } from './components/Map';
import { Charts } from './components/Charts';
import './css/style.scss';

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/map" component={Map} />
					<Route exact path="/charts" component={Charts} />
				</Switch>
			</Router>
		);
	}
}
