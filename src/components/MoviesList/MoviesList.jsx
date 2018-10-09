import React, { Component } from 'react'
import Proptypes from 'prop-types';

export class MoviesList extends Component {
	static propTypes = {
		moviesOnPage: Proptypes.array.isRequired,
	};

	render() {
		const {
			moviesOnPage
		} = this.props;

		return (
			<div>
				{
					moviesOnPage.map((_, i) => (
						<span key={i}>
							{`${i} `}
						</span>
					))
				}
			</div>
		);
	}
}

export default MoviesList;