import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
	uploadMoviesForPage
} from '../../actions/movies/movies';

import MovieInfo from '../MovieInfo/MovieInfo';
import { Movies } from '../Movies/Movies';

export class MoviesSwitch extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		moviesOnPage: Proptypes.array.isRequired,
		uploadMoviesForPage: Proptypes.func.isRequired,
	};

	componentDidMount() {
		const {
			uploadMoviesForPage
		} = this.props;
		const page = this.props.match.params.page;

		uploadMoviesForPage(page);
	}

	componentDidUpdate(prevProps) {
		const {
			uploadMoviesForPage
		} = this.props;
		const newPage = this.props.match.params.page;
		const oldPage = prevProps.match.params.page;

		if (oldPage !== newPage) {
			uploadMoviesForPage(newPage);
		}
	}

	render() {
		const {
			numOfPages,
			moviesOnPage,
			match,
		} = this.props;
		const currentPage = parseInt(match.params.page, 10);

		return (
			<Switch>
				<Route
					path={`${match.url}/:movieIndex`}
					render={(props) =>
						<MovieInfo
							{...props}
							currentPage={currentPage}
						/>
					}
				/>
				<Route
					exact path={match.url}
					render={(props) =>
						<Movies
							{...props}
							currentPage={currentPage}
							numOfPages={numOfPages}
							moviesOnPage={moviesOnPage}
						/>
					}
				/>
			</Switch>
		);
	}
}

const mapStateToProps = (state) => ({
	moviesOnPage: state.movies.moviesOnPage,
	numOfPages: state.movies.numOfPages,
});

const mapDispatchToProps = (dispatch) => ({
	uploadMoviesForPage: (page) => dispatch(uploadMoviesForPage(page)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MoviesSwitch);