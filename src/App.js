import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
//import Header from './components/Header/Header';
import Movies from './components/Movies/Movies';
import Page404 from './components/Page404/Page404';
import {
	PAGE_WITH_MOVIES
} from './constants/routes';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				{/* <Header /> */}
				<Switch>
					<Route
						path={`${PAGE_WITH_MOVIES}/:page`}
						component={Movies}
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
