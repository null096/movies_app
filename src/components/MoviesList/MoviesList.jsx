import React, { Component } from 'react'
import Proptypes from 'prop-types';
import MovieItem from '../MovieItem/MovieItem';

export class MoviesList extends Component {
	static propTypes = {
		moviesOnPage: Proptypes.array.isRequired,
	};

	render() {
		const {
			moviesOnPage
		} = this.props;

		return (
			<React.Fragment>
				<span className="movie-list-title">
					Latest Releases
				</span>
				<div className="movies-list-container">
					{
						moviesOnPage.map((movie) => (
							<MovieItem
								key={movie.id}
								movie={movie}
							/>
						))
					}
				</div>
			</React.Fragment>
		);
	}
}

export default MoviesList;