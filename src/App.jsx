import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import Header from './components/Header/Header';
import Movies from './components/Movies/Movies';
import Page404 from './components/Page404/Page404';
import ModalWindowWithMovie
	from './components/ModalWindowWithMovie/ModalWindowWithMovie';
import {
	PAGE_WITH_MOVIES
} from './constants/routes';
import {
	MOVIE_MODAL
} from './constants/constants';

class App extends Component {
	static propTypes = {
		compName: Proptypes.string.isRequired,
		params: Proptypes.object.isRequired,
	};

	getModal() {
		const {
			params,
			compName,
		} = this.props;

		switch (compName) {
			case MOVIE_MODAL:
				return <ModalWindowWithMovie {...params} />;
			default:
				return null;
		}
	}

	isShouldApplyModal() {
		const {
			compName
		} = this.props;

		return compName !== '';
	}

	getContent() {
		if (this.isShouldApplyModal()) {
			return this.getModal();
		} else {
			return (
				<Switch>
					<Route
						path={`${PAGE_WITH_MOVIES}/:page`}
						component={Movies}
					/>
					<Route
						path="*"
						component={Page404}
					/>
				</Switch>
			);
		}
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				{this.getContent()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	compName: state.modal.compName,
	params: state.modal.params,
});

export default connect(
	mapStateToProps,
)(App);
