import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import types from '~types';
import { db } from '~firebase';

import {
  startNewEntry,
  activeNote,
  startLoadingNotes,
  setNotes,
  startSaveNote,
  refreshNote,
  startUploading,
  startDeleting,
  deleteNote,
  cleanNotes
} from '~actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const uid = 'ui-testing';

const store = mockStore({
  auth: { uid }
});

//[
//  {
//    type: '[NOTES] NOTES_ACTIVE',
//    payload: {
//      id: 'bxVNEfdWibPXReiBtQZD',
//      title: '',
//      body: '',
//      date: 1593961537554
//    }
//  }
//]

describe('Tests notes action', () => {
  test('Should create a new note', async () => {
    await store.dispatch(startNewEntry());

    const actions = store.getActions();
    //console.log(actions);

    expect(actions[0]).toEqual({
      type: types.NOTES_ACTIVE,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    await db.doc(`${uid}/journal/notes/${actions[0].payload.id}`).delete();
  });
});

