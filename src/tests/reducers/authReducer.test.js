import { authReducer } from '~reducers';
import types from '~types';
import { demoAuth } from '../fixtures/demoAuth';

describe('Tests authReducer', () => {
  const { empty, login, logout, anything } = demoAuth;

  test('Should return default values', () => {
    const state = authReducer(empty.state, empty.action);
    expect(state).toEqual({});
  });

  test('Should return uid and name correctly', () => {
    const { payload } = login.action;
    const { uid, name } = authReducer(login.state, login.action);

    expect(uid).toBe(payload.uid);
    expect(name).toBe(payload.displayName);
  });

  test('Should return and empty object', () => {
    const state = authReducer(logout.state, logout.action);
    expect(state).toEqual({});
  });

  test('Should return the same state with a wrong type', () => {
    const state = authReducer(anything.state, anything.action);
    expect(state).toEqual(anything.state);
  });
});

