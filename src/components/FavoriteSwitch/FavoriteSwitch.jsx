import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
	removeMovieFromFavorites
} from '../../actions/movies/movies';
import FavoriteMovies from '../FavoriteMovies/FavoriteMovies';
import MoviesInfoControl from '../MoviesInfoControl/MoviesInfoControl';

export class FavoriteSwitch extends Component {
	static propTypes = {
		isFavoriteMoviesLoadedFromStorage: Proptypes.bool.isRequired,
		favoriteMovies: Proptypes.array.isRequired,
		removeMovieFromFavorites: Proptypes.func.isRequired,
	};

	render() {
		const {
			isFavoriteMoviesLoadedFromStorage,
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
							isMoviesUploaded={isFavoriteMoviesLoadedFromStorage}
							mainUrl={match.url}
						/>
					}
				/>
				<Route
					exact path={match.url}
					render={(props) =>
						<FavoriteMovies
							{...props}
							isFavoriteMoviesLoadedFromStorage=
							{isFavoriteMoviesLoadedFromStorage}
							favoriteMovies={favoriteMovies}
							removeMovieFromFavorites={removeMovieFromFavorites}
						/>
					}
				/>
			</Switch>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		favoriteMovies,
		isFavoriteMoviesLoadedFromStorage,
	} = state.movies;

	return {
		favoriteMovies:
			Object.keys(favoriteMovies).map(key => favoriteMovies[key]),
		isFavoriteMoviesLoadedFromStorage,
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