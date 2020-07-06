import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import { RegisterScreen } from '~components/auth';
import {
  startRegisterWithEmailPasswordName
} from '~actions';
import types from '~types';

jest.mock('~actions/auth', () => ({
  startRegisterWithEmailPasswordName: jest.fn()
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
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Tests RegisterScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initState);
  });

  test('Should display correctly', () => {
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const password2Input = wrapper.find('input[name="password2"]');

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h3').text()).toBe('Register');
    expect(nameInput.exists()).toBeTruthy();
    expect(nameInput.prop('onChange')).toEqual(expect.any(Function));
    expect(emailInput.exists()).toBeTruthy();
    expect(emailInput.prop('onChange')).toEqual(expect.any(Function));
    expect(passwordInput.exists()).toBeTruthy();
    expect(passwordInput.prop('onChange')).toEqual(expect.any(Function));
    expect(password2Input.exists()).toBeTruthy();
    expect(password2Input.prop('onChange')).toEqual(expect.any(Function));
    expect(wrapper.find('button').text()).toBe('Register');
  });

  test('Should trigger startRegisterWithEmailPasswordName action', () => {
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const password2Input = wrapper.find('input[name="password2"]');
    const name = 'test';
    const email = 'test@testing.com';
    const password = '123456';
    const password2 = '123456';

    nameInput.simulate('change', {
      target: {
        value: name,
        name: 'name'
      }
    });

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

    password2Input.simulate('change', {
      target: {
        value: password2,
        name: 'password2'
      }
    });

    act(() => {
      wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
    });

    expect(startRegisterWithEmailPasswordName).toHaveBeenCalled();
    expect(startRegisterWithEmailPasswordName).toHaveBeenCalledTimes(1);
    expect(startRegisterWithEmailPasswordName).toHaveBeenCalledWith(email, password, name);
  });

  describe('Tests error messages', () => {
    const store = mockStore(initState);
    const wrapper2 = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    test('Should display an error message reference the name', () => {
      act(() => {
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Name is required'
      });
    });

    test('Should display an error message reference the email', () => {
      const nameInput = wrapper2.find('input[name="name"]');
      const name = 'test';

      store.clearActions();
      nameInput.simulate('change', {
        target: {
          value: name,
          name: 'name'
        }
      });

      act(() => {
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Email is not valid'
      });
    });

    test('Should display an error message reference the malformed email', () => {
      const nameInput = wrapper2.find('input[name="name"]');
      const emailInput = wrapper2.find('input[name="email"]');
      const name = 'test';
      const email = 'testtesting.com';

      store.clearActions();
      nameInput.simulate('change', {
        target: {
          value: name,
          name: 'name'
        }
      });

      emailInput.simulate('change', {
        target: {
          value: email,
          name: 'email'
        }
      });

      act(() => {
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Email is not valid'
      });
    });

    test('Should display an error message reference the password', () => {
      const nameInput = wrapper2.find('input[name="name"]');
      const emailInput = wrapper2.find('input[name="email"]');
      const name = 'test';
      const email = 'test@testing.com';

      store.clearActions();
      nameInput.simulate('change', {
        target: {
          value: name,
          name: 'name'
        }
      });

      emailInput.simulate('change', {
        target: {
          value: email,
          name: 'email'
        }
      });

      act(() => {
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Password should be at least 6 characters and match each other'
      });
    });

    test('Should display an error message reference the password2', () => {
      const nameInput = wrapper2.find('input[name="name"]');
      const emailInput = wrapper2.find('input[name="email"]');
      const passwordInput = wrapper2.find('input[name="password"]');
      const name = 'test';
      const email = 'test@testing.com';
      const password = '123456';

      store.clearActions();
      nameInput.simulate('change', {
        target: {
          value: name,
          name: 'name'
        }
      });

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
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Password should be at least 6 characters and match each other'
      });
    });

    test('Should display an error message reference the password != password2', () => {
      const nameInput = wrapper2.find('input[name="name"]');
      const emailInput = wrapper2.find('input[name="email"]');
      const passwordInput = wrapper2.find('input[name="password"]');
      const password2Input = wrapper2.find('input[name="password2"]');
      const name = 'test';
      const email = 'test@testing.com';
      const password = '123456';
      const password2 = '12345';

      store.clearActions();
      nameInput.simulate('change', {
        target: {
          value: name,
          name: 'name'
        }
      });

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

      password2Input.simulate('change', {
        target: {
          value: password2,
          name: 'password2'
        }
      });

      act(() => {
        wrapper2.find('form').prop('onSubmit')({ preventDefault(){} });
      });

      expect(store.getActions()[0]).toEqual({
        type: types.UI_SET_ERROR,
        payload: 'Password should be at least 6 characters and match each other'
      });
    });

    test('Should display an error with auth__alert-error class', () => {
      const error = 'Name is required';
      const state = { ...initState, ui: { loading: false, msgError: error }};
      const store = mockStore(state);

      const wrapper3 = mount(
        <Provider store={store}>
          <MemoryRouter>
            <RegisterScreen />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper3.find('.auth__alert-error').text()).toBe(error);
    });
  });
});

