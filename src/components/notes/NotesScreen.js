import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote } from '../../actions';

const NoteScreen = () => {
  const { active: note } = useSelector(state => state.notes);
  const [formValues, handleInputChange, handleReset] = useForm(note);
  const { title, body, url = null } = formValues;
  const idRef = useRef(note.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if(idRef.current !== note.id) {
      handleReset(note);
      idRef.current = note.id;
    }
  }, [idRef, handleReset, note]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

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
        { url &&
            <div className='notes__image'>
              <img
                src='https://www.landuum.com/wp-content/uploads/2018/11/hill-rond-nature-landart-04-300x200.jpg'
                alt='test-img'
              />
            </div>
        }
      </div>
    </div>
  );
}

export default NoteScreen;

