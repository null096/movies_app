import React, { Component } from 'react';
import MoviesList from './MoviesList/MoviesList';
import MoviesPagination from './MoviesPagination/MoviesPagination';
import Header from '../Header/Header';
import Proptypes from 'prop-types';

export class Movies extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		moviesOnPage: Proptypes.array.isRequired,
		currentPage: Proptypes.number.isRequired,
	};

	render() {
		const {
			moviesOnPage,
			numOfPages,
			currentPage,
		} = this.props;

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