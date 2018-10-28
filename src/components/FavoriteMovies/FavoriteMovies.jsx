import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import FavoriteMoviesList from './FavoriteMoviesList/FavoriteMoviesList';

export class FavoriteMovies extends Component {
	static propTypes = {
		isFavoriteMoviesLoaded: Proptypes.bool.isRequired,
		favoriteMovies: Proptypes.array.isRequired,
		removeMovieFromFavorites: Proptypes.func.isRequired,
	};

	onUnfavorite = (movie) => {
		const {
			removeMovieFromFavorites
		} = this.props;

		removeMovieFromFavorites(movie);
	}

	render() {
		const {
			favoriteMovies,
			isFavoriteMoviesLoaded,
		} = this.props;

		if (!isFavoriteMoviesLoaded) return <Loading />;

		return (
			<React.Fragment>
				<Header />
				<div className="favorite-movies-container">
					<span className="favorite-movies-title">
						My favorite
					</span>
					<FavoriteMoviesList
						favoriteMovies={favoriteMovies}
						onUnfavorite={this.onUnfavorite}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default FavoriteMovies;