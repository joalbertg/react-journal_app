import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import AppRouter from '~routers';
import firebase from '~firebase';
import {
  setCurrentUser,
  activeNote,
  startLoadingNotes,
} from '~actions';

jest.mock('~actions/auth', () => ({
  setCurrentUser: jest.fn()
}));

jest.mock('~actions/notes', () => ({
  activeNote: jest.fn(),
  startLoadingNotes: jest.fn()
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
    notes: {},
    active: {
      id: 'ABCD1234'
    }
  }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests AppRouter component', () => {
  test('Should call the login if is authenticated', async () => {
    let user;

    await act(async () => {
      // create a use in firebase platform
      const email = 'test@testing.com';
      const password = '123456';
      const userCred = await firebase.auth().signInWithEmailAndPassword(email, password);

      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(setCurrentUser).toHaveBeenCalled();
    expect(setCurrentUser).toHaveBeenCalledTimes(1);
    expect(setCurrentUser).toHaveBeenCalledWith(user.uid, user.displayName);
    expect(startLoadingNotes).toHaveBeenCalled();
    expect(startLoadingNotes).toHaveBeenCalledTimes(1);
    expect(startLoadingNotes).toHaveBeenCalledWith(user.uid);
  });
});

