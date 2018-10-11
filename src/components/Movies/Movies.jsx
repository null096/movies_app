import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import MoviesList from '../MoviesList/MoviesList';
import MoviesPaginaiton from '../MoviesPagination/MoviesPaginaiton';
import {
	uploadMoviesForPage
} from '../../actions/movies/movies';

export class Movies extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		moviesOnPage: Proptypes.array.isRequired,
	};

	componentDidMount() {
		const {
			uploadMoviesForPage
		} = this.props;
		const page = this.props.match.params.page;
		uploadMoviesForPage(page);
	}

	componentDidUpdate(prevProps, prevState) {
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
		const currentPage = parseInt(this.props.match.params.page);
		const {
			moviesOnPage,
			numOfPages
		} = this.props;
		console.log('MOVIES RENDER CURRENT PAGE', currentPage, this.props);
		return (
			<div className="movies-container">
				<MoviesList
					moviesOnPage={moviesOnPage}
				/>
				<MoviesPaginaiton
					numOfPages={numOfPages}
					currentPage={currentPage}
				/>
			</div>
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
)(Movies);