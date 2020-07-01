import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import {
  PrivateRoute,
  PublicRoute,
  AuthRouter
} from './';
import JournalScreen from '../components/journal';
import firebase from '../firebase';
import {
  setCurrentUser,
  setNotes
} from '../actions';
import { loadNotes } from '../helpers';

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // firebase.auth().onAuthStateChanged()
    // this is an observable, will keep the user's data
    // when reloading the page
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user?.uid) {
        dispatch(setCurrentUser(user.uid, user.displayName));

        const notes = await loadNotes(user.uid);
        dispatch(setNotes(notes));

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if(checking) {
    return(
      <h2>Wait...</h2>
    );
  }

  return(
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            isLoggedIn={isLoggedIn}
            component={AuthRouter}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact path='/'
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;

