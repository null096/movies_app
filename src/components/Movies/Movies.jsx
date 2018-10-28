import React, { Component } from 'react';
import MoviesList from './MoviesList/MoviesList';
import MoviesPagination from './MoviesPagination/MoviesPagination';
import Header from '../Header/Header';
import Proptypes from 'prop-types';
import Loading from '../Loading/Loading';

export class Movies extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		moviesOnPage: Proptypes.array.isRequired,
		currentPage: Proptypes.number.isRequired,
		isMoviesOnPageLoaded: Proptypes.bool.isRequired,
	};

	render() {
		const {
			isMoviesOnPageLoaded,
			moviesOnPage,
			numOfPages,
			currentPage,
		} = this.props;

		if (!isMoviesOnPageLoaded) return <Loading />;

		return (
			<React.Fragment>
				<Header />
				<div className="movies-container">
					<MoviesList
						moviesOnPage={moviesOnPage}
					/>
					<MoviesPagination
						numOfPages={numOfPages}
						currentPage={currentPage}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;