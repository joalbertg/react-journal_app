import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import {
  startLoginEmailPassword,
  startGoogleLogin
} from '../../actions/auth';
import {
  setError,
  removeError
} from '../../actions/ui';

export const LoginScreen = () => {
  const user = {
    email: 'joalbertgonzalez@gmail.com',
    password: '123456'
  };

  const dispatch = useDispatch();
  const { loading, msgError } = useSelector(state => state.ui);
  const [formValues, handleInputChange, handleReset] = useForm(user);
  const { email, password } = formValues;

  const isFormValid = () => {
    if(!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password.length < 6) {
      dispatch(setError('Password should be at least 6 characters'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  const handleLogin = event => {
    event.preventDefault();
    if(isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }

    handleReset();
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  return(
    <>
      <h3 className='auth__title'>Login</h3>
      <form
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
      >
        { msgError
            && <div className="auth__alert-error">{msgError}</div>
        }
        <input
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          className='auth__input'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className='btn btn-primary btn-block'
          disabled={loading}
        >
          Login
        </button>
        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div
            onClick={handleGoogleLogin}
            className='google-btn'
          >
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link
          to='/auth/register'
          className='link'
        >
          Create new account
        </Link>
      </form>
    </>
  );
}
