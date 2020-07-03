import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  LoginScreen,
  RegisterScreen
} from '~components/auth';

export const AuthRouter = () => {
  return(
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route path='/auth/login' component={LoginScreen} />
          <Route path='/auth/register' component={RegisterScreen} />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
}

