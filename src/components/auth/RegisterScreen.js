import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import {
  setError,
  removeError
} from '../../actions/ui';

export const RegisterScreen = () => {
  const user = {
    name: 'joalbert',
    email: 'joalbertgonzalez@gmail.com',
    password: '123456',
    password2: '123456'
  };

  const [formValues, handleInputChange, handleReset] = useForm(user);
  const { name, email, password, password2 } = formValues;
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector(state => state.ui);

  const handleRegister = event => {
    event.preventDefault();
    if(isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }

    handleReset();
  }

  const isFormValid = () => {
    if(name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if(!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password !== password2 || password.length < 6) {
      dispatch(setError('Password should be at least 6 characters and match each other'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  return(
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister}>
        { msgError
            && <div className="auth__alert-error">{msgError}</div>
        }
        <input
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
          className='auth__input'
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type='password'
          placeholder='Confirm'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className='btn btn-primary btn-block mb-5'
          disabled={loading}
        >
          Register
        </button>
        <Link
          to='/auth/login'
          className='link'
        >
          Already register?
        </Link>
      </form>
    </>
  );
}

