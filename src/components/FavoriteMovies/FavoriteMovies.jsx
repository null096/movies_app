import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import {
	removeMovieFromFavorites
} from '../../actions/movies/movies';
import FavoriteMovieInfo from './FavoriteMovieInfo/FavoriteMovieInfo';

export class FavoriteMovies extends Component {
	static propTypes = {
		isFavoriteMoviesLoadedFromStorage: Proptypes.bool.isRequired,
		favoriteMovies: Proptypes.array.isRequired,
	};

	onUnfavorite = (movie) => {
		const {
			removeMovieFromFavorites
		} = this.props;

		removeMovieFromFavorites(movie);
	}

	getMoviesListForRender() {
		const {
			favoriteMovies,
		} = this.props;

		return (
			<ul className="favorite-movies-list">
				{
					favoriteMovies.map((movie) =>
						<li key={movie.id}>
							<FavoriteMovieInfo
								movie={movie}
								onUnfavorite={() =>
									this.onUnfavorite(movie)
								}
							/>
						</li>
					)
				}
			</ul>
		);
	}

	render() {
		const {
			favoriteMovies,
			isFavoriteMoviesLoadedFromStorage,
		} = this.props;

		if (!isFavoriteMoviesLoadedFromStorage) {
			return <Loading />;
		}

		return (
			<React.Fragment>
				<Header />
				<div className="favorite-movies-container">
					<span className="favorite-movies-title">
						My favorite
					</span>
					{
						favoriteMovies.length
							? this.getMoviesListForRender()
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
)(FavoriteMovies);