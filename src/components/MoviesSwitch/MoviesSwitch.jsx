import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import Page404 from '../Page404/Page404';
import {
	uploadMoviesForPage
} from '../../actions/movies/movies';
import { Movies } from '../Movies/Movies';
import MoviesInfoControl from '../MoviesInfoControl/MoviesInfoControl';
import ErrorPage from '../ErrorPage/ErrorPage';

export class MoviesSwitch extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		moviesOnPage: Proptypes.array.isRequired,
		uploadMoviesForPage: Proptypes.func.isRequired,
		isMoviesOnPageLoaded: Proptypes.bool.isRequired,
		moviesOnPageError: Proptypes.string.isRequired,
	};

	componentDidMount() {
		const {
			uploadMoviesForPage,
			match
		} = this.props;
		const page = match.params.page;

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
			isMoviesOnPageLoaded,
			moviesOnPageError,
			match,
		} = this.props;
		const currentPage = parseInt(match.params.page, 10);

		if (moviesOnPageError) return (
			<ErrorPage error={moviesOnPageError} />
		);

		return (
			<Switch>
				<Route
					path={`${match.url}/:movieIndex`}
					render={(props) =>
						<MoviesInfoControl
							{...props}
							movies={moviesOnPage}
							mainUrl={match.url}
							isMoviesLoaded={isMoviesOnPageLoaded}
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
							isMoviesOnPageLoaded={isMoviesOnPageLoaded}
						/>
					}
				/>
				<Route
					path="*"
					component={Page404}
				/>
			</Switch>
		);
	}
}

const mapStateToProps = (state) => ({
	moviesOnPage: state.movies.moviesOnPage,
	numOfPages: state.movies.numOfPages,
	isMoviesOnPageLoaded: state.movies.isMoviesOnPageLoaded,
	moviesOnPageError: state.movies.moviesOnPageError,
});

const mapDispatchToProps = (dispatch) => ({
	uploadMoviesForPage: (page) => dispatch(uploadMoviesForPage(page)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MoviesSwitch);