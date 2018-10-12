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
					<div className="header-logo-text-wrapper">
						<span className="header-logo-text">
							Movies
						</span>
					</div>
					<div className="my-account-dropdown">
						<span>My Account</span>
						<img
							src="/img/arrowDown.png"
							alt="dropdown"
							height="32"
							width="32"
						/>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;