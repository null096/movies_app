import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from '../reducers/root';

const store = createStore(
    root,
     composeWithDevTools(
        applyMiddleware(
            reduxThunk,
            logger,
        )
    )
);

export default store;