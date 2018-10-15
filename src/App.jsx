import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesSwitch from './components/MoviesSwitch/MoviesSwitch';
import Page404 from './components/Page404/Page404';
import {
	PAGE_WITH_MOVIES
} from './constants/routes';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route
						path={`${PAGE_WITH_MOVIES}/:page`}
						component={MoviesSwitch}
					/>
					<Route
						path="*"
						component={Page404}
					/>
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
