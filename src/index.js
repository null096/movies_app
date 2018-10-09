import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store/store';
import './css/main.css';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	root
);


serviceWorker.unregister();
