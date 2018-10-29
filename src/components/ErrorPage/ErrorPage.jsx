import React from 'react';
import Proptypes from 'prop-types';

const ErrorPage = ({ error }) => {
	return (
		<div className="error-page-container">
			<p>{error}</p>
			<button
				className="error-page-reload-btn"
				onClick={() => window.location.reload()}
			>
				Reload Page
			 </button>
		</div>
	);
}

ErrorPage.propTypes = {
	error: Proptypes.string.isRequired,
};

export default ErrorPage;
