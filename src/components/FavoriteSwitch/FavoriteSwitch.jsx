import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Page404 from '../Page404/Page404';
import {
	removeMovieFromFavorites
} from '../../actions/movies/movies';
import FavoriteMovies from '../FavoriteMovies/FavoriteMovies';
import MoviesInfoControl from '../MoviesInfoControl/MoviesInfoControl';

export class FavoriteSwitch extends Component {
	static propTypes = {
		isFavoriteMoviesLoaded: Proptypes.bool.isRequired,
		favoriteMovies: Proptypes.array.isRequired,
		removeMovieFromFavorites: Proptypes.func.isRequired,
	};

	render() {
		const {
			isFavoriteMoviesLoaded,
			favoriteMovies,
			removeMovieFromFavorites,
			match,
		} = this.props;

		return (
			<Switch>
				<Route
					path={`${match.url}/:movieIndex`}
					render={(props) =>
						<MoviesInfoControl
							{...props}
							movies={favoriteMovies}
							isMoviesLoaded={isFavoriteMoviesLoaded}
							mainUrl={match.url}
						/>
					}
				/>
				<Route
					exact path={match.url}
					render={(props) =>
						<FavoriteMovies
							{...props}
							isFavoriteMoviesLoaded=
							{isFavoriteMoviesLoaded}
							favoriteMovies={favoriteMovies}
							removeMovieFromFavorites={removeMovieFromFavorites}
						/>
					}
				/>
				<Route
					path="*"
					component={Page404}
				/>
			</Switch>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		favoriteMovies,
		isFavoriteMoviesLoaded,
	} = state.movies;

	return {
		favoriteMovies:
			Object.keys(favoriteMovies).map(key => favoriteMovies[key]),
		isFavoriteMoviesLoaded,
	};
};

const mapDispatchToProps = (dispatch) => ({
	removeMovieFromFavorites:
		(movie) => dispatch(removeMovieFromFavorites(movie)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FavoriteSwitch);