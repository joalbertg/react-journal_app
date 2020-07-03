import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  startSaveNote,
  startUploading
} from '~actions';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  const noteDate = moment(note.date);
  const fileInput = useRef();
  const handleSave = () => {
    dispatch(startSaveNote(note));
  }

  const handlePictureUpload = () => {
    fileInput.current.click();
  }

  const handleFileChange = event => {
    const file = event.target.files[0];
    if(file) {
      dispatch(startUploading(file));
    }
  }

  return(
    <div className='notes__appbar'>
      <span>{noteDate.format('Do dddd yyyy')}</span>
      <input
        ref={fileInput}
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button
          className='btn'
          onClick={handlePictureUpload}
        >
            Picture
        </button>
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

