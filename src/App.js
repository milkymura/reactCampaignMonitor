import React from 'react'
import logo from './logo.svg'
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { renderRoutes } from './routes';

import configureStore from './tools/configureStore';
const store = configureStore()


const history = (typeof window === 'object') 
  ? createBrowserHistory()
  : createMemoryHistory()


function App(props) {
  return (
    <Provider store={store}>
      <Router history={history}>
        {renderRoutes()}
      </Router>
    </Provider>
  );
}

export default App;
