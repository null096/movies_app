import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import MoviesSwitch from './components/MoviesSwitch/MoviesSwitch';
import Page404 from './components/Page404/Page404';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import {
	PAGE_WITH_MOVIES,
	PAGE_WITH_FAVORITES,
} from './constants/routes';
import {
	setUpFavoriteList,
	favoriteListUpdatedInAnotherTab,
} from './actions/movies/movies';
import Proptypes from 'prop-types';

class App extends Component {
	static propTypes = {
		setUpFavoriteList: Proptypes.func.isRequired,
		favoriteListUpdatedInAnotherTab: Proptypes.func.isRequired,
	};

	componentDidMount() {
		const {
			setUpFavoriteList
		} = this.props;

		setUpFavoriteList();
		window.addEventListener('storage', this.onStorageChange);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.onStorageChange);
	}

	onStorageChange = (e) => {
		const {
			favoriteListUpdatedInAnotherTab
		} = this.props;

		if (e.key === 'favoriteMovies') {
			favoriteListUpdatedInAnotherTab(JSON.parse(e.newValue));
		}
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
	favoriteListUpdatedInAnotherTab: (newFavoriteList) =>
		dispatch(favoriteListUpdatedInAnotherTab(newFavoriteList)),
});

export default connect(
	null,
	mapDispatchToProps,
	null, {
		pure: false,
	}
)(App);
