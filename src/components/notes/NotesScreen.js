import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '~hooks/useForm';
import {
  activeNote,
  startDeleting
} from '~actions';

const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);

  const [formValues, handleInputChange, handleReset] = useForm(note);
  const { title, body } = formValues;
  const idRef = useRef(note.id);

  useEffect(() => {
    if(idRef.current !== note.id) {
      handleReset(note);
      idRef.current = note.id;
    }
  }, [handleReset, note]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting());
  }

  return(
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          className='notes__title-input'
          type='text'
          placeholder='Some awesome title'
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className='notes__textarea'
          placeholder='What happened today'
          name='body'
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {
          note.url &&
            <div className='notes__image'>
              <img
                src={note.url}
                alt={note.filename}
              />
            </div>
        }
      </div>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteScreen;

