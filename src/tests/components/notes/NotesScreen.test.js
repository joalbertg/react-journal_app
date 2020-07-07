import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { act } from '@testing-library/react';

import NoteScreen from '~components/notes';
import {
  activeNote,
  startDeleting
} from '~actions';

jest.mock('~actions', () => ({
  activeNote: jest.fn(),
  startDeleting: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const note = {
  id: 'ABCD1234',
  title: 'Testing',
  body: 'Body testing'
};
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: {},
    active: note
  }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

describe('Tests NoteScreen component', () => {

  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );

  test('Should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should call activeNote', () => {
    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenCalledTimes(1);
    expect(activeNote).toHaveBeenCalledWith(note.id, note);
  });

  test('Should call activeNote with input change event', () => {
    const title = 'Test title';

    act(() => {
      wrapper.find('input[name="title"]').prop('onChange')({
        target: {
          value: title,
          name: 'title'
        }
      });
    });

    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenCalledTimes(2);
    expect(activeNote).toHaveBeenLastCalledWith(note.id, { ...note, title });
  });

  test('Should call startDeleting', () => {
    wrapper.find('button.btn.btn-danger').prop('onClick')();

    expect(startDeleting).toHaveBeenCalled();
    expect(startDeleting).toHaveBeenCalledTimes(1);
  });
});

