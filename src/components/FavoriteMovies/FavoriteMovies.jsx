import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import axios from 'axios';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import {
	URL_TO_MOVIE_INFO
} from '../../constants/constants';
import {
	API_KEY,
} from '../../constants/config';
import {
	removeMovieFromFavorites
} from '../../actions/movies/movies';
import FavoriteMovieInfo from './FavoriteMovieInfo/FavoriteMovieInfo';

export class FavoriteMovies extends Component {
	static propTypes = {
		isFavoriteMoviesLoadedFromStorage: Proptypes.bool.isRequired,
		favoriteMovies: Proptypes.object.isRequired,
	};

	state = {
		isFavoriteMoviesLoaded: false,
		movies: [],
	};

	componentDidMount() {
		const {
			isFavoriteMoviesLoadedFromStorage,
		} = this.props;

		if (isFavoriteMoviesLoadedFromStorage) {
			this.uploadMoviesInfo();
		}
	}

	componentDidUpdate() {
		const {
			isFavoriteMoviesLoaded
		} = this.state;
		const {
			isFavoriteMoviesLoadedFromStorage
		} = this.props;

		if (!isFavoriteMoviesLoaded
			&& isFavoriteMoviesLoadedFromStorage
		) {
			this.uploadMoviesInfo();
		}
	}

	uploadMoviesInfo = () => (
		new Promise(res => {
			const {
				favoriteMovies,
			} = this.props;
			const favoriteMoviesInfo = [];

			favoriteMovies.forEach((movieId) => {
				favoriteMoviesInfo.push(this.getMovieInfo(movieId));
			});

			Promise.all(favoriteMoviesInfo)
				.then(movies => {
					this.setState({
						movies,
						isFavoriteMoviesLoaded: true,
					});
					res();
				});
		})
	);

	getMovieInfo = (movieId) => (
		new Promise(res => {
			axios.get(`${URL_TO_MOVIE_INFO}/${movieId}`, {
				params: {
					api_key: API_KEY,
				}
			})
				.then(e => {
					res(e.data);
				});
		})
	);

	onUnfavorite = (movieId, index) => {
		const {
			removeMovieFromFavorites
		} = this.props;
		const {
			movies
		} = this.state;

		movies.splice(index, 1);

		removeMovieFromFavorites(movieId);
		this.setState({ movies });
	}

	getMoviesListForRender() {
		const {
			movies,
		} = this.state;

		return (
			<ul className="favorite-movies-list">
				{
					movies.map((movie, index) =>
						<li key={movie.id}>
							<FavoriteMovieInfo
								movie={movie}
								onUnfavorite={() =>
									this.onUnfavorite(movie.id, index)
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
			isFavoriteMoviesLoaded,
			movies
		} = this.state;

		if (!isFavoriteMoviesLoaded) return <Loading />

		return (
			<React.Fragment>
				<Header />
				<div className="favorite-movies-container">
					<span className="favorite-movies-title">
						My favorite
					</span>
					{
						movies.length
							? this.getMoviesListForRender()
							:
							<p className="favorite-empty-list">
								List is empty
							</p>
					}
				</div>
			</React.Fragment >
		);
	}
}

const mapStateToProps = (state) => ({
	favoriteMovies: state.movies.favoriteMovies,
	isFavoriteMoviesLoadedFromStorage:
		state.movies.isFavoriteMoviesLoadedFromStorage,
});

const mapDispatchToProps = (dispatch) => ({
	removeMovieFromFavorites:
		(movieId) => dispatch(removeMovieFromFavorites(movieId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FavoriteMovies);