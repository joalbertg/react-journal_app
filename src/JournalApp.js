import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from './routers';
import store from './store';

const JournalApp = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default JournalApp;

