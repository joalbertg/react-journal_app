import { db } from '../firebase';

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = {};

  notesSnap.forEach(snap => {
    notes[snap.id] = {
      id: snap.id,
      ...snap.data()
    };
  });

  return notes;
}

