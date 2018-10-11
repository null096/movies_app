import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_ORIGINAL
} from '../../constants//constants';

export class ModalWindowWithMovie extends Component {
	static propTypes = {
		movieIndex: Proptypes.number.isRequired,
		movie: Proptypes.object.isRequired,
	};

	render() {
		const {
			movie,
			movieIndex
		} = this.props;

		return (
			<div className="movie-modal">
				<img
					src={`${URL_TO_MOVIE_IMAGE_ORIGINAL}/${movie.poster_path}`}
					alt="movieImg"
					// height="100%"
					// width="100%"
				/>
			</div>
		);
	}
}

export default ModalWindowWithMovie;