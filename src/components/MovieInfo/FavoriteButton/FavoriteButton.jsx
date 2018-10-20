import React from 'react';
import Proptypes from 'prop-types';

export default function FavoriteButton({ onFavoriteButtonClick, isFavorite}) {
	const rootClasses = [
		'add-to-favorites-container',
		isFavorite ? 'is-favorite-movie' : '',
	].join(' ').trim();

	return (
		<div
			className={rootClasses}
			onClick={onFavoriteButtonClick}
		>
			{
				isFavorite
					? '❤'
					: '♡'
			}
		</div>
	);
}

FavoriteButton.propTypes = {
	isFavorite: Proptypes.bool.isRequired,
	onFavoriteButtonClick: Proptypes.func.isRequired,
};