import React from 'react';
import { Link } from 'react-router-dom';

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
    console.log(name, email, password, password2);
    handleReset();
  }

  return(
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister}>
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

