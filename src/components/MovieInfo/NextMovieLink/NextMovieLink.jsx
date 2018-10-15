import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function NextMovieLink({ to }) {
	return (
		<Link
			className="modal-next-btn"
			to={to}
		>
			<span>Next Movie</span>
			<img
				src="/img/rightArrow.png"
				width="32"
				heigth="32"
				alt=""
			/>
		</Link>
	);
}

NextMovieLink.propTypes = {
	to: Proptypes.string.isRequired,
};

export default NextMovieLink;