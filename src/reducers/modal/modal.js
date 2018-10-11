import {
	SHOW_MODAL_WINDOW,
	CLOSE_MODAL_WINDOW,
} from '../../actions/actionNames';

const initialState = {
	compName: '',
	params: {},
};

function modal(state = initialState, action) {
	switch (action.type) {
		case SHOW_MODAL_WINDOW:
			return {
				...state,
				compName: action.compName,
				params: action.params,
			};
		case CLOSE_MODAL_WINDOW:
			return initialState;
		default:
			return state;
	}
}

export default modal;