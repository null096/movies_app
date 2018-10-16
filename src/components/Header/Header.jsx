import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_WITH_MOVIES } from '../../constants/routes';

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
						<Link
							to={`${PAGE_WITH_MOVIES}/1`}
							className="header-logo-text-wrapper"
						>
							Movies
						</Link>
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