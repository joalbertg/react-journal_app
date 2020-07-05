import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import types from '~types';
import { db } from '~firebase';
import {
  startNewEntry,
  startLoadingNotes,
  startSaveNote,
  startUploading
} from '~actions/notes';
import { fileUpload } from '~helpers';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const uid = 'ui-testing';
const initState = {
  auth: { uid }
};

let store = mockStore(initState);

jest.mock('~helpers/fileUpload', () => ({
  fileUpload: jest.fn()
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initState);
  });

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

  test('Should load notes', async () => {
    await store.dispatch(startNewEntry());
    await store.dispatch(startLoadingNotes(uid));

    const actions = store.getActions();
    const id = actions[0].payload.id;
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    };

    actions.shift();

    expect(actions[0].type).toBeTruthy();
    expect(actions[0].type).toEqual(types.NOTES_LOAD);
    expect(actions[0]).toEqual({
      type: types.NOTES_LOAD,
      payload: expect.any(Object)
    });
    expect(actions[0].payload[id]).toMatchObject(expected);

    await db.doc(`${uid}/journal/notes/${id}`).delete();
  });

  test('Should save a note', async () => {
    await store.dispatch(startNewEntry());

    const actions = store.getActions();
    const id = actions[0].payload.id;
    const note = {
      id,
      title: 'Test title',
      body: 'Test body...'
    };

    await store.dispatch(startSaveNote(note));

    actions.shift();

    expect(actions[0]).toMatchObject({
      type: types.NOTES_UPDATED,
      payload: {
        ...note
      }
    });

    await db.doc(`${uid}/journal/notes/${id}`).delete();
  });

  test('Should update the url note', async () => {
    // added in setupTest
    // Object.defineProperty(window, 'scrollTo', { value: noScroll });

    await store.dispatch(startNewEntry());

    const original_filename = 'foto.jpg';
    const secure_url = 'http://anything/public_id-0123456789.jpg';
    const actions = store.getActions();
    const id = actions[0].payload.id;
    const file = new File([], original_filename);

    store = mockStore({ ...initState, notes: {
      active: {
        ...actions[0].payload
      }
    }});

    fileUpload.mockReturnValue({ original_filename, secure_url });
    await store.dispatch(startUploading(file));

    const docRef = await db.doc(`${uid}/journal/notes/${id}`).get();
    const { filename, url } = docRef.data();

    expect(filename).toBe(original_filename);
    expect(url).toBe(secure_url);
    expect(fileUpload).toHaveBeenCalled();
    expect(fileUpload).toHaveBeenCalledTimes(1);

    await db.doc(`${uid}/journal/notes/${id}`).delete();
  });
});

