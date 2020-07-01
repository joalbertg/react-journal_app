import {
  firebase,
  googleAuthProvider
} from '../firebase/firebase-config';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  console.log(email, password) 
  // this dispatch comes from thunk
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user: { uid, displayName } }) => {
        dispatch(login(uid, displayName));
      })
      .catch(console.log());
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

