import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
	PAGE_WITH_MOVIES
} from '../../../constants/routes';
import {
	NUM_OF_RTL_PAGES,
} from '../../../constants/constants';

export class MoviesPagination extends Component {
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
			?
			[
				<Link to={`${PAGE_WITH_MOVIES}/${1}`}>
					First
				</Link>,
				<Link to={`${PAGE_WITH_MOVIES}/${currentPage - 1}`}>
					Prev
				</Link>
			]
			:
			[
				<span>First</span>,
				<span>Prev</span>
			];
	}

	getLastAndNextLinks(currentPage, numOfPages) {
		const isLastAndNextPagesValid = currentPage !== numOfPages;

		return isLastAndNextPagesValid
			? 
			[
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
		for (let i = currentPage - NUM_OF_RTL_PAGES;
			i <= currentPage + NUM_OF_RTL_PAGES;
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
			&& numOfPages > NUM_OF_RTL_PAGES + 1
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

	render() {
		const {
			numOfPages
		} = this.props;

		if (numOfPages <= 0) return null;

		const pageLinks = this.getPagination();

		return (
			<div className="pagination">
				<ul>
					{
						pageLinks.map((item, i) => (
							<li key={i}>{item}</li>
						))
					}
				</ul>
			</div>
		);
	}
}

export default MoviesPagination;