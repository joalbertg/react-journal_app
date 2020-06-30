import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import ReduxThunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';

const reducers = combineReducers({
  auth: authReducer
});

// without combineReducers
//export const store = createStore(reducers);

// without redux-thunk
//const store = createStore(
  //reducer, /* preloadedState, */
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//);

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers, /* preloadedState, */
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
);

