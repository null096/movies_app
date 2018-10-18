import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import MoviesSwitch from './components/MoviesSwitch/MoviesSwitch';
import Page404 from './components/Page404/Page404';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import {
	PAGE_WITH_MOVIES,
	PAGE_WITH_FAVORITES
} from './constants/routes';
import {
	setUpFavoriteList,
} from './actions/movies/movies';

class App extends Component {
	componentDidMount() {
		const {
			setUpFavoriteList
		} = this.props;

		setUpFavoriteList();
	}

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

const mapDispatchToProps = (dispatch) => ({
	setUpFavoriteList: () => dispatch(setUpFavoriteList()),
});

export default connect(
	null,
	mapDispatchToProps,
	null, {
		pure: false,
	}
)(App);
