import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword
} from '~actions/auth';
import { demoAuth } from '../fixtures/demoAuth';
import types from '~types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe('Tests auth actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initState);
  });

  const { login: loginFix, logout: logoutFix } = demoAuth;

  test('Should create correct action to login method', () => {
    const { uid, displayName } = loginFix.action.payload;
    const action = login(uid, displayName);

    expect(action).toMatchObject(loginFix.action);
  });

  test('Should create correct action to logout method', () => {
    const action = logout();
    expect(action).toEqual(logoutFix.action);
  });

  test('Should create correct action to startLogout method', async () => {
    await store.dispatch(startLogout());

    expect(store.getActions()[0]).toMatchObject(logoutFix.action);
  });

  test('Should create correct action to startLoginEmailPassword method', async () => {
    // create user in firebase platform
    // test@testing.com
    // 123456
    const email = 'test@testing.com';
    const password = '123456';

    await store.dispatch(startLoginEmailPassword(email, password));

    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.UI_START_LOADING });
    expect(actions[1]).toMatchObject({
      type: types.LOGIN,
      payload: {
        uid: expect.any(String),
        displayName: null
      }
    });
    expect(actions[2]).toMatchObject({ type: types.UI_FINISH_LOADING });
  });
});

