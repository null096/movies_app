import React, { Component } from 'react';

export class Header extends Component {
	render() {
		return (
			<header>
				<div className="header-wrapper">
					<img
						className="header-logo"
						src="/img/headerIcon.png"
						alt="Logo"
						height="32"
						width="32"
					/>
					<span className="header-logo-text">
						Movies
					</span>
				</div>
			</header>
		);
	}
}

export default Header;