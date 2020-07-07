import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { JournalEntry } from '~components/journal/JournalEntry';
import { activeNote } from '~actions';

//jest.mock('~actions', () => ({
//  activeNote: jest.fn()
//}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

store.dispatch = jest.fn();

describe('Tests JournalEntry component', () => {
  const note = {
    id: 'ABCD1234',
    title: 'Testing title',
    body: 'Body title',
    date: '2020-07-07T00:49:11.159Z'
  };

  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry note={note} />
    </Provider>
  );

  test('Should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should call activeNote', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    //expect(activeNote).toHaveBeenCalled();
    //expect(activeNote).toHaveBeenCalledTimes(1);
    //expect(activeNote).toHaveBeenCalledWith(note.id, note);

    // another way to avaluate without mocking
    expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, note));
  });
});

