import { createStore, combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer';

const reducers = combineReducers({
  auth: authReducer
});

//export const store = createStore(reducers);
export const store = createStore(
  reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

