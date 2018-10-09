import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
	PAGE_WITH_MOVIES
} from '../../constants/routes';
import { Link } from 'react-router-dom';

export class MoviesPaginaiton extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
	};

	render() {
		const {
			numOfPages
		} = this.props;
		let pageLinks = [];
		for (let i = 1; i <= numOfPages; i++) {
			pageLinks.push(
				<li key={i}>
					<Link
						to={`${PAGE_WITH_MOVIES}/${i}`}
					>
						{i}
					</Link>
				</li>
			);
		}

		return (
			<div className="pagination">
				<ul>
					{pageLinks}
				</ul>
			</div>
		);
	}
}

export default MoviesPaginaiton;