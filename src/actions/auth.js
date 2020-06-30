import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(login(123, 'Lisset'));
    }, 3500);
  }
}

export const login = (uid, displayName) => ({
  type: types.LOGIN,
  payload: { uid, displayName }
});

