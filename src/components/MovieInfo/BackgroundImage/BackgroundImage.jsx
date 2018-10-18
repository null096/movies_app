import React from 'react';
import Proptypes from 'prop-types';

export default function BackgroundImage({ backgroundImgSrc }) {
	return (
		<div className="modal-background-img-wrapper">
			<img
				className="modal-background-img"
				src={backgroundImgSrc}
				alt="background-img"
				width="100%"
			/>
		</div>
	);
}

BackgroundImage.propTypes = {
	backgroundImgSrc: Proptypes.string.isRequired,
};