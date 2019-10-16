import { applyMiddleware, createStore, compose } from 'redux';
import createReducer from './createReducer';
import initialState from './redux/configureState';
import rootReducer from './redux/configureReducer';



function configureStore() {
  let composeEnhancers = compose;
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  const middlewares = [];
  const state = { ...initialState, };
  const reducer = createReducer({}, rootReducer);
  const store = createStore(
    reducer,
    state,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}

export default configureStore;
