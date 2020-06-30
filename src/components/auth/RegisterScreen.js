import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const user = {
    name: 'joalbert',
    email: 'joalbertgonzalez@gmail.com',
    password: '123456',
    password2: '123456'
  };

  const [formValues, handleInputChange, handleReset] = useForm(user);
  const { name, email, password, password2 } = formValues;

  const handleRegister = event => {
    event.preventDefault();
    if(isFormValid()) {
      console.log(name, email, password, password2);
    }

    handleReset();
  }

  const isFormValid = () => {
    if(name.trim().length === 0) {
      console.log('name')
      return false;
    } else if(!validator.isEmail(email)) {
      console.log('email')
      return false;
    } else if(password !== password2 || password.length < 6) {
      console.log('Password should be at least 6 characters and match each other')
      return false;
    }

    return true;
  }

  return(
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister}>
        <div className="auth__alert-error">Hello World!!!</div>
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

