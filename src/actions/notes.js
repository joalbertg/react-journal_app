import Swal from 'sweetalert2';

import { db } from '../firebase';
import {
  loadNotes,
  fileUpload
} from '../helpers';
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

    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote({id: note.id, ...noteToFirestore }));

    Swal.fire('Saved', note.title, 'success');
  }
}

export const refreshNote = note => ({
  type: types.NOTES_UPDATED,
  payload: note
});

export const startUploading = file => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please await...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const url = await fileUpload(file);

    note.url = url;
    Swal.close();
    dispatch(startSaveNote(note));
  }
}

export const startDeleting = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { id } = getState().notes.active;

    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  }
}

export const deleteNote = id  => ({
  type: types.NOTES_DELETE,
  payload: { id }
});

export const cleanNotes = () => ({
  type: types.NOTES_LOGOUT_CLEANING
});

