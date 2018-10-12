import React, { Component } from 'react'
import Proptypes from 'prop-types';
import MovieListItem from '../MovieListItem/MovieListItem';

export class MoviesList extends Component {
	static propTypes = {
		moviesOnPage: Proptypes.array.isRequired,
	};

	render() {
		const {
			moviesOnPage
		} = this.props;

		return (
			<div className="movie-list">
				<span className="movie-list-title">
					Latest Releases
				</span>
				<div className="movies-list-container">
					{
						moviesOnPage.map((movie, i) => (
							<MovieListItem
								key={movie.id}
								movie={movie}
								movieIndex={i}
							/>
						))
					}
				</div>
			</div>
		);
	}
}

export default MoviesList;