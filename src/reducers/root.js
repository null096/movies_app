import { combineReducers } from 'redux';
import movies from './movies/movies';
import modal from './modal/modal';

const root = combineReducers({
    movies,
    modal,
});

export default root;