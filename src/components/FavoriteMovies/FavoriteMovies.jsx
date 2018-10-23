import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import FavoritemoviesList from './FavoriteMoviesList/FavoriteMoviesList';

export class FavoriteMovies extends Component {
	static propTypes = {
		isFavoriteMoviesLoadedFromStorage: Proptypes.bool.isRequired,
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
			isFavoriteMoviesLoadedFromStorage,
		} = this.props;

		if (!isFavoriteMoviesLoadedFromStorage) return <Loading />;

		return (
			<React.Fragment>
				<Header />
				<div className="favorite-movies-container">
					<span className="favorite-movies-title">
						My favorite
					</span>
					{
						favoriteMovies.length
							?
							<FavoritemoviesList
								favoriteMovies={favoriteMovies}
								onUnfavorite={this.onUnfavorite}
							/>
							:
							<p className="favorite-empty-list">
								List is empty
							</p>
					}
				</div>
			</React.Fragment>
		);
	}
}

export default FavoriteMovies;