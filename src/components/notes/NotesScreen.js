import React from 'react';

import { NotesAppBar } from './NotesAppBar';

const NoteScreen = () => {
  return(
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          className='notes__title-input'
          type='text'
          placeholder='Some awesome title'
          autoComplete='off'
        />
        <textarea
          className='notes__textarea'
          placeholder='What happened today'
        ></textarea>
        <div className='notes__image'>
          <img
            src='https://www.landuum.com/wp-content/uploads/2018/11/hill-rond-nature-landart-04-300x200.jpg'
            alt='test-img'
          />
        </div>
      </div>
    </div>
  );
}

export default NoteScreen;

