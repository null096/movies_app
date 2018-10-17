import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesSwitch from './components/MoviesSwitch/MoviesSwitch';
import Page404 from './components/Page404/Page404';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import {
	PAGE_WITH_MOVIES,
	PAGE_WITH_FAVORITES
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
						path={PAGE_WITH_FAVORITES}
						component={FavoriteMovies}
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
