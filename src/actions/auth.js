import firebase, { googleAuthProvider } from '../firebase';
import {
  startLoading,
  finishLoading
} from './ui';
import types from '../types';

export const startLoginEmailPassword = (email, password) => {
  // this dispatch comes from thunk
  return dispatch => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user: { uid, displayName } }) => {
        dispatch(login(uid, displayName));
        dispatch(finishLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(finishLoading());
      });
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  // this dispatch comes from thunk
  return dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({user}) => {
        await user.updateProfile({displayName: name});
        dispatch(
          login(user.uid, user.displayName)
        );
      })
      .catch(console.log());
  }
}

export const startGoogleLogin = () => {
  // this dispatch comes from thunk
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

export const startLogout = () => {
  return async dispatch => {
    await firebase.auth().signOut();

    dispatch(logout());
  }
}

export const logout = () => ({
  type: types.LOGOUT
});

