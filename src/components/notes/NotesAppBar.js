import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { startSaveNote } from '../../actions';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  const noteDate = moment(note.date);
  const handleSave = () => {
    dispatch(startSaveNote(note));
  }

  return(
    <div className='notes__appbar'>
      <span>{noteDate.format('Do dddd yyyy')}</span>
      <div>
        <button className='btn'>Picture</button>
        <button
          onClick={handleSave}
          className='btn'
        >
          Save
        </button>
      </div>
    </div>
  );
}

