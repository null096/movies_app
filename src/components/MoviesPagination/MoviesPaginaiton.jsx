import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
	PAGE_WITH_MOVIES
} from '../../constants/routes';
import {
	NUM_OF_NEAR_PAGES_ON_ONE_SIDE,
} from '../../constants/constants';

export class MoviesPaginaiton extends Component {
	static propTypes = {
		numOfPages: Proptypes.number.isRequired,
		currentPage: Proptypes.number.isRequired,
	};

	isValidPage(page) {
		const {
			numOfPages,
		} = this.props;

		return page > 0 && page <= numOfPages;
	}

	getFirstAndPrevLinks(currentPage) {
		const isFirstAndPrevPagesValid = currentPage > 1;

		return isFirstAndPrevPagesValid
			? [
				<Link to={`${PAGE_WITH_MOVIES}/${1}`}>
					First
				</Link>,
				<Link to={`${PAGE_WITH_MOVIES}/${currentPage - 1}`}>
					Prev
				</Link>
			]
			: [
				<span>First</span>,
				<span>Prev</span>
			];
	}

	getLastAndNextLinks(currentPage, numOfPages) {
		const isLastAndNextPagesValid = currentPage !== numOfPages;

		return isLastAndNextPagesValid
			? [
				<Link to={`${PAGE_WITH_MOVIES}/${currentPage + 1}`}>
					Next
				</Link>,
				<Link to={`${PAGE_WITH_MOVIES}/${numOfPages}`}>
					Last
				</Link>
			]
			: [];
	}

	getNearPageWithNumber(currentPage, numOfPages) {
		let res = [];
		for (let i = currentPage - NUM_OF_NEAR_PAGES_ON_ONE_SIDE;
			i <= currentPage + NUM_OF_NEAR_PAGES_ON_ONE_SIDE;
			i++
		) {
			if (!this.isValidPage(i)) continue;
			if (i === currentPage) {
				res.push(
					<span className="is-current-page">
						{currentPage}
					</span>
				);
			} else {
				res.push(
					<Link to={`${PAGE_WITH_MOVIES}/${i}`}>
						{i}
					</Link>
				);
			}
		}
		if (currentPage === 1
			&& numOfPages > NUM_OF_NEAR_PAGES_ON_ONE_SIDE + 1
		) {
			res.push(<span>...</span>);
		}

		return res;
	}

	getPagination() {
		const {
			numOfPages,
			currentPage
		} = this.props;
		const pageLinks = [
			...this.getFirstAndPrevLinks(currentPage),
			...this.getNearPageWithNumber(currentPage, numOfPages),
			...this.getLastAndNextLinks(currentPage, numOfPages),
		];

		return pageLinks;
	}

	getClassForPageItem(i, a) {
		return i === 0
			?
			'is-first-in-pagination'
			: (i === 0 || i === a.length - 1)
				?
				'is-last-in-pagination'
				:
				'';
	}

	render() {
		const pageLinks = this.getPagination();

		return (
			<div className="pagination">
				<ul>
					{
						pageLinks.map((item, i, a) => (
							<li
								key={i}
								className={this.getClassForPageItem(i, a)}
							>
								{item}
							</li>
						))
					}
				</ul>
			</div>
		);
	}
}

export default MoviesPaginaiton;