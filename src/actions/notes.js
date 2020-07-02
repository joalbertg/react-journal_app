import { db } from '../firebase';
import { loadNotes } from '../helpers';
import types from '../types';

export const startNewEntry = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newEntry = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newEntry);
    dispatch(activeNote(docRef.id, newEntry));
  };
}

export const activeNote = (id, note) => ({
  type: types.NOTES_ACTIVE,
  payload: { id, ...note }
});

export const startLoadingNotes = uid => {
  return async (dispatch) => (
    dispatch(setNotes(await loadNotes(uid)))
  );
}

export const setNotes = notes => ({
  type: types.NOTES_LOAD,
  payload: notes
});

export const startSaveNote = note => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const noteToFirestore = { ...note };

    console.log(noteToFirestore)

    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
  }
}

