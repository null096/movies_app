import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
	PAGE_WITH_MOVIES
} from '../../constants/routes';
import {
	NUM_OF_NEAR_PAGES_WITH_NUMER,
	NUM_OF_NEAR_PAGES_ON_ONE_SIDE,
} from '../../constants/constants';
import { Link } from 'react-router-dom';

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
		if (currentPage === 1) {
			let res = [
				<span>{currentPage}</span>,
			];

			for (let i = 1; i < NUM_OF_NEAR_PAGES_WITH_NUMER; i++) {
				const pageNum = currentPage + i;
				if (!this.isValidPage(pageNum)) break;
				res.push(
					<Link to={`${PAGE_WITH_MOVIES}/${pageNum}`}>
						{currentPage + i}
					</Link>
				);
			}
			if (numOfPages > NUM_OF_NEAR_PAGES_WITH_NUMER) {
				res.push(<span>...</span>);
			}

			return res;
		}
		if (currentPage > 0) {
			let res = [];
			for (let i = currentPage - NUM_OF_NEAR_PAGES_ON_ONE_SIDE;
				i <= currentPage + NUM_OF_NEAR_PAGES_ON_ONE_SIDE;
				i++
			) {
				if (!this.isValidPage(i)) continue;
				if (i === currentPage) {
					res.push(<span>{currentPage}</span>);
				} else {
					res.push(
						<Link to={`${PAGE_WITH_MOVIES}/${i}`}>
							{i}
						</Link>
					);
				}
			}
			
			return res;
		}

		return [];
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
		const pageLinks = this.getPagination();

		return (
			<div className="pagination">
				<ul>
					{
						pageLinks.map((item, i) => (
							<li key={i}>
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