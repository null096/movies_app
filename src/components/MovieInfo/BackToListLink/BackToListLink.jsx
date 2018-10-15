import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

function BackToListLink({ to }) {
	return (
		<Link
			className="modal-close-btn"
			to={to}
		>
			<img
				src="/img/leftArrow.png"
				width="32"
				heigth="32"
				alt=""
			/>
			<span>Back to list</span>
		</Link>
	);
}

BackToListLink.propTypes = {
	to: Proptypes.string.isRequired,
};

export default BackToListLink;