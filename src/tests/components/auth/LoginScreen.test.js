import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import { LoginScreen } from '~components/auth';
import {
  startGoogleLogin,
  startLoginEmailPassword
} from '~actions';

jest.mock('~actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('Tests LoginScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initState);
  });

  test('Should display correctly', () => {
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h3').text()).toBe('Login');
    expect(emailInput.exists()).toBeTruthy();
    expect(emailInput.prop('onChange')).toEqual(expect.any(Function));
    expect(passwordInput.exists()).toBeTruthy();
    expect(passwordInput.prop('onChange')).toEqual(expect.any(Function));
    expect(wrapper.find('button').text()).toBe('Login');
  });

  test('Should trigger handleGoogleLogin action', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
    expect(startGoogleLogin).toHaveBeenCalledTimes(1);
  });

  test('Should trigger handleLogin action', () => {
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const email = 'test@testing.com';
    const password = '123456';

    emailInput.simulate('change', {
      target: {
        value: email,
        name: 'email'
      }
    });

    passwordInput.simulate('change', {
      target: {
        value: password,
        name: 'password'
      }
    });

    act(() => {
      wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
    });

    expect(startLoginEmailPassword).toHaveBeenCalled();
    expect(startLoginEmailPassword).toHaveBeenCalledTimes(1);
    expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password);
  });
});

