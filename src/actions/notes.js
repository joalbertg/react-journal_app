import { db } from '../firebase';

export const startNewEntry = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newEntry = {
      titile: '',
      body: '',
      date: new Date().getTime()
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newEntry);
  };
}

