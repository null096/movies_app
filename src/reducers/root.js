import { combineReducers } from 'redux';
import movies from './movies/movies';

const root = combineReducers({
    movies,
});

export default root;