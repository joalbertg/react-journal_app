import { db } from '../firebase';
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

export const setNotes = notes => ({
  type: types.NOTES_LOAD,
  payload: notes
});

