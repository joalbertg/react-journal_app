import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Sidebar } from '~components/journal/Sidebar.js';
import {
  startLogout,
  startNewEntry,
  cleanNotes
} from '~actions';

jest.mock('~actions', () => ({
  startNewEntry: jest.fn(),
  startLogout: jest.fn(),
  cleanNotes: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: {}
  }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests Sidebar component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  test('Should displayName correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should call startNewEntry method', () => {
    wrapper.find('.journal__new_entry').prop('onClick')();

    expect(startNewEntry).toHaveBeenCalled();
    expect(startNewEntry).toHaveBeenCalledTimes(1);
  });

  test('Should call startLogout and cleanNotes methods', () => {
    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
    expect(startLogout).toHaveBeenCalledTimes(1);
    expect(cleanNotes).toHaveBeenCalled();
    expect(cleanNotes).toHaveBeenCalledTimes(1);
  });
});

