import {
  firebase,
  googleAuthProvider
} from '../firebase/firebase-config';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  // this dispatch comes from thunk
  return dispatch => {
    setTimeout(() => {
      dispatch(login(123, 'Lisset'));
    }, 3500);
  }
}

export const startGoogleLogin = () => {
  return dispatch => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user: { uid, displayName } }) => {
        dispatch(login(uid, displayName ));
      });
  }
}

export const login = (uid, displayName) => ({
  type: types.LOGIN,
  payload: { uid, displayName }
});

