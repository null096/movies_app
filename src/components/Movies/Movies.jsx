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
		//console.log('old',prevProps,prevState);
		//console.log('current',this.props, this.state);
	}

	render() {
		//const { page } = this.props.match.params;
		const {
			moviesOnPage,
			numOfPages
		} = this.props;
		console.log('MOVIES RENDER', this.props);
		return (
			<div>
				<MoviesList 
					moviesOnPage={moviesOnPage}
				/>
				<br />
				<MoviesPaginaiton
					numOfPages={numOfPages}
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